---
title: "Recomeçar também é projetar: como reestruturei meu blog mais uma vez"
date: 2026-04-21
tags: [editorial]
location: "Pernambuco"
banner: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiCA3GG0FzrkLXaaye_BGZ_jQfDm_Ae0Ki7tLOKhJuLMyxZEfrl9ypjs_kDuC6sJNiBmcWAYM-3lvzfSfiJUSak5lYOe_nJOdJPwDfIOaIULEXG1ztVzxu8lC5FMogilOA2EV8S2FF1fZi2uCJPGz6t3Ns-TkoYAPsiWE9xSb7AbI_Ros8979zqG925by-S/s16000/1000087316.jpg"
weather: "30°C Ensolarado"
---


<p class="p-summary">
    Do Blogger ao Eleventy — a história de como parei de adaptar meu conteúdo à ferramenta
    e passei a desenhar a ferramenta em função do que quero publicar, manter e evoluir.
</p>

<h2 id="narrativa">O começo de novo</h2>
<p>
    Esse site não nasceu do zero. É mais uma tentativa — e falo isso sem peso nenhum.
</p>
<p>
    Já passei por <a href="https://jekyllrb.com/" rel="noopener noreferrer">Jekyll</a>,
    <a href="https://wordpress.org/" rel="noopener noreferrer">WordPress</a>
    e fui parar no <a href="https://www.blogger.com/" rel="noopener noreferrer">Blogger</a>.
    Em todos esses momentos, a tentativa era a mesma: ter um espaço pessoal que funcionasse
    do meu jeito. O problema nunca foi só a ferramenta — era estrutura. Misturava pessoal com
    profissional, publicava pouco, e no fim nada encaixava de verdade.
</p>
<p>
    O gatilho dessa vez veio de vários lados ao mesmo tempo. O episódio com o
    <a href="https://brunopulis.com" target="_blank" rel="noopener">Bruno Pulis</a> no
    <a href="https://focoacessivel.com.br/episodios/ep-4-conexoes-acessiveis-para-tecer-inclusao-no-mundo-digital-bruno-pulis/" target="_blank" rel="noopener"><em>Foco Acessível</em></a>
    me aproximou da lógica da <abbr title="Independent Web">IndieWeb</abbr> e me fez olhar meu site
    com mais criticidade. Em paralelo, o <a href="https://pedro.dalbo.me/" target="_blank" rel="noopener">Pedro</a>
    me chamou, apresentou o <a href="https://entreblogs.com.br/" target="_blank" rel="noopener">Entreblogs</a>
    e aquilo trouxe algo simples e poderoso: vontade de escrever de novo. Mas dessa vez sem depender tanto
    de plataforma.
</p>
<p>
    Antes dessa estrutura atual, ainda tentei o <strong>Margem Viva</strong> no Blogger. Funcionava,
    mas me sentia amarrado — sem controle da forma, da organização, da evolução. Foi aí que decidi
    refazer tudo. De novo.
</p>
<p>Dessa vez com uma mudança clara de abordagem:</p>
<ul>
    <li>parar de adaptar meu conteúdo à ferramenta</li>
    <li>começar a desenhar a ferramenta em função do conteúdo</li>
    <li>assumir controle da estrutura, não só da aparência</li>
</ul>
<p>
    Essa decisão muda o tipo de problema que você enfrenta. Para de lutar contra limitações
    de plataforma e começa a lidar com decisões de arquitetura. É exatamente sobre essas decisões
    que esse texto trata.
</p>

<h2 id="base">A base técnica</h2>

<h3>Gerador estático: Eleventy</h3>
<p>
    A base do site é o <a href="https://www.11ty.dev/" rel="noopener noreferrer">Eleventy 3.0</a>
    (<abbr title="Eleventy">11ty</abbr>). A escolha foi por flexibilidade — ele não presume nada
    sobre a estrutura de arquivos. Diferente do Jekyll ou Hugo, você monta a arquitetura do jeito
    que faz sentido para o projeto, não para o gerador.
