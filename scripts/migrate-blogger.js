// One-shot Blogger Atom → Eleventy markdown migration
// Usage: node scripts/migrate-blogger.js <feed.atom> <output-dir>
const fs = require('fs');
const path = require('path');

const atomPath = process.argv[2];
const outDir  = process.argv[3] || 'src/blog';

if (!atomPath) { console.error('Usage: node migrate-blogger.js <feed.atom> [output-dir]'); process.exit(1); }

const xml = fs.readFileSync(atomPath, 'utf-8');

function get(entry, tag) {
  const m = entry.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
  return m ? m[1].trim() : '';
}

function unescape(s) {
  return s
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&apos;/g, "'");
}

function slug(title) {
  return title.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

// Extract all <entry> blocks
const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(m => m[1]);

let count = 0;
for (const entry of entries) {
  const type = get(entry, 'blogger:type');
  if (type !== 'POST') continue;

  const title      = unescape(get(entry, 'title'));
  const published  = get(entry, 'published').split('T')[0];
  const rawContent = get(entry, 'content');
  const html       = unescape(rawContent);

  // Tags
  const tags = [...entry.matchAll(/term='([^']+)'/g)]
    .map(m => m[1])
    .filter(t => !t.startsWith('tag:blogger.com'))
    .map(t => t.toLowerCase());

  // Slug from <blogger:filename> or derived from title
  const fnMatch = entry.match(/<blogger:filename>\/\d+\/\d+\/([^<]+)\.html<\/blogger:filename>/);
  const fileSlug = fnMatch ? fnMatch[1] : slug(title);

  // Extract first image as banner
  const imgMatch = html.match(/<img[^>]+src="([^"]+)"/);
  const banner = imgMatch ? imgMatch[1] : '';

  // Build description from first <p> text
  const pMatch = html.match(/<p[^>]*>([\s\S]*?)<\/p>/);
  const descRaw = pMatch ? pMatch[1].replace(/<[^>]+>/g, '').trim().slice(0, 160) : '';

  const tagsYaml = tags.length ? `[${tags.join(', ')}]` : '[]';

  const fm = `---
title: "${title.replace(/"/g, '\\"')}"
date: ${published}
tags: ${tagsYaml}${banner ? `\nbanner: "${banner}"` : ''}${descRaw ? `\ndescription: "${descRaw.replace(/"/g, '\\"')}"` : ''}
---

`;

  const filePath = path.join(outDir, `${fileSlug}.md`);
  fs.writeFileSync(filePath, fm + html, 'utf-8');
  console.log(`✓ ${fileSlug}.md`);
  count++;
}

console.log(`\nMigrated ${count} posts → ${outDir}`);
