# Como adicionar conteúdo às coleções

Este guia explica como adicionar filmes, séries, livros, álbuns, quadrinhos e jogos ao site.

---

## Forma rápida — script automático

O script busca os dados nas APIs e cria o arquivo pronto. Você só precisa revisar e preencher `rating`, `note` e `status`.

### Configuração inicial (uma vez só)

Crie um arquivo `.env` na raiz do projeto:

```bash
TMDB_KEY=sua_chave        # filmes e séries  → themoviedb.org/settings/api
YOUTUBE_KEY=sua_chave     # músicas          → console.cloud.google.com → YouTube Data API v3
RAWG_KEY=sua_chave        # jogos            → rawg.io/apidocs (opcional)
```

> Livros e quadrinhos usam APIs públicas sem cadastro.

#### Como obter a chave YouTube (grátis)

1. Acesse [console.cloud.google.com](https://console.cloud.google.com) e crie um projeto
2. Menu lateral → **APIs e serviços** → **Biblioteca**
3. Pesquise "YouTube Data API v3" → **Ativar**
4. **Credenciais** → **Criar credenciais** → **Chave de API**
5. Copie a chave e cole no `.env`: `YOUTUBE_KEY=AIza...`

Quota gratuita: 10.000 unidades/dia — suficiente para ~50 álbuns por dia.

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

O script busca dados em quatro fontes em paralelo:
- **YouTube Music (Innertube)** → capa quadrada, `browseId`, número de faixas, ano
- **YouTube Data API v3** → `youtubeList` (playlist) + `youtube` (vídeo) para embed
- **MusicBrainz** → ano de lançamento original, gravadora, `tags` de gênero
- **Last.fm** → descrição/resenha do álbum (escrita no corpo do arquivo)

```markdown
---
title: Nó na Orelha
artist: Criolo
year: 2012
label: "Stern's Music"
genre: ""
image: "https://lh3.googleusercontent.com/..."
youtube: ajJ2_WM1EIg
youtubeList: PLIahuVdd5IBZ-KfQkJTDtxOptuIaEEEw5
browseId: MPREb_8vdtlt9izAW
tracks: 11
tags: [brazilian music, hardcore hip hop, hip hop, jazz]
note: ""
---

Descrição do álbum vinda do Last.fm (preenchida automaticamente).
Edite ou apague se quiser escrever a sua própria.
```

> **`tags`** — gêneros musicais vindos do MusicBrainz, votados pela comunidade (ex: `hip hop`, `art rock`, `electronic`). Diferentes de `genre`: enquanto `genre` é um campo livre pra você preencher com o gênero principal, `tags` são múltiplos rótulos automáticos usados para navegação por `/tags/`. Edite à vontade.
>
> **`genre`** — campo livre para o gênero principal do álbum. Deixe `""` ou preencha manualmente (ex: `Hip-hop`). Não é preenchido automaticamente.
>
> **`browseId`** — ID interno do YouTube Music para a página do álbum (começa com `MPREb_`). Com ele, o botão "YouTube Music" na página abre direto no álbum em vez de fazer uma busca. Preenchido automaticamente.
>
> **`youtubeList`** — ID da playlist do álbum no YouTube. O embed na página toca o álbum completo em sequência.
>
> **`youtube`** — ID do vídeo (fallback quando não há playlist).
>
> **`tracks`** — número de faixas, preenchido automaticamente.
>
> **`spotify`** — opcional. Só o ID do álbum. Ex: para `open.spotify.com/album/6dVIqQ8qmQ5GBnJ9shOYGE` use `6dVIqQ8qmQ5GBnJ9shOYGE`. Se informado e não houver YouTube, exibe o embed do Spotify.
>
> **Corpo do arquivo** — preenchido com a descrição do Last.fm (em português quando disponível). Aparece na seção "Sobre o álbum" da página. Edite ou apague livremente.
>
> **Atenção:** o ano vem do MusicBrainz (lançamento original). Se não encontrado, usa a data de publicação do YouTube — pode precisar de ajuste manual.

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
