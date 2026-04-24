---
title: "Recomeçar também é projetar: como reestruturei meu blog mais uma vez"
date: 2026-04-21
tags: [editorial]
location: "Pernambuco"
weather: "30°C Ensolarado"
---

 Do Blogger ao Eleventy — a história de como parei de adaptar meu conteúdo à ferramenta e passei a desenhar a ferramenta em função do que quero publicar, manter e evoluir. 

## O começo de novo

Esse site não nasceu do zero. É mais uma tentativa — e falo isso sem peso nenhum. 

Já passei por [Jekyll][1], [WordPress][2] e fui parar no [Blogger][3]. Em todos esses momentos, a tentativa era a mesma: ter um espaço pessoal que funcionasse do meu jeito. O problema nunca foi só a ferramenta — era estrutura. Misturava pessoal com profissional, publicava pouco, e no fim nada encaixava de verdade. 

O gatilho dessa vez veio de vários lados ao mesmo tempo. O episódio com o [Bruno Pulis][4] no [_Foco Acessível_][5] me aproximou da lógica da IndieWeb e me fez olhar meu site com mais criticidade. Em paralelo, o [Pedro][6] me chamou, apresentou o [Entreblogs][7] e aquilo trouxe algo simples e poderoso: vontade de escrever de novo. Mas dessa vez sem depender tanto de plataforma. 

Antes dessa estrutura atual, ainda tentei o **Margem Viva** no Blogger. Funcionava, mas me sentia amarrado — sem controle da forma, da organização, da evolução. Foi aí que decidi refazer tudo. De novo. 

Dessa vez com uma mudança clara de abordagem:

* parar de adaptar meu conteúdo à ferramenta
* começar a desenhar a ferramenta em função do conteúdo
* assumir controle da estrutura, não só da aparência

Essa decisão muda o tipo de problema que você enfrenta. Para de lutar contra limitações de plataforma e começa a lidar com decisões de arquitetura. É exatamente sobre essas decisões que esse texto trata. 

## A base técnica

### Gerador estático: Eleventy

A base do site é o [Eleventy 3.0][8] (11ty). A escolha foi por flexibilidade — ele não presume nada sobre a estrutura de arquivos. Diferente do Jekyll ou Hugo, você monta a arquitetura do jeito que faz sentido para o projeto, não para o gerador. 

O template engine principal é [Nunjucks][9], que permite trabalhar com layouts, partials reutilizáveis e lógica de composição sem exageros. Toda configuração — coleções, filtros e shortcodes — fica centralizada em .eleventy.js. 

Filtros customizados registrados no build:

* readableDate / shortDate — formatação de datas em PT-BR via Luxon
* relativeDate — "há 3 dias", "há 2 semanas", com fallback para data formatada
* readingTime — tempo estimado de leitura (200 palavras/min, mínimo 1 min)
* gitLastModified — data real da última edição via git log, não timestamp estático
* tagColor — cor determinística por hash para cada tag (HSL → HEX, 65% saturação)
* htmlToAbsoluteUrls — reescreve URLs relativas para absolutas no feed RSS

### Estilos

Estilização com [Tailwind CSS 3.4][10], compilado com [PostCSS][11] e [Autoprefixer][12]. Modo escuro baseado em classe (dark:), com cores customizadas (paper.light e paper.dark). A abordagem utility-first reduziu drasticamente o CSS customizado e mantém consistência sem inflar a folha de estilos. 

### JavaScript sem framework

Nenhum React, Vue ou Angular. Tudo em JavaScript puro, com foco em progressive enhancement — o site funciona sem JS, e os comportamentos entram como camada adicional: 

* modo escuro persistido via localStorage, com detecção de prefers-color-scheme
* barra de progresso de leitura com scroll listener passivo
* controles de acessibilidade: escala de fonte (0,8× a 1,5×), alto contraste, redução de movimento
* menu mobile com hamburger, overlay e gestão de foco; sidebar desktop colapsável com estado persistido
* lightbox com navegação por teclado e focus trap
* compartilhamento via Web Share API com fallback para clipboard
* realce de blocos de código com [Highlight.js][13]

## Modelagem de conteúdo e coleções

Uma das mudanças mais importantes foi parar de tratar tudo como "post". O site opera com 11 coleções distintas — cada uma com ordenação própria e layout específico: posts, notas, poesia, música, filmes, séries, jogos, livros, quadrinhos, receitas e fotos. Todo conteúdo é escrito em [Markdown][14] com frontmatter em [YAML][15]. 

### Coleções especiais geradas no build

Além das coleções principais, o build gera três estruturas derivadas:

