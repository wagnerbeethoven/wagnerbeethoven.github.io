// theme

;(function () {
  const htmlElement = document.querySelector("html")
  if (htmlElement.getAttribute("data-bs-theme") === 'auto') {
    function updateTheme() {
      document.querySelector("html").setAttribute("data-bs-theme",
      window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateTheme)
    updateTheme()
  }
})();

// toc
$(document).ready(function () {
  $('#toc').toc({ noBackToTopLinks: true });
});


// adiciona _blank e diversos
document.addEventListener("DOMContentLoaded", function() {
  const baseUrl = window.location.origin;
  const links = document.querySelectorAll('a');

  links.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('http') && !href.startsWith(baseUrl)) {
          link.setAttribute('rel', 'external no-referrer noopener');
          link.setAttribute('target', '_blank');
          link.setAttribute('title', 'O link irá abrir em uma nova aba');
          link.setAttribute('referrerpolicy', 'strict-origin');
      }
  });
});