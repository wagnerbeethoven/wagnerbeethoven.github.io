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

  // Search modal
  const searchFab = document.getElementById("search-fab");
  const searchBtnTopbar = document.getElementById("search-btn-topbar");
  const searchModal = document.getElementById("search-modal");
  const searchModalBackdrop = document.getElementById("search-modal-backdrop");
  const searchClose = document.getElementById("search-close");

  function openSearchModal() {
    if (!searchModal) return;
    searchModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    const q = document.getElementById("q");
    if (q) setTimeout(() => q.focus(), 60);
  }

  function closeSearchModal() {
    if (!searchModal) return;
    searchModal.classList.add("hidden");
    document.body.style.overflow = "";
  }

  [searchFab, searchBtnTopbar].forEach(function(btn) {
    if (btn) btn.addEventListener("click", openSearchModal);
  });
  if (searchClose) searchClose.addEventListener("click", closeSearchModal);
  if (searchModalBackdrop) searchModalBackdrop.addEventListener("click", closeSearchModal);

  // keydown handled at bottom (lightbox + search)

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

  function openLightbox(src, alt, caption) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    if (lightboxCaption) lightboxCaption.textContent = caption || alt || "";
    lightbox.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.add("hidden");
    document.body.style.overflow = "";
    if (lightboxImg) lightboxImg.src = "";
  }

  document.querySelectorAll("[data-lightbox]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      openLightbox(el.dataset.lightbox, el.dataset.alt, el.dataset.caption);
    });
  });

  if (lightboxBackdrop) lightboxBackdrop.addEventListener("click", closeLightbox);
  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeLightbox(); closeSearchModal(); }
    if ((e.ctrlKey || e.metaKey) && e.key === "k") { e.preventDefault(); openSearchModal(); }
  });
})();
