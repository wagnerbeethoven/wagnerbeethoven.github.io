# Wagner Beethoven — projetos

Dashboard público de projetos de Wagner Beethoven.

O catálogo inclui:

- projetos autorais
- produtos
- trabalhos para clientes
- colaborações
- estudos
- referências e projetos de terceiros
- projetos com repositórios públicos e privados

Repositórios privados são representados apenas por metadados públicos
definidos manualmente em `projects.json`. Nenhum endereço ou conteúdo
privado é exposto pelo site.

## Estrutura

- `index.html`: estrutura da página
- `style.css`: apresentação e responsividade
- `app.js`: filtros, busca e renderização
- `projects.json`: catálogo
- `assets/projects/`: logos dos projetos

## Logos

Para associar uma logo a um projeto:

1. coloque o arquivo em `assets/projects/`
2. abra `projects.json`
3. altere `"logo": ""` para, por exemplo:

`"logo": "./assets/projects/ecoleta.svg"`

Quando não existe uma logo, o site gera um monograma automaticamente.