</p>
<p>
    O template engine principal é
    <a href="https://mozilla.github.io/nunjucks/" rel="noopener noreferrer">Nunjucks</a>,
    que permite trabalhar com layouts, partials reutilizáveis e lógica de composição sem
    exageros. Toda configuração — coleções, filtros e shortcodes — fica centralizada em
    <code>.eleventy.js</code>.
</p>
<p>Filtros customizados registrados no build:</p>
<ul>
    <li><code>readableDate</code> / <code>shortDate</code> — formatação de datas em PT-BR via Luxon</li>
    <li><code>relativeDate</code> — "há 3 dias", "há 2 semanas", com fallback para data formatada</li>
    <li><code>readingTime</code> — tempo estimado de leitura (200 palavras/min, mínimo 1 min)</li>
    <li><code>gitLastModified</code> — data real da última edição via <code>git log</code>, não timestamp estático</li>
    <li><code>tagColor</code> — cor determinística por hash para cada tag (HSL → HEX, 65% saturação)</li>
    <li><code>htmlToAbsoluteUrls</code> — reescreve URLs relativas para absolutas no feed RSS</li>
</ul>

<h3>Estilos</h3>
<p>
    Estilização com <a href="https://tailwindcss.com/" rel="noopener noreferrer">Tailwind CSS 3.4</a>,
    compilado com <a href="https://postcss.org/" rel="noopener noreferrer">PostCSS</a>
    e <a href="https://github.com/postcss/autoprefixer" rel="noopener noreferrer">Autoprefixer</a>.
    Modo escuro baseado em classe (<code>dark:</code>), com cores customizadas
    (<code>paper.light</code> e <code>paper.dark</code>). A abordagem utility-first reduziu
    drasticamente o <abbr title="Cascading Style Sheets">CSS</abbr> customizado e mantém
    consistência sem inflar a folha de estilos.
</p>

<h3>JavaScript sem framework</h3>
<p>
    Nenhum React, Vue ou Angular. Tudo em JavaScript puro, com foco em
    <abbr title="Melhoria progressiva">progressive enhancement</abbr> — o site funciona
    sem <abbr title="JavaScript">JS</abbr>, e os comportamentos entram como camada adicional:
</p>
<ul>
    <li>modo escuro persistido via <code>localStorage</code>, com detecção de <code>prefers-color-scheme</code></li>
    <li>barra de progresso de leitura com scroll listener passivo</li>
    <li>controles de acessibilidade: escala de fonte (0,8× a 1,5×), alto contraste, redução de movimento</li>
    <li>menu mobile com hamburger, overlay e gestão de foco; sidebar desktop colapsável com estado persistido</li>
    <li>lightbox com navegação por teclado e focus trap</li>
    <li>compartilhamento via <abbr title="Web Share API">Web Share API</abbr> com fallback para clipboard</li>
    <li>realce de blocos de código com <a href="https://highlightjs.org/" rel="noopener noreferrer">Highlight.js</a>
    </li>
</ul>

<h2 id="colecoes">Modelagem de conteúdo e coleções</h2>
<p>
    Uma das mudanças mais importantes foi parar de tratar tudo como "post".
    O site opera com 11 coleções distintas — cada uma com ordenação própria e layout específico:
    posts, notas, poesia, música, filmes, séries, jogos, livros, quadrinhos, receitas e fotos.
    Todo conteúdo é escrito em <a href="https://www.markdownguide.org/" rel="noopener noreferrer">Markdown</a>
    com frontmatter em <a href="https://yaml.org/" rel="noopener noreferrer">YAML</a>.
</p>

