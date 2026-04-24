# Memoria do Projeto

Atualizado em: 2026-04-21

## Contexto

- Projeto: `margem-viva`, site pessoal de Wagner Beethoven.
- Stack: Eleventy 3, Nunjucks, Tailwind CSS, Node >= 18.
- Branch atual: `main`.
- Estado atual: worktree suja intencionalmente. Nao fazer rollback nem restaurar delecoes sem pedido explicito.

## Status Atual

- Ha uma reestruturacao em andamento do conteudo e da apresentacao do site.
- Posts antigos de `src/blog/*.md` foram removidos do caminho raiz e reaparecem como arquivos novos em `src/blog/2026/04/*.md`.
- Muitas notas importadas do Bluesky em `src/notes/*.md` aparecem como deletadas no Git. Tratar como estado atual do trabalho, nao como erro a reverter.
- Novos feeds foram adicionados:
  - `src/feeds/rss.xml.njk`
  - `src/feeds/atom.xml.njk`
  - `src/feeds/feed-discovery.njk`
- `src/feeds/atom.xml.njk` e `src/feeds/feed-discovery.njk` apontam para Atom/RSS/JSON Feed; conferir depois se `/feed.xml` e `/feed.json` existem ou se ainda precisam ser implementados.
- `.eleventy.js` recebeu filtro `rssDate` e passou a gerar excerpt para itens da arvore de arquivo.
- `scripts/content/sync-bluesky.js` passou a preservar datetime completo, imagens e embeds externos no frontmatter das notas.
- Layouts de notas foram ajustados para exibir horario, imagens, link embeds e `last-updated` apenas em notas que nao vieram do Bluesky.
- A home mudou o bloco de notas para lista compacta e a secao de poesia agora lista varios poemas recentes.
- CSS em `src/assets/css/tailwind.css` e no output gerado `.generated/assets/css/build.css` foi bastante alterado para suportar esses novos estados visuais.

## Arquivos Importantes Alterados

- Configuracao Eleventy: `.eleventy.js`
- Sincronizacao Bluesky: `scripts/content/sync-bluesky.js`
- Layouts: `src/_includes/layouts/base.njk`, `note.njk`, `post.njk`
- Comentarios: `src/_includes/partials/cusdis.njk`
- Listagens e paginas: `src/pages/index.njk`, `src/pages/archive.njk`, `src/pages/notes.njk`, `src/pages/sitemap.njk`, paginas de colecoes
- Feeds: `src/feeds/rss.xml.njk`, `src/feeds/atom.xml.njk`, `src/feeds/feed-discovery.njk`
- Estilos: `src/assets/css/tailwind.css`, `.generated/assets/css/build.css`

## Atencoes

- Nao usar `git reset --hard`, `git checkout --` ou comandos equivalentes sem autorizacao explicita.
- Antes de publicar, verificar se as delecoes de notas e a reorganizacao de posts estao corretas.
- Conferir consistencia dos feeds: RSS usa `rssDate`; Atom usa `htmlDateString` com `T00:00:00Z`, o que pode perder horario real de notas.
- Conferir encoding em textos renderizados, porque alguns outputs do terminal mostraram caracteres acentuados com mojibake.
- `git diff --stat` indicou aproximadamente 286 arquivos alterados, com muitas delecoes e novas entradas de conteudo.

## Proximos Passos Sugeridos

- Rodar `npm run build` para validar Eleventy, feeds, colecoes e templates.
- Revisar `/feed/`, `/rss.xml`, `/atom.xml`, `/notes/`, home e sitemap no build local.
- Confirmar se os arquivos deletados de `src/notes` devem permanecer fora do repositorio ou se foram migrados para outro fluxo.
- Decidir se `MEMORY.md` deve ser mantido versionado ou substituido por outro arquivo de contexto do projeto.
