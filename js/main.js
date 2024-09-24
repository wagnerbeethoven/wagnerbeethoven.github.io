// theme

// ; (function () {
//   const htmlElement = document.querySelector("html")
//   if (htmlElement.getAttribute("data-bs-theme") === 'auto') {
//     function updateTheme() {
//       document.querySelector("html").setAttribute("data-bs-theme",
//         window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
//     }
//     window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateTheme)
//     updateTheme()
//   }
// })();

// toc
$(document).ready(function () {
  $('#toc').toc({ noBackToTopLinks: true });
});


// adiciona _blank e diversos
document.addEventListener("DOMContentLoaded", function () {
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

// TRADUÇÃO DO SITE

document.addEventListener('DOMContentLoaded', function () {
  // Função para redirecionar para a URL de tradução do Google
  function translatePage(languageCode) {
      var currentURL = window.location.href;
      var translateURL = 'https://translate.google.com/translate?hl=' + languageCode + '&sl=auto&tl=' + languageCode + '&u=' + encodeURIComponent(currentURL);
      window.location.href = translateURL;
  }

  // Adiciona eventos de clique para os links de tradução
  var translateLinks = document.querySelectorAll('.translate-options a');
  translateLinks.forEach(function(link) {
      link.addEventListener('click', function(event) {
          event.preventDefault(); // Evita o comportamento padrão do link
          var lang = this.getAttribute('data-lang');
          translatePage(lang); // Chama a função de tradução com o código de idioma
      });
  });
});