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
})();
