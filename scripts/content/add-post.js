#!/usr/bin/env node
/**
 * add-post.js — cria rascunho de post no blog
 *
 * Uso:
 *   node scripts/content/add-post.js "Título do post"
 *   node scripts/content/add-post.js "Título do post" "tag1,tag2,tag3"
 *   npm run add:post "Título do post"
 *   npm run add:post "Título do post" "design,acessibilidade"
 */

const fs   = require("fs");
const path = require("path");

const R = "\x1b[0m", GREEN = "\x1b[32m", YELLOW = "\x1b[33m", RED = "\x1b[31m", CYAN = "\x1b[36m";
const ok   = m => console.log(`${GREEN}✔${R} ${m}`);
const err  = m => { console.error(`${RED}✖${R} ${m}`); process.exit(1); };
const info = m => console.log(`${CYAN}→${R} ${m}`);

function slug(str) {
  return str.toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const title = process.argv[2];
if (!title) err('Informe o título. Ex: node scripts/content/add-post.js "Meu post"');

const rawTags = process.argv[3] || "";
const tags = rawTags
  ? rawTags.split(",").map(t => t.trim()).filter(Boolean)
  : [];

const now    = new Date();
const year   = now.getFullYear();
const month  = String(now.getMonth() + 1).padStart(2, "0");
const day    = String(now.getDate()).padStart(2, "0");
const date   = `${year}-${month}-${day}`;
const fileSlug = slug(title);
const filename = `${date}-${fileSlug}.md`;

const dir = path.join(__dirname, "..", "..", "src", "blog", String(year), month);
fs.mkdirSync(dir, { recursive: true });

const filepath = path.join(dir, filename);
if (fs.existsSync(filepath)) err(`Arquivo já existe: ${filepath}`);

const tagsYaml = tags.length ? `[${tags.join(", ")}]` : "[]";

const content = `---
title: "${title}"
date: ${date}
tags: ${tagsYaml}
location: ""
weather: ""
---

`;

fs.writeFileSync(filepath, content, "utf8");

ok(`Post criado: src/blog/${year}/${month}/${filename}`);
info(`Abra o arquivo e escreva. Campos opcionais: location, weather.`);
