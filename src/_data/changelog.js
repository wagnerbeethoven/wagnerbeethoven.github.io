const { execSync } = require("child_process");

module.exports = function () {
  try {
    const raw = execSync(
      'git log --format="%H|||%ad|||%s" --date=short -120',
      { encoding: "utf8" }
    ).trim();

    if (!raw) return { commits: [], byMonth: [] };

    const commits = raw
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        const parts = line.split("|||");
        const hash = (parts[0] || "").slice(0, 7);
        const date = parts[1] || "";
        const message = parts[2] || "";
        return { hash, date, message };
      });

    const monthMap = new Map();
    commits.forEach((c) => {
      const key = c.date.slice(0, 7); // "2026-04"
      if (!monthMap.has(key)) {
        const [year, month] = key.split("-");
        const label = new Date(Number(year), Number(month) - 1, 1)
          .toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
        monthMap.set(key, { key, label, commits: [] });
      }
      monthMap.get(key).commits.push(c);
    });

    return {
      commits,
      byMonth: Array.from(monthMap.values()),
    };
  } catch {
    return { commits: [], byMonth: [] };
  }
};
