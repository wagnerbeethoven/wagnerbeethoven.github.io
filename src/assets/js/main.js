(function () {
  const root = document.documentElement;

  const bar = document.getElementById("progress-bar");
  const darkToggle = document.getElementById("dark-toggle");
  const fontInc = document.getElementById("font-inc");
  const fontDec = document.getElementById("font-dec");
  const contrastToggle = document.getElementById("contrast-toggle");
  const motionToggle = document.getElementById("motion-toggle");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  function updateProgress() {
    if (!bar) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = progress + "%";
  }

  function setThemeLabel(isDark) {
    if (!darkToggle) return;
    darkToggle.innerHTML = isDark
      ? '<i class="fa-solid fa-sun" aria-hidden="true"></i> <span>Tema claro</span>'
      : '<i class="fa-solid fa-moon" aria-hidden="true"></i> <span>Tema escuro</span>';
    darkToggle.setAttribute("aria-pressed", isDark ? "true" : "false");
    darkToggle.setAttribute("aria-label", isDark ? "Ativar tema claro" : "Ativar tema escuro");
  }

  function applyTheme(isDark) {
    root.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
    setThemeLabel(isDark);
  }

  function applyAccessibility() {
    const size = parseFloat(localStorage.getItem("fontScale") || "1");
    const highContrast = localStorage.getItem("highContrast") === "1";
    const reduceMotion = localStorage.getItem("reduceMotion") === "1";

    root.style.setProperty("font-size", size * 100 + "%");
    root.classList.toggle("contrast", highContrast);
    root.classList.toggle("reduce-motion", reduceMotion);

    if (contrastToggle) {
      contrastToggle.innerHTML = highContrast
        ? '<i class="fa-solid fa-circle-half-stroke" aria-hidden="true"></i> <span>Contraste normal</span>'
        : '<i class="fa-solid fa-circle-half-stroke" aria-hidden="true"></i> <span>Mais contraste</span>';
      contrastToggle.setAttribute("aria-pressed", highContrast ? "true" : "false");
    }

    if (motionToggle) {
      motionToggle.innerHTML = reduceMotion
        ? '<i class="fa-solid fa-wind" aria-hidden="true"></i> <span>Movimento normal</span>'
        : '<i class="fa-solid fa-wind" aria-hidden="true"></i> <span>Reduzir movimento</span>';
      motionToggle.setAttribute("aria-pressed", reduceMotion ? "true" : "false");
    }
  }

  const savedTheme = localStorage.getItem("theme");
  applyTheme(savedTheme ? savedTheme === "dark" : prefersDark.matches);
  applyAccessibility();
  updateProgress();

  // Sidebar toggle (desktop)
  const sidebarToggle = document.getElementById("sidebar-toggle");

  function setSidebarToggleState(isCollapsed) {
    if (!sidebarToggle) return;
    sidebarToggle.innerHTML = isCollapsed
      ? '<i class="fa-solid fa-angles-right" aria-hidden="true"></i><span class="sidebar-toggle-label">Expandir</span>'
      : '<i class="fa-solid fa-angles-left" aria-hidden="true"></i><span class="sidebar-toggle-label">Recolher</span>';
    sidebarToggle.setAttribute("aria-expanded", isCollapsed ? "false" : "true");
    sidebarToggle.setAttribute("aria-label", isCollapsed ? "Expandir menu" : "Recolher menu");
  }

  if (sidebarToggle) {
    const collapsed = localStorage.getItem("sidebarCollapsed") === "1";
    if (collapsed) {
      document.body.classList.add("sidebar-collapsed");
    }
    setSidebarToggleState(collapsed);
    sidebarToggle.addEventListener("click", function () {
      const isCollapsed = document.body.classList.toggle("sidebar-collapsed");
      localStorage.setItem("sidebarCollapsed", isCollapsed ? "1" : "0");
      setSidebarToggleState(isCollapsed);
    });
  }

  window.addEventListener("scroll", updateProgress, { passive: true });

  if (darkToggle) {
    darkToggle.addEventListener("click", function () {
      applyTheme(!root.classList.contains("dark"));
    });
  }

  if (fontInc) {
    fontInc.addEventListener("click", function () {
      const size = Math.min(1.5, parseFloat(localStorage.getItem("fontScale") || "1") + 0.1);
      localStorage.setItem("fontScale", String(size));
      applyAccessibility();
    });
  }

  if (fontDec) {
    fontDec.addEventListener("click", function () {
      const size = Math.max(0.8, parseFloat(localStorage.getItem("fontScale") || "1") - 0.1);
      localStorage.setItem("fontScale", String(size));
      applyAccessibility();
    });
  }

  const fontReset = document.getElementById("font-reset");
  if (fontReset) {
    fontReset.addEventListener("click", function () {
      localStorage.setItem("fontScale", "1");
      applyAccessibility();
    });
  }

  const resetAll = document.getElementById("reset-all");
  if (resetAll) {
    resetAll.addEventListener("click", function () {
      localStorage.removeItem("theme");
      localStorage.removeItem("fontScale");
      localStorage.removeItem("highContrast");
      localStorage.removeItem("reduceMotion");
      applyTheme(prefersDark.matches);
      applyAccessibility();
    });
  }

  if (contrastToggle) {
    contrastToggle.addEventListener("click", function () {
      const next = localStorage.getItem("highContrast") === "1" ? "0" : "1";
      localStorage.setItem("highContrast", next);
      applyAccessibility();
    });
  }

  if (motionToggle) {
    motionToggle.addEventListener("click", function () {
      const next = localStorage.getItem("reduceMotion") === "1" ? "0" : "1";
      localStorage.setItem("reduceMotion", next);
      applyAccessibility();
    });
  }

  // keydown handled at bottom (lightbox)

  // Mobile sidebar
  const hamburger = document.getElementById("hamburger");
  const sidebar = document.querySelector(".site-sidebar");
  const overlay = document.querySelector(".sidebar-overlay");

  function openSidebar() {
    if (!sidebar) return;
    sidebar.classList.add("sidebar-open");
    if (hamburger) { hamburger.classList.add("open"); hamburger.setAttribute("aria-expanded", "true"); }
    if (overlay) overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeSidebar() {
    if (!sidebar) return;
    sidebar.classList.remove("sidebar-open");
    if (hamburger) { hamburger.classList.remove("open"); hamburger.setAttribute("aria-expanded", "false"); }
    if (overlay) overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      sidebar && sidebar.classList.contains("sidebar-open") ? closeSidebar() : openSidebar();
    });
  }

  if (overlay) overlay.addEventListener("click", closeSidebar);

  if (sidebar) {
    sidebar.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.innerWidth <= 980) closeSidebar();
      });
    });
  }

  // Lightbox
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxBackdrop = document.getElementById("lightbox-backdrop");
  const lightboxCloseBtn = document.getElementById("lightbox-close-btn");

  var _lightboxTrigger = null;

  function openLightbox(src, alt, caption, trigger) {
    if (!lightbox || !lightboxImg) return;
    _lightboxTrigger = trigger || document.activeElement;
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    if (lightboxCaption) lightboxCaption.textContent = caption || alt || "";
    lightbox.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    if (lightboxCloseBtn) lightboxCloseBtn.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.add("hidden");
    document.body.style.overflow = "";
    if (lightboxImg) lightboxImg.src = "";
    if (_lightboxTrigger) { _lightboxTrigger.focus(); _lightboxTrigger = null; }
  }

  // Focus trap inside lightbox
  if (lightbox) {
    lightbox.addEventListener("keydown", function (e) {
      if (e.key !== "Tab") return;
      var focusable = Array.from(lightbox.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )).filter(function (el) { return !el.disabled; });
      if (!focusable.length) { e.preventDefault(); return; }
      var first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  document.querySelectorAll("[data-lightbox]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      openLightbox(el.dataset.lightbox, el.dataset.alt, el.dataset.caption, el);
    });
  });

  if (lightboxBackdrop) lightboxBackdrop.addEventListener("click", closeLightbox);
  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lightbox && !lightbox.classList.contains("hidden")) { closeLightbox(); }
  });

  // External link icons
  var skipSelectors = [
    ".stream-link",
    ".resume-link-card",
    ".uses-card-link",
    ".sidebar-link",
    ".sidebar-search-link",
    ".sidebar-button",
    ".resume-site-btn",
    ".a11y-btn",
    ".pill",
    ".editorial-back",
    ".topbar-search-btn",
    ".share-icon-btn",
    ".share-chip",
    ".site-footer-webrings",
    ".site-footer-copy",
    ".media-stream-btn",
    "[data-no-ext-icon]"
  ].join(",");

  document.querySelectorAll("a[target='_blank']").forEach(function (a) {
    if (a.closest(skipSelectors)) return;
    if (a.querySelector(".fa-arrow-up-right-from-square")) return;
    var icon = document.createElement("i");
    icon.className = "fa-solid fa-arrow-up-right-from-square ext-link-icon";
    icon.setAttribute("aria-hidden", "true");
    a.appendChild(icon);
  });

  // Share button (replaces inline onclick)
  document.querySelectorAll(".js-share-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var title = btn.dataset.shareTitle || document.title;
      var url   = btn.dataset.shareUrl   || location.href;
      if (navigator.share) {
        navigator.share({ title: title, url: url }).catch(function () {});
      } else {
        navigator.clipboard.writeText(url).then(function () {
          var label = btn.querySelector("span");
          if (label) { var orig = label.textContent; label.textContent = "Copiado!"; setTimeout(function () { label.textContent = orig; }, 2000); }
        }).catch(function () {});
      }
    });
  });

  // Media browser: grid/table + sorting
  function parseReleaseYear(raw) {
    var match = String(raw || "").match(/(19|20)\d{2}/);
    return match ? parseInt(match[0], 10) : -1;
  }

  function getStringValue(item, key) {
    return String(item.dataset[key] || "").toLocaleLowerCase("pt-BR");
  }

  function sortMediaItems(items, field, direction) {
    var copy = items.slice();
    copy.sort(function (a, b) {
      var titleA = getStringValue(a, "sortTitle");
      var titleB = getStringValue(b, "sortTitle");
      var indexA = Number(a.dataset.sortIndex || 0);
      var indexB = Number(b.dataset.sortIndex || 0);
      var multiplier = direction === "asc" ? 1 : -1;

      if (field === "title") {
        return (titleA.localeCompare(titleB, "pt-BR", { sensitivity: "base" }) * multiplier) || indexA - indexB;
      }

      var yearA = parseReleaseYear(a.dataset.sortYear);
      var yearB = parseReleaseYear(b.dataset.sortYear);
      return ((yearA - yearB) * multiplier)
        || (titleA.localeCompare(titleB, "pt-BR", { sensitivity: "base" }) * multiplier)
        || indexA - indexB;
    });
    return copy;
  }

  document.querySelectorAll("[data-media-browser]").forEach(function (browser) {
    var paginationMode = browser.dataset.paginationMode || "client";
    var storageKey = browser.dataset.storageKey || "media-browser";
    var list = browser.querySelector("[data-media-list]");
    var viewButtons = Array.from(browser.querySelectorAll("[data-view-toggle]"));
    var sortFieldButtons = Array.from(browser.querySelectorAll("[data-sort-field]"));
    var sortDirectionToggle = browser.querySelector("[data-sort-direction-toggle]");
    var pagination = browser.querySelector("[data-media-pagination]");
    var pageList = browser.querySelector("[data-page-list]");
    var prevButton = browser.querySelector("[data-page-nav='prev']");
    var nextButton = browser.querySelector("[data-page-nav='next']");
    if (!list || !sortFieldButtons.length || !sortDirectionToggle || !viewButtons.length) return;

    var defaultView = browser.dataset.defaultView || "table";
    var defaultSortField = browser.dataset.defaultSortField || "release";
    var defaultSortDirection = browser.dataset.defaultSortDirection || "desc";
    var pageSize = Math.max(1, Number(browser.dataset.pageSize || 25));
    var viewKey = "media-view:" + storageKey;
    var sortFieldKey = "media-sort-field:" + storageKey;
    var sortDirectionKey = "media-sort-direction:" + storageKey;
    var pageKey = "media-page:" + storageKey;
    var currentPage = 1;

    function applyView(view) {
      browser.dataset.view = view;
      viewButtons.forEach(function (button) {
        var active = button.dataset.viewToggle === view;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", active ? "true" : "false");
      });
      localStorage.setItem(viewKey, view);
    }

    function renderPagination(totalPages) {
      if (!pagination || !pageList || !prevButton || !nextButton) return;
      pagination.hidden = totalPages <= 1;
      pageList.innerHTML = "";

      function addPageButton(page) {
        var button = document.createElement("button");
        button.type = "button";
        button.className = "media-browser-page-btn" + (page === currentPage ? " is-active" : "");
        button.dataset.page = String(page);
        button.setAttribute("aria-label", "Ir para página " + page);
        button.setAttribute("aria-current", page === currentPage ? "page" : "false");
        button.textContent = String(page);
        pageList.appendChild(button);
      }

      function addEllipsis() {
        var span = document.createElement("span");
        span.className = "media-browser-page-ellipsis";
        span.textContent = "…";
        pageList.appendChild(span);
      }

      if (totalPages <= 7) {
        for (var page = 1; page <= totalPages; page += 1) addPageButton(page);
      } else {
        addPageButton(1);
        if (currentPage > 3) addEllipsis();
        for (var middle = Math.max(2, currentPage - 1); middle <= Math.min(totalPages - 1, currentPage + 1); middle += 1) {
          addPageButton(middle);
        }
        if (currentPage < totalPages - 2) addEllipsis();
        addPageButton(totalPages);
      }

      prevButton.disabled = currentPage <= 1;
      nextButton.disabled = currentPage >= totalPages;
    }

    function applyPagination() {
      var items = Array.from(list.querySelectorAll("[data-media-item]"));
      if (paginationMode === "server") {
        items.forEach(function (item) {
          item.hidden = false;
        });
        return;
      }
      var totalPages = Math.max(1, Math.ceil(items.length / pageSize));
      if (currentPage > totalPages) currentPage = totalPages;
      var start = (currentPage - 1) * pageSize;
      var end = start + pageSize;
      items.forEach(function (item, index) {
        item.hidden = index < start || index >= end;
      });
      renderPagination(totalPages);
      localStorage.setItem(pageKey, String(currentPage));
    }

    function applySort(field, direction, preservePage) {
      var items = Array.from(list.querySelectorAll("[data-media-item]"));
      sortMediaItems(items, field, direction).forEach(function (item) {
        list.appendChild(item);
      });
      sortFieldButtons.forEach(function (button) {
        var active = button.dataset.sortField === field;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", active ? "true" : "false");
      });
      sortDirectionToggle.dataset.direction = direction;
      sortDirectionToggle.classList.toggle("is-active", direction === "desc");
      sortDirectionToggle.setAttribute("aria-pressed", direction === "desc" ? "true" : "false");
      sortDirectionToggle.title = direction === "desc" ? "Ordem decrescente" : "Ordem crescente";
      var icon = sortDirectionToggle.querySelector("i");
      if (icon) {
        icon.className = direction === "desc"
          ? "fa-solid fa-arrow-down-wide-short"
          : "fa-solid fa-arrow-up-short-wide";
      }
      localStorage.setItem(sortFieldKey, field);
      localStorage.setItem(sortDirectionKey, direction);
      if (!preservePage && paginationMode !== "server") currentPage = 1;
      applyPagination();
    }

    viewButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        applyView(button.dataset.viewToggle || defaultView);
      });
    });

    sortFieldButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var activeDirection = localStorage.getItem(sortDirectionKey) || defaultSortDirection;
        applySort(button.dataset.sortField || defaultSortField, activeDirection);
      });
    });

    sortDirectionToggle.addEventListener("click", function () {
      var activeField = localStorage.getItem(sortFieldKey) || defaultSortField;
      var nextDirection = (localStorage.getItem(sortDirectionKey) || defaultSortDirection) === "desc" ? "asc" : "desc";
      applySort(activeField, nextDirection);
    });

    if (pageList) {
      pageList.addEventListener("click", function (event) {
        var target = event.target.closest("[data-page]");
        if (!target) return;
        currentPage = Number(target.dataset.page || 1);
        applyPagination();
      });
    }

    if (prevButton) {
      prevButton.addEventListener("click", function () {
        currentPage = Math.max(1, currentPage - 1);
        applyPagination();
      });
    }

    if (nextButton) {
      nextButton.addEventListener("click", function () {
        var totalPages = Math.max(1, Math.ceil(list.querySelectorAll("[data-media-item]").length / pageSize));
        currentPage = Math.min(totalPages, currentPage + 1);
        applyPagination();
      });
    }

    var initialView = localStorage.getItem(viewKey) || defaultView;
    var initialSortField = localStorage.getItem(sortFieldKey) || defaultSortField;
    var initialSortDirection = localStorage.getItem(sortDirectionKey) || defaultSortDirection;
    currentPage = paginationMode === "server" ? 1 : Math.max(1, Number(localStorage.getItem(pageKey) || 1));
    applyView(initialView);
    applySort(initialSortField, initialSortDirection, true);
  });
})();
