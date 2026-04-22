# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development (Tailwind watch + Eleventy serve on :8080)
npm run dev

# Production build (icons → assets → CSS minified → Eleventy)
npm run build

# CSS only (dev)
npm run dev:css    # tailwind watch: src/assets/css/tailwind.css → build.css

# Content scripts
node scripts/sync-bluesky.js           # Import Bluesky posts as notes to src/notes/
node scripts/add-content.js movie "Title"   # Fetch TMDB metadata + create md file
node scripts/add-content.js series|game|book|comic|music "Title"
```

## Architecture

Eleventy 3.x static site. Nunjucks templates. Tailwind CSS (pre-compiled, NOT JIT from directives).

**CSS pipeline:** `src/assets/css/tailwind.css` → PostCSS (tailwindcss + autoprefixer) → `src/assets/css/build.css`. `tailwind.css` is the source file — append custom CSS there directly. `custom.css` exists but is empty.

**Templates:** `src/_includes/layouts/` has one layout per content type (base, post, note, poem, recipe, movie, book, game, comic, serie, album, photo). All extend `base.njk`. Partials in `src/_includes/partials/`.

**Collections defined in `.eleventy.js`:**
- `posts`, `notes`, `poetry`, `recipes` — sorted by date DESC
- `movies`, `series`, `games`, `bookshelf`, `comics`, `music` — sorted alphabetically (pt-BR)
- `tagList`, `tagMeta` — derived from blog/notes/poetry/recipes tags
- `archiveTree` — year/month hierarchy; uses `item.rawInput` (NOT `item.templateContent`) to extract 140-char excerpts to avoid `TemplateContentPrematureUseError`
- `searchIndex` — FlexSearch documents for client-side search

**Custom filters (all use Luxon for dates):**
- `readableDate(format?)` — pt-BR locale, default `"LLLL dd, yyyy"`
- `htmlDateString` — ISO `yyyy-LL-dd` for `<time datetime>`
- `shortDate` — `dd/LL/yy`
- `rssDate` — RFC 2822 for feeds
- `gitLastModified` — git commit date, falls back to file mtime
- `relativeDate` — "hoje" / "há X dias" / "dd/LL/yyyy"
- `readingTime` — minutes at 200 wpm
- `tagColor` — deterministic HSL from tag hash, checks `tagColors.json` first
- `head(n)` — array slice
- `htmlToAbsoluteUrls(base)` — rewrites relative href/src

**Global data files (`src/_data/`):**
- `site.json` — author, URL, social, bio, timezone (America/Fortaleza), webrings, analytics
- `slashPages.json` — page groups with icons/descriptions, flattened by `pageMeta.js` into URL lookup
- `tagColors.json` — explicit tag→color map (fallback: hash)
- `buildInfo.js` — build year + ISO timestamp
- `changelog.js`, `guestbook.json` — minor

**Environment variables** (manual `.env` parsing in `.eleventy.js`, no dotenv package):
- `TMDB_KEY`, `TMDB_TOKEN` — movies/series
- `LASTFM_KEY`, `LASTFM_SECRET` — music
- `RAWG_KEY` — games (optional)
- `YOUTUBE_KEY` — music search

## Key Patterns & Gotchas

**Never use `item.templateContent` inside collection builders** — causes `TemplateContentPrematureUseError` in Eleventy v3. Use `item.rawInput` and strip frontmatter + markdown with regex.

**Feed files** (`src/feed.xml`, `src/rss.xml`, `src/atom.xml`, `src/feed.json`) must have `templateEngine: njk` in frontmatter since they are `.xml`/`.json` files that need Nunjucks processing.

**Bluesky notes frontmatter** includes `bluesky_uri`, `images[]` (with `thumb`/`alt`), `link_embed` (with `url`/`title`/`thumb`). Sync script stores full ISO datetime as `date` so `HH:mm` renders correctly.

**IndieWeb microformats** (h-card, h-entry, u-url, etc.) live on elements that are visually hidden with `.sr-only` (appended to `tailwind.css` — Tailwind does not generate this class automatically since the file uses pre-compiled CSS, not `@tailwind` directives).

**Poem cards** display as `título / autor — data`. Notes without title show `templateContent | striptags | truncate(100)` as the label.

**Restart required** after any `.eleventy.js` change (filter/collection additions). Hot reload does not pick up config changes.
