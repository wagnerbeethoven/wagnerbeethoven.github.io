# Margem Viva

Site pessoal de Wagner Beethoven feito com Eleventy 3, Nunjucks e Tailwind CSS.

## Instalação

```bash
npm install
```

Crie `.env` na raiz com as chaves de API:

```bash
TMDB_KEY=sua_chave        # filmes e séries  → themoviedb.org/settings/api
YOUTUBE_KEY=sua_chave     # músicas          → console.cloud.google.com → YouTube Data API v3
RAWG_KEY=sua_chave        # jogos            → rawg.io/apidocs (opcional)
```

> Livros e quadrinhos usam APIs públicas sem cadastro.

<details>
<summary>Como obter a chave YouTube (grátis)</summary>

1. Acesse [console.cloud.google.com](https://console.cloud.google.com) e crie um projeto
2. **APIs e serviços** → **Biblioteca** → pesquise "YouTube Data API v3" → **Ativar**
3. **Credenciais** → **Criar credenciais** → **Chave de API**
4. Cole no `.env`: `YOUTUBE_KEY=AIza...`

Quota gratuita: 10.000 unidades/dia (~50 álbuns/dia).
</details>

## Desenvolvimento

```bash
# Dev completo: CSS watch + Eleventy serve em :8080
npm run dev

# Dev incremental: só reconstrói arquivos modificados (mais rápido para edição de conteúdo)
npm run dev:incremental

# Build de produção: icons → assets → CSS minificado → Eleventy
npm run build

# CSS separado
npm run dev:css     # watch
npm run build:css   # one-shot minificado

# Limpar output
npm run clean
```

> **Atenção:** mudanças em layouts, `.eleventy.js` ou `_data/` não propagam no modo incremental — reinicie com `npm run dev`.

## Conteúdo

### Adicionar mídia

```bash
npm run add:movie  "Título do Filme"
npm run add:serie  "Título da Série"
npm run add:book   "Título do Livro"
npm run add:comic  "Título do Quadrinho"
npm run add:game   "Título do Jogo"
npm run add:music  "Artista" "Álbum"
```

O script busca metadados nas APIs, cria o `.md` na pasta correta e preenche os campos automaticamente. Após rodar, abra o arquivo e preencha `rating`, `note` e `status`.

### Sincronizar notas do Bluesky

```bash
node scripts/content/sync-bluesky.js
```

### Frontmatter por tipo

<details>
<summary>Filmes — <code>src/movies/</code></summary>

```yaml
title: Cidade de Deus
director: Fernando Meirelles
cast: Alexandre Rodrigues, Leandro Firmino
writers: Bráulio Mantovani
year: 2002
country: [Brasil]
duration: 130
image: "https://..."
status: done        # done | watching | want
rating: 5
tags: [Drama, Crime]
note: "Frase curta de destaque (aparece no card)"
trailer: "qWkPjI-Brkc"   # só o ID do YouTube
```
</details>

<details>
<summary>Séries — <code>src/series/</code></summary>

```yaml
title: Dark
platform: Netflix
years: "2017–2020"
seasons: 3
image: "https://..."
status: done        # done | watching | want
rating: 5
tags: [Ficção científica, Drama]
trailer: ""
```
</details>

<details>
<summary>Livros — <code>src/bookshelf/</code></summary>

```yaml
title: Dom Casmurro
author: Machado de Assis
year: 1899
publisher: Garnier
pages: 256
isbn: "9788535902778"
image: "https://covers.openlibrary.org/b/isbn/9788535902778-L.jpg"
status: read        # read | reading | want
rating: 5
tags: [Romance, Literatura brasileira]
```

> A capa é buscada automaticamente pelo ISBN no Open Library. Se não tiver ISBN, coloque a URL diretamente em `image`.
</details>

<details>
<summary>Quadrinhos — <code>src/comics/</code></summary>

```yaml
title: Watchmen
writer: Alan Moore
artist: Dave Gibbons
publisher: DC Comics
year: 1986
volumes: 1
image: "https://..."
status: read        # read | reading | want
rating: 5
tags: [Super-herói, Distopia]
```
</details>

<details>
<summary>Jogos — <code>src/games/</code></summary>

```yaml
title: Hollow Knight
developer: Team Cherry
platform: PC
year: 2017
image: "https://..."
status: done        # done | playing | want
rating: 5
tags: [Metroidvania, Indie]
trailer: ""
```
</details>

<details>
<summary>Música — <code>src/music/</code></summary>

```yaml
title: Nó na Orelha
artist: Criolo
year: 2012
label: "Stern's Music"
genre: ""            # campo livre, preencha manualmente
image: "https://lh3.googleusercontent.com/..."
youtube: ajJ2_WM1EIg          # ID do vídeo (fallback)
youtubeList: PLIahuVdd5IBZ-…  # ID da playlist (toca o álbum completo)
browseId: MPREb_8vdtlt9izAW   # ID do álbum no YouTube Music (abre página do álbum)
tracks: 11
tags: [brazilian music, hip hop, jazz]  # gêneros do MusicBrainz
```

O corpo do arquivo é preenchido com a resenha do Last.fm. Edite ou apague livremente.

Fontes buscadas pelo script: YouTube Music (capa, `browseId`, faixas, ano) · YouTube Data API (`youtubeList`, `youtube`) · MusicBrainz (ano original, gravadora, tags) · Last.fm (resenha).

> **`spotify`** — opcional. Só o ID do álbum (ex: `6dVIqQ8qmQ5GBnJ9shOYGE`). Exibe embed se não houver YouTube.
</details>

<details>
<summary>Fotos — <code>src/photos/</code></summary>

```yaml
title: Tarde de sexta
image: "https://..."
alt: "Descrição da foto para acessibilidade"
caption: "Legenda exibida abaixo da foto"
date: 2026-04-19
location: Recife, PE
camera: iPhone 15 Pro
lens: ""
tags: [Cidade, Luz natural]
```
</details>

### Campos comuns

| Campo | O que é |
|---|---|
| `status` | Estado atual — valores variam por tipo (veja acima) |
| `rating` | Nota de 1 a 5, ou `""` sem nota |
| `tags` | Lista de gêneros/categorias |
| `note` | Frase curta de destaque (aparece nos cards) |
| `trailer` | Só o ID do YouTube (ex: `qWkPjI-Brkc`) |
| `image` | URL HTTPS da capa/poster |

Nome de arquivo: sempre `AAAA-MM-DD-titulo-sem-acento.md`. O script faz isso automaticamente.

## Estrutura

```text
src/
  assets/      arquivos estáticos versionados
  blog/         posts longos (Markdown)
  notes/        notas curtas e importações do Bluesky
  poetry/       poemas (atribuídos, não de autoria de Wagner)
  movies/       coleção de filmes
  series/       coleção de séries
  music/        coleção de álbuns
  bookshelf/    coleção de livros
  comics/       coleção de quadrinhos
  games/        coleção de jogos
  photos/       registros fotográficos
  pages/        páginas com permalink explícito (about, now, uses, card…)
  feeds/        Atom, RSS, JSON Feed e sitemap XML
  system/       manifest, service worker e endpoints técnicos
  _data/        dados globais do Eleventy
  _includes/    layouts e partials Nunjucks

scripts/
  build/        geração de ícones e busca de assets
  content/      automações de conteúdo (add-content, sync-bluesky)
  import/       migrações pontuais
```

## Notas

- CSS gerado em `.generated/assets/css/build.css`, publicado como `/assets/css/build.css`.
- Para adicionar CSS customizado, edite `src/assets/css/tailwind.css` diretamente (não crie arquivos separados).
- `.codex/` e `.agents/` são estado local de ferramentas e ficam ignorados no Git.
- `plugins/` guarda código-fonte de plugins locais quando fizer sentido manter no repositório.
