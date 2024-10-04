document.addEventListener("DOMContentLoaded", function () {
  // Função para adicionar atributos aos links externos
  function addExternalLinkAttributes() {
    const baseUrl = window.location.origin;
    const links = document.querySelectorAll('a');

    links.forEach(link => {
      const href = link.getAttribute('href');
      
      // Verifica se é um link externo
      if (href && href.startsWith('http') && !href.startsWith(baseUrl)) {
        // Adiciona rel, preservando valores existentes
        let rel = link.getAttribute('rel') || '';
        const requiredRels = ['external', 'no-referrer', 'noopener'];
        
        requiredRels.forEach(value => {
          if (!rel.split(' ').includes(value)) {
            rel += ` ${value}`;
          }
        });

        // Garante que os valores estejam corretamente formatados
        link.setAttribute('rel', rel.trim().replace(/\s+/g, ' '));

        // Adiciona target="_blank" se não estiver definido
        if (!link.hasAttribute('target')) {
          link.setAttribute('target', '_blank');
        }

        // Recupera o texto visível do link ou o texto dentro de span.visually-hidden
        let linkText = link.textContent.trim();
        const visuallyHidden = link.querySelector('.visually-hidden');
        if (visuallyHidden) {
          linkText = visuallyHidden.textContent.trim();
        }

        // Adiciona um title dinâmico se não estiver definido
        if (!link.hasAttribute('title')) {
          link.setAttribute('title', `O link "${linkText}" irá abrir em uma nova aba`);
        }

        // Adiciona referrerpolicy se não estiver definido
        if (!link.hasAttribute('referrerpolicy')) {
          link.setAttribute('referrerpolicy', 'strict-origin');
        }
      }
    });
  }

  // Função para redirecionar para a URL de tradução do Google
  function addTranslationLinks() {
    const translateLinks = document.querySelectorAll('.translate-options a');
    
    translateLinks.forEach(link => {
      link.addEventListener('click', function (event) {
        event.preventDefault(); // Evita o comportamento padrão do link
        const lang = this.getAttribute('data-lang');
        const currentURL = window.location.href;
        const translateURL = `https://translate.google.com/translate?hl=${lang}&sl=auto&tl=${lang}&u=${encodeURIComponent(currentURL)}`;
        window.location.href = translateURL; // Redireciona para a URL de tradução
      });
    });
  }

  // Função para atualizar o tema automaticamente com base nas preferências do sistema
  function updateThemeAutomatically() {
    const htmlElement = document.querySelector("html");

    if (htmlElement.getAttribute("data-bs-theme") === 'auto') {
      function updateTheme() {
        htmlElement.setAttribute(
          "data-bs-theme",
          window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
        );
      }

      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", updateTheme);
      updateTheme();
    }
  }

  // Inicializa as funções
  addExternalLinkAttributes();
  addTranslationLinks();
  updateThemeAutomatically();
});
