#!/usr/bin/env node
/**
 * sync-pixelfed.js — importa fotos do Pixelfed como entradas em src/photos/
 *
 * Uso:
 *   node scripts/content/sync-pixelfed.js
 *
 * Variáveis de ambiente (.env ou export):
 *   PIXELFED_INSTANCE — URL da instância, ex: https://pixelfed.com
 *   PIXELFED_TOKEN    — token de acesso OAuth (Settings → Applications)
 *   PIXELFED_HANDLE   — username, ex: wagnerbeethoven
 */

"use strict";

const fs   = require("fs");
const path = require("path");

// ── Config ────────────────────────────────────────────────────────────────────

const SITE_JSON  = path.join(__dirname, "..", "..", "src", "_data", "site.json");
const PHOTOS_DIR = path.join(__dirname, "..", "..", "src", "photos");
const MAX_POSTS  = 500;

// Carrega .env da raiz (silencioso se não existir)
try {
  const envPath = path.join(__dirname, "..", "..", ".env");
  if (fs.existsSync(envPath)) {
    fs.readFileSync(envPath, "utf8").split("\n").forEach(line => {
      const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
    });
  }
} catch { /* ignora */ }

// ── Terminal helpers ──────────────────────────────────────────────────────────

const R = "\x1b[0m", GREEN = "\x1b[32m", YELLOW = "\x1b[33m", RED = "\x1b[31m", CYAN = "\x1b[36m";
const ok   = m => console.log(`${GREEN}✔${R} ${m}`);
const warn = m => console.log(`${YELLOW}⚠${R}  ${m}`);
const fail = m => { console.error(`${RED}✖${R} ${m}`); process.exit(1); };
const info = m => console.log(`${CYAN}→${R} ${m}`);

// ── Helpers ───────────────────────────────────────────────────────────────────

function slug(str) {
  return str.toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function stripHtml(html) {
  return (html || "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, " ")
    .trim();
}

function toDateSlug(iso) {
  return new Date(iso).toISOString().slice(0, 10);
}

/** IDs já importados — lê campo pixelfed_id de todos os .md em src/photos/ */
function getExistingIds() {
  const ids = new Set();
  if (!fs.existsSync(PHOTOS_DIR)) return ids;
  for (const file of fs.readdirSync(PHOTOS_DIR)) {
    if (!file.endsWith(".md")) continue;
    const content = fs.readFileSync(path.join(PHOTOS_DIR, file), "utf8");
    const m = content.match(/^pixelfed_id:\s*["']?([^\s"']+)["']?\s*$/m);
    if (m) ids.add(m[1].trim());
  }
  return ids;
}

async function fetchOpenAIAlt(imageUrl) {
  const key = process.env.OPENAI_KEY;
  if (!key || !imageUrl) return "";
  try {
    info("Alt vazio — gerando descrição via OpenAI Vision...");
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${key}` },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{
          role: "user",
          content: [
            { type: "text", text: "Descreva esta imagem em uma frase curta em português, adequada para texto alternativo de acessibilidade (atributo alt). Seja objetivo e factual." },
            { type: "image_url", image_url: { url: imageUrl } },
          ],
        }],
        max_tokens: 120,
      }),
    });
    if (!res.ok) return "";
    const d = await res.json();
    return d.choices?.[0]?.message?.content?.trim() || "";
  } catch { return ""; }
}

async function fetchJson(url, token) {
  const res = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} em ${url}`);
  return res.json();
}

/** Busca o account ID a partir do handle */
async function resolveAccountId(instance, token, handle) {
  const data = await fetchJson(
    `${instance}/api/v1/accounts/lookup?acct=${handle}`,
    token
  );
  if (!data.id) throw new Error(`Conta não encontrada: ${handle}`);
  return data.id;
}

/** Busca todos os statuses com mídia, paginando */
async function fetchAllStatuses(instance, token, accountId) {
  const statuses = [];
  let maxId = null;

  while (statuses.length < MAX_POSTS) {
    const params = new URLSearchParams({ only_media: "true", limit: "40" });
    if (maxId) params.set("max_id", maxId);

    const batch = await fetchJson(
      `${instance}/api/v1/accounts/${accountId}/statuses?${params}`,
      token
    );
    if (!batch.length) break;

    statuses.push(...batch);
    maxId = batch[batch.length - 1].id;

    if (batch.length < 40) break;
  }

  return statuses;
}

function buildFrontmatter(status, instance, handle) {
  const dateSlug  = toDateSlug(status.created_at);
  const caption   = stripHtml(status.content);
  const media     = status.media_attachments?.[0] ?? {};
  const image     = media.url ?? "";
  const alt       = media.description ?? "";
  const location  = status.place?.name ?? "";
  const postUrl   = status.url ?? `${instance}/@${handle}/${status.id}`;

  // Primeira linha da legenda como título (até 80 chars)
  const title = caption.length > 0 && caption.length <= 80
    ? caption
    : caption.slice(0, 77).trimEnd() + (caption.length > 77 ? "…" : "") || `Foto de ${dateSlug}`;

  const body = "";

  const lines = ["---"];
  lines.push(`title: ${JSON.stringify(title)}`);
  lines.push(`date: ${dateSlug}`);
  lines.push(`image: ${JSON.stringify(image)}`);
  if (alt)      lines.push(`alt: ${JSON.stringify(alt)}`);
  if (location) lines.push(`location: ${JSON.stringify(location)}`);
  lines.push(`caption: ${JSON.stringify(title)}`);
  lines.push(`camera: ""`);
  lines.push(`lens: ""`);
  lines.push("tags: [photos]");
  lines.push(`pixelfed_id: "${status.id}"`);
  lines.push(`pixelfed_url: ${JSON.stringify(postUrl)}`);
  lines.push("---");

  return { frontmatter: lines.join("\n"), body };
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const INSTANCE = (process.env.PIXELFED_INSTANCE || "").replace(/\/$/, "");
  const TOKEN    = process.env.PIXELFED_TOKEN || "";
  const HANDLE   = process.env.PIXELFED_HANDLE || (() => {
    try { return JSON.parse(fs.readFileSync(SITE_JSON, "utf8")).social?.pixelfed ?? ""; } catch { return ""; }
  })();

  if (!INSTANCE) fail("PIXELFED_INSTANCE não definido. Ex: https://pixelfed.com");
  if (!TOKEN)    fail("PIXELFED_TOKEN não definido. Gere em Settings → Applications.");
  if (!HANDLE)   fail("PIXELFED_HANDLE não definido.");

  console.log(`\n📷 Sincronizando fotos de @${HANDLE} em ${INSTANCE}\n`);

  fs.mkdirSync(PHOTOS_DIR, { recursive: true });

  const existingIds = getExistingIds();
  info(`${existingIds.size} foto(s) já sincronizada(s)`);

  let accountId;
  try {
    accountId = await resolveAccountId(INSTANCE, TOKEN, HANDLE);
  } catch (e) {
    fail(`Erro ao resolver conta: ${e.message}`);
  }

  let statuses;
  try {
    statuses = await fetchAllStatuses(INSTANCE, TOKEN, accountId);
  } catch (e) {
    fail(`Erro ao buscar posts: ${e.message}`);
  }

  info(`${statuses.length} post(s) com mídia encontrado(s)\n`);

  let created = 0;
  let skipped = 0;

  for (const status of statuses) {
    if (!status.media_attachments?.length) { skipped++; continue; }
    if (existingIds.has(status.id)) { skipped++; continue; }

    const dateSlug = toDateSlug(status.created_at);
    const filename = `${dateSlug}-pixelfed-${status.id}.md`;
    const filepath = path.join(PHOTOS_DIR, filename);

    if (fs.existsSync(filepath)) { warn(`Já existe: ${filename}`); skipped++; continue; }

    const media0 = status.media_attachments?.[0] ?? {};
    if (!media0.description && media0.url) {
      media0.description = await fetchOpenAIAlt(media0.url);
    }
    const { frontmatter, body } = buildFrontmatter(status, INSTANCE, HANDLE);
    fs.writeFileSync(filepath, `${frontmatter}\n\n${body}\n`, "utf8");
    ok(`criado: ${filename}`);
    created++;
  }

  console.log(`\n${created} foto(s) nova(s) criada(s), ${skipped} já existente(s).\n`);
}

main().catch(e => { fail(e.message); });
