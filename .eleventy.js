const { DateTime } = require("luxon");
const tagColors = require("./src/_data/tagColors.json");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Load .env without dotenv dependency
try {
  const envPath = path.join(__dirname, ".env");
  if (fs.existsSync(envPath)) {
    fs.readFileSync(envPath, "utf8").split("\n").forEach(line => {
      const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*([^#]*)/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
    });
  }
} catch { /* ignore */ }

module.exports = function(eleventyConfig) {
  // Expose env vars to templates (never commit values — only keys used at build time)
  eleventyConfig.addGlobalData("lastfmKey", () => process.env.LASTFM_KEY || "");
  // Filters
  // JSON stringify helper for Nunjucks (used by search.json)
  eleventyConfig.addFilter("json", (value, spaces = 0) => {
    try {
      return JSON.stringify(value, null, spaces);
    } catch {
      return "null";
    }
  });
  const toDateTime = (d) =>
    typeof d === "string"
      ? DateTime.fromISO(d, { zone: "utc" })
      : DateTime.fromJSDate(d, { zone: "utc" });

  eleventyConfig.addFilter("readableDate", (dateObj, format = "LLLL dd, yyyy") => {
    try {
      return toDateTime(dateObj).setLocale("pt-BR").toFormat(format);
    } catch {
      return "";
    }
  });

  // For use in datetime="..." attributes (YYYY-MM-DD)
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    try {
      return toDateTime(dateObj).toFormat("yyyy-LL-dd");
    } catch {
      return "";
    }
  });

  // Short date dd/mm/yy for compact displays
  eleventyConfig.addFilter("shortDate", (dateObj) => {
    try {
      return toDateTime(dateObj).toFormat("dd/LL/yy");
    } catch {
      return "";
    }
  });

  // Git last-modified date for a source file (falls back to fs mtime if git unavailable)
  eleventyConfig.addFilter("gitLastModified", (inputPath) => {
    try {
      const absPath = path.resolve(inputPath);
      const result = execSync(`git log -1 --format=%cI -- "${absPath}"`, {
        encoding: "utf8",
        stdio: ["pipe", "pipe", "ignore"],
      }).trim();
      if (result) return new Date(result);
    } catch { /* git unavailable */ }
    // fallback: file mtime
    try {
      return fs.statSync(path.resolve(inputPath)).mtime;
    } catch {
      return null;
    }
  });

  // Relative date: "há X dias/semanas/meses" for recent; dd/mm/yyyy for older
  eleventyConfig.addFilter("relativeDate", (dateObj) => {
    try {
      const dt = toDateTime(dateObj);
      const days = DateTime.now().diff(dt, "days").days;
      if (days < 1)   return "hoje";
      if (days < 2)   return "há 1 dia";
      if (days < 7)   return `há ${Math.floor(days)} dias`;
      if (days < 14)  return "há 1 semana";
      if (days < 30)  return `há ${Math.floor(days / 7)} semanas`;
      return dt.toFormat("dd/LL/yyyy");
    } catch {
      return "";
    }
  });

  // Approximate reading time in minutes
  eleventyConfig.addFilter("readingTime", (content) => {
    if (!content || typeof content !== "string") return 1;
    const words = (content.trim().match(/\S+/g) || []).length;
    const minutes = Math.ceil(words / 200);
    return Math.max(1, minutes);
  });

  // Map tag to color using src/_data/tagColors.json
  eleventyConfig.addFilter("tagColor", (tag) => {
    if (!tag) return "#6b7280";
    const key = String(tag).toLowerCase();
    if (tagColors[key]) return tagColors[key];
    // Deterministic color from tag text: hash -> HSL -> HEX
    const str = key;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
    }
    // Hue across full 360, with pleasant saturation/lightness
    const hue = hash % 360;
    const sat = 65;   // 0-100
    const light = 45; // 0-100
    // Convert HSL to HEX
    const h = hue / 360;
    const s = sat / 100;
    const l = light / 100;
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    let r, g, b;
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q; // standard HSL -> RGB conversion
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    const toHex = (x) => {
      const v = Math.round(x * 255);
      return (v < 16 ? "0" : "") + v.toString(16);
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  });

  // Return the first N items of an array (like Eleventy sample)
  eleventyConfig.addFilter("head", (arr, n) => {
    if (!Array.isArray(arr)) return arr;
    if (n < 0) {
      return arr.slice(n);
    }
    return arr.slice(0, n);
  });

  // Convert relative href/src URLs in HTML to absolute with base URL
  eleventyConfig.addFilter("htmlToAbsoluteUrls", (html, base) => {
    if (!html || !base) return html || "";
    const joinUrl = (b, p) => b.replace(/\/+$/, "") + "/" + String(p).replace(/^\/+/, "");
    return String(html).replace(/(href|src)="(\/[^"]*)"/g, (m, attr, url) => {
      return `${attr}="${joinUrl(base, url)}"`;
    });
  });

  // Passthrough copy for static assets (CSS, JS, images)
  // Copies from src/assets/* to _site/assets/*
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  // PWA assets: manifest and service worker to site root
  eleventyConfig.addPassthroughCopy({ "src/manifest.webmanifest": "manifest.webmanifest" });
  eleventyConfig.addPassthroughCopy({ "src/sw.js": "sw.js" });

  // Collections
  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/blog/**/*.md")
      .sort((a, b) => (a.date > b.date ? -1 : 1));
  });

  // Additional content collections
  eleventyConfig.addCollection("notes", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/notes/**/*.md")
      .sort((a, b) => (a.date > b.date ? -1 : 1));
  });

  eleventyConfig.addCollection("poetry", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/poetry/**/*.md")
      .sort((a, b) => (a.date > b.date ? -1 : 1));
  });

  eleventyConfig.addCollection("movies", (collectionApi) =>
    collectionApi.getFilteredByGlob("src/movies/**/*.md")
      .sort((a, b) => String(a.data.title).localeCompare(String(b.data.title), "pt-BR"))
  );

  eleventyConfig.addCollection("series", (collectionApi) =>
    collectionApi.getFilteredByGlob("src/series/**/*.md")
      .sort((a, b) => String(a.data.title).localeCompare(String(b.data.title), "pt-BR"))
  );

  eleventyConfig.addCollection("games", (collectionApi) =>
    collectionApi.getFilteredByGlob("src/games/**/*.md")
      .sort((a, b) => String(a.data.title).localeCompare(String(b.data.title), "pt-BR"))
  );

  eleventyConfig.addCollection("books", (collectionApi) =>
    collectionApi.getFilteredByGlob("src/bookshelf/**/*.md")
      .sort((a, b) => String(a.data.title).localeCompare(String(b.data.title), "pt-BR"))
  );

  eleventyConfig.addCollection("photos", (collectionApi) =>
    collectionApi.getFilteredByGlob("src/photos/**/*.md")
  );

  eleventyConfig.addCollection("comics", (collectionApi) =>
    collectionApi.getFilteredByGlob("src/comics/**/*.md")
      .sort((a, b) => String(a.data.title).localeCompare(String(b.data.title), "pt-BR"))
  );

  eleventyConfig.addCollection("recipes", (collectionApi) =>
    collectionApi.getFilteredByGlob("src/recipes/**/*.md")
      .sort((a, b) => String(a.data.title).localeCompare(String(b.data.title), "pt-BR"))
  );

  eleventyConfig.addCollection("music", (collectionApi) =>
    collectionApi.getFilteredByGlob("src/music/**/*.md")
      .sort((a, b) => (a.date > b.date ? -1 : 1))
  );

  // Unique list of tags used across posts
  eleventyConfig.addCollection("tagList", (collectionApi) => {
    const ignore = new Set(["all", "nav", "post", "posts"]);
    const seenSlugs = new Set();
    const list = [];
    const toSlug = (s) => String(s)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    collectionApi.getFilteredByGlob("src/blog/**/*.md").forEach((item) => {
      const t = item.data && item.data.tags;
      if (Array.isArray(t)) {
        t.forEach((tag) => {
          if (!tag || ignore.has(tag)) return;
          const slug = toSlug(tag);
          if (!slug || seenSlugs.has(slug)) return;
          seenSlugs.add(slug);
          list.push(tag);
        });
      }
    });
    return list.sort((a, b) => String(a).localeCompare(String(b)));
  });

  // Unique list of categories from posts
  eleventyConfig.addCollection("categoryList", (collectionApi) => {
    const cats = new Set();
    collectionApi.getFilteredByGlob("src/blog/**/*.md").forEach((item) => {
      const c = item.data && item.data.category;
      if (c) cats.add(c);
    });
    return Array.from(cats).sort((a, b) => a.localeCompare(b));
  });

  eleventyConfig.addCollection("tagMeta", (collectionApi) => {
    const tagMap = new Map();
    const globs = [
      "src/blog/**/*.md",
      "src/notes/**/*.md",
      "src/poetry/**/*.md",
      "src/recipes/**/*.md",
    ];
    collectionApi
      .getFilteredByGlob(globs)
      .sort((a, b) => (a.date > b.date ? -1 : 1))
      .forEach((item) => {
        const tags = Array.isArray(item.data?.tags) ? item.data.tags : [];
        tags.forEach((tag) => {
          if (!tag) return;
          if (!tagMap.has(tag)) tagMap.set(tag, { name: tag, count: 0, posts: [] });
          const entry = tagMap.get(tag);
          entry.count += 1;
          entry.posts.push(item);
        });
      });

    return Array.from(tagMap.values())
      .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
  });

  eleventyConfig.addCollection("archiveTree", (collectionApi) => {
    const toArchiveItem = (item, archiveType) => ({
      url: item.url,
      date: item.date,
      data: {
        ...(item.data || {}),
        archiveType,
      },
    });

    const archiveItems = [
      ...collectionApi.getFilteredByGlob("src/blog/**/*.md").map((item) => toArchiveItem(item, "Blog")),
      ...collectionApi.getFilteredByGlob("src/notes/**/*.md").map((item) => toArchiveItem(item, "Notas")),
      ...collectionApi.getFilteredByGlob("src/poetry/**/*.md").map((item) => toArchiveItem(item, "Poesias")),
      ...collectionApi.getFilteredByGlob("src/recipes/**/*.md").map((item) => toArchiveItem(item, "Receitas")),
    ].sort((a, b) => (a.date > b.date ? -1 : 1));

    const years = new Map();

    archiveItems.forEach((post) => {
      const dt = DateTime.fromJSDate(post.date, { zone: "utc" }).setLocale("pt-BR");
      const year = dt.toFormat("yyyy");
      const monthKey = dt.toFormat("MM");
      const monthLabel = dt.toFormat("LLL. yyyy");
      const monthUrl = `/archive/#${year}-${monthKey}`;

      if (!years.has(year)) {
        years.set(year, { year, count: 0, months: new Map() });
      }

      const yearGroup = years.get(year);
      yearGroup.count += 1;

      if (!yearGroup.months.has(monthKey)) {
        yearGroup.months.set(monthKey, {
          key: monthKey,
          label: monthLabel,
          url: monthUrl,
          count: 0,
          posts: [],
        });
      }

      const monthGroup = yearGroup.months.get(monthKey);
      monthGroup.count += 1;
      monthGroup.posts.push(post);
    });

    return Array.from(years.values()).map((group) => ({
      year: group.year,
      count: group.count,
      months: Array.from(group.months.values()),
    }));
  });

  // Search index: lightweight documents for FlexSearch (client-side)
  eleventyConfig.addCollection("searchIndex", (collectionApi) => {
    const posts = collectionApi
      .getFilteredByGlob("src/blog/**/*.md")
      .sort((a, b) => (a.date > b.date ? -1 : 1));

    return posts.map((p) => ({
      id: p.url,
      title: (p.data && p.data.title) || "",
      description: (p.data && p.data.description) || "",
      tags: Array.isArray(p.data?.tags) ? p.data.tags : [],
      // Avoid using templateContent here (not available during collection build in Eleventy v3)
      content: "",
      date: p.date,
    }));
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_includes",
      data: "_data"
    }
  };
};