* **tagMeta** — agrega posts, notas, poesias e receitas por tag, alimentando páginas temáticas de navegação
* **archiveTree** — estrutura hierárquica ano → mês de todo conteúdo editorial, com rótulos de mês em PT-BR; alimenta a página de arquivo cronológico
* **searchIndex** — índice JSON com título, descrição, tags e data de cada entrada, consumido pela busca client-side

### Automação para entrada de conteúdo

Preencher frontmatter manualmente para cada filme, livro ou álbum seria tedioso e sujeito a erros. A solução foi um CLI próprio (scripts/add-content.js) que busca dados automaticamente em APIs externas e gera o arquivo Markdown pronto na coleção certa: 

    node scripts/add-content.js movie  "Cidade de Deus"
    node scripts/add-content.js serie  "Breaking Bad"
    node scripts/add-content.js book   "Dom Casmurro"
    node scripts/add-content.js comic  "Saga"
    node scripts/add-content.js game   "Hollow Knight"
    node scripts/add-content.js music  "Criolo" "Nó na Orelha"

Cada tipo de mídia tem sua própria fonte de dados:

* **Filmes e séries** via [TMDB][16] — título, diretor, elenco, roteiristas, trailer, país, duração, temporadas
* **Livros** via [Open Library][17] — gratuita, sem chave de API
* **Quadrinhos** via [Google Books][18] + [Comic Vine][19] em paralelo — dados mesclados (Comic Vine traz créditos de roteirista/desenhista; Google Books traz ISBN e categorias)
* **Jogos** via [RAWG][20] — detalhes, plataformas, desenvolvedora, trailer
* **Álbuns** via combinação de quatro fontes simultâneas

O caso mais complexo é o de álbuns. Quatro requisições rodam em paralelo com Promise.allSettled: [YouTube Music][21] (via Innertube) traz capa quadrada de alta resolução e lista de faixas com duração; [YouTube Data API][22] fornece vídeo para embed; [MusicBrainz][23] entrega gravadora, ano real de lançamento e tags de gênero; [Last.fm][24] contribui com texto descritivo em português quando disponível. Se uma fonte falha, as outras continuam — nenhum campo obrigatório bloqueia a entrada. 

## Busca, navegação e experiência de uso

### Busca client-side

Busca interna implementada com [FlexSearch][25]. O índice é gerado no build e servido em JSON — sem dependência de serviço externo: 

* debounce de 300ms no input
* navegação por teclado (↑↓ nas sugestões, Escape para fechar)
* limite de 8 resultados por busca
* destaque do termo encontrado com <mark>
* suporte a modo dropdown (no header) e página dedicada de busca

## IndieWeb, identidade e web distribuída

Uma parte central dessa reestruturação foi aproximar o site de princípios da [IndieWeb][26]. Não queria só um lugar para publicar — queria um site que funcionasse como meu ponto principal de presença na web. Sobre isso escrevi mais detalhado [no meu site principal][27], e o Foco Acessível tem um texto ótimo sobre [como comunidades online potencializam acessibilidade][28] que vale muito a leitura. 

* h-card no layout base (u-photo, p-name, u-email, u-url)
* rel="me" para verificação de identidade entre perfis
* p-category nos links de tag
* webmentions via [webmention.io][29] — o site recebe e exibe curtidas, reposts, bookmarks e respostas de outras páginas que o mencionam; o widget agrupa por tipo (❤️ 🔄 🔖 💬), exibe foto do autor com fallback para iniciais, e trunca respostas longas em 280 caracteres
* páginas no formato _slash pages_ — /now, /uses, /colophon e outras, organizadas em 6 grupos de navegação

### Comentários e livro de visitas

Comentários integrados com [Cusdis][30] — alternativa leve e sem rastreamento ao Disqus. O site também tem um livro de visitas, referência direta à web dos anos 90, quando todo site pessoal tinha um. 

## Integração com Bluesky

Em vez de deixar minhas notas espalhadas apenas na rede social, passei a tratar parte desse material como conteúdo reaproveitável dentro do site. 

Um workflow em [GitHub Actions][31] roda a cada 6 horas, busca meus posts no [Bluesky][32] via AT Protocol (API pública, sem autenticação), extrai hashtags via facets, identifica metadados e salva cada entrada como arquivo Markdown em src/notes/. O script rastreia o bluesky_uri no frontmatter para evitar duplicatas e faz commit automático das notas novas. 

Isso transforma publicação social em matéria-prima do próprio site. Minhas notas deixam de depender só de uma plataforma externa e passam a viver também na minha base. 

## Acessibilidade como base

Acessibilidade não entrou como detalhe tardio — participou da estrutura desde o começo. Entre os recursos incorporados: 

* uso consistente de ARIA onde necessário
* focus traps em modais e componentes interativos
* indicadores visuais de foco
* escala tipográfica ajustável (0,8× a 1,5×)
* modo de alto contraste
* respeito a prefers-reduced-motion
* degradação elegante sem JavaScript

## Deploy, build, segurança e manutenção

### Hospedagem e CI/CD

O site é hospedado na [Netlify][33], com deploy automatizado a partir do repositório. O netlify.toml configura Node 20 e entrega os feeds com cabeçalhos corretos (Content-Type: application/atom+xml; charset=utf-8). 

Cabeçalhos de segurança ativos:

* HSTS (1 ano, includeSubDomains, preload)
* X-Frame-Options DENY
* X-Content-Type-Options nosniff
* Referrer-Policy strict-origin-when-cross-origin
* Permissions-Policy bloqueando geolocation, microphone e camera

CI/CD via GitHub Actions com três workflows: CI em todos os branches, deploy automático na main e sincronização com o Bluesky a cada 6 horas. 

### Testes

Testes E2E com [Playwright][34] cobrindo Chromium, Firefox, WebKit, Pixel 5 e iPhone 12 — com 2 retries em CI e execução paralela local. 

### Feeds e PWA

O site gera feed em Atom e JSON Feed 1.1, com redirecionamentos 301 das rotas antigas (/rss, /atom.xml, /feed) para preservar compatibilidade com leitores existentes. 

Também há um PWA com Service Worker (estratégia cache-first, fallback para rede) e manifest.webmanifest — permite instalar o site como app no Android e iOS. 

### Extras que sustentam a estrutura

* **Migração do Blogger:** script que lê o Atom XML exportado, extrai título, data, conteúdo, tags e primeira imagem como banner, e gera arquivos Markdown prontos para o Eleventy
* **Changelog automático:** `src/_data/changelog.js` lê os últimos 120 commits via git log e os agrupa por mês em PT-BR — página de histórico gerada sem esforço manual
* **Integração com Last.fm:** widget que puxa as últimas 6 faixas ouvidas, com badge "tocando agora" quando há faixa ativa e fallback para ícone de música
* **Geração de ícones:** script que exporta favicons PNG (16×16, 32×32, 180×180) a partir do SVG fonte via Sharp, com compressão nível 9

## No fim, o que mudou de verdade

A principal mudança não foi sair de uma plataforma e ir para outra. Foi parar de tentar encaixar minha escrita e meu acervo em estruturas que nunca me representavam direito. 

Assumir que a estrutura faz parte do conteúdo muda tudo. Agora o site não é só onde eu publico — é parte de como eu penso, organizo e mantenho o que produzo ao longo do tempo. Cada peça foi escolhida por razão específica, nada por modismo. O resultado é um site que controlo completamente, do HTML ao deploy. 

Esse site é, de novo, mais uma tentativa. Mas agora ele parece menos uma improvisação e mais uma casa que finalmente faz sentido para mim. 

[1]: https://jekyllrb.com/
[2]: https://wordpress.org/
[3]: https://www.blogger.com/
[4]: https://brunopulis.com
[5]: https://focoacessivel.com.br/episodios/ep-4-conexoes-acessiveis-para-tecer-inclusao-no-mundo-digital-bruno-pulis/
[6]: https://pedro.dalbo.me/
[7]: https://entreblogs.com.br/
[8]: https://www.11ty.dev/
[9]: https://mozilla.github.io/nunjucks/
[10]: https://tailwindcss.com/
[11]: https://postcss.org/
[12]: https://github.com/postcss/autoprefixer
[13]: https://highlightjs.org/
[14]: https://www.markdownguide.org/
[15]: https://yaml.org/
[16]: https://www.themoviedb.org/
[17]: https://openlibrary.org/
[18]: https://books.google.com/
[19]: https://comicvine.gamespot.com/
[20]: https://rawg.io/
[21]: https://music.youtube.com/
[22]: https://developers.google.com/youtube
[23]: https://musicbrainz.org/
[24]: https://www.last.fm/api
[25]: https://github.com/nextapps-de/flexsearch
[26]: https://indieweb.org/
[27]: https://wagnerbeethoven.com.br/blog/indieweb-a-web-mais-nossa-do-que-nunca/
[28]: https://focoacessivel.com.br/blog/potencializando-a-acessibilidade-por-meio-comunidades-online/
[29]: https://webmention.io/
[30]: https://cusdis.com/
[31]: https://github.com/features/actions
[32]: https://bsky.app/
[33]: https://www.netlify.com/
[34]: https://playwright.dev/