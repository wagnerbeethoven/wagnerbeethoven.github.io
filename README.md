# Margem Viva

Site pessoal de Wagner Beethoven feito com Eleventy 3, Nunjucks e Tailwind CSS.

## Comandos

```bash
npm install
npm run dev
npm run build
```

Comandos de conteudo:

```bash
node scripts/content/sync-bluesky.js
node scripts/content/add-content.js movie "Titulo"
node scripts/content/add-content.js music "Artista" "Album"
```

## Estrutura

```text
src/
  assets/      arquivos estaticos versionados
  blog/        posts longos
  notes/       notas curtas e importadas do Bluesky
  movies/      colecao de filmes
  series/      colecao de series
  music/       colecao de albuns
  pages/       paginas e listagens com permalink explicito
  feeds/       Atom, RSS, JSON Feed e sitemap XML
  system/      manifest, service worker e endpoints tecnicos
  _data/       dados globais do Eleventy
  _includes/   layouts e partials Nunjucks

scripts/
  build/       geracao de icones e busca de assets
  content/     automacoes de conteudo
  import/      migracoes pontuais
```

## Notas

- `.codex/` e `.agents/` sao estado local da ferramenta e ficam ignorados no Git.
- `plugins/` guarda codigo-fonte de plugins locais quando fizer sentido manter no repositorio.
- CSS gerado sai em `.generated/assets/css/build.css` e eh publicado como `/assets/css/build.css`.