<h3>Coleções especiais geradas no build</h3>
<p>Além das coleções principais, o build gera três estruturas derivadas:</p>
<ul>
    <li>
        <strong>tagMeta</strong> — agrega posts, notas, poesias e receitas por tag,
        alimentando páginas temáticas de navegação
    </li>
    <li>
        <strong>archiveTree</strong> — estrutura hierárquica ano → mês de todo conteúdo editorial,
        com rótulos de mês em PT-BR; alimenta a página de arquivo cronológico
    </li>
    <li>
        <strong>searchIndex</strong> — índice JSON com título, descrição, tags e data de cada
        entrada, consumido pela busca client-side
    </li>
</ul>

<h3>Automação para entrada de conteúdo</h3>
<p>
    Preencher frontmatter manualmente para cada filme, livro ou álbum seria tedioso e sujeito
    a erros. A solução foi um <abbr title="Command-line interface">CLI</abbr> próprio
    (<code>scripts/add-content.js</code>) que busca dados automaticamente em
    <abbr title="Application Programming Interface">APIs</abbr> externas e gera o arquivo
    Markdown pronto na coleção certa:
</p>
<pre><code>node scripts/add-content.js movie  "Cidade de Deus"
node scripts/add-content.js serie  "Breaking Bad"
node scripts/add-content.js book   "Dom Casmurro"
node scripts/add-content.js comic  "Saga"
node scripts/add-content.js game   "Hollow Knight"
node scripts/add-content.js music  "Criolo" "Nó na Orelha"</code></pre>
<p>Cada tipo de mídia tem sua própria fonte de dados:</p>
<ul>
    <li>
        <strong>Filmes e séries</strong> via
        <a href="https://www.themoviedb.org/" rel="noopener noreferrer">TMDB</a>
        — título, diretor, elenco, roteiristas, trailer, país, duração, temporadas
    </li>
    <li>
        <strong>Livros</strong> via
        <a href="https://openlibrary.org/" rel="noopener noreferrer">Open Library</a>
        — gratuita, sem chave de API
    </li>
    <li>
        <strong>Quadrinhos</strong> via
        <a href="https://books.google.com/" rel="noopener noreferrer">Google Books</a>
        + <a href="https://comicvine.gamespot.com/" rel="noopener noreferrer">Comic Vine</a>
        em paralelo — dados mesclados (Comic Vine traz créditos de roteirista/desenhista;
        Google Books traz ISBN e categorias)
    </li>
    <li>
        <strong>Jogos</strong> via
        <a href="https://rawg.io/" rel="noopener noreferrer">RAWG</a>
        — detalhes, plataformas, desenvolvedora, trailer
    </li>
    <li>
        <strong>Álbuns</strong> via combinação de quatro fontes simultâneas
    </li>
</ul>
<p>
    O caso mais complexo é o de álbuns. Quatro requisições rodam em paralelo com
    <code>Promise.allSettled</code>:
    <a href="https://music.youtube.com/" rel="noopener noreferrer">YouTube Music</a>
    (via Innertube) traz capa quadrada de alta resolução e lista de faixas com duração;
    <a href="https://developers.google.com/youtube" rel="noopener noreferrer">YouTube Data API</a>
    fornece vídeo para embed; <a href="https://musicbrainz.org/" rel="noopener noreferrer">MusicBrainz</a>
    entrega gravadora, ano real de lançamento e tags de gênero;
    <a href="https://www.last.fm/api" rel="noopener noreferrer">Last.fm</a> contribui com texto
    descritivo em português quando disponível. Se uma fonte falha, as outras continuam — nenhum
    campo obrigatório bloqueia a entrada.
</p>

<h2 id="busca">Busca, navegação e experiência de uso</h2>

<h3>Busca client-side</h3>
<p>
    Busca interna implementada com
    <a href="https://github.com/nextapps-de/flexsearch" rel="noopener noreferrer">FlexSearch</a>.
    O índice é gerado no build e servido em JSON — sem dependência de serviço externo:
</p>
<ul>
    <li>debounce de 300ms no input</li>
    <li>navegação por teclado (↑↓ nas sugestões, Escape para fechar)</li>
    <li>limite de 8 resultados por busca</li>
    <li>destaque do termo encontrado com <code>&lt;mark&gt;</code></li>
    <li>suporte a modo dropdown (no header) e página dedicada de busca</li>
