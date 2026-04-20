# Como adicionar conteúdo às coleções

Este guia explica como adicionar filmes, séries, livros, álbuns, quadrinhos e jogos ao site.

---

## Forma rápida — script automático

O script busca os dados nas APIs e cria o arquivo pronto. Você só precisa revisar e preencher `rating`, `note` e `status`.

### Configuração inicial (uma vez só)

Crie um arquivo `.env` na raiz do projeto ou exporte as variáveis antes de rodar:

```bash
export TMDB_KEY=sua_chave      # filmes e séries → themoviedb.org/settings/api
export LASTFM_KEY=sua_chave    # músicas         → last.fm/api/account/create
export RAWG_KEY=sua_chave      # jogos           → rawg.io/apidocs
```

> Livros e quadrinhos usam APIs públicas sem cadastro.

### Comandos

```bash
npm run add:movie  "Título do filme"
npm run add:serie  "Nome da série"
npm run add:book   "Título do livro"
npm run add:comic  "Título do quadrinho"
npm run add:game   "Nome do jogo"
npm run add:music  "Nome do artista" "Nome do álbum"
```

**Exemplos:**

```bash
npm run add:movie  "Cidade de Deus"
npm run add:serie  "Breaking Bad"
npm run add:book   "Dom Casmurro"
npm run add:comic  "Saga"
npm run add:game   "Hollow Knight"
npm run add:music  "Criolo" "Nó na Orelha"
```

O script cria o arquivo `.md` na pasta correta com data de hoje no nome. Depois só abrir o arquivo, preencher os campos vazios e pronto.

---

## Forma manual

Se preferir criar sem o script, crie um arquivo `.md` na pasta da coleção com o nome no formato `AAAA-MM-DD-titulo.md`.

---

### Filmes — `src/movies/`

```markdown
---
title: Cidade de Deus
director: Fernando Meirelles
cast: Alexandre Rodrigues, Leandro Firmino
writers: Bráulio Mantovani
year: 2002
country: [Brasil]
duration: 130
image: "https://..."
status: done
rating: 5
tags: [Drama, Crime]
note: "Minha nota pessoal sobre o filme."
trailer: ""
---

Texto opcional com mais reflexões sobre o filme.
```

**Valores de `status`:** `done` (assistido) · `watching` (assistindo) · `want` (quero ver)

---

### Séries — `src/series/`

```markdown
---
title: Dark
platform: Netflix
years: "2017–2020"
seasons: 3
image: "https://..."
status: done
rating: 5
tags: [Ficção científica, Drama]
note: ""
trailer: ""
---
```

**Valores de `status`:** `done` (assistida) · `watching` (assistindo) · `want` (quero ver)

---

### Livros — `src/bookshelf/`

```markdown
---
title: Dom Casmurro
author: Machado de Assis
year: 1899
publisher: Garnier
pages: 256
isbn: "9788535902778"
image: "https://covers.openlibrary.org/b/isbn/9788535902778-L.jpg"
status: read
rating: 5
tags: [Romance, Literatura brasileira]
note: ""
---
```

**Valores de `status`:** `read` (lido) · `reading` (lendo) · `want` (para ler)

> A capa é buscada automaticamente pelo ISBN no Open Library. Se não tiver ISBN, coloque a URL da imagem diretamente em `image`.

---

### Quadrinhos — `src/comics/`

```markdown
---
title: Watchmen
writer: Alan Moore
artist: Dave Gibbons
publisher: DC Comics
year: 1986
volumes: 1
image: "https://..."
status: read
rating: 5
tags: [Super-herói, Distopia]
note: ""
---
```

**Valores de `status`:** `read` (lido) · `reading` (lendo) · `want` (quero ler)

---

### Jogos — `src/games/`

```markdown
---
title: Hollow Knight
developer: Team Cherry
platform: PC
year: 2017
image: "https://..."
status: done
rating: 5
tags: [Metroidvania, Indie]
note: ""
trailer: ""
---
```

**Valores de `status`:** `done` (zerado) · `playing` (jogando) · `want` (quero jogar)

---

### Música — `src/music/`

```markdown
---
title: Nó na Orelha
artist: Criolo
year: 2011
label: Oloko Records
genre: Hip-hop
image: "https://..."
spotify: ID_DO_ALBUM_NO_SPOTIFY
rating: 5
tags: [Hip-hop, MPB]
note: ""
---

Texto opcional com mais reflexões sobre o álbum.
```

> O campo `spotify` recebe **só o ID** do álbum, não a URL completa.
> Exemplo: para `https://open.spotify.com/album/6dVIqQ8qmQ5GBnJ9shOYGE` use `6dVIqQ8qmQ5GBnJ9shOYGE`.

---

### Fotos — `src/photos/`

```markdown
---
title: Tarde de sexta
image: "https://..."
alt: "Descrição da foto para acessibilidade"
caption: "Legenda exibida abaixo da foto"
date: 2026-04-19
location: Recife, PE
camera: iPhone 15 Pro
lens: ""
tags: [Cidade, Luz natural]
note: ""
---

Texto opcional com contexto sobre a foto.
```

---

## Campos comuns a todos

| Campo | O que é |
|---|---|
| `title` | Título da obra |
| `image` | URL da capa/poster |
| `status` | Estado atual (varia por tipo — veja acima) |
| `rating` | Nota de 1 a 5 (ou deixe `""` sem nota) |
| `tags` | Lista de gêneros/categorias |
| `note` | Frase curta de destaque (aparece nos cards) |
| `trailer` | ID do vídeo no YouTube (só o ID, não a URL) |

---

## Dicas

- **Nome do arquivo:** use sempre `AAAA-MM-DD-titulo-sem-acento.md`. O script faz isso automaticamente.
- **Campos opcionais:** qualquer campo não preenchido simplesmente não aparece na página. Não precisa deletar, pode deixar `""`.
- **Imagens:** sempre prefira HTTPS. Para livros sem imagem própria, o ISBN já resolve automaticamente.
- **Trailer:** coloque só o ID do YouTube. Para `https://youtube.com/watch?v=qWkPjI-Brkc` use `qWkPjI-Brkc`.
