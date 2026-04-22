const slashPages = require("./slashPages.json");

module.exports = slashPages.reduce((pages, group) => {
  (group.items || []).forEach((item) => {
    pages[item.url] = {
      group: group.group,
      ...item,
    };
  });

  return pages;
}, {});
