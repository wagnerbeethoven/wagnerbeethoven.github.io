---
layout: post
title: "Guia Markdown"
summary: "Guia de referência escrito por Matt Cone traduzido para o português"
categories: blog
comments: true
image: https://bitbucket.org/wagnerbeethoven/2020-09-23-guia-markdown/raw/b504d6ed386a401897e7e2379e5cf572c06d3522/atom.png
legend: Print do Editor Atom
description: "Guia de referência escrito por Matt Cone traduzido para o português"
alt: Print do Editor Atom representando um texto formatado em Markdown
tags:
  - Material de apoio
  - Markdown
  - Traduação
---

Quando comecei a pesquisar sobre o [Jekyll][jekyll] e sobre a construção de página com geradores de HTML estático sempre ouvi falar sobre Markdown. Essa informação martelou na minha cabeça, mas buscava informações de maneiras esporádicas, à medida que ia sentido a necessidade de uma <span lang="en">tag</span> ia na internet e pesquisava, mas essa busca ficava cada vez mais cansativa, já que minha preocupação maior é deixar o mais semântico e mais acessível possível.

O markdown não abrangem tantas possibilidades como <abbr title="HyperText Markup Language">HTML</abbr> que além de ser mais "universal", é uma linguagem que eu domino, porém vejo que a escrita com markdown me parece mais natural e muito mais fácil de se produzir, por isso, numa busca para levantamento de conteúdo sobre o tema achei um guia ao qual traduzo parte dele para o português.

**Observações**:

- Eu sempre gosto de contextualizar tudo que pesquiso, por isso uma informação detalhada sobre a linguagem estará disponível aqui para depois mostrar as aplicações práticas da linguagem.
- Outra coisa bem importante que vou iniciar é passar para markdown todas as páginas do site. Só não vou dizer prazos 😏.
- Esta página que você está lendo está escrita em duas linguagens diferentes, mas essa flexibilidade é aceitável pelo [Github](http://github.com/wagnerbeethoven/wagnerbeethoven.github.io) e pelo Markdown. A maneira como ela foi descritita pode ser visualizada através do [arquivo disponibilizado no repositótio do site](https://raw.githubusercontent.com/wagnerbeethoven/wagnerbeethoven.github.io/master/_posts/2020-09-23-guia-markdown.md).
- A fonte este _post_ é muito mais extensa do que está disponibilizado aqui, mas escolhi publicar usar apenas o que faz sentido para mim, já que essa publicação será uma guia caso eu vá ter alguma dúvida na escrita do Markdown.

> O texto abaixo foi traduzido para o português a partir o material disponível no site [Markdown Guide][markdownguide] sob a licença [CC BY-SA 4.0][cc].

## O que é o Markdown?

Markdown é uma linguagem de marcação leve que você pode usar para adicionar elementos de formatação a documentos de texto simples. Criado por [John Gruber](http://daringfireball.net/projects/markdown/) em 2004, Markdown é agora uma das linguagens de marcação mais populares do mundo.

Usar Markdown é diferente de usar um editor WYSIWYG. Em um aplicativo como o Microsoft Word, você clica em botões para formatar palavras e frases e as alterações ficam visíveis imediatamente. Markdown não é assim. Ao criar um arquivo formatado em Markdown, você adiciona a sintaxe Markdown ao texto para indicar quais palavras e frases devem ter uma aparência diferente.

Por exemplo, para exibir um título, você adiciona um sinal dele (por exemplo, `# Título Um`) ou para deixar uma frase em negrito, você adiciona dois asteriscos antes e depois dela (por exemplo, `**este texto está em negrito**`). Pode demorar um pouco para se acostumar a ver a sintaxe Markdown em seu texto, especialmente se você estiver acostumado com aplicativos WYSIWYG. A captura de tela abaixo mostra um arquivo Markdown exibido no [editor de texto Atom](http://atom.io/).

![Editor Atom](https://bitbucket.org/wagnerbeethoven/2020-09-23-guia-markdown/raw/b504d6ed386a401897e7e2379e5cf572c06d3522/atom.png "Editor Atom")

Você pode adicionar elementos de formatação Markdown a um arquivo de texto simples usando um aplicativo editor de texto. Ou você pode usar um dos muitos aplicativos Markdown para sistemas operacionais macOS, Windows, Linux, iOS e Android. Existem também vários aplicativos baseados na web projetados especificamente para escrever em Markdown.

Dependendo do aplicativo que você usa, você pode não conseguir visualizar o documento formatado em tempo real. Mas está tudo bem. De [acordo com Gruber](http://daringfireball.net/projects/markdown/), a sintaxe do Markdown foi projetada para ser legível e discreta, de modo que o texto nos arquivos do Markdown pode ser lido mesmo que não sejam processados por máquinas.

> O objetivo principal do design para a sintaxe de formatação do Markdown é torná-lo o mais legível possível. A ideia é que um documento formatado em Markdown deve ser publicável como está, como texto simples, sem parecer que foi marcado com tags ou instruções de formatação.

## Por que usar Markdown?

Você pode estar se perguntando por que as pessoas usam Markdown em vez de um editor WYSIWYG. Por que escrever com Markdown quando você pode pressionar botões em uma interface para formatar seu texto? Acontece que existem algumas razões diferentes pelas quais as pessoas usam Markdown em vez de editores WYSIWYG.

- Markdown pode ser usado para tudo. As pessoas o usam para criar [sites](#sites "Como escrever o conteúdo de sites"), [documentos](#documentos "Como escrever seus documentos"), [anotações](#anotações "Como fazer suas anotações"), [livros](#livros "Como escrever o conteúdo dos seus livros"), [apresentações](#apresentações "Como criar suas apresentações"), [mensagens de e-mail](#email "Como escrever emails") e [documentação técnica](#documentação "Como escrever documentações técnicas").
- Markdown é portátil. Arquivos contendo texto formatado em Markdown podem ser abertos usando virtualmente qualquer aplicativo. Se você decidir que não gosta do aplicativo Markdown que está usando no momento, pode importar seus arquivos Markdown para outro aplicativo Markdown. Isso contrasta fortemente com os aplicativos de processamento de texto, como o Microsoft Word, que bloqueiam seu conteúdo em um formato de arquivo proprietário.
- Markdown é independente de plataforma. Você pode criar texto formatado em Markdown em qualquer dispositivo que execute qualquer sistema operacional.
- Markdown é à prova de futuro. Mesmo que o aplicativo que você está usando pare de funcionar em algum momento no futuro, você ainda poderá ler seu texto formatado em Markdown usando um aplicativo de edição de texto. Esta é uma consideração importante quando se trata de livros, teses universitárias e outros documentos importantes que precisam ser preservados indefinidamente.
- Markdown está em toda parte. Sites como Reddit e GitHub suportam Markdown, e muitos aplicativos de desktop e baseados na web o suportam.

## Comece

A melhor maneira de começar a usar o Markdown é usá-lo. Isso é mais fácil do que nunca graças a uma variedade de ferramentas gratuitas.

Você nem precisa fazer download de nada. Existem vários editores Markdown online que você pode usar para tentar escrever no Markdown. [Dillinger][dillinger] é um dos melhores editores online do Markdown. Basta abrir o site e começar a digitar no painel esquerdo. Uma visualização do documento formatado aparece no painel direito.

![Dillinger](https://bitbucket.org/wagnerbeethoven/2020-09-23-guia-markdown/raw/b504d6ed386a401897e7e2379e5cf572c06d3522/dillinger.jpg "Dillinger")

Provavelmente, você desejará manter o site do Dillinger aberto enquanto lê este guia. Dessa forma, você pode experimentar a sintaxe à medida que aprende sobre ela. Depois de se familiarizar com o Markdown, você pode usar um aplicativo Markdown que pode ser instalado em seu computador desktop ou dispositivo móvel.

## Como isso funciona?

Dillinger torna a escrita em Markdown fácil porque esconde as coisas que acontecem nos bastidores, mas vale a pena explorar como o processo funciona em geral.

Quando você escreve em Markdown, o texto é armazenado em um arquivo de texto simples com extensão `.md` ou `.markdown`. Mas e daí? Como seu arquivo formatado em Markdown é convertido em HTML ou em um documento pronto para impressão?

A resposta curta é que você precisa de um aplicativo Markdown capaz de processar o arquivo Markdown. Existem muitos aplicativos disponíveis - tudo, desde scripts simples a aplicativos de desktop que se parecem com o Microsoft Word. Apesar de suas diferenças visuais, todos os aplicativos fazem a mesma coisa. Como Dillinger, todos eles convertem texto formatado em Markdown em HTML para que possa ser exibido em navegadores da web.

Os aplicativos Markdown usam algo chamado de processador Markdown (também comumente referido como "`parser`" ou "`implementation`") para pegar o texto formatado em Markdown e gerá-lo no formato HTML. Nesse ponto, seu documento pode ser visualizado em um navegador da web ou combinado com uma folha de estilo e impresso. Você pode ver uma representação visual deste processo abaixo.

**Nota**: O aplicativo Markdown e o processador são dois componentes separados. Por uma questão de prática eu os combinei em um elemento ("Markdown App") na figura abaixo.

![The Markdown Process](https://bitbucket.org/wagnerbeethoven/2020-09-23-guia-markdown/raw/b504d6ed386a401897e7e2379e5cf572c06d3522/process.jpg "Processo do Markdown")

Para resumir, este é um processo de quatro partes:

1. Crie um arquivo Markdown usando um editor de texto ou um aplicativo Markdown dedicado. O arquivo deve ter uma extensão `.md` ou `.markdown`.
2. Abra o arquivo Markdown em um aplicativo Markdown.
3. Use o aplicativo Markdown para converter o arquivo Markdown em um documento HTML.
4. Visualize o arquivo HTML em um navegador da web ou use o aplicativo Markdown para convertê-lo em outro formato de arquivo, como PDF.

Da sua perspectiva, o processo irá variar um pouco dependendo do aplicativo que você usa. Por exemplo, Dillinger basicamente combina as etapas 1-3 em uma interface única e contínua - tudo o que você precisa fazer é digitar no painel esquerdo e a saída renderizada aparece magicamente no painel direito. Mas se você usar outras ferramentas, como um editor de texto com um gerador de site estático, verá que o processo é muito mais visível.

## O que é bom para o Markdown?

Markdown é uma maneira rápida e fácil de fazer anotações, criar conteúdo para um site da Web e produzir documentos prontos para impressão.

Não demora muito para aprender a sintaxe do Markdown e, depois que você souber como usá-la, poderá escrever usando o Markdown em quase todos os lugares. A maioria das pessoas usa o Markdown para criar conteúdo para a web, mas o Markdown é bom para formatar tudo, desde mensagens de e-mail a lista de compras.

Aqui estão alguns exemplos do que você pode fazer com o Markdown.

### Sites

O Markdown foi projetado para a web, portanto, não é nenhuma surpresa que existam muitos aplicativos projetados especificamente para a criação de conteúdo de sites.

Se você está procurando a maneira mais simples possível de criar um site com arquivos Markdown, verifique [blot.im](http://blot.im) e [smallvictori.es](http://smallvictori.es). Depois de se inscrever em um desses serviços, eles criam uma pasta Dropbox no seu computador. Basta arrastar e soltar seus arquivos Markdown na pasta e - puf! - eles estão em seu site. Não poderia ser mais fácil.

Se você estiver familiarizado com HTML, CSS e controle de versão, dê uma olhada no [Jekyll][jekyll], um popular gerador de sites estáticos que pega arquivos Markdown e constrói um site HTML. Uma vantagem dessa abordagem é que o [GitHub Pages](http://pages.github.com/) oferece hospedagem gratuita para sites gerados pelo Jekyll. Se Jekyll não é sua preferência, basta escolher um dos [muitos outros geradores de sites estáticos disponíveis](http://staticgen.com/).

### Documentos

O Markdown não tem todos os recursos de processadores de texto como o Microsoft Word, mas é bom o suficiente para criar documentos básicos como tarefas e cartas. Você pode usar um aplicativo de criação de documento Markdown para criar e exportar documentos formatados em Markdown para o formato de arquivo PDF ou HTML. A parte do PDF é fundamental porque, uma vez que você tenha um documento PDF, você pode fazer qualquer coisa com ele - imprimi-lo, enviá-lo por e-mail ou carregá-lo em um site.

Aqui estão alguns aplicativos de criação de documentos Markdown que eu recomendo:

- **Mac**: [MacDown][macdown], [iA Writer][ia-writer] ou [Marked][marked2app]
- **iOS** / **Android**: [iA Writer][ia-writer]
- **Windows**: [ghostwriter][ghostwriter] ou [Markdown Monster][markdownmonster]
- **Linux**: [ReText][retext] ou [ghostwriter][ghostwriter]
- **Web**: [Dillinger][dillinger] ou [StackEdit][stackedit]

**Dica**: o [iA Writer][ia-writer] fornece modelos para visualizar, imprimir e exportar documentos formatados com Markdown. Por exemplo, o modelo "Academic - MLA Style" recua parágrafos e adiciona espaçamento duplo de frases.

### Anotações

Em quase todos os aspectos, o Markdown é a sintaxe ideal para fazer anotações. Infelizmente, [Evernote](http://evernote.com/) e [OneNote](http://onenote.com/), dois dos aplicativos de notas mais populares, não são compatíveis com Markdown. A boa notícia é que vários outros aplicativos de notas suportam Markdown:

- [Simplenote](http://simplenote.com/) é um aplicativo de anotações básico gratuito disponível para todas as plataformas.
- [Notable](http://notable.app/) é um aplicativo de anotações executado em uma variedade de plataformas.
- [Bear](http://bear.app/) é um aplicativo semelhante ao Evernote disponível para dispositivos Mac e iOS. Ele não usa exclusivamente o Markdown por padrão, mas você pode ativar o modo de compatibilidade do Markdown.
- O [Boostnote](http://boostnote.io/) se autodenomina um "aplicativo de anotações de código aberto projetado para programadores".

Se você não pode se separar do Evernote, dê uma olhada no [Marxico](http://marxi.co/), um editor do Markdown baseado em assinatura para o Evernote, ou use o [Markdown Here](http://markdown-here.com/) com o site do Evernote.

### Livros

Quer publicar um romance por conta própria? Experimente o [Leanpub](http://leanpub.com/), um serviço que pega seus arquivos formatados em Markdown e os transforma em um livro eletrônico. Leanpub produz seu livro em formato de arquivo PDF, EPUB e MOBI. Se desejar criar cópias de seu livro em brochura, você pode fazer upload do arquivo PDF para outro serviço, como [Kindle Direct Publishing](http://kdp.amazon.com/). Para saber mais sobre como escrever e publicar um livro por conta própria usando Markdown, leia [esta postagem do blog](http://medium.com/techspiration-ideas-making-it-happen/how-i-wrote-and-published-my-novel-using-only-open-source-tools-5cdfbd7c00ca).

### Apresentações

Acredite ou não, você pode gerar apresentações a partir de arquivos formatados em Markdown. Demora um pouco para se acostumar com a criação de apresentações no Markdown, mas quando você pega o jeito, é muito mais rápido e fácil do que usar um aplicativo como o PowerPoint ou Keynote. [Remark](http://remarkjs.com/) ([projeto GitHub](http://github.com/gnab/remark)) é uma ferramenta popular de apresentação de slides Markdown baseada em navegador, assim como o [Cleaver](http://jdan.github.io/cleaver/) ([projeto GitHub](http://github.com/jdan/cleaver)). Se você usa um Mac e prefere usar um aplicativo, verifique [Deckset](http://decksetapp.com/) ou [Marked](http://marked2app.com/).

### Email

Se você envia muitos e-mails e está cansado dos controles de formatação disponíveis na maioria dos sites de provedores de e-mail, ficará feliz em saber que existe uma maneira fácil de escrever mensagens de e-mail usando Markdown. [Markdown Here](http://markdown-here.com/) é uma extensão de navegador gratuita e de código aberto que converte texto formatado em Markdown em HTML que está pronto para ser enviado.

### Documentação

Markdown é um ajuste natural para documentação técnica. Empresas como o GitHub estão mudando cada vez mais para o Markdown para sua documentação - confira [sua postagem no blog](http://github.blog/2015-01-06-how-github-uses-github-to-document-github/) sobre como eles migraram sua documentação formatada com Markdown para o [Jekyll][jekyll]. Se você escreve documentação para um produto ou serviço, dê uma olhada nestas ferramentas úteis:

- O [Read the Docs](http://readthedocs.org/) pode gerar um site de documentação a partir de seus arquivos Markdown de código aberto. Basta conectar seu repositório GitHub ao serviço e enviar - Read the Docs faz o resto. Eles também têm um [serviço para entidades comerciais](http://readthedocs.com/).
- MkDocs é um gerador de site estático rápido e simples que é voltado para a documentação do projeto de construção. Os arquivos de origem da documentação são gravados em Markdown e configurados com um único arquivo de configuração YAML. MkDocs tem [vários temas embutidos](http://mkdocs.org/user-guide/styling-your-docs/), incluindo uma porta do tema de documentação [Read the Docs](http://readthedocs.org/) para uso com MkDocs. Um dos temas mais recentes é o [Material MkDocs](http://squidfunk.github.io/mkdocs-material/).
- [Docusaurus](http://markdownguide.org/tools/docusaurus/) é um gerador de sites estáticos projetado exclusivamente para a criação de sites de documentação. Ele oferece suporte a traduções, pesquisa e controle de versão.
- [VuePress](http://vuepress.vuejs.org/) é um gerador de site estático desenvolvido pela [Vue](http://vuejs.org/) e otimizado para escrever documentação técnica.
- [Jekyll][jekyll] foi mencionado anteriormente na seção sobre sites, mas também é uma boa opção para gerar um site de documentação a partir de arquivos Markdown. Se você seguir esse caminho, certifique-se de verificar o [tema de documentação do Jekyll](http://idratherbewriting.com/documentation-theme-jekyll/).

## Variações do markdown

Um dos aspectos mais confusos do uso do Markdown é que praticamente todo aplicativo Markdown implementa uma versão ligeiramente diferente do Markdown. Essas variantes do Markdown são comumente chamadas de sabores. É seu trabalho dominar qualquer tipo de Markdown que seu aplicativo tenha implementado.

Para entender o conceito de sabores de Markdown, pode ser útil pensar neles como dialetos de linguagem. As pessoas em Ciudad Juárez falam espanhol da mesma forma que as pessoas em Barcelona, ​​mas existem diferenças substanciais entre os dialetos usados ​​nas duas cidades. O mesmo é verdadeiro para pessoas que usam diferentes aplicativos Markdown. Usar [Dillinger][dillinger] para escrever com Markdown é uma experiência muito diferente do que usar [Ulysses](http://ulysses.app/).

Em termos práticos, isso significa que você nunca sabe exatamente o que uma empresa quer dizer quando afirma que apoia o “Markdown”. Eles estão falando apenas sobre os elementos básicos da sintaxe ou todos os [elementos básicos](#basic-syntax "elementos básicos") e [estendidos](#extended-syntax "estendidos") da sintaxe combinados ou ainda alguma combinação arbitrária de elementos da sintaxe? Você não saberá até ler a documentação ou começar a usar o aplicativo.

Se você está apenas começando, o melhor conselho que posso dar é escolher um aplicativo Markdown com um bom suporte de Markdown. Isso ajudará muito a manter a portabilidade de seus arquivos Markdown. Você pode querer armazenar e usar seus arquivos Markdown em outros aplicativos e, para isso, precisa iniciar com um aplicativo que forneça um bom suporte. Você pode usar o [diretório de ferramentas](http://markdownguide.org/tools/) para encontrar um aplicativo que se encaixe na conta.

## Recursos adicionais

Existem muitos recursos que você pode usar para aprender o Markdown. Aqui estão alguns outros recursos introdutórios:

- [Documentação do Markdown de John Gruber](http://daringfireball.net/projects/markdown/). O guia original escrito pelo criador do Markdown.
- [Markdown Tutorial](http://markdowntutorial.com/). Um site de código aberto que permite que você experimente o Markdown em seu navegador.
- [Awesome Markdown](http://github.com/mundimark/awesome-markdown). Uma lista de ferramentas Markdown e recursos de aprendizagem.
- [Typesetting Markdown](http://dave.autonoma.ca/blog/2019/05/22/typesetting-markdown-part-1). Uma série que descreve um ecossistema para a formatação de documentos Markdown usando [pandoc](http://pandoc.org/) e [ConTeXt](http://contextgarden.net/).

---

## Visão geral {#overview}

Esses são os elementos descritos no documento do John Gruber. Todos os aplicativos Markdown oferecem suporte a esses elementos. Existem pequenas variações e discrepâncias entre os processadores Markdown - essas diferenças serão descritas no documento sempre que possível.

## Sintaxe Básica {#basic-syntax}

<div class="table-responsive">
<table summary="Sintaxe básica">
    <thead>
        <tr>
            <th>Elemento</th>
            <th>Sintaxe de markdown</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><span class="td-info">Caractere</span> <a title="Cabeçalho" href="#headings">Cabeçalho</a></td>
            <td><span class="td-info">Sintaxe de Markdown<br></span><code># Cabeçalho nível 1<br>## Cabeçalho nível 2<br>### Cabeçalho nível 3</code></td>
        </tr>
        <tr>
            <td><span class="td-info">Elemento</span> <a title="Negrito" href="#bold">Negrito</a></td>
            <td><span class="td-info">Sintaxe de Markdown</span> <code><strong>texto em negrito</strong></code></td>
        </tr>
        <tr>
            <td><span class="td-info">Elemento</span> <a title="Itálico" href="#italic">Itálico</a></td>
            <td><span class="td-info">Sintaxe de Markdown</span> <code><em>texto em itálico</em></code></td>
        </tr>
        <tr>
            <td><span class="td-info">Elemento</span> <a title="Bloco de citação" href="#blockquote">Bloco de citação</a></td>
            <td><span class="td-info">Sintaxe de Markdown</span> <code>&gt; bloco de citação</code></td>
        </tr>   
        <tr>
            <td><span class="td-info">Elemento</span> <a title="Lista ordenada" href="#ordered-lists">Lista ordenada</a></td>
            <td><span class="td-info">Sintaxe de Markdown<br></span> <code>1. Primeiro item<br>2. Segundo item<br>3. Terceiro item<br></code></td>
        </tr>
        <tr>
            <td><span class="td-info">Elemento</span> <a title="Lista não ordenada" href="#unordered-lists">Lista não ordenada</a></td>
            <td><span class="td-info">Sintaxe de Markdown<br></span> 
                <code>- Primeiro item<br>- Segundo item<br>- Terceiro item</code>
            </td>
        </tr>
        <tr>
            <td><span class="td-info">Elemento</span> <a title="Código" href="#code">Código</a></td>
            <td><span class="td-info">Sintaxe de Markdown</span> <code>codigo</code></td>
        </tr>
        <tr>
            <td><span class="td-info">Elemento</span> <a title="Régua horizontal" href="#horizontal-rules">Régua horizontal</a></td>
            <td><span class="td-info">Sintaxe de Markdown</span> <code>---</code></td>
        </tr>
        <tr>
            <td><span class="td-info">Elemento</span> <a title="Link" href="#links">Link</a></td>
            <td><span class="td-info">Sintaxe de Markdown</span> <code>[texto](google.com)</code></td>
        </tr>
        <tr>
            <td><span class="td-info">Elemento</span> <a title="Imagem" href="#image">Imagem</a></td>
            <td><span class="td-info">Sintaxe de Markdown</span> <code><img alt="Logo da Agência Sumô" title="Logo da Agência Sumô" src="https://bitbucket.org/wagnerbeethoven/2020-09-23-guia-markdown/raw/b504d6ed386a401897e7e2379e5cf572c06d3522/favicon-48x48.png" class="m-0 shadow-0"></code>
            </td>
        </tr>
    </tbody>
</table></div>

### Títulos {#headings}

Para criar um título, adicione sinais numéricos (`#`) na frente de uma palavra ou frase. O número de sinais numéricos que você usa deve corresponder ao nível do título. Por exemplo, para criar um título de nível três (`<h3>`), use três sinais numéricos (por exemplo, `### Meu cabeçalho`).

<div class="table-responsive"><table summary="Formatação de títulos">
<thead>
        <tr>
            <th>Markdown</th>
            <th>HTML</th>
            <th>Saída renderizada</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><span class="td-info">Markdown<br></span> <code># Título nível 1</code></td>
            <td><span class="td-info">HTML<br></span> <code>&lt;h1&gt;Título nível 1&lt;/h1&gt;</code></td>
            <td><span class="td-info">Saída renderizada<br></span> <span class="h1">Título nível 1</span></td>
        </tr>
        <tr>
            <td><span class="td-info">Markdown<br></span> <code>## Título nível 2</code></td>
            <td><span class="td-info">HTML<br></span> <code>&lt;h2&gt;Título nível 2&lt;/h2&gt;</code></td>
            <td><span class="td-info">Saída renderizada<br></span> <span class="h2">Título nível 2</span></td>
        </tr>
        <tr>
            <td><span class="td-info">Markdown<br></span> <code>### Título nível 3</code></td>
            <td><span class="td-info">HTML<br></span> <code>&lt;h3&gt;Título nível 3&lt;/h3&gt;</code></td>
            <td><span class="td-info">Saída renderizada<br></span> <span class="h3">Título nível 3</span></td>
        </tr>
        <tr>
            <td><span class="td-info">Markdown<br></span> <code>#### Título nível 4</code></td>
            <td><span class="td-info">HTML<br></span> <code>&lt;h4&gt;Título nível  4&lt;/h4&gt;</code></td>
            <td><span class="td-info">Saída renderizada<br></span> <span class="h4">Título nível 4</span></td>
        </tr>
        <tr>
            <td><span class="td-info">Markdown<br></span> <code>##### Título nível 5</code></td>
            <td><span class="td-info">HTML<br></span> <code>&lt;h5&gt;Título nível 5&lt;/h5&gt;</code></td>
            <td><span class="td-info">Saída renderizada<br></span> <span class="h5">Título nível 5</span></td>
        </tr>
        <tr>
            <td><span class="td-info">Markdown<br></span> <code>###### Título nível 6</code></td>
            <td><span class="td-info">HTML<br></span> <code>&lt;h6&gt;Título nível 6&lt;/h6&gt;</code></td>
            <td><span class="td-info">Saída renderizada<br></span> <span class="h6">Título nível 6</span></td>
        </tr>
    </tbody>
</table></div>

#### Sintaxe Alternativa {#headings-alt}

Como alternativa, na linha abaixo do texto, adicione qualquer número de `==` caracteres para o título de nível 1 ou `--` caracteres para o título de nível 2.

<div class="table-responsive"><table summary="Sintase alternativas de formatação de títulos">
<thead>
        <tr>
            <th>Markdown</th>
            <th>HTML</th>
           <th>Saída renderizada</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><span class="td-info">Markdown<br></span> <code>Título nível 1<br/>===============</code></td>
            <td><span class="td-info">HTML<br></span> <code>&lt;h1&gt;Título nível 1&lt;/h1&gt;</code></td>
            <td><span class="td-info">Saída renderizada<br></span> <span class="h1">Título nível 1</span></td>
        </tr>
        <tr>
            <td><span class="td-info">Markdown<br></span> <code>Título nível 2<br/>---------------</code></td>
            <td><span class="td-info">HTML<br></span> <code>&lt;h2&gt;Título nível 2&lt;/h2&gt;</code></td>
            <td><span class="td-info">Saída renderizada<br></span> <span class="h2">Título nível 2</span></td>
        </tr>
    </tbody>
</table></div>

#### Práticas recomendadas {#heading-best-practices}

Os aplicativos Markdown não concordam sobre como lidar com a falta de espaço entre os sinais numéricos (`#`) e o nome do título. Para compatibilidade, sempre coloque um espaço entre os sinais numéricos e o nome do título.

<div class="table-responsive"><table summary="Práticas recomendadas do uso de Títulos">
    <thead>
        <tr>
            <th>✅ Faça isso</th>
            <th>❌ Não faça isso</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <span class="td-info">✅ Faça isso<br></span> <code># Aqui é um título</code>
            </td>
            <td>
                <span class="td-info">❌ Não faça isso<br></span> <code>#Aqui é um título</code>
            </td>
        </tr>
    </tbody>
</table></div>

### Parágrafo {#paragraphs}

Para criar parágrafos, use uma linha em branco para separar uma ou mais linhas de texto.

<div class="table-responsive">
    <table summary="Parágrafo">
        <thead>
            <tr>
                <th>Markdown</th>
                <th>HTML</th>
                <th>Saída renderizada</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><span class="td-info">Markdown<br></span><code>Eu realmente gosto de usar o Markdown.<br /><br />Acho que vou usá-lo para formatar todos os meus documentos a partir de agora.</code></td>
                <td><span class="td-info">HTML<br></span><code>&lt;p&gt;Eu realmente gosto de usar o Markdown.&lt;/p&gt;<br /><br />&lt;p&gt;Acho que vou usá-lo para formatar todos os meus documentos a partir de agora.&lt;/p&gt;</code></td>
                <td><span class="td-info">Saída renderizada<br></span> <p>Eu realmente gosto de usar o Markdown.</p><p>Acho que vou usá-lo para formatar todos os meus documentos a partir de agora.</p></td>
            </tr>
        </tbody>
    </table>
</div>

#### Práticas recomendadas {#paragraph-best-practices}

A menos que o [parágrafo esteja em uma lista](#paragraph-list "Paragrafo dentro de listas"), não avance as linhas dos parágrafos com espaços ou tabulações.

<div class="table-responsive"><table summary="Práticas recomendadas do uso de parágrafos">
<thead>
        <tr>
            <th>✅ Faça isso</th>
            <th>❌ Não faça isso</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <span class="td-info">✅ Faça isso<br></span><code>Não coloque tabulações ou espaços na frente de seus parágrafos.<br><br>Mantenha as linhas alinhadas à esquerda assim.</code>
            </td>
            <td>
                
<span class="td-info">❌ Não faça isso<br></span><code>Isso pode resultar em problemas inesperados de formatação.<br><br>Não adicione tabulações ou espaços na frente dos parágrafos.
        </code>
            </td>
        </tr>
    </tbody>

</table></div>

### Quebra de linhas {#line-breaks}

Para criar uma quebra de linha (`<br>`), termine uma linha com dois ou mais espaços e retorne a digitar.

<div class="table-responsive"><table summary="Quebra de linha">
<thead>
        <tr>
            <th>Markdown</th>
            <th>HTML</th>
           <th>Saída renderizada</th>
        </tr>
    </thead>
    <tbody>
        <tr>
<td><span class="td-info">Markdown<br></span><code>Esta é a primeira linha <br />E esta é a segunda linha</code></td>
<td><span class="td-info">HTML<br></span><code>&lt;p&gt;Esta é a primeira linha&lt;br&gt;<br />E esta é a segunda linha&lt;/p&gt;</code></td>
<td><span class="td-info">Saída renderizada<br></span> <p>Esta é a primeira linha<br />E esta é a segunda linha</p>
            </td>
        </tr>
    </tbody>

</table></div>

#### Práticas recomendadas {#line-break-best-practices}

Você pode usar dois ou mais espaços (comumente chamados de "<em lagn="en">trailing whitespace</em>") para quebras de linha em quase todos os aplicativos Markdown, mas isso é controverso. É difícil ver espaços em branco em um editor, e muitas pessoas, acidental ou intencionalmente, colocam dois espaços após cada frase. Por esse motivo, você pode querer usar algo diferente de espaço em branco à direita para quebras de linha. Felizmente, há outra opção com suporte em quase todos os aplicativos Markdown: a tag `<br>` HTML.

Para compatibilidade, use um espaço em branco à direita ou a tag `<br>` HTML no final da linha.

Existem duas outras opções que não recomendo usar. [CommonMark][commonmark] e algumas outras linguagens de marcação leves permitem que você digite uma barra invertida (`\`) no final da linha, mas nem todos os aplicativos Markdown suportam isso, então não é uma ótima opção de uma perspectiva de compatibilidade. E pelo menos algumas linguagens de marcação leves não exigem nada no final da linha - basta voltar a digitar e elas criarão uma quebra de linha

<div class="table-responsive"><table  summary="Práticas recomendadas do uso de quebras de linha">
<thead>
        <tr>
            <th>✅ Faça isso</th>
            <th>❌ Não faça isso</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><span class="td-info">✅ Faça isso<br></span>
                <code>Este é a primeira linha com dois espaços no final. <br>E a próxima linha.<br><br>Esta é a primeira linha com a tag HTML depois do &lt;br&gt;<br>E a próxima linha.<br><br></code>
            </td>
            <td>
<span class="td-info">❌ Não faça isso<br></span>
                <code>Este é a primeira linha com a barra invertida no final. \<br>Esta é a próxima linha.<br><br>Esta é a primeira linha com nada depois.<br>Esta é a próxima linha.<br><br></code>
            </td>
        </tr>
    </tbody>
</table></div>

### Ênfase {#emphasis}

Você pode adicionar ênfase colocando o texto em negrito ou itálico.

#### Negrito {#emphasis-bold}

Para texto em negrito, adicione dois asteriscos ou sublinhados antes e depois de uma palavra ou frase. Para colocar em negrito no meio de uma palavra para dar ênfase, adicione dois asteriscos sem espaços ao redor das letras.

<div class="table-responsive"><table summary="Negrito">
<thead>
        <tr>
            <th>Markdown</th>
            <th>HTML</th>
           <th>Saída renderizada</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><span class="td-info">Markdown<br></span> <code>Eu adoro **texto em negrito**.</code></td>
            <td><span class="td-info">HTML<br></span> <code>Eu adoro &lt;strong&gt;texto em negrito&lt;/strong&gt;.</code></td>
            <td><span class="td-info">Saída renderizada<br></span>  Eu adoro <strong>texto em negrito</strong>.</td>
        </tr>
        <tr>
            <td><span class="td-info">Markdown<br></span> <code>Eu adoro __texto em negrito__.</code></td>
            <td><span class="td-info">HTML<br></span> <code>Eu adoro &lt;strong&gt;texto em negrito&lt;/strong&gt;.</code></td>
            <td><span class="td-info">Saída renderizada<br></span>  Eu adoro <strong>texto em negrito</strong>.</td>
        </tr>
        <tr>
            <td><span class="td-info">Markdown<br></span> <code>MeuAmor**É**Ousado</code></td>
            <td><span class="td-info">HTML<br></span> <code>MeuAmor&lt;strong&gt;É&lt;/strong&gt;Ousado</code></td>
            <td><span class="td-info">Saída renderizada<br></span>  MeuAmor<strong>É</strong>Ousado</td>
        </tr>
    </tbody>
</table></div>

##### Práticas recomendadas {#bold-best-practices}

Os aplicativos de Markdown não concordam sobre como lidar com sublinhados no meio de uma palavra. Para compatibilidade, use asteriscos para colocar em negrito o meio de uma palavra para dar ênfase.

<div class="table-responsive"><table summary="Práticas recomendadas do uso de negrito">
<thead>
        <tr>
            <th>✅ Faça isso</th>
            <th>❌ Não faça isso</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><span class="td-info">✅ Faça isso<br></span> <code>MeuAmor**É**Ousado</code></td>
            <td><span class="td-info">❌ Não faça isso<br></span> <code>MeuAmor__É__Ousado</code></td>
        </tr>
    </tbody>
</table></div>

#### Itálico {#emphasis-italic}

Para colocar o texto em itálico, adicione um asterisco ou sublinhado antes e depois de uma palavra ou frase. Para colocar em itálico o meio de uma palavra para dar ênfase, adicione um asterisco sem espaços ao redor das letras.

<div class="table-responsive"><table summary="Itálico">
<thead>
        <tr>
            <th>Markdown</th>
            <th>HTML</th>
           <th>Saída renderizada</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><span class="td-info">Markdown<br></span><code>Texto em itálico é o  *miau do gato*.</code></td>
            <td><span class="td-info">HTML<br></span><code>Texto em itálico é o  &lt;em&gt;miau do gato&lt;/em&gt;.</code></td>
            <td><span class="td-info">Saída renderizada<br></span> Texto em itálico é o  <em>miau do gato</em>.</td>
        </tr>
        <tr>
            <td><span class="td-info">Markdown<br></span><code>Texto em itálico é o  _miau do gato_.</code></td>
            <td><span class="td-info">HTML<br></span><code>Texto em itálico é o  &lt;em&gt;miau do gato&lt;/em&gt;.</code></td>
            <td><span class="td-info">Saída renderizada<br></span> Texto em itálico é o  <em>miau do gato</em>.</td>
        </tr>
        <tr>
            <td><span class="td-info">Markdown<br></span><code>Um*MiadoDo*Gato</code></td>
            <td><span class="td-info">HTML<br></span><code>Um&lt;em&gt;MiadoDo&lt;/em&gt;Gato</code></td>
            <td><span class="td-info">Saída renderizada<br></span> Um<em>MiadoDo</em>Gato</td>
        </tr>
    </tbody>
</table></div>

##### Práticas recomendadas {#italic-best-practices}

Os aplicativos de Markdown não concordam sobre como lidar com sublinhados no meio de uma palavra. Para compatibilidade, use asteriscos para colocar em itálico uma letra no meio de uma palavra.

<div class="table-responsive"><table summary="Práticas recomendadas do uso de itálico">
<thead>
        <tr>
            <th>✅ Faça isso</th>
            <th>❌ Não faça isso</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><span class="td-info">✅ Faça isso<br></span><code>Um*MiadoDo*Gato</code></td>
            <td>
<span class="td-info">❌ Não faça isso<br></span><code>Um_MiadoDo_Gato</code></td>
        </tr>
    </tbody>
</table></div>

#### Negrito e Itálico {#emphasis-bold-and-italic}

Para enfatizar o texto com negrito e itálico ao mesmo tempo, adicione três asteriscos ou sublinhados antes e depois de uma palavra ou frase. Para colocar em negrito e itálico no meio de uma palavra para dar ênfase, adicione três asteriscos sem espaços ao redor das letras.

<div class="table-responsive"><table summary="Negrito e Itálico">
<thead>
        <tr>
            <th>Markdown</th>
            <th>HTML</th>
           <th>Saída renderizada</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><span class="td-info">Markdown<br></span><code>Este texto é ***realmente importante***.</code></td>
            <td><span class="td-info">HTML<br></span><code>Este texto é &lt;strong&gt;&lt;em&gt;realmente importante&lt;/em&gt;&lt;/strong&gt;.</code></td>
            <td><span class="td-info">Saída renderizada<br></span> Este texto é <strong><em>realmente importante</em></strong>.</td>
        </tr>
        <tr>
            <td><span class="td-info">Markdown<br></span><code>Este texto é ___realmente importante___.</code></td>
            <td><span class="td-info">HTML<br></span><code>Este texto é &lt;strong&gt;&lt;em&gt;realmente importante&lt;/em&gt;&lt;/strong&gt;.</code></td>
            <td><span class="td-info">Saída renderizada<br></span> Este texto é <strong><em>realmente importante</em></strong>.</td>
        </tr>
        <tr>
            <td><span class="td-info">Markdown<br></span><code>Este texto é __*realmente importante*__.</code></td>
            <td><span class="td-info">HTML<br></span><code>Este texto é &lt;strong&gt;&lt;em&gt;realmente importante&lt;/em&gt;&lt;/strong&gt;.</code></td>
            <td><span class="td-info">Saída renderizada<br></span> Este texto é <strong><em>realmente importante</em></strong>.</td>
        </tr>
        <tr>
            <td><span class="td-info">Markdown<br></span><code>Este texto é **_realmente importante_**.</code></td>
            <td><span class="td-info">HTML<br></span><code>Este texto é &lt;strong&gt;&lt;em&gt;realmente importante&lt;/em&gt;&lt;/strong&gt;.</code></td>
            <td><span class="td-info">Saída renderizada<br></span> Este texto é <strong><em>realmente importante</em></strong>.</td>
        </tr>
        <tr>
            <td><span class="td-info">Markdown<br></span><code>Este é realmente um texto***muito***importante.</code></td>
            <td><span class="td-info">HTML<br></span><code>Este é realmente um texto&lt;strong&gt;&lt;em&gt;muito&lt;/em&gt;&lt;/strong&gt;importante.</code></td>
            <td><span class="td-info">Saída renderizada<br></span> Este é realmente um texto<strong><em>muito</em></strong>importante.</td>
        </tr>
    </tbody>
</table></div>

##### Práticas recomendadas {#bold-and-italic-best-practices}

Os aplicativos de Markdown não concordam sobre como lidar com sublinhados no meio de uma palavra. Para compatibilidade, use asteriscos para colocar em negrito e itálico no meio de uma palavra para dar ênfase.

<div class="table-responsive"><table summary="Práticas recomendadas do uso de itálico e negrito">
<thead>
        <tr>
            <th>✅ Faça isso</th>
            <th>❌ Não faça isso</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><span class="td-info">✅ Faça isso<br></span>
                <code>
            Isto é realmente***muito***importante.
          </code>
            </td>
            <td><span class="td-info">❌ Não faça isso<br></span>
                <code>
            Isto é realmente___muito___importante.
          </code>
            </td>
        </tr>
    </tbody>
</table></div>

### Citações em bloco {#blockquotes}

Para criar um bloco de citação (`blockquote`), adicione um `>` na frente de um parágrafo.

`> Dorothy a seguiu por muitas das belas salas de seu castelo.`

A renderização é essa:

> Dorothy a seguiu por muitas das belas salas de seu castelo.

#### Citações em bloco com vários parágrafos {#blockquotes-with-multiple-paragraphs}

Citações em bloco (`blockquote`) podem conter vários parágrafos. Adicione um `>` nas linhas em branco entre os parágrafos.

```
> Dorothy a seguiu por muitas das belas salas de seu castelo.<br>
>
> A Bruxa mandou que ela limpasse os potes, chaleiras, varresse o chão e mantivesse o fogo alimentado com lenha.
```

A renderização é essa:

> Dorothy a seguiu por muitas das belas salas de seu castelo.<br><br>
> A Bruxa mandou que ela limpasse os potes, chaleiras, varresse o chão e mantivesse o fogo alimentado com lenha.

#### Citações em bloco alinhados {#nested-blockquotes}

Citações em bloco (<code>blockquote</code>) podem ser aninhados. Adicione um `>>` na frente do parágrafo que deseja aninhar.

```
>Dorothy a seguiu por muitas das belas salas de seu castelo.
>> A Bruxa mandou que ela limpasse os potes, chaleiras, varresse o chão e mantivesse o fogo alimentado com lenha.
```

A renderização é essa:

> Dorothy a seguiu por muitas das belas salas de seu castelo.
>
> > A Bruxa mandou que ela limpasse os potes, chaleiras, varresse o chão e mantivesse o fogo alimentado com lenha.

#### Citações em bloco com outros elementos {#blockquotes-with-other-elements}

Citações em bloco (`blockquote`) podem conter outros elementos formatados em Markdown. Nem todos os elementos podem ser usados &mdash; você precisará experimentar para ver quais funcionam.

```
> #### Os resultados trimestrais estão ótimos!`
>
> - A receita estava fora do gráfico.
> - Os lucros foram maiores do que nunca.
>
>  * Tudo * está indo de acordo com o ** plano **.
```

A renderização é essa:

<blockquote>
  <span class="h4">Os resultados trimestrais estão ótimos!</span>
  <ul>
    <li>A receita estava fora do gráfico.</li>
    <li>Os lucros foram maiores do que nunca.</li>
  </ul>
  <p><em>Tudo</em> está indo de acordo com o <strong>plano</strong>.</p>
</blockquote>

### Listas {#lists}

Você pode organizar itens em listas ordenadas e não ordenadas.

#### Listas ordenadas {#ordered-lists}

Para criar uma lista ordenada, adicione itens de linha com números seguidos de pontos. Os números não precisam estar em ordem numérica, mas a lista deve começar com o número um.

<div class="table-responsive"><table summary="Listas ordenadas">
<thead>
        <tr>
            <th>Markdown</th>
            <th>HTML</th>
           <th>Saída renderizada</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><span class="td-info">Markdown<br></span><code>1. Primeiro item<br/>2. Segundo item<br/>3. Terceiro item<br/>4. Quarto item</code></td>
            <td><span class="td-info">HTML<br></span><code>&lt;ol&gt;<br>&lt;li&gt;Primeiro item&lt;/li&gt;<br/>&lt;li&gt;Segundo item&lt;/li&gt;<br/>&lt;li&gt;Terceiro item&lt;/li&gt;<br/>&lt;li&gt;Quarto item&lt;/li&gt;<br/>&lt;/ol&gt;</code></td>
            <td><span class="td-info">Saída renderizada<br></span> <ol><li>Primeiro item</li><li>Segundo item</li><li>Terceiro item</li><li>Quarto item</li></ol></td>
        </tr>
        <tr>
            <td><span class="td-info">Markdown<br></span><code>1. Primeiro item<br/>1. Segundo item<br/>1. Terceiro item<br/>1. Quarto item</code></td>
            <td><span class="td-info">HTML<br></span><code>&lt;ol&gt;<br>&lt;li&gt;Primeiro item&lt;/li&gt;<br/>&lt;li&gt;Segundo item&lt;/li&gt;<br/>&lt;li&gt;Terceiro item&lt;/li&gt;<br/>&lt;li&gt;Quarto item&lt;/li&gt;<br/>&lt;/ol&gt;</code></td>
            <td><span class="td-info">Saída renderizada<br></span> <ol><li>Primeiro item</li><li>Segundo item</li><li>Terceiro item</li><li>Quarto item</li></ol></td>
        </tr>
        <tr>
            <td><span class="td-info">Markdown<br></span><code>1. Primeiro item<br/>8. Segundo item<br/>3. Terceiro item<br/>5. Quarto item</code></td>
            <td><span class="td-info">HTML<br></span><code>&lt;ol&gt;<br>&lt;li&gt;Primeiro item&lt;/li&gt;<br/>&lt;li&gt;Segundo item&lt;/li&gt;<br/>&lt;li&gt;Terceiro item&lt;/li&gt;<br/>&lt;li&gt;Quarto item&lt;/li&gt;<br/>&lt;/ol&gt;</code></td>
            <td><span class="td-info">Saída renderizada<br></span> <ol><li>Primeiro item</li><li>Segundo item</li><li>Terceiro item</li><li>Quarto item</li></ol></td>
        </tr>
        <tr>
            <td><span class="td-info">Markdown<br></span><code>1. Primeiro item<br/>2. Segundo item<br/>3. Terceiro item<br/>1. Item recuado<br/>2. Item recuado<br/>4. Quarto item</code></td>
            <td><span class="td-info">HTML<br></span><code>&lt;ol&gt;<br>&lt;li&gt;Primeiro item&lt;/li&gt;<br/>&lt;li&gt;Segundo item&lt;/li&gt;<br/>&lt;li&gt;Terceiro item<br/>&lt;ol&gt;<br>&lt;li&gt;Item recuado&lt;/li&gt;<br/>&lt;li&gt;Item recuado&lt;/li&gt;<br/>&lt;/ol&gt;<br/>&lt;/li&gt;<br/>&lt;li&gt;Quarto item&lt;/li&gt;<br/>&lt;/ol&gt;</code></td>
            <td><span class="td-info">Saída renderizada<br></span> <ol><li>Primeiro item</li><li>Segundo item</li><li>Terceiro item<ol><li>Item recuado</li><li>Item recuado</li></ol></li><li>Quarto item</li></ol></td>
        </tr>
    </tbody>
</table></div>

##### Práticas recomendadas {#ordered-list-best-practices}

CommonMark e algumas outras linguagens de marcação leves permitem que você use um parêntese (`)`) como um delimitador (por exemplo, `1) Primeiro item`), mas nem todos os aplicativos Markdown suportam isso, então não é uma ótima opção de uma perspectiva de compatibilidade. Para compatibilidade, use apenas ponto (`.`).

<div class="table-responsive">
<table  summary="Práticas recomendadas do uso de listas ordenadas">
<thead>
        <tr>
            <th>✅ Faça isso</th>
            <th>❌ Não faça isso</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><span class="td-info">✅ Faça isso<br></span><code>1. Primeiro item<br>2. Segundo item</code></td>
            <td><span class="td-info">❌ Não faça isso<br></span><code>1) Primeiro item<br>2) Segundo item</code></td>
        </tr>
    </tbody>
</table></div>

#### Lista não ordenada

Para criar uma lista não ordenada, adicione travessões (`-`), asteriscos (`*`) ou sinais de adição (`+`) na frente dos itens de linha. Recue um ou mais itens para criar uma lista aninhada.

##### Práticas recomendadas

Os aplicativos de Markdown não concordam sobre como lidar com diferentes delimitadores na mesma lista. Para compatibilidade, não misture e combine delimitadores na mesma lista - escolha um e fique com ele.

<div class="table-responsive">
<table summary="Práticas recomendadas do uso de listas não ordenadas">
    <thead>
        <tr>
            <th>✅ Faça isso</th>
            <th>❌ Não faça isso</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><span class="td-info">✅ Faça isso<br></span>
                <code>
          - Primeiro item<br>
          - Segundo item<br>
          - Terceiro item<br>
          - Quarto item
        </code>
            </td>
            <td>
<span class="td-info">❌ Não faça isso<br></span>
                <code>
          + Primeiro item<br>
          * Segundo item<br>
          - Terceiro item<br>
          + Quarto item
        </code>
            </td>
        </tr>
    </tbody>
</table></div>

#### Adicionando Elementos em Listas {#adding-elements-in-lists}

Para adicionar outro elemento em uma lista enquanto preserva a continuidade da lista, indente o elemento quatro espaços ou uma tabulação, como mostrado nos exemplos a seguir.

##### Parágrafos {#list-paragraphs}

```
* Este é o primeiro item da lista.
* Este é o primeiro item da lista.

  Preciso adicionar outro parágrafo abaixo do item da lista Segundo.

- E aqui está o item da lista do Terceiro.
```

A renderização é essa:

- Este é o primeiro item da lista.
- Este é o primeiro item da lista.<br><br>
  Preciso adicionar outro parágrafo abaixo do item da lista Segundo.

* E aqui está o item da lista do terceiro.

##### Citações em bloco {#list-blockquotes}

```
* Este é o primeiro item da lista.
- Aqui está o item da lista Segundo.

  > Um blockquote ficaria ótimo abaixo do item da lista Segundo.

E aqui está o item da lista do Terceiro.

```

A renderização é essa:

- This is the first list item.
- Here's the second list item.

  > A blockquote would look great below the second list item.

- And here's the third list item.

##### Blocos de código {#code-blocks-1}

Os [blocos de código](#code-blocks "Bloco de código") são normalmente recuados quatro espaços ou uma <kbd>tab</kbd> <br>

Quando estiverem em uma lista, recue oito espaços ou duas tabulações.

```
 1. Abra o arquivo.
 2. Encontre o seguinte bloco de código na linha 21:

     <html>
       <head>
             <title>Teste</title>
       </head>

 3. Atualize o título para corresponder ao nome do seu site.
```

A renderização é essa:

1. Abra o arquivo.
2. Encontre o seguinte bloco de código na linha 21:

```
     <html>
       <head> <br>
             <title>Teste</title> <br>
       </head>
```

3. Atualize o título para corresponder ao nome do seu site.

##### Imagens {#images}

```
 1. Abra o arquivo que contém o mascote do Linux.
 2. Maravilhe-se com sua beleza.

    ![Tux, O mascote Linux](upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg)

 3. Fechar o arquivo
```

A renderização é essa:

1. Abra o arquivo que contém o mascote do Linux.
2. Maravilhe-se com sua beleza.

   ![Tux, O mascote Linux](https://bitbucket.org/wagnerbeethoven/2020-09-23-guia-markdown/raw/b504d6ed386a401897e7e2379e5cf572c06d3522/tux.png "Mascote do Linux")

3. Fechar o arquivo

##### Listas {#list-inside-list}

Você pode aninhar uma lista não ordenada em uma lista ordenada ou vice-versa.

```
 1. Primeiro item
 2. Segundo item
 3. Terceiro item
     - Item recuado
     - Item recuado
 4. Quarto item
```

A renderização é essa:

1. Primeiro item
2. Segundo item
3. Terceiro item
   - Item recuado
   - Item recuado
4. Quarto item

### Código {#code}

Para denotar uma palavra ou frase como código, coloque-a entre crases (<code> ` </code>).

<div class="table-responsive">
<table summary="Código">
<thead>
      <tr>
        <th>Markdown</th>
        <th>HTML</th>
       <th>Saída renderizada</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><span class="td-info">Markdown<br></span><code>No prompt de comando, digite `nano`.</code></td>
        <td><span class="td-info">HTML<br></span><code>No prompt de comando, digite &lt;code&gt;nano&lt;/code&gt;. </code></td>
        <td><span class="td-info">Saída renderizada<br></span> No prompt de comando, digite <code>nano</code>.</td>
      </tr>
    </tbody>
  </table></div>

#### Exibindo a crase (<code> ` </code>) {#escaping-backticks}

Se a palavra ou frase que você deseja exibir como código inclui um ou mais crases, você pode fazer o escape colocando a palavra ou frase entre crases duplos (<code> `</code>)

<div class="table-responsive"><table summary="Crase">
<thead>
      <tr>
        <th>Markdown</th>
        <th>HTML</th>
       <th>Saída renderizada</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><span class="td-info">Markdown<br></span><code>`Use `código` em seu arquivo markdown.`</code></td>
        <td><span class="td-info">HTML<br></span><code>&lt;code&gt;Use `código` em seu arquivo markdown.&lt;/code&gt;</code></td>
        <td><span class="td-info">Saída renderizada<br></span> <code>Use `código` em seu arquivo markdown.</code></td>
      </tr>
    </tbody>
  </table></div>

#### Bloco de código {#code-blocks}

Para criar blocos de código, avance cada linha do bloco em pelo menos quatro espaços ou uma tabulação.

```
    <html>
        <head>
        </head>
    </html>
```

A renderização é essa:

```
    <html>
        <head>
        </head>
    </html>
```

**Note**: Para criar blocos de código sem recuar linha, acesse [configurações avançadas de código](#fenced-code-blocks "Configurações avançadas de código").

### Régua horizontal {#horizontal}

Para criar uma régua horizontal <code>&lt;hr&gt;</code>, use três ou mais asteriscos ( `***` ), travessões ( `---` ) ou sublinhados ( `___` ) em uma linha.

\*\*\*

\-\-\-

A renderização é essa:

---

#### Práticas recomendadas {#horizontal-rule-best-practices}

Para compatibilidade, coloque linhas em branco antes e depois das régua horizontal <code>&lt;hr&gt;</code>.

<div class="table-responsive">
<table summary="Práticas recomendadas do uso de régua horizontal">
  <thead>
    <tr>
      <th>✅ Faça isso</th>
      <th>❌ Não faça isso</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><span class="td-info">✅ Faça isso<br></span><code>Tente colocar uma linha em branco antes de ...<br><br>---<br><br>... e depois de uma regra horizontal <code>&lt;hr&gt;</code>.</code></td>
      <td><span class="td-info">❌ Não faça isso<br></span><code>Sem linhas em branco, isso seria um título.<br>--- <br>Não faça isso!</code></td>
    </tr>
  </tbody>
</table></div>

### Links {#links}

Para criar um link, coloque o texto do link entre colchetes (por exemplo, `[Duck Duck Go]`) e siga-o imediatamente com o URL entre parênteses (por exemplo, <code>(duckduckgo.com )<code>).

`Meu mecanismo de pesquisa favorito é [Duck Duck Go](duckduckgo.com).`

A renderização é essa:

Meu mecanismo de pesquisa favorito é [Duck Duck Go](http://duckduckgo.com).

#### Adicionando títulos {#adding-titles}

Você pode adicionar um título para um link. Isso aparecerá como uma dica quando o usuário passar o mouse sobre o link. Para adicionar um título, coloque-o entre parênteses após o URL.

`Meu mecanismo de pesquisa favorito é [Duck Duck Go](duckduckgo.com "O melhor mecanismo de pesquisa para privacidade").`

A renderização é essa:

Meu mecanismo de pesquisa favorito é [Duck Duck Go](http://duckduckgo.com "O melhor mecanismo de pesquisa para privacidade").

#### URLs e endereços de e-mail {#urls-and-email-addresses}

Para transformar rapidamente um URL ou endereço de e-mail em um link, coloque-o entre colchetes angulares.

`<markdownguide.org>` ou `<email-falso@exemplo.com>`

A renderização é essa:

<http://markdownguide.org> ou <email-falso@exemplo.com>

#### Formatação dos links {#formatting-links}

Para [enfatizar os links "enfatizar os links"](#emphasis), adicione asteriscos antes e depois dos colchetes e parênteses. Para exibir links como [código "código"](#code), adicione crases entre colchetes.

`Eu amo apoiar a **[EFF](`http://eff.org`)**.` <br>
`Este é o * [Guia de marcação](`http://markdownguide.org`) *.` <br>
` Veja a seção em [`código`] (# código). `

A renderização é essa:

Eu amo apoiar a **[EFF](http://eff.org)**. <br>
Este é o _[Guia de marcação](http://markdownguide.org)_. <br>
Veja a seção em [`código`](#código).

#### Links de referência {#reference-style-links}

Os links de referência são um tipo especial de link que torna os URLs mais fáceis de exibir e ler no Markdown. Os links de referência são construídos em duas partes: a parte que você mantém alinhada com o seu texto e a parte que você armazena em algum outro lugar do arquivo para manter o texto fácil de ler.

##### Formatando a primeira parte do link {#formatting-the-first-part-of-the-link}

A primeira parte de um link de referência é formatada com dois conjuntos de colchetes. O primeiro conjunto de colchetes envolve o texto que deve aparecer vinculado. O segundo conjunto de colchetes exibe um rótulo usado para apontar para o link que você está armazenando em outro lugar no documento.

Embora não seja obrigatório, você pode incluir um espaço entre o primeiro e o segundo conjunto de colchetes. O rótulo no segundo conjunto de colchetes não diferencia maiúsculas de minúsculas e pode incluir letras, números, espaços ou pontuação.

Isso significa que os formatos de exemplo a seguir são aproximadamente equivalentes para a primeira parte do link:

```
- [hobbit-hole]
- [hobbit-hole]
```

##### Formatando a segunda parte do link {#formatting-the-second-part-of-the-link}

A segunda parte de um link de estilo de referência é formatada com os seguintes atributos:

1. O rótulo, entre colchetes, seguido imediatamente por dois pontos e pelo menos um espaço (por exemplo, `[rótulo]:`).
2. O URL do link, que você pode colocar opcionalmente entre colchetes angulares.
3. O título opcional do link, que você pode colocar entre aspas duplas, aspas simples ou parênteses.

Isso significa que os formatos de exemplo a seguir são praticamente equivalentes para a segunda parte do link:

- `[1]: http://en.wikipedia.org/wiki/Hobbit#Lifestyle`
- `[1]: http://en.wikipedia.org/wiki/Hobbit#Lifestyle "Hobbit lifestyles"`
- `[1]: http://en.wikipedia.org/wiki/Hobbit#Lifestyle 'Hobbit lifestyles'`
- `[1]: http://en.wikipedia.org/wiki/Hobbit#Lifestyle (Hobbit lifestyles)`
- `[1]: <http://en.wikipedia.org/wiki/Hobbit#Lifestyle> "Hobbit lifestyles"`
- `[1]: <http://en.wikipedia.org/wiki/Hobbit#Lifestyle> 'Hobbit lifestyles'`
- `[1]: <http://en.wikipedia.org/wiki/Hobbit#Lifestyle> (Hobbit lifestyles)`

Você pode colocar esta segunda parte do link em qualquer lugar do documento Markdown. Algumas pessoas os colocam imediatamente após o parágrafo em que aparecem, enquanto outras os colocam no final do documento (como notas de fim ou de rodapé).

###### Um exemplo juntando as peças: {#putting-the-parts-together}

Digamos que você adicione um URL como um link de [URL padrão](#links) para um parágrafo e se parece com isto no Markdown:

`Em um buraco no chão vivia um hobbit. Não é um buraco sujo, sujo e úmido, cheio de pontas de vermes e um cheiro de gosma, nem ainda um buraco seco, vazio e arenoso sem nada nele para sentar ou para comer: era um [buraco do hobbit](http://en.wikipedia.org/wiki/Hobbit#Lifestyle "estilos de vida do hobbit") e isso significa conforto.`

Embora possa apontar para informações adicionais interessantes, o URL conforme exibido realmente não acrescenta muito ao texto bruto existente, exceto torná-lo mais difícil de ler. Para corrigir isso, você pode formatar o URL assim:

`Em um buraco no chão vivia um hobbit. Não é um buraco sujo, sujo e úmido, cheio de pontas de vermes e um cheiro de gosma, nem ainda um buraco seco, vazio e arenoso sem nada nele para sentar ou para comer: era um [buraco de hobbit][1] e isso significa conforto.`

`[1]: <http://en.wikipedia.org/wiki/Hobbit#Lifestyle> "Hobbit Lifestyles"`

Em ambos os casos acima, a renderização será idêntica:

> Em um buraco no chão vivia um hobbit. Não um buraco nojento, sujo e úmido, cheio de pontas de vermes e um cheiro de gosma, nem ainda um buraco seco, vazio e arenoso sem nada para sentar ou comer: era um [buraco de hobbit](http://en.wikipedia.org/wiki/Hobbit#Lifestyle) e que significa conforto.

e o HTML para o link seria:

`<a href="http://en.wikipedia.org/wiki/Hobbit#Lifestyle" title="Hobbit lifestyles">buraco de hobbit</a>`

#### Práticas recomendadas {#link-best-practices}

Os aplicativos de Markdown não concordam sobre como lidar com espaços no meio de uma URL. Para compatibilidade, tente codificar em URL quaisquer espaços com `%20`.

<div class="table-responsive"><table  summary="Práticas recomendadas do uso de links">
  <thead>
    <tr>
      <th>✅ Faça isso</th>
      <th>❌ Não faça isso</th>
    </tr>
    </thead>
    <tbody>
      <tr>
        <td><span class="td-info">✅ Faça isso<br></span><code>[link](http://example.com/my%20great%20page)</code></td>
        <td><span class="td-info">❌ Não faça isso<br></span><code>[link](http://example.com/my great page)</code></td>
      </tr>
    </tbody>
</table></div>

### Imagens {#images}

Para adicionar uma imagem, adicione um ponto de exclamação (`!`), seguido pelo texto alternativo (`alt`) entre colchetes e o caminho ou URL para o recurso de imagem entre parênteses. Você pode opcionalmente adicionar um título após o URL entre parênteses.

`![Jardins Mágicos da Filadélfia. Este lugar é tão legal!](/img/philly-magic-gardens.jpg "Jardins Mágicos da Filadélfia")`

A renderização é essa:

![Jardins Mágicos da Filadélfia. Este lugar é tão legal!](https://bitbucket.org/wagnerbeethoven/2020-09-23-guia-markdown/raw/b504d6ed386a401897e7e2379e5cf572c06d3522/philly-magic-garden.jpg "Jardins Mágicos da Filadélfia")

#### Imagens com links {#linking-images}

Para adicionar um link a uma imagem, coloque o Markdown da imagem entre colchetes e, a seguir, adicione o link entre parênteses.

`[![Uma pedra antiga no deserto](img/shiprock.jpg "Shiprock, Novo México por Beau Rogers")](http://flic.kr/p/Qv3rFw)`

A renderização é essa:

[![Uma pedra antiga no deserto](https://bitbucket.org/wagnerbeethoven/2020-09-23-guia-markdown/raw/b504d6ed386a401897e7e2379e5cf572c06d3522/shiprock.jpg "Shiprock, Novo México por Beau Rogers")](http://flic.kr/p/Qv3rFw)

### Exibir caracteres de formatação {#escaping}

Para exibir um caractere literal que seria usado para formatar texto em um documento Markdown, adicione uma barra invertida (`\`) na frente do caractere.

`\* Sem a barra invertida, isso seria um marcador em uma lista não ordenada.`

A saída renderizada é semelhante a esta:

- Sem a barra invertida, isso seria um marcador em uma lista não ordenada.

#### Caracteres que podem ser exibidos pela barra invertida {#characters-you-can-escape}

Você pode usar uma barra invertida para exibir os caracteres a seguir:

<div class="table-responsive"><table summary="Barra invertida">
  <thead>
    <tr>
      <th>Caractere</th>
      <th>Nome</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><span class="td-info">Caractere</span> \</td>
      <td><span class="td-info">Nome </span>Barra invertida</td>
    </tr>
    <tr>
      <td><span class="td-info">Caractere</span> `</td>
      <td><span class="td-info">Nome </span>Crase (veja também <a href="#escaping-backticks">como exibir crase dentro da formatação de código</a>)
      </td>
    </tr>
    <tr>
      <td><span class="td-info">Caractere</span> *</td>
      <td><span class="td-info">Nome </span>Asterisco</td>
    </tr>
    <tr>
      <td><span class="td-info">Caractere</span> _</td>
      <td><span class="td-info">Nome </span>Sublinhado</td>
    </tr>
    <tr>
      <td><span class="td-info">Caractere</span> {  }</td>
      <td><span class="td-info">Nome </span>Chaves</td>
    </tr>
    <tr>
      <td><span class="td-info">Caractere</span> [  ]</td>
      <td><span class="td-info">Nome </span>Colchetes</td>
    </tr>
    <tr>
      <td><span class="td-info">Caractere</span> (  )</td>
      <td><span class="td-info">Nome </span>Parênteses</td>
    </tr>
    <tr>
      <td><span class="td-info">Caractere</span> #</td>
      <td><span class="td-info">Nome </span>Cerquilha, jogo da velha, tralha ou <span lang="en">hashtag</span></td>
    </tr>
    <tr>
      <td><span class="td-info">Caractere</span> +</td>
      <td><span class="td-info">Nome </span>Sinal de mais</td>
    </tr>
    <tr>
      <td><span class="td-info">Caractere</span> -</td>
      <td><span class="td-info">Nome </span>Sinal de menos (hífen)</td>
    </tr>
    <tr>
      <td><span class="td-info">Caractere</span> .</td>
      <td><span class="td-info">Nome </span>Ponto</td>
    </tr>
    <tr>
      <td><span class="td-info">Caractere</span> !</td>
      <td><span class="td-info">Nome </span>Símbolo de exclamação</td>
    </tr>
    <tr>
      <td><span class="td-info">Caractere</span> |</td>
      <td><span class="td-info">Nome </span>Barra vertical ou <span lang="en">pipe</span> (Veja também <a href="#escaping-pipe-characters-in-tables">como exibir pipe dentro de uma tabela</a>)</td>
    </tr>
  </tbody>
</table></div>

### HTML {#html}

Muitos aplicativos Markdown permitem que você use tags HTML em texto formatado por Markdown. Isso é útil se você preferir certas tags HTML à sintaxe Markdown. Por exemplo, algumas pessoas acham mais fácil usar tags HTML para imagens. Usar HTML também é útil quando você precisa alterar os atributos de um elemento, como especificar a cor do texto ou alterar a largura de uma imagem.

Para usar HTML, coloque as tags no texto do arquivo formatado em Markdown.

`Esta **palavra** está em negrito. Esta <em>palavra</em> está em itálico.`

A renderização é essa:

Esta **palavra** está em negrito. Esta <em>palavra</em> está em itálico.

#### Práticas recomendadas {#html-best-practices}

Por razões de segurança, nem todos os aplicativos Markdown suportam HTML em documentos Markdown. Em caso de dúvida, verifique a documentação do aplicativo Markdown. Alguns aplicativos suportam apenas um subconjunto de tags HTML.

Use linhas em branco para separar elementos HTML em nível de bloco como `<div>`, `<table>`, `<pre>` e `<p>` do conteúdo circundante. Tente não recuar as tags com tabulações ou espaços - isso pode interferir na formatação.

Você não pode usar a sintaxe Markdown dentro de tags HTML de nível de bloco. Por exemplo, `<p>_itálico_ e **negrito** </p>` não funcionam.

---

## Sintaxe avançada {#extended-syntax}

Esses elementos estendem a sintaxe básica, adicionando recursos adicionais. Nem todos os aplicativos Markdown suportam esses elementos.

<div class="table-responsive"><table summary="Síntaxe avançada de Markdown">
<thead>
        <tr>
            <th>Elemento</th>
            <th>Sintaxe de markdown</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><span class="td-info">Elemento<br></span><a href="#tables">Tabela</a></td>
            <td><span class="td-info">Sintaxe de markdown<br></span><pre>
            | Sintaxe         | Descrição         |
            | --------------- | ----------------- |
            | Cabeçalho       | Título            |
            | Paragrafo       | Texto             |
            </pre></td>
        </tr>
        <tr>
            <td><span class="td-info">Elemento<br></span><a href="#fenced-code-blocks">Bloco de código</a></td>
            <td><span class="td-info">Sintaxe de markdown</span><pre>
            ```
              {
                "firstName": "John",
                "lastName": "Smith",
                "age": 25
              }
            ```
      </pre></td>
        </tr>
        <tr>
            <td><span class="td-info">Elemento<br></span><a href="#footnotes">Nota de rodapé</a></td>
            <td><span class="td-info">Sintaxe de markdown<br></span><code>Aqui é um texto com nota de rodapé. [^1]<br><br>[^1]: Esta é a nota de rodapé.</code></td>
        </tr>
        <tr>
            <td><span class="td-info">Elemento<br></span><a href="#heading-ids"><code>ID</code> no cabeçalho</a></td>
            <td><span class="td-info">Sintaxe de markdown<br></span><code>### Título nível 3 {#custom-id}</code></td>
        </tr>
        <tr>
            <td><span class="td-info">Elemento<br></span><a href="#definition-lists">Lista de Definição</a></td>
            <td><span class="td-info">Sintaxe de markdown<br></span><pre>
            Termo
            : Definição</pre></td>
        </tr>
        <tr>
            <td><span class="td-info">Elemento<br></span><a href="#strikethrough">Tachado</a></td>
            <td><span class="td-info">Sintaxe de markdown<br></span><code>~~A terra é plana~~</code></td>
        </tr>
        <tr>
            <td><span class="td-info">Elemento<br></span><a href="#task-lists">Lista de tarefas</a></td>
            <td><span class="td-info">Sintaxe de markdown<br></span><code>
        - [x] Escrever o <em>press release</em><br>
        - [ ] Atualizar o site<br>
        - [ ] Contato com a imprensa
      </code></td>
        </tr>
    </tbody>

</table></div>

A [sintaxe básica](#basic-syntax) delineada no documento original de John Gruber adicionou muitos dos elementos necessários no dia-a-dia, mas não foi suficiente para algumas pessoas. É aí que entra a sintaxe estendida.

Vários indivíduos e organizações se encarregaram de estender a sintaxe básica adicionando elementos adicionais como tabelas, blocos de código, realce de sintaxe, link automático de URL e notas de rodapé. Esses elementos podem ser ativados usando uma linguagem de marcação leve que se baseia na sintaxe Markdown básica ou adicionando uma extensão a um processador Markdown compatível.

Nem todos os aplicativos Markdown oferecem suporte a elementos de sintaxe estendidos. Você precisará verificar se a linguagem de marcação leve que seu aplicativo está usando suporta ou não os elementos de sintaxe estendida que você deseja usar. Se não, ainda pode ser possível habilitar extensões em seu processador Markdown.

### Linguagens de marcação leves

Existem várias linguagens de marcação leves que são _superconjuntos_ do Markdown. Eles incluem a sintaxe básica de Gruber e a baseiam na adição de elementos adicionais como tabelas, blocos de código, destaque de sintaxe, link automático de URL e notas de rodapé. Muitos dos aplicativos Markdown mais populares usam uma das seguintes linguagens de marcação leves:

- [CommonMark][commonmark]
- [GitHub Flavored Markdown (GFM)][gfm]
- [Markdown Extra][mdx]
- [MultiMarkdown][mdm]
- [R Markdown][rmd]

### Processadores Markdown {#markdown-processors}

Existem [dezenas de processadores Markdown][dezenas] disponíveis. Muitos deles permitem adicionar extensões que permitem elementos de sintaxe estendidos. Verifique a documentação do seu processador para obter mais informações.

### Tabelas {#tables}

Para adicionar uma tabela, use três ou mais hifens (`---`) para criar o cabeçalho de cada coluna e use barras verticais (`|`) para separar cada coluna. Opcionalmente, você pode adicionar tubos em qualquer extremidade da tabela.

```
| Sintaxe      | Descrição    |
| ------------ | ------------ |
| Cabeçalho    | Título       |
| Paragrafo    | Texto        |
```

A renderização é essa:

| Sintaxe   | Descrição |
| --------- | --------- |
| Cabeçalho | Título    |
| Paragrafo | Texto     |

As larguras das células podem variar, conforme mostrado abaixo, mas o resultado será sempre o mesmo

```
| Sintaxe | Descrição |
| --- | ----------- |
| Cabeçalho | Título |
| Paragrafo | Texto |
```

**Dica**: Criar tabelas com hifens e tubos pode ser entediante. Para acelerar o processo, tente usar o [Gerador de tabelas Markdown][tablemd]. Crie uma tabela usando a interface gráfica e, a seguir, copie o texto formatado em Markdown gerado em seu arquivo.

#### Alinhamento {#alignment}

Você pode alinhar o texto nas colunas à esquerda, à direita ou ao centro adicionando dois pontos (`:`) à esquerda, à direita ou em ambos os lados dos hifens na linha do cabeçalho.

```
| Sintaxe      | Descrição    | Teste texto      |
| :---         | :----:       | ---:             |
| Cabeçalho    | Título       | Exemplo de texto |
| Paragrafo    | Texto        | E mais exemplo   |
```

A renderização é essa:

| Sintaxe   | Descrição |      Teste texto |
| :-------- | :-------: | ---------------: |
| Cabeçalho |  Título   | Exemplo de texto |
| Paragrafo |   Texto   |   E mais exemplo |

#### Formatação de textos em tabelas {#formatting-text-in-tables}

Você pode formatar o texto dentro das tabelas. Por exemplo, você pode adicionar [links](#links), [código](#code) (formatação de palavras ou frases utilizando a crase (<code> ` </code>), mas não [blocos de código](#code-blocks)) e formação com [ênfase](#emphasis).

Você não pode adicionar títulos, cotas bloqueadas, listas, regras horizontais, imagens ou tags HTML.

#### Exibindo o `pipe` {#escaping-pipe-characters-in-tables}

Você pode exibir um caractere de barra vertical (`|`) em uma tabela usando seu código de caractere HTML (`&#124;`).

### Bloco de códigos indentados {#fenced-code-blocks}

A sintaxe básica do Markdown permite criar [blocos de código](#code-blocks) avançando as linhas em quatro espaços ou uma tabulação. Se você achar isso inconveniente, tente usar blocos de código protegidos. Dependendo do seu processador ou editor Markdown, você usará três crases (` `` `) ou três tis (`~~~`) nas linhas antes e depois do bloco de código. A melhor parte? Você não precisa recuar nenhuma linha!

````
```
{
  "primeiroNome": "João",
  "ultimoNome": "Silva",
  "idade": 25
}
```
````

A renderização é essa:

```
{
  "primeiroNome": "João",
  "ultimoNome": "Silva",
  "idade": 25
}
```

**Dica** Você deseja exibir crases dentro de um bloco de código? Consulte [esta seção para aprender](#escaping-backticks) como exibi-los.

#### Realce de código {#syntax-highlighting}

Muitos processadores Markdown suportam realce de bloco de código. Este recurso permite adicionar realce de cor para qualquer linguagem em que seu código foi escrito. Para adicionar realce de sintaxe, especifique um idioma próximo as crases antes do bloco de código exibido.

````
```json
  {
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
  }
```
````

A renderização é essa:

```json
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
```

### Notas de rodapé {#footnotes}

As notas de rodapé permitem adicionar notas e referências sem confundir o corpo do documento. Quando você cria uma nota de rodapé, um número sobrescrito com um link aparece onde você adicionou a referência da nota de rodapé. Os leitores podem clicar no link para ir para o conteúdo da nota de rodapé na parte inferior da página.

Para criar uma referência de nota de rodapé, adicione um circunflexo e um identificador entre colchetes (`[^1]`). Os identificadores podem ser números ou palavras, mas não podem conter espaços ou tabulações. Os identificadores correlacionam apenas a referência da nota de rodapé com a própria nota de rodapé - na saída, as notas de rodapé são numeradas sequencialmente.

Adicione a nota de rodapé usando outro acento circunflexo e número entre colchetes com dois pontos e texto (`[^1]: Minha nota de rodapé`). Você não precisa colocar notas de rodapé no final do documento. Você pode colocá-los em qualquer lugar, exceto dentro de outros elementos como listas, citações em bloco e tabelas. `[^1]: Minha nota de rodapé`.

```
Aqui está uma nota de rodapé simples, [^1] e aqui está outra mais longa. [^nota]

[^1]: Esta é a primeira nota de rodapé.
[^nota]: Aqui está um com vários parágrafos e código.

Avance parágrafos para incluí-los na nota de rodapé.

`{meu código}`

Adicione quantos parágrafos desejar.
```

A renderização é essa:

Aqui está uma nota de rodapé simples, [^1] e aqui está outra mais longa. [^nota]

[^1]: Esta é a primeira nota de rodapé.
[^nota]: Aqui está um com vários parágrafos e código.

Avance parágrafos para incluí-los na nota de rodapé.

`{meu código}`

Adicione quantos parágrafos desejar.

### IDs nos títulos {#heading-ids}

Muitos processadores Markdown suportam IDs personalizados para [cabeçalhos](#headings) - alguns processadores Markdown os adicionam automaticamente. Adicionar IDs personalizados permite que você vincule diretamente aos títulos e os modifique com CSS. Para adicionar um ID de título personalizado, coloque o ID personalizado entre chaves na mesma linha do título.

```text
### Meu ótimo título {#meu-id-personalizado}
```

A renderização é essa:

```text
<h3 id="meu-id-personalizado">Meu ótimo título</h3>
```

#### Links para os IDs dos títulos

Você pode vincular títulos com IDs personalizados no arquivo criando um [link padrão](#links) com um sinal de número (`#`) seguido pelo ID do cabeçalho personalizado.

<div class="table-responsive"><table summary="Links âncoras">
  <thead>
    <tr>
      <th>Markdown</th>
      <th>HTML</th>
     <th>Saída renderizada</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>[IDs dos títulos](#heading-ids)</code></td>
      <td><code> &lt;a href="#heading-ids"&gt;IDs dos títulos&lt;/a&gt;</code></td>
      <td><a href="#heading-ids">IDs dos títulos</a></td>
    </tr>
  </tbody>
</table></div>

Outros sites podem se vincular ao título adicionando o ID do título personalizado ao URL completo da página da web (por exemplo, `[ID do título](http://markdownguide.org/extended-syntax#heading-ids)`).

### Listas de Definição {#definition-lists}

Alguns processadores Markdown permitem criar lista de definições de termos (_definition list_) e suas definições correspondentes. Para criar uma lista de definições, digite o termo na primeira linha. Na próxima linha, digite dois pontos seguido por um espaço e a definição

````
```html
Primeiro termo
: Esta é a definição do primeiro item.

Segundo termo
: Esta é a definição do segundo item.
```
````

O HTML será esse:

```html
<dl>
  <dt>First Term</dt>
  <dd>This is the definition of the first term.</dd>
  <dt>Second Term</dt>
  <dd>This is one definition of the second term.</dd>
</dl>
```

A renderização é essa:

Primeiro termo
: Esta é a definição do primeiro item.

Segundo termo
: Esta é a definição do segundo item.

### Tachado {#strikethrough}

Você pode tachar palavras colocando uma linha horizontal no centro delas. ~~O resultado é assim~~. Este recurso permite que você indique que certas palavras são um erro que não deve ser incluído no documento. Para rasurar palavras, use dois símbolos de til ( `~~` ) antes e depois das palavras.

`~~O mundo é plano~~. Agora sabemos que o mundo é redondo.`

A renderização é essa:

~~O mundo é plano~~. Agora sabemos que o mundo é redondo.

### Lista de tarefas {#task-lists}

As listas de tarefas permitem que você crie uma lista de itens com caixas de seleção. Em aplicativos Markdown que suportam listas de tarefas, as caixas de seleção serão exibidas ao lado do conteúdo. Para criar uma lista de tarefas, adicione travessões ( `-` ) e colchetes com um espaço ( `[ ]` ) na frente dos itens da lista de tarefas. Para selecionar uma caixa de seleção, adicione um `x` entre os colchetes ( `[x]` ).

```
- [x] Escrever o *release* para imprensa
- [ ] Atualizar o site
- [ ] Contactar a mídia
```

O resultado será algo parecido com a imagem abaixo:

- [x] Escrever o _release_ para imprensa
- [ ] Atualizar o site
- [ ] Contactar a mídia

### Emoji {#emoji}

Existem duas maneiras de adicionar emoji a arquivos Markdown: copie e cole o emoji em seu texto formatado em Markdown ou digite códigos de _emoji shortcodes_.

#### Copiando e colando emoji {#copying-and-pasting-emoji}

Na maioria dos casos, você pode simplesmente copiar um emoji de uma fonte como a [Emojipedia][emojipedia] e colá-lo em seu documento. Muitos aplicativos Markdown exibirão automaticamente o emoji no texto formatado em Markdown. Os arquivos HTML e PDF exportados do aplicativo Markdown devem exibir o emoji.

**Dica**: Se você estiver usando um gerador de site estático, certifique-se de que o [encode da sua página HTML está em UFT-8][w3c].

#### Usando os atalhos

Alguns aplicativos Markdown permitem inserir emoji digitando códigos de atalho de emoji. Eles começam e terminam com dois pontos e incluem o nome de um emoji.

```text
Indo acampar! :tent: Volto logo.

Isso será tão divertido! :joy:
```

A renderização é essa:

Indo acampar! ⛺ Volto logo.

Isso será tão divertido! 😂

**Observação**: você pode usar esta lista de códigos de atalho de emoji, mas lembre-se de que os códigos de atalho de emoji variam de aplicativo para aplicativo. Consulte a documentação do aplicativo Markdown para obter mais informações.

### Vinculação automática de URL {#automatic-url-linking}

Muitos processadores Markdown transformam URLs em links automaticamente. Isso significa que se você digitar `http://exemplo.com` seu processador Markdown o transformará automaticamente em um link, mesmo que você não tenha [usado colchetes](#links).

`http://google.com`

A renderização é essa:

<http://google.com>

#### Desabilitando a vinculação automática de URL {#disabling-automatic-url-linking}

e você não quiser que um URL seja vinculado automaticamente, você pode remover o link [exibindo o URL como um código com crases](#code).

```
`http://google.com`
```

A renderização é essa:

`http://google.com`

[markdownguide]: http://markdownguide.org/
[cc]: http://creativecommons.org/licenses/by-sa/4.0/
[dillinger]: http://dillinger.io/
[jekyll]: http://jekyllrb.com
[macdown]: http://macdown.uranusjr.com/
[ia-writer]: http://ia.net/writer
[marked2app]: http://marked2app.com/
[ghostwriter]: http://wereturtle.github.io/ghostwriter/
[markdownmonster]: http://markdownmonster.west-wind.com/
[retext]: http://github.com/retext-project/retext
[stackedit]: http://stackedit.io/
[commonmark]: http://commonmark.org/
[gfm]: http://github.github.com/gfm/
[mdx]: http://michelf.ca/projects/php-markdown/extra/
[mdm]: http://fletcherpenney.net/multimarkdown/
[rmd]: http://rmarkdown.rstudio.com/
[dezenas]: http://github.com/markdown/markdown.github.com/wiki/Implementations~
[tablemd]: http://tablesgenerator.com/markdown_tables
[emojipedia]: http://emojipedia.org
[w3c]: http://w3.org/International/tutorials/tutorial-char-enc/