</ul>

<h2 id="indieweb">IndieWeb, identidade e web distribuída</h2>
<p>
    Uma parte central dessa reestruturação foi aproximar o site de princípios da
    <a href="https://indieweb.org/" rel="noopener noreferrer">IndieWeb</a>.
    Não queria só um lugar para publicar — queria um site que funcionasse como meu
    ponto principal de presença na web. Sobre isso escrevi mais detalhado
    <a href="https://wagnerbeethoven.com.br/blog/indieweb-a-web-mais-nossa-do-que-nunca/" target="_blank" rel="noopener">no meu site principal</a>,
    e o Foco Acessível tem um texto ótimo sobre
    <a href="https://focoacessivel.com.br/blog/potencializando-a-acessibilidade-por-meio-comunidades-online/" target="_blank" rel="noopener">como comunidades online potencializam acessibilidade</a>
    que vale muito a leitura.
</p>
<ul>
    <li><code>h-card</code> no layout base (u-photo, p-name, u-email, u-url)</li>
    <li><code>rel="me"</code> para verificação de identidade entre perfis</li>
    <li><code>p-category</code> nos links de tag</li>
    <li>
        webmentions via <a href="https://webmention.io/" rel="noopener noreferrer">webmention.io</a>
        — o site recebe e exibe curtidas, reposts, bookmarks e respostas de outras páginas que o mencionam;
        o widget agrupa por tipo (❤️ 🔄 🔖 💬), exibe foto do autor com fallback para iniciais,
        e trunca respostas longas em 280 caracteres
    </li>
    <li>
        páginas no formato <em>slash pages</em> — <code>/now</code>, <code>/uses</code>,
        <code>/colophon</code> e outras, organizadas em 6 grupos de navegação
    </li>
</ul>

<h3>Comentários e livro de visitas</h3>
<p>
    Comentários integrados com <a href="https://cusdis.com/" rel="noopener noreferrer">Cusdis</a>
    — alternativa leve e sem rastreamento ao Disqus. O site também tem um livro de visitas,
    referência direta à web dos anos 90, quando todo site pessoal tinha um.
</p>

<h2 id="bluesky">Integração com Bluesky</h2>
<p>
    Em vez de deixar minhas notas espalhadas apenas na rede social, passei a tratar parte
    desse material como conteúdo reaproveitável dentro do site.
</p>
<p>
    Um workflow em <a href="https://github.com/features/actions" rel="noopener noreferrer">GitHub Actions</a>
    roda a cada 6 horas, busca meus posts no
    <a href="https://bsky.app/" rel="noopener noreferrer">Bluesky</a> via
    <abbr title="Authenticated Transfer Protocol">AT Protocol</abbr> (API pública, sem autenticação),
    extrai hashtags via facets, identifica metadados e salva cada entrada como arquivo Markdown
    em <code>src/notes/</code>. O script rastreia o <code>bluesky_uri</code> no frontmatter
    para evitar duplicatas e faz commit automático das notas novas.
</p>
<p>
    Isso transforma publicação social em matéria-prima do próprio site. Minhas notas deixam
    de depender só de uma plataforma externa e passam a viver também na minha base.
</p>

<h2 id="acessibilidade">Acessibilidade como base</h2>
<p>
    Acessibilidade não entrou como detalhe tardio — participou da estrutura desde o começo.
    Entre os recursos incorporados:
</p>
<ul>
    <li>uso consistente de <abbr title="Accessible Rich Internet Applications">ARIA</abbr> onde necessário</li>
    <li>focus traps em modais e componentes interativos</li>
    <li>indicadores visuais de foco</li>
    <li>escala tipográfica ajustável (0,8× a 1,5×)</li>
    <li>modo de alto contraste</li>
    <li>respeito a <code>prefers-reduced-motion</code></li>
    <li>degradação elegante sem JavaScript</li>
