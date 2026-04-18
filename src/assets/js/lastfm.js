(function () {
  "use strict";

  async function initLastFm() {
    const widget = document.getElementById("lastfm-widget");
    if (!widget) return;

    const apiKey = widget.dataset.lastfmKey;
    if (!apiKey) {
      widget.hidden = true;
      return;
    }

    const url =
      "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks" +
      "&user=wagnerbeethoven&limit=6" +
      "&api_key=" + encodeURIComponent(apiKey) +
      "&format=json";

    try {
      const res = await fetch(url);
      if (!res.ok) { widget.hidden = true; return; }

      const data = await res.json();
      const tracks = data && data.recenttracks && data.recenttracks.track;
      if (!tracks || !tracks.length) { widget.hidden = true; return; }

      const list = Array.isArray(tracks) ? tracks : [tracks];
      const nowPlaying = list.find(t => t["@attr"] && t["@attr"].nowplaying === "true");

      if (nowPlaying) {
        const img = getImg(nowPlaying, "medium");
        widget.innerHTML =
          '<div class="lfm-now">' +
            (img ? '<img src="' + e(img) + '" alt="" width="56" height="56" class="lfm-art" loading="lazy" aria-hidden="true">' : '<div class="lfm-art lfm-art--empty"><i class="fa-solid fa-music" aria-hidden="true"></i></div>') +
            '<div class="lfm-now-info">' +
              '<span class="lfm-badge"><i class="fa-solid fa-wave-square" aria-hidden="true"></i> Ouvindo agora</span>' +
              '<strong class="lfm-track-name">' + e(nowPlaying.name) + '</strong>' +
              '<span class="lfm-track-artist">' + e(nowPlaying.artist && nowPlaying.artist["#text"]) + '</span>' +
            '</div>' +
          '</div>';
      } else {
        const rows = list.slice(0, 6).map(function (t) {
          const img = getImg(t, "small");
          const date = t.date && t.date["#text"] ? t.date["#text"] : "";
          return '<div class="lfm-track">' +
            (img ? '<img src="' + e(img) + '" alt="" width="40" height="40" class="lfm-art lfm-art--sm" loading="lazy" aria-hidden="true">' : '<div class="lfm-art lfm-art--sm lfm-art--empty"><i class="fa-solid fa-music" aria-hidden="true"></i></div>') +
            '<div class="lfm-track-info">' +
              '<span class="lfm-track-name">' + e(t.name) + '</span>' +
              '<span class="lfm-track-artist">' + e(t.artist && t.artist["#text"]) + '</span>' +
            '</div>' +
            (date ? '<time class="lfm-track-date">' + e(date.replace(", ", "\n")) + '</time>' : '') +
          '</div>';
        }).join("");
        widget.innerHTML = '<div class="lfm-list">' + rows + '</div>';
      }
    } catch (_) {
      widget.hidden = true;
    }
  }

  function getImg(track, size) {
    const images = (track && track.image) || [];
    const found = images.find(i => i.size === size);
    return found && found["#text"] ? found["#text"] : "";
  }

  function e(str) {
    return String(str || "")
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLastFm);
  } else {
    initLastFm();
  }
})();
