#!/usr/bin/env node
/**
 * add-content.js — cria entradas de mídia buscando dados automaticamente
 *
 * Uso:
 *   node scripts/content/add-content.js movie   "Duna"
 *   node scripts/content/add-content.js serie   "Dark"
 *   node scripts/content/add-content.js book    "Sapiens"
 *   node scripts/content/add-content.js music   "Radiohead" "OK Computer"
 *   node scripts/content/add-content.js comic   "Watchmen"
 *   node scripts/content/add-content.js game    "Return of the Obra Dinn"
 *
 * Variáveis de ambiente (.env ou export):
 *   TMDB_KEY      — TMDB (filmes + séries)   https://www.themoviedb.org/settings/api
 *   YOUTUBE_KEY   — YouTube (músicas)         console.cloud.google.com → YouTube Data API v3
 *   RAWG_KEY      — RAWG (jogos)             https://rawg.io/apidocs
 *   COMICVINE_KEY — Comic Vine (quadrinhos)  https://comicvine.gamespot.com/api
 *   GROQ_KEY      — Groq/Llama (fallback AI) https://console.groq.com
 *   (livros e quadrinhos usam Google Books — sem chave necessária)
 */

const fs   = require("fs");
const path = require("path");

// Carrega .env da raiz do projeto (silencioso se não existir)
try {
  const envPath = path.join(__dirname, "..", "..", ".env");
  if (fs.existsSync(envPath)) {
    fs.readFileSync(envPath, "utf8").split("\n").forEach(line => {
      const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
    });
  }
} catch { /* ignora */ }

// ── Terminal colors ───────────────────────────────────────────────────────────
const R = "\x1b[0m", B = "\x1b[1m", DIM = "\x1b[2m";
const GREEN = "\x1b[32m", YELLOW = "\x1b[33m", RED = "\x1b[31m", CYAN = "\x1b[36m";
const ok   = (m) => console.log(`${GREEN}✔${R} ${m}`);
const warn = (m) => console.log(`${YELLOW}⚠${R}  ${m}`);
const err  = (m) => console.error(`${RED}✖${R} ${m}`);
const info = (m) => console.log(`${CYAN}→${R} ${m}`);

// ── Helpers ───────────────────────────────────────────────────────────────────
function slug(str) {
  return str.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function today() { return new Date().toISOString().slice(0, 10); }

function yamlStr(val) {
  if (!val && val !== 0) return '""';
  const s = String(val);
  if (/[:#\[\]{},|>&*!'"@%`]/.test(s) || s.includes("\n") || /^\s|\s$/.test(s))
    return `"${s.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  return s;
}

function yamlList(arr) {
  if (!arr || !arr.length) return "[]";
  return `[${arr.map(v => yamlStr(v)).join(", ")}]`;
}

async function get(url) {
  const res = await fetch(url, { headers: { "User-Agent": "margem-viva/1.0 (add-content)" } });
  if (!res.ok) throw new Error(`HTTP ${res.status} — ${url}`);
  return res.json();
}

// ── YouTube Music (Innertube) helpers ─────────────────────────────────────────
const YTM_BASE = "https://music.youtube.com/youtubei/v1";
const YTM_KEY  = "AIzaSyC9XL3ZjWddXya6X74dJoCTL-NKNELL6TV"; // public web client key
const YTM_CTX  = { client: { clientName: "WEB_REMIX", clientVersion: "1.20240401.01.00", hl: "pt", gl: "BR" } };

async function ytmPost(endpoint, body) {
  const res = await fetch(`${YTM_BASE}/${endpoint}?key=${YTM_KEY}`, {
    method:  "POST",
    headers: { "Content-Type": "application/json", "Origin": "https://music.youtube.com", "Referer": "https://music.youtube.com/" },
    body:    JSON.stringify({ context: YTM_CTX, ...body }),
  });
  if (!res.ok) throw new Error(`YTMusic HTTP ${res.status}`);
  return res.json();
}

// Walk entire Innertube response tree collecting all values for a given key
function walk(obj, key) {
  const out = [];
  (function t(o) {
    if (!o || typeof o !== "object") return;
    if (Array.isArray(o)) { o.forEach(t); return; }
    if (key in o) out.push(o[key]);
    Object.values(o).forEach(t);
  })(obj);
  return out;
}

function runs(obj) { return (obj?.runs || []).map(r => r.text || "").join("").trim(); }
function bigThumb(arr) { return [...(arr || [])].sort((a,b) => (b.width||0)-(a.width||0))[0]?.url || ""; }

function stripHtml(str) {
  return String(str || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function writeFile(dir, filename, content) {
  const fullDir  = path.join(__dirname, "..", "..", "src", dir);
  const fullPath = path.join(fullDir, filename);
  if (!fs.existsSync(fullDir)) fs.mkdirSync(fullDir, { recursive: true });
  if (fs.existsSync(fullPath)) {
    warn(`Arquivo já existe: src/${dir}/${filename}`);
    warn("Delete o arquivo e rode novamente para recriar.");
    return false;
  }
  fs.writeFileSync(fullPath, content, "utf8");
  ok(`Criado: src/${dir}/${filename}`);
  return true;
}

// ── TMDB — filmes e séries ────────────────────────────────────────────────────
const TMDB        = "https://api.themoviedb.org/3";
const IMG         = "https://image.tmdb.org/t/p/w500";
const LANG        = "pt-BR";
const countryNames = new Intl.DisplayNames(["pt-BR"], { type: "region" });
const ptCountry    = (iso) => { try { return countryNames.of(iso) || iso; } catch { return iso; } };

function pickTrailer(videos) {
  const yt = (videos?.results || []).filter(v => v.site === "YouTube");
  return (
    yt.find(v => v.official && v.type === "Trailer" && v.iso_639_1 === "pt") ||
    yt.find(v => v.official && v.type === "Trailer") ||
    yt.find(v => v.type === "Trailer") ||
    yt[0]
  )?.key || "";
}

async function tmdbMovieDetail(id, key) {
  const [d, c, v] = await Promise.all([
    get(`${TMDB}/movie/${id}?language=${LANG}&api_key=${key}`),
    get(`${TMDB}/movie/${id}/credits?language=${LANG}&api_key=${key}`),
    get(`${TMDB}/movie/${id}/videos?language=${LANG}&api_key=${key}`),
  ]);
  return {
    title:     d.title,
    directors: c.crew?.filter(x => x.job === "Director").map(x => x.name) || [],
    writers:   c.crew?.filter(x => ["Screenplay","Writer","Story"].includes(x.job)).map(x => x.name).slice(0,3) || [],
    cast:      c.cast?.slice(0,4).map(x => x.name) || [],
    genres:    d.genres?.map(g => g.name) || [],
    country:   d.production_countries?.map(c => ptCountry(c.iso_3166_1)) || [],
    duration:  d.runtime || null,
    year:      d.release_date?.slice(0,4) || "",
    image:     d.poster_path ? IMG + d.poster_path : "",
    overview:  d.overview || "",
    trailer:   pickTrailer(v),
  };
}

async function tmdbSerieDetail(id, key) {
  const [d, c, v] = await Promise.all([
    get(`${TMDB}/tv/${id}?language=${LANG}&api_key=${key}`),
    get(`${TMDB}/tv/${id}/credits?language=${LANG}&api_key=${key}`),
    get(`${TMDB}/tv/${id}/videos?language=${LANG}&api_key=${key}`),
  ]);
  const fy = d.first_air_date?.slice(0,4) || "";
  const ly = d.last_air_date?.slice(0,4)  || "";
  return {
    title:    d.name,
    networks: d.networks?.map(n => n.name) || [],
    years:    fy && ly && fy !== ly ? `${fy}–${ly}` : fy,
    seasons:  d.number_of_seasons || "",
    genres:   d.genres?.map(g => g.name) || [],
    image:    d.poster_path ? IMG + d.poster_path : "",
    overview: d.overview || "",
    trailer:  pickTrailer(v),
  };
}

// ── Google Books — livros ─────────────────────────────────────────────────────
async function fetchBook(query) {
  info(`Buscando livro: "${query}" no Google Books...`);
  const d = await get(
    `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=5&printType=books`
  );
  const item = d.items?.[0];
  if (!item) throw new Error("Nenhum livro encontrado.");
  const v       = item.volumeInfo;
  const authors = v.authors || [];
  const isbn    = v.industryIdentifiers?.find(i => i.type === "ISBN_13")?.identifier
               || v.industryIdentifiers?.find(i => i.type === "ISBN_10")?.identifier || "";
  const image   = v.imageLinks?.thumbnail
                    ?.replace("http://", "https://")
                    .replace("&zoom=1", "&zoom=3") || "";
  info(`Encontrado: ${B}${v.title}${R}${authors[0] ? ` — ${authors[0]}` : ""}`);
  const description = v.description?.replace(/\s+/g, " ").trim()
    || await fetchOpenLibraryDescription(isbn)
    || await fetchGroqDescription(`Escreva uma breve descrição do livro "${v.title || query}"${authors[0] ? ` de ${authors[0]}` : ""}. Máximo 2 frases em português.`);
  return {
    title:       v.title || query,
    author:      authors.join(", "),
    year:        v.publishedDate?.slice(0, 4) || "",
    isbn,
    pages:       v.pageCount || "",
    publisher:   v.publisher || "",
    image,
    subjects:    (v.categories || []).slice(0, 5),
    description,
  };
}

async function fetchOpenLibraryDescription(isbn) {
  if (!isbn) return "";
  try {
    info("Sem descrição no Google Books. Buscando no OpenLibrary...");
    const book = await get(`https://openlibrary.org/isbn/${isbn}.json`);
    const workKey = book.works?.[0]?.key;
    if (!workKey) return "";
    const work = await get(`https://openlibrary.org${workKey}.json`);
    const desc = work.description;
    const raw = typeof desc === "string" ? desc : (desc?.value || "");
    return raw.replace(/\s+/g, " ").trim();
  } catch {
    return "";
  }
}

async function fetchGroqDescription(prompt) {
  const key = process.env.GROQ_KEY;
  if (!key) { warn("GROQ_KEY não definido — fallback AI ignorado."); return ""; }
  try {
    info("Buscando descrição no Groq (Llama)...");
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${key}` },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 200,
        temperature: 0.5,
      }),
    });
    if (!res.ok) {
      let body = "";
      try { body = await res.text(); } catch { /* ignora */ }
      warn(`Groq falhou: HTTP ${res.status}${body ? ` — ${body.slice(0, 200)}` : ""}`);
      return "";
    }
    const d = await res.json();
    return d.choices?.[0]?.message?.content?.trim().replace(/\s+/g, " ") || "";
  } catch (e) {
    warn(`Groq erro: ${e.message}`);
    return "";
  }
}

// ── Google Books — quadrinhos ─────────────────────────────────────────────────
async function fetchComicGoogleBooks(query) {
  info(`Buscando quadrinho: "${query}" no Google Books...`);
  const d = await get(
    `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=5&printType=books`
  );
  const item = d.items?.[0];
  if (!item) throw new Error("Nenhum quadrinho encontrado.");
  const v = item.volumeInfo;
  const authors = v.authors || [];
  const isbn    = v.industryIdentifiers?.find(i => i.type === "ISBN_13")?.identifier
               || v.industryIdentifiers?.find(i => i.type === "ISBN_10")?.identifier || "";
  const image   = v.imageLinks?.thumbnail?.replace("http://", "https://").replace("&zoom=1", "&zoom=3") || "";
  info(`Encontrado: ${B}${v.title}${R}${authors[0] ? ` — ${authors[0]}` : ""}`);
  return {
    source:    "google-books",
    title:     v.title || query,
    writer:    authors[0] || "",
    artist:    authors[1] || "",
    publisher: v.publisher || "",
    year:      v.publishedDate?.slice(0,4) || "",
    isbn,
    image,
    categories: (v.categories || []).slice(0, 4),
    synopsis:  stripHtml(v.description || ""),
  };
}

async function fetchComicComicVine(query) {
  const key = process.env.COMICVINE_KEY;
  if (!key) return null;

  info(`Buscando quadrinho: "${query}" na Comic Vine...`);
  const search = await get(
    `https://comicvine.gamespot.com/api/search/?api_key=${encodeURIComponent(key)}&format=json&resources=volume&limit=5&query=${encodeURIComponent(query)}&field_list=id,name,start_year,publisher,image,deck,description,count_of_issues`
  );
  const volume = search.results?.[0];
  if (!volume) return null;

  let writer = "", artist = "", cover = "", year = volume.start_year || "";
  let tags = [];
  let synopsis = stripHtml(volume.deck || volume.description || "");

  try {
    const issues = await get(
      `https://comicvine.gamespot.com/api/issues/?api_key=${encodeURIComponent(key)}&format=json&filter=volume:${volume.id}&limit=1&sort=cover_date:asc&field_list=name,issue_number,cover_date,image,description,person_credits`
    );
    const issue = issues.results?.[0];
    if (issue) {
      cover = issue.image?.original_url || issue.image?.small_url || "";
      year = issue.cover_date?.slice(0,4) || year;
      synopsis = stripHtml(issue.description || synopsis);
      const people = issue.person_credits || [];
      writer = people.filter((p) => /writer/i.test(p.role || "")).map((p) => p.name).slice(0, 2).join(", ");
      artist = people.filter((p) => /(artist|penciler|inker|cover)/i.test(p.role || "")).map((p) => p.name).slice(0, 3).join(", ");
    }
  } catch {
    /* ignora enriquecimento por issue */
  }

  if (volume.publisher?.name) tags.push(volume.publisher.name);

  return {
    source:    "comic-vine",
    title:     volume.name || query,
    writer,
    artist,
    publisher: volume.publisher?.name || "",
    year,
    isbn:      "",
    image:     cover || volume.image?.original_url || volume.image?.small_url || "",
    categories: tags,
    synopsis,
  };
}

async function fetchComic(query) {
  const [google, comicvine] = await Promise.all([
    fetchComicGoogleBooks(query).catch(() => null),
    fetchComicComicVine(query).catch(() => null),
  ]);

  if (!google && !comicvine) throw new Error("Nenhum quadrinho encontrado.");

  const base = google || comicvine;
  const extra = comicvine || google;

  if (base?.title) {
    info(`Encontrado: ${B}${base.title}${R}${base.writer ? ` — ${base.writer}` : ""}`);
  }

  return {
    title:      base?.title || extra?.title || query,
    writer:     comicvine?.writer || google?.writer || "",
    artist:     comicvine?.artist || google?.artist || "",
    publisher:  google?.publisher || comicvine?.publisher || "",
    year:       google?.year || comicvine?.year || "",
    isbn:       google?.isbn || "",
    image:      google?.image || comicvine?.image || "",
    categories: [...new Set([...(google?.categories || []), ...(comicvine?.categories || [])])].slice(0, 6),
    synopsis:   comicvine?.synopsis || google?.synopsis || "",
  };
}

// ── RAWG — jogos ──────────────────────────────────────────────────────────────
async function fetchGame(query) {
  const key = process.env.RAWG_KEY || "";
  const url = `https://api.rawg.io/api/games?search=${encodeURIComponent(query)}&page_size=5`
            + (key ? `&key=${key}` : "");
  info(`Buscando jogo: "${query}" no RAWG...`);
  const d = await get(url);
  const g = d.results?.[0];
  if (!g) throw new Error("Nenhum jogo encontrado.");
  info(`Encontrado: ${B}${g.name}${R} (${g.released?.slice(0,4) || "?"})`);

  // Busca detalhes para enriquecer a entrada
  let developer = "", genres = [], platforms = [], overview = "", trailer = "";
  try {
    const keyParam = key ? `?key=${key}` : "";
    const [detail, movies] = await Promise.all([
      get(`https://api.rawg.io/api/games/${g.id}${keyParam}`),
      get(`https://api.rawg.io/api/games/${g.id}/movies${keyParam}`).catch(() => ({ results: [] })),
    ]);
    developer  = detail.developers?.[0]?.name || "";
    genres     = detail.genres?.map(x => x.name) || [];
    platforms  = detail.platforms?.map(x => x.platform.name).slice(0,3) || [];
    overview   = (detail.description_raw || "").replace(/\s+/g, " ").trim();
    trailer    = movies?.results?.[0]?.data?.max || movies?.results?.[0]?.data?.["480"] || detail.clip?.clip || detail.clip?.clips?.full || "";
  } catch { /* ignora erros de detalhe */ }

  return {
    title:     g.name,
    developer,
    platform:  platforms.join(", "),
    year:      g.released?.slice(0,4) || "",
    image:     g.background_image || "",
    genres,
    overview,
    trailer,
  };
}

// ── Música: YouTube Music + YouTube Data API + MusicBrainz ───────────────────
async function fetchAlbum(artist, album) {
  const ytKey = process.env.YOUTUBE_KEY;
  if (!ytKey) { err("YOUTUBE_KEY não definido. Veja README."); process.exit(1); }

  info(`Buscando álbum: "${artist} — ${album}"...`);

  // Tudo em paralelo
  const [ytmSearch, ytEmbed, mb, lfm] = await Promise.allSettled([
    ytmPost("search", { query: `${artist} ${album}`, params: "EgWKAQIYAWoKEAMQBBAKEAUQCQ==" }),
    (async () => {
      const q = encodeURIComponent(`${artist} ${album}`);
      const b = "https://www.googleapis.com/youtube/v3/search";
      const [pl, vid] = await Promise.all([
        get(`${b}?q=${q}+album&type=playlist&part=snippet&maxResults=3&key=${ytKey}`),
        get(`${b}?q=${q}&type=video&topicId=%2Fm%2F04rlf&part=snippet&maxResults=3&key=${ytKey}`),
      ]);
      return { pl: pl.items?.[0], vid: vid.items?.[0] };
    })(),
    (async () => {
      const q = `release:"${album}" AND artist:"${artist}"`;
      const d = await get(`https://musicbrainz.org/ws/2/release/?query=${encodeURIComponent(q)}&fmt=json&limit=3`);
      const r = d.releases?.[0];
      if (!r) return null;
      let tags = [];
      try {
        const rgId = r["release-group"]?.id;
        if (rgId) {
          const rg = await get(`https://musicbrainz.org/ws/2/release-group/${rgId}?inc=tags&fmt=json`);
          tags = rg.tags?.sort((a,b)=>b.count-a.count).slice(0,5).map(t=>t.name) || [];
        }
      } catch { /* ignora */ }
      return { year: r.date?.slice(0,4)||"", label: r["label-info"]?.[0]?.label?.name||"", tags };
    })(),
    (async () => {
      const lfmKey = process.env.LASTFM_KEY;
      if (!lfmKey) return null;
      const url = `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&artist=${encodeURIComponent(artist)}&album=${encodeURIComponent(album)}&api_key=${lfmKey}&format=json&lang=pt`;
      const d = await get(url);
      const wiki = d.album?.wiki?.summary || d.album?.wiki?.content || "";
      if (!wiki) return null;
      // Last.fm appends " <a href="https://www.last.fm/...">Read more on Last.fm</a>." — strip it
      const clean = wiki.replace(/<a\b[^>]*>.*?<\/a>/gi, "").replace(/\.\s*$/, "").trim();
      return clean || null;
    })(),
  ]);

  // ── YouTube Music → capa quadrada + faixas + browseId ──
  let image = "", ytmYear = "", browseId = "", tracks = [];
  if (ytmSearch.status === "fulfilled") {
    try {
      // Direct walk for MPREb_ browseIds (mirrors confirmed debug test)
      const allBrowseIds = walk(ytmSearch.value, "browseId").filter(id => String(id || "").startsWith("MPREb_"));
      browseId = allBrowseIds[0] || "";

      // Find matching renderer for image + year
      const items = walk(ytmSearch.value, "musicResponsiveListItemRenderer");
      const hit   = items.find(i => {
        const ids = walk(i, "browseId").filter(id => String(id || "").startsWith("MPREb_"));
        return ids.length > 0;
      }) || items[0];

      if (hit) {
        const sub = runs(hit.flexColumns?.[1]?.musicResponsiveListItemFlexColumnRenderer?.text);
        ytmYear   = sub.match(/\b(19|20)\d{2}\b/)?.[0] || "";
        const thumbArrays = walk(hit, "thumbnails");
        image = bigThumb(thumbArrays[0] || []);
        info(`YouTube Music: ${B}${runs(hit.flexColumns?.[0]?.musicResponsiveListItemFlexColumnRenderer?.text)}${R}${browseId ? ` [${browseId}]` : ""}${ytmYear ? ` (${ytmYear})` : ""}`);

        // Browse album → faixas
        if (browseId) {
          try {
            const browse = await ytmPost("browse", { browseId });
            // Capa maior do header — walk retorna array-de-arrays, achata e pega maior
            const allThumbs = walk(browse, "thumbnails").flat();
            const bigImg = [...allThumbs].sort((a,b)=>(b.width||0)-(a.width||0))[0]?.url || "";
            if (bigImg) image = bigImg;
            // Faixas
            const tItems = walk(browse, "musicResponsiveListItemRenderer");
            tracks = tItems.map(item => {
              const name     = runs(item.flexColumns?.[0]?.musicResponsiveListItemFlexColumnRenderer?.text);
              const duration = runs(item.fixedColumns?.[0]?.musicResponsiveListItemFixedColumnRenderer?.text);
              return name ? `${name}${duration ? `  ${duration}` : ""}` : null;
            }).filter(Boolean);
            if (tracks.length) info(`Faixas: ${tracks.length} encontradas`);
          } catch { /* ignora falha de browse */ }
        }
      }
    } catch { /* ignora parsing */ }
  }

  // ── YouTube Data API → playlist + video para embed ──
  let playlistId = "", videoId = "", ytImage = "";
  if (ytEmbed.status === "fulfilled") {
    const { pl, vid } = ytEmbed.value;
    if (pl) {
      playlistId = pl.id.playlistId;
      ytImage = pl.snippet.thumbnails?.high?.url || "";
      if (!ytmYear) ytmYear = pl.snippet.publishedAt?.slice(0,4) || "";
      info(`Playlist: ${B}${pl.snippet.title}${R}`);
    }
    if (vid) {
      videoId = vid.id.videoId;
      if (!image && !ytImage) ytImage = vid.snippet.thumbnails?.high?.url || "";
      if (!ytmYear) ytmYear = vid.snippet.publishedAt?.slice(0,4) || "";
      info(`Vídeo: ${B}${vid.snippet.title}${R}`);
    }
  }

  // ── MusicBrainz → gravadora + ano real + tags ──
  const mbData = mb.status === "fulfilled" ? mb.value : null;
  if (mbData) info(`MusicBrainz: ${mbData.label ? mbData.label + " " : ""}${mbData.year ? `(${mbData.year})` : ""}`);

  // ── Last.fm → descrição do álbum ──
  const lfmWiki = (lfm.status === "fulfilled" && lfm.value) ? lfm.value : "";
  if (lfmWiki) info(`Last.fm: descrição encontrada (${lfmWiki.length} chars)`);
  const wiki = lfmWiki
    || await fetchGroqDescription(`Escreva uma breve descrição do álbum "${album}" de ${artist}. Máximo 2 frases em português.`);

  if (!browseId && !playlistId && !videoId) throw new Error("Álbum não encontrado.");
  info(`Encontrado: ${B}${album}${R} — ${artist}`);

  return {
    title:       album,
    artist,
    year:        mbData?.year  || ytmYear || "",
    label:       mbData?.label || "",
    image:       image || ytImage,
    youtube:     videoId,
    youtubeList: playlistId,
    browseId,
    tracks,
    tags:        mbData?.tags  || [],
    wiki,
  };
}

// ── Frontmatters ──────────────────────────────────────────────────────────────
const fm = {
  movie: (d) => `---
title: ${yamlStr(d.title)}
director: ${yamlStr(d.directors.join(", "))}
cast: ${yamlStr(d.cast.join(", "))}
writers: ${yamlStr(d.writers.join(", "))}
year: ${d.year}
country: ${yamlList(d.country)}
duration: ${d.duration || '""'}
image: ${yamlStr(d.image)}
tags: ${yamlList(d.genres)}
synopsis: ${yamlStr(d.overview)}
trailer: ${yamlStr(d.trailer)}
`,

  serie: (d) => `---
title: ${yamlStr(d.title)}
platform: ${yamlStr(d.networks.join(", "))}
years: ${yamlStr(d.years)}
seasons: ${d.seasons}
image: ${yamlStr(d.image)}
tags: ${yamlList(d.genres)}
synopsis: ${yamlStr(d.overview)}
trailer: ${yamlStr(d.trailer)}
`,

  book: (d) => `---
title: ${yamlStr(d.title)}
author: ${yamlStr(d.author)}
year: ${d.year}
publisher: ${yamlStr(d.publisher)}
pages: ${d.pages || '""'}
isbn: ${yamlStr(d.isbn)}
image: ${yamlStr(d.image)}
description: ${yamlStr(d.description)}
tags: ${yamlList(d.subjects)}
---
`,

  comic: (d) => `---
title: ${yamlStr(d.title)}
writer: ${yamlStr(d.writer)}
artist: ${yamlStr(d.artist)}
publisher: ${yamlStr(d.publisher)}
year: ${d.year}
volumes: ""
image: ${yamlStr(d.image)}
tags: ${yamlList(d.categories)}
synopsis: ${yamlStr(d.synopsis)}
---
`,

  game: (d) => `---
title: ${yamlStr(d.title)}
developer: ${yamlStr(d.developer)}
platform: ${yamlStr(d.platform)}
year: ${d.year}
image: ${yamlStr(d.image)}
tags: ${yamlList(d.genres)}
synopsis: ${yamlStr(d.overview)}
trailer: ${yamlStr(d.trailer)}
---
`,

  music: (d) => `---
title: ${yamlStr(d.title)}
artist: ${yamlStr(d.artist)}
year: ${yamlStr(d.year)}
label: ${yamlStr(d.label)}
image: ${yamlStr(d.image)}
youtube: ${yamlStr(d.youtube)}
youtubeList: ${yamlStr(d.youtubeList)}
browseId: ${yamlStr(d.browseId)}
tracks: ${d.tracks?.length || '""'}
tags: ${yamlList(d.tags)}
---
${d.wiki ? `\n${d.wiki}\n` : ""}`,
};

// ── Comandos ──────────────────────────────────────────────────────────────────
async function addMovie(query) {
  const key = process.env.TMDB_KEY;
  if (!key) { err("TMDB_KEY não definido. Veja o help."); process.exit(1); }
  info(`Buscando filme: "${query}" no TMDB...`);
  const r = await get(`${TMDB}/search/movie?query=${encodeURIComponent(query)}&language=${LANG}&api_key=${key}`);
  const h = r.results?.[0];
  if (!h) { err("Nenhum filme encontrado."); process.exit(1); }
  info(`Encontrado: ${B}${h.title}${R} (${h.release_date?.slice(0,4) || "?"})`);
  const d = await tmdbMovieDetail(h.id, key);
  if (!d.overview) d.overview = await fetchGroqDescription(`Escreva uma breve sinopse do filme "${d.title}" (${d.year}). Máximo 2 frases em português.`);
  const f = `${today()}-${slug(d.title)}.md`;
  writeFile("movies", f, fm.movie(d));
  console.log(`\n${DIM}${fm.movie(d)}${R}`);
}

async function addSerie(query) {
  const key = process.env.TMDB_KEY;
  if (!key) { err("TMDB_KEY não definido. Veja o help."); process.exit(1); }
  info(`Buscando série: "${query}" no TMDB...`);
  const r = await get(`${TMDB}/search/tv?query=${encodeURIComponent(query)}&language=${LANG}&api_key=${key}`);
  const h = r.results?.[0];
  if (!h) { err("Nenhuma série encontrada."); process.exit(1); }
  info(`Encontrada: ${B}${h.name}${R} (${h.first_air_date?.slice(0,4) || "?"})`);
  const d = await tmdbSerieDetail(h.id, key);
  if (!d.overview) d.overview = await fetchGroqDescription(`Escreva uma breve sinopse da série "${d.title}". Máximo 2 frases em português.`);
  const f = `${today()}-${slug(d.title)}.md`;
  writeFile("series", f, fm.serie(d));
  console.log(`\n${DIM}${fm.serie(d)}${R}`);
}

async function addBook(query) {
  const d = await fetchBook(query);
  const f = `${today()}-${slug(d.title)}.md`;
  writeFile("bookshelf", f, fm.book(d));
  console.log(`\n${DIM}${fm.book(d)}${R}`);
}

async function addComic(query) {
  const d = await fetchComic(query);
  if (!d.synopsis) d.synopsis = await fetchGroqDescription(`Escreva uma breve sinopse do quadrinho "${d.title}"${d.writer ? ` de ${d.writer}` : ""}. Máximo 2 frases em português.`);
  const f = `${today()}-${slug(d.title)}.md`;
  writeFile("comics", f, fm.comic(d));
  console.log(`\n${DIM}${fm.comic(d)}${R}`);
}

async function addGame(query) {
  const d = await fetchGame(query);
  if (!d.overview) d.overview = await fetchGroqDescription(`Escreva uma breve descrição do jogo "${d.title}" (${d.year}). Máximo 2 frases em português.`);
  const f = `${today()}-${slug(d.title)}.md`;
  writeFile("games", f, fm.game(d));
  console.log(`\n${DIM}${fm.game(d)}${R}`);
}

async function addMusic(artist, album) {
  if (!album) { err(`Informe artista E álbum:\n  node scripts/content/add-content.js music "Artista" "Álbum"`); process.exit(1); }
  const d = await fetchAlbum(artist, album);
  const f = `${[d.artist, d.title, d.year].filter(Boolean).map(slug).join("-")}.md`;
  writeFile("music", f, fm.music(d));
  console.log(`\n${DIM}${fm.music(d)}${R}`);
}

function showHelp() {
  console.log(`
${B}add-content${R} — adiciona entradas de mídia automaticamente

${B}Uso:${R}
  node scripts/content/add-content.js movie  ${DIM}"Título"${R}
  node scripts/content/add-content.js serie  ${DIM}"Título"${R}
  node scripts/content/add-content.js book   ${DIM}"Título"${R}
  node scripts/content/add-content.js comic  ${DIM}"Título"${R}
  node scripts/content/add-content.js game   ${DIM}"Título"${R}
  node scripts/content/add-content.js music  ${DIM}"Artista" "Álbum"${R}

${B}Variáveis de ambiente:${R}
  TMDB_KEY      Filmes e séries  → https://www.themoviedb.org/settings/api
  YOUTUBE_KEY   Músicas          → console.cloud.google.com → YouTube Data API v3 (grátis, 10k req/dia)
  RAWG_KEY      Jogos            → https://rawg.io/apidocs                 (opcional, funciona sem chave com limitações)
  COMICVINE_KEY Quadrinhos       → https://comicvine.gamespot.com/api      (opcional, enriquece o Google Books)
  GROQ_KEY      Fallback AI      → https://console.groq.com                (grátis, gera descrições ausentes)
  (livros e quadrinhos usam Google Books; Comic Vine é opcional e enriquece quadrinhos)

${B}Exemplos:${R}
  node scripts/content/add-content.js movie  "Cidade de Deus"
  node scripts/content/add-content.js serie  "Breaking Bad"
  node scripts/content/add-content.js book   "Dom Casmurro"
  node scripts/content/add-content.js comic  "Saga"
  node scripts/content/add-content.js game   "Hollow Knight"
  node scripts/content/add-content.js music  "Criolo" "Nó na Orelha"
`);
}

// ── Entry point ───────────────────────────────────────────────────────────────
const [type, ...args] = process.argv.slice(2);

(async () => {
  try {
    switch (type) {
      case "movie":  await addMovie(args.join(" ")); break;
      case "serie":  await addSerie(args.join(" ")); break;
      case "book":   await addBook(args.join(" "));  break;
      case "comic":  await addComic(args.join(" ")); break;
      case "game":   await addGame(args.join(" "));  break;
      case "music":  await addMusic(args[0], args.slice(1).join(" ")); break;
      default:       showHelp();
    }
  } catch (e) {
    err(e.message);
    process.exit(1);
  }
})();