</ul>

<h2 id="infra">Deploy, build, segurança e manutenção</h2>

<h3>Hospedagem e CI/CD</h3>
<p>
    O site é hospedado na <a href="https://www.netlify.com/" rel="noopener noreferrer">Netlify</a>,
    com deploy automatizado a partir do repositório. O <code>netlify.toml</code> configura
    Node 20 e entrega os feeds com cabeçalhos corretos
    (<code>Content-Type: application/atom+xml; charset=utf-8</code>).
</p>
<p>Cabeçalhos de segurança ativos:</p>
<ul>
    <li>HSTS (1 ano, includeSubDomains, preload)</li>
    <li>X-Frame-Options DENY</li>
    <li>X-Content-Type-Options nosniff</li>
    <li>Referrer-Policy strict-origin-when-cross-origin</li>
    <li>Permissions-Policy bloqueando geolocation, microphone e camera</li>
</ul>
<p>
    <abbr title="Continuous Integration and Continuous Delivery">CI/CD</abbr> via
    GitHub Actions com três workflows: CI em todos os branches, deploy automático na main
    e sincronização com o Bluesky a cada 6 horas.
</p>

<h3>Testes</h3>
<p>
    Testes E2E com <a href="https://playwright.dev/" rel="noopener noreferrer">Playwright</a>
    cobrindo Chromium, Firefox, WebKit, Pixel 5 e iPhone 12 — com 2 retries em CI e
    execução paralela local.
</p>

<h3>Feeds e PWA</h3>
<p>
    O site gera feed em <abbr title="Atom Syndication Format">Atom</abbr> e
    <abbr title="JavaScript Object Notation Feed">JSON Feed 1.1</abbr>, com redirecionamentos
    301 das rotas antigas (<code>/rss</code>, <code>/atom.xml</code>, <code>/feed</code>)
    para preservar compatibilidade com leitores existentes.
</p>
<p>
    Também há um <abbr title="Progressive Web App">PWA</abbr> com Service Worker
    (estratégia cache-first, fallback para rede) e <code>manifest.webmanifest</code>
    — permite instalar o site como app no Android e iOS.
</p>

<h3>Extras que sustentam a estrutura</h3>
<ul>
    <li>
        <strong>Migração do Blogger:</strong> script que lê o Atom XML exportado, extrai título,
        data, conteúdo, tags e primeira imagem como banner, e gera arquivos Markdown prontos
        para o Eleventy
    </li>
    <li>
        <strong>Changelog automático:</strong> <code>src/_data/changelog.js</code> lê os últimos
        120 commits via <code>git log</code> e os agrupa por mês em PT-BR — página de histórico
        gerada sem esforço manual
    </li>
    <li>
        <strong>Integração com Last.fm:</strong> widget que puxa as últimas 6 faixas ouvidas,
        com badge "tocando agora" quando há faixa ativa e fallback para ícone de música
    </li>
    <li>
        <strong>Geração de ícones:</strong> script que exporta favicons PNG (16×16, 32×32, 180×180)
        a partir do SVG fonte via Sharp, com compressão nível 9
    </li>
</ul>

<h2 id="fechamento">No fim, o que mudou de verdade</h2>
<p>
    A principal mudança não foi sair de uma plataforma e ir para outra. Foi parar de tentar
    encaixar minha escrita e meu acervo em estruturas que nunca me representavam direito.
</p>
<p>
    Assumir que a estrutura faz parte do conteúdo muda tudo. Agora o site não é só onde eu
    publico — é parte de como eu penso, organizo e mantenho o que produzo ao longo do tempo.
    Cada peça foi escolhida por razão específica, nada por modismo. O resultado é um site que
    controlo completamente, do HTML ao deploy.
</p>
<p>
    Esse site é, de novo, mais uma tentativa. Mas agora ele parece menos uma improvisação
    e mais uma casa que finalmente faz sentido para mim.
</p>