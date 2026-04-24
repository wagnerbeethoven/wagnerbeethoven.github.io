#!/usr/bin/env node
/**
 * sync-bluesky.js — importa posts do Bluesky como notas .md em src/notes/
 *
 * Uso:
 *   node scripts/content/sync-bluesky.js
 *
 * Variáveis de ambiente:
 *   BLUESKY_HANDLE — handle do Bluesky (ex: wagnerbeethoven.com.br)
 *                    Padrão: lê de src/_data/site.json → social.bluesky
 */

"use strict";

const fs   = require("fs");
const path = require("path");

// ── Config ────────────────────────────────────────────────────────────────────

const SITE_JSON = path.join(__dirname, "..", "..", "src", "_data", "site.json");
const NOTES_DIR = path.join(__dirname, "..", "..", "src", "notes");
const API_BASE  = "https://public.api.bsky.app/xrpc";
const MAX_POSTS = 1000; // limite de segurança

// ── Terminal helpers ──────────────────────────────────────────────────────────

const R = "\x1b[0m", GREEN = "\x1b[32m", YELLOW = "\x1b[33m", RED = "\x1b[31m";
const ok   = (m) => console.log(`${GREEN}✔${R} ${m}`);
const warn = (m) => console.log(`${YELLOW}⚠${R}  ${m}`);
const fail = (m) => console.error(`${RED}✖${R} ${m}`);

// ── Helpers ───────────────────────────────────────────────────────────────────

function loadHandle() {
  try {
    const site = JSON.parse(fs.readFileSync(SITE_JSON, "utf8"));
    return site.social?.bluesky ?? null;
  } catch {
    return null;
  }
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} em ${url}`);
  return res.json();
}

/** Retorna Set com todos os bluesky_uri já presentes em src/notes/ */
function getExistingUris() {
  const uris = new Set();
  if (!fs.existsSync(NOTES_DIR)) return uris;

  for (const file of fs.readdirSync(NOTES_DIR)) {
    if (!file.endsWith(".md")) continue;
    const content = fs.readFileSync(path.join(NOTES_DIR, file), "utf8");
    const match = content.match(/^bluesky_uri:\s*["']?([^\s"']+)["']?\s*$/m);
    if (match) uris.add(match[1].trim());
  }
  return uris;
}

/** Extrai hashtags das facets do AT Protocol */
function extractTags(post) {
  const tags = new Set(["notes"]);
  for (const facet of post.record?.facets ?? []) {
    for (const feature of facet.features ?? []) {
      if (feature.$type === "app.bsky.richtext.facet#tag") {
        tags.add(feature.tag.toLowerCase());
      }
    }
  }
  return [...tags];
}

/** Converte ISO string para YYYY-MM-DD */
function toDateSlug(iso) {
  return new Date(iso).toISOString().slice(0, 10);
}

/** Extrai o rkey (ID curto) do AT URI */
function rkey(uri) {
  return uri.split("/").pop();
}

/** Gera a URL pública do post no Bluesky */
function postUrl(uri, handle) {
  return `https://bsky.app/profile/${handle}/post/${rkey(uri)}`;
}

/** Extrai imagens do embed do post (usa o view resolvido) */
function extractImages(post) {
  const embed = post.embed;
  if (!embed) return [];
  if (embed.$type !== "app.bsky.embed.images#view") return [];
  return (embed.images ?? []).map(img => ({
    thumb: img.thumb ?? "",
    fullsize: img.fullsize ?? "",
    alt: img.alt ?? "",
  }));
}

/** Extrai link externo do embed do post */
function extractLinkEmbed(post) {
  const embed = post.embed;
  if (!embed) return null;
  if (embed.$type !== "app.bsky.embed.external#view") return null;
  const ext = embed.external ?? {};
  if (!ext.uri) return null;
  return {
    url: ext.uri,
    title: ext.title ?? "",
    description: ext.description ?? "",
    thumb: ext.thumb ?? "",
  };
}

/** Monta o bloco de frontmatter YAML */
function buildFrontmatter(post, tags, handle) {
  const dateSlug  = toDateSlug(post.record.createdAt);
  const dateISO   = post.record.createdAt;           // datetime completo com hora
  const uri       = post.uri;
  const url       = postUrl(uri, handle);
  const text      = post.record?.text ?? "";
  const images    = extractImages(post);
  const linkEmbed = extractLinkEmbed(post);

  // Usa primeira linha como título se for curta o suficiente
  const firstLine = text.split("\n")[0].trim();
  const title = firstLine.length > 0 && firstLine.length <= 100 ? firstLine : "";

  const lines = ["---"];
  if (title) lines.push(`title: ${JSON.stringify(title)}`);
  lines.push(`date: "${dateISO}"`);
  lines.push("tags:");
  for (const tag of tags) lines.push(`  - ${tag}`);
  lines.push(`bluesky_uri: "${uri}"`);
  lines.push(`bluesky_url: "${url}"`);
  if (images.length > 0) {
    lines.push("images:");
    for (const img of images) {
      lines.push(`  - thumb: ${JSON.stringify(img.thumb)}`);
      lines.push(`    fullsize: ${JSON.stringify(img.fullsize)}`);
      if (img.alt) lines.push(`    alt: ${JSON.stringify(img.alt)}`);
    }
  }
  if (linkEmbed) {
    lines.push("link_embed:");
    lines.push(`  url: ${JSON.stringify(linkEmbed.url)}`);
    if (linkEmbed.title)       lines.push(`  title: ${JSON.stringify(linkEmbed.title)}`);
    if (linkEmbed.description) lines.push(`  description: ${JSON.stringify(linkEmbed.description)}`);
    if (linkEmbed.thumb)       lines.push(`  thumb: ${JSON.stringify(linkEmbed.thumb)}`);
  }
  lines.push("---");
  return lines.join("\n");
}

// ── API ───────────────────────────────────────────────────────────────────────

/** Busca todos os posts (sem respostas) do handle, paginando até MAX_POSTS */
async function fetchAllPosts(handle) {
  const posts  = [];
  let   cursor = null;

  do {
    const params = new URLSearchParams({
      actor: handle,
      filter: "posts_no_replies",
      limit: "100",
    });
    if (cursor) params.set("cursor", cursor);

    const data = await fetchJson(`${API_BASE}/app.bsky.feed.getAuthorFeed?${params}`);

    for (const { post } of data.feed ?? []) {
      // Pula reposts (record.$type seria app.bsky.feed.repost)
      if (post.record?.$type !== "app.bsky.feed.post") continue;
      posts.push(post);
    }

    cursor = data.cursor ?? null;
  } while (cursor && posts.length < MAX_POSTS);

  return posts;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const HANDLE = process.env.BLUESKY_HANDLE || loadHandle();

  if (!HANDLE) {
    fail("Handle não encontrado. Defina BLUESKY_HANDLE ou configure site.json → social.bluesky");
    process.exit(1);
  }

  console.log(`\n🦋 Sincronizando posts de @${HANDLE}\n`);

  // Garante que o diretório existe
  if (!fs.existsSync(NOTES_DIR)) fs.mkdirSync(NOTES_DIR, { recursive: true });

  const existingUris = getExistingUris();
  console.log(`   ${existingUris.size} nota(s) já sincronizada(s)`);

  let posts;
  try {
    posts = await fetchAllPosts(HANDLE);
  } catch (e) {
    fail(`Erro ao buscar posts: ${e.message}`);
    process.exit(1);
  }
  console.log(`   ${posts.length} post(s) encontrado(s) no Bluesky\n`);

  let created = 0;
  let skipped = 0;

  for (const post of posts) {
    if (existingUris.has(post.uri)) {
      skipped++;
      continue;
    }

    const tags        = extractTags(post);
    const date        = toDateSlug(post.record.createdAt);
    const filename    = `${date}-bsky-${rkey(post.uri)}.md`;
    const filepath    = path.join(NOTES_DIR, filename);

    // Proteção extra: arquivo já existe no disco (mesmo sem bluesky_uri)
    if (fs.existsSync(filepath)) {
      warn(`Arquivo já existe, pulando: ${filename}`);
      skipped++;
      continue;
    }

    const frontmatter = buildFrontmatter(post, tags, HANDLE);
    const body        = (post.record?.text ?? "").trim();
    const content     = `${frontmatter}\n\n${body}\n`;

    fs.writeFileSync(filepath, content, "utf8");
    ok(`criado: ${filename}`);
    created++;
  }

  console.log(`\n${created} nota(s) nova(s) criada(s), ${skipped} já existente(s).\n`);
}

main().catch((e) => {
  fail(e.message);
  process.exit(1);
});
