const fs   = require("fs");
const path = require("path");

function readMdFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((e) => {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) return readMdFiles(full);
    if (e.name.endsWith(".md")) return [full];
    return [];
  });
}

function stripFrontmatter(content) {
  return content.replace(/^---[\s\S]*?---\n?/, "");
}

function countWords(text) {
  return text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]+`/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/#{1,6}\s+/g, "")
    .replace(/[*_~>/]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter((w) => w.length > 0).length;
}

module.exports = function () {
  const blogDir = path.join(__dirname, "../blog");
  const files = readMdFiles(blogDir);

  let totalWords = 0;
  files.forEach((file) => {
    const body = stripFrontmatter(fs.readFileSync(file, "utf8"));
    totalWords += countWords(body);
  });

  const postCount = files.length;
  const avg = postCount > 0 ? Math.round(totalWords / postCount) : 0;

  return {
    totalWords,
    totalWordsFormatted: totalWords.toLocaleString("pt-BR"),
    averageWordsPerPost: avg.toLocaleString("pt-BR"),
  };
};
