---
layout: post
title: "Hackathon CNJ Inova ou o primeiro Hackathon a gente nunca esquece"
summary: "Todos os detalhes da construção e as impressões do que rolou na competição"
categories: blog
comments: true
image: https://bitbucket.org/wagnerbeethoven/2021-02-13-hackathon-cnj-inova/raw/fd40f3e50aa824a6e2781d4d7e54b9b9e8bebbb8/hackathon/cnj-inova-demoday.jpg
legend: Recorte da sabatina de perguntas após a apresentação do pitch do projeto.
description: "Como conseguimos chegar em 2º lugar na competição"
alt: Recorte da sabatina de perguntas após a apresentação do pitch do projeto
tags:
  - Hackathon
  - CNJ Inova
  - Conselho Nacional de Justiça
---

# Panorama traz os gargalos da Justiça Brasileira

Na minha cabeça hackathon sempre foi sinônimo de virar noites produzindo e construído ideias inacabadas. Diego Lages já tinha me convidado uma vez, neguei por causa de um período ruim da vida, mas no segundo convite, já estava mentalmente mais estável e de coração aberto para cair de cabeça na aventura.

O hackathon foi o do **Conselho Nacional de Justiça**, após o aceite, já estava num grupo do WhatsApp formado por mim e mais 5 mentes desconhecidas, mas brilhantes!

A turma tinha vivência e *know-how* gigantesco sobre Justiça Brasileira, processamento de dados e desenvolvimento de software.

**Nós conquistamos o 2º lugar!** Foi uma grata surpresa, mesmo não tenho conquistado o 1º lugar, o resultado foi muito melhor do que esperava.

Vou tentar detalhar todo o processo nos textos abaixo.

# O Hackathon

[![imagem da fachada de um prédio ao fundo com diversos pontos por cima. Texto: Enap Convida. CNJ Inova. Ciência de dados e Inteligência Artificial. Abertura das inscrições: sexta, 11 de setembro, as 10h. [www.youtube.com/user/CanalENAP](http://www.youtube.com/user/CanalENAP). Live. CNJ. Pátria Amada Brasil Governo Federal.](https://bitbucket.org/wagnerbeethoven/2021-02-13-hackathon-cnj-inova/raw/fd40f3e50aa824a6e2781d4d7e54b9b9e8bebbb8/hackathon/cnj-inova-facebook.png "Clique na imagem para visualizar a publicação original no Facebook")](https://www.facebook.com/cnj.oficial/photos/4446714988734560)

## Release

> O Conselho Nacional de Justiça (CNJ) convidou profissionais de áreas multidisciplinares para que desenvolvam soluções inovadoras, descentralizadas e disruptivas que beneficiarão toda a sociedade para atacar duas dores da Justiça Brasileira.
> Os desafios propostos foram:
>
> **Tempo e Produtividade**: identificar padrões e comparar o andamento de processos em cada unidade judiciária do Brasil,  levando em consideração as peculiaridades locais e o nível de complexidade, em razão da competência e da matéria do direito.
>
> **Inconsistências de Dados nos Sistemas Jurídicos**: identificar e corrigir as inconsistências nos metadados dos processos em tramitação nos sistemas dos tribunais.

[![ao fundo fotografia de um grupo de pessoas ao redor de uma mesa escrevendo. Texto: Números Desafio CNJ Inova. 522 inscritos no CNJ Inova. 66 times em 2 desafios. Desafio 1: 43 times. Desafio 2: 23 times. 263 horários disponíveis para mentoria. CNJ Inova. Ciência de dados e Inteligência artificial. Enap. Lab Griô. Shawee. CNJ. Pátria amada Brasil. Governo Federal.](https://bitbucket.org/wagnerbeethoven/2021-02-13-hackathon-cnj-inova/raw/fd40f3e50aa824a6e2781d4d7e54b9b9e8bebbb8/hackathon/cnj-inova-resultado-dos-inscritos.jpg "Cique na imagem para visualizar a publicação original do CNJ no Instagram")](https://www.instagram.com/p/CGXvY4RBLOs)

Conseguimos ganhar dos 43 times que estavam concorrendo na primeira etapa, já na segunda a disputa estava entre os 3 melhores do primeiro desafio.

## Composição da equipe

- Analista de processos de negócios: [Diego Lages](https://www.dadoscominteligencia.com.br/) e [Renato Cirne](https://www.linkedin.com/in/renato-cirne-31867b1b8/).
- Back-End: [Gabriel Bandeira](https://www.linkedin.com/in/gabriel-bandeira/) e [Luiz Felipe Verçosa](https://www.linkedin.com/in/luiz-felipe-vieira-vercosa-b990b57a/)
- Front-End: [Fernando Oliveira](https://www.linkedin.com/in/fernando-oliveira-2b764231/):
- UI/UX Designer: Wagner Beethoven

## Documentos do CNJ

<a href="https://bitbucket.org/wagnerbeethoven/2021-02-13-hackathon-cnj-inova/raw/15a857406571d7f9e08f873923b0fba4431577db/hackathon/cnj-inova-1-edital.pdf" download class="documento">CNJ Inova: Edital <small>250 KB</small></a>

<a href="https://bitbucket.org/wagnerbeethoven/2021-02-13-hackathon-cnj-inova/raw/15a857406571d7f9e08f873923b0fba4431577db/hackathon/cnj-inova-2-briefing.pdf" download class="documento">CNJ Inova: Briefing <small>3 MB</small></a>

<a href="https://bitbucket.org/wagnerbeethoven/2021-02-13-hackathon-cnj-inova/raw/cb96872ad9e128040499f910d1e8a8247f8ff533/cnj-inova-4-informacoes-complementares.pdf" download class="documento">CNJ Inova: Informações complementares <small>1.45 MB</small></a>

<a href="https://bitbucket.org/wagnerbeethoven/2021-02-13-hackathon-cnj-inova/raw/cb96872ad9e128040499f910d1e8a8247f8ff533/cnj-inova-resultado-final-fase-1.pdf" download class="documento">🥉 Resultado da fase 1 <small>209 KB</small></a>

<a href="https://bitbucket.org/wagnerbeethoven/2021-02-13-hackathon-cnj-inova/raw/cb96872ad9e128040499f910d1e8a8247f8ff533/cnj-inova-resultado-final-fase-2.pdf" download class="documento">🥈 Resultado da fase 2 <small>102 KB</small></a>

# O desafio

Nossa equipe escolheu o primeiro desafio. **Tempo e Produtividade**, a organização entregou diversos materiais que auxiliaram para concepção da solução.

### Sobre o problema enfrentado: Tempo e Produtividade

> Como podemos, a partir da base do DataJud, identificar padrões e comparar o andamento de processos em cada unidade judiciária do Brasil, levando em consideração as peculiaridades locais e o nível de complexidade, em razão da competência e da matéria do direito? **#processmining**
>
> Não se sabe o padrão de andamento dos processos judiciais semelhantes em todas as unidades judiciárias, nas diferentes localidades e regiões do Brasil.
>
> A consequência direta é a dificuldade em proporcionar transparência, tanto interna quanto externa, necessária aos dados que são produzidos pelas unidades judiciárias, e a impossibilidade de gerenciar soluções para os gargalos, que não conseguem ser devidamente identificados.
>
> A equipe que escolher o **DESAFIO 1** terá que pensar em soluções que fomentem a celeridade processual.
>
> A equipe deverá ainda:  
> (1) construir uma estratégia inteligente de controle interno de processos e alertar sobre possíveis gargalos no tempo de tramitação processual;  
> (2) auxiliar na construção de um diagnóstico para oportunizar medidas assertivas a fim de permitir maior eficiência dos atos.
>
> A clusterização[^1] de unidades judiciárias semelhantes é particularmente importante, pois permite comparações nacionais, considerando suas características específicas. O modelo de classificação deve ser capaz de identificar os fatores de discriminação entre as unidades com base nos tipos processuais nas classes, nos assuntos, no fluxo dos processos, entre outros.

### Mentorias e Avaliações

A organização disponibilizou a etapa de mentoria com profissionais de diversas áreas de conhecimentos e que de alguma forma estavam envolvidos com a justiça brasileira.

#### 1ª Etapa

Na primeira fase, tivemos a mentoria do Gestor de Conteúdo **[Thiago Brito](https://www.linkedin.com/in/thsilvabrito/)**. Fomos recebidos com excelentes feedbacks. O investimento da interatividade entre os juízes foi o único ponto levantando como item de melhoria.

As avaliações dos projetos foram feitas por especialistas em computação.

#### 2ª Etapa

Na segunda etapa, a mentoria foi feita com os envolvidos diretamente com o CNJ. Foi sugerido que mudássemos a persona — ao invés utilizar as personas já existentes e fornecidas pela organização. O foco seria os funcionários do CNJ, porém sem interesse com o usuário final da aplicação, ou seja, nada de juízes.

## Demoday

A apresentação final da solução proposta foi feita no sábado (28/12/2020) pela manhã através de vídeo conferência. Os avaliadores foram Carl Smith (Secretaria de Programas, Pesquisas e Gestão Estratégica), Thiago Vieira (Gestor de Sistemas Corporativos do CNJ) e Fábio Porto (Magistrado) e tivemos exatamente 5 minutos para apresentação e mais 5 minutos perguntas dos jurados.

O processo ocorreu de maneira como tínhamos previsto, algumas dúvidas nós [já tínhamos mapeado](#possíveis-perguntas) e isso foi bom, já que as nossas respostas foram mais diretas e assertivas. Após todas as equipes do primeiro desafio se apresentarem, pediram que escolhêssemos 1 membro para participar sozinho de uma sabatina de perguntas sobre o processo de construção da solução e funcionamento da ferramenta durante 30 minutos.

Com o final das equipes do segundo desafio, o resultado foi dito!  
🏆 Ficamos com o segundo lugar.

<a href="https://bitbucket.org/wagnerbeethoven/2021-02-13-hackathon-cnj-inova/raw/cb96872ad9e128040499f910d1e8a8247f8ff533/cnj-inova-demoday-apresentacao.pdf" download class="documento">Slide de apresentação do Pitch <small>1.01 MB</small></a>

### A apresentação no Demoday [Panorama]

O vídeo abaixo é um recorte da apresentação da minha equipe. Para visualizar as apresentações completas, acesse o [perfil do CNJ no Youtube][demoday-final].

<div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/3GfGHxTlJRE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

---

Tentarei trazer do processo de Design que desenvolvi junto com a equipe, mesmo com o pouco tempo para desenvolver e imergir no problema.

# A solução - Panorama

![Logo da Solução - Panorama](https://bitbucket.org/wagnerbeethoven/2021-02-13-hackathon-cnj-inova/raw/fd40f3e50aa824a6e2781d4d7e54b9b9e8bebbb8/hackathon/logo-panorama.svg)

## Personas

Para primeira fase, a organização nos forneceu 4 perfis do público-alvo:

- juiz
- funcionário da unidade jurídica
- advogado
- cidadão comum

Vendo o tanto que esses perfis poderiam trazer de ganhos reais e rápidos para o ambiente jurídico e o tanto que precisaríamos trabalhar para sanar suas dores de maneira eficiente, decidimos escolher apenas o juiz. Sendo ele, o topo da cadeia jurídica, seu trabalho é decisório para o processo. Embora o cidadão comum ter sido cogitado, não iríamos agregar ganhos significativos quanto o juiz.

[![(Personas) Casos e Relatos: Relato 01 - Juiz - Desembargador "Após a digitalização dos processos, gostaria de ter um sistema que me auxilie a identificar os problemas da minha unidade a fim de consertá-los e aumentar a produtividade da vara..." Logo do CNJ Inova, do Conselho Nacional de Justiça e do Brasil.](https://bitbucket.org/wagnerbeethoven/2021-02-13-hackathon-cnj-inova/raw/15a857406571d7f9e08f873923b0fba4431577db/hackathon/cnj-inova-resumo-da-persona.jpg "Clique para visualizar a publicação original do para Lab Griô no Instagram")](ttps://www.instagram.com/p/CFzfi32ne4i)

O CNJ forneceu algumas fichas das personas que você poderá conferir abaixo:  
<a href="https://bitbucket.org/wagnerbeethoven/2021-02-13-hackathon-cnj-inova/raw/15a857406571d7f9e08f873923b0fba4431577db/hackathon/cnj-inova-3-casos-e-relatos-personas.pdf" download class="documento">CNJ Inova - Casos e Relatos (Personas) <small>1 MB</small></a>

### Análise da Persona: O Juiz

Analisando os documentos disponibilizados pelo Hackathon: [**CNJ Inova: Briefing**][briefing] e [**CNJ Inova - Casos e Relatos (Personas)**](https://bitbucket.org/wagnerbeethoven/2021-02-13-hackathon-cnj-inova/raw/15a857406571d7f9e08f873923b0fba4431577db/hackathon/cnj-inova-3-casos-e-relatos-personas.pdf) pudemos entender melhor o contexto geral do problema e as necessidades dos principais <em lang="en">Stakeholders<em> envolvidos. Decidimos restringir o escopo do projeto para atender essencialmente as necessidades identificadas da **persona do JUIZ/DESEMBARGADOR**, que:

> Cuida, atualmente, de uma vara com 80.000 processos, sendo a maioria físicos, sente que sua equipe está motivada e quer gerar resultados, mas diante da quantidade de processos pendentes de julgamento e da administração da sua unidade judiciária, vê-se absolutamente sem tempo.

### Desejos

Entender **onde estão os problemas da sua unidade judiciária** para poder consertá-los e incrementar sua produtividade.

- Quer que sua produtividade fosse **comparada com seus semelhantes**, levando em consideração as competências, a situação atual e os recursos disponíveis.
- **Receber relatórios estatísticos** que o norteiam sobre o desenvolvimento dos julgados, para saber se sua equipe está produzindo bem gostaria também de melhorar a triagem dos processos, por meio de melhor cadastramento, para poder otimizar seus julgados pelo julgamento “em bloco”.

### Dores

- **Comparam sua unidade judiciária** com outras que **desempenham funções diferentes**
- Os processos que chegam até ele frequentemente mal cadastrados e com dados equivocados que o forçam a buscar dados na petição inicial para sanear o cadastramento. (**DESAFIO 2**).

Após o feedback obtidos na segunda etapa do desafio, foi adicionada a persona do CNJ, de modo a incluir na ferramenta uma visão macro dos problemas de desempenho das várias unidades judiciárias do Brasil, e não somente o painel da unidade judiciária de um Juiz / Desembargador específico.

Nesse sentido, formalizamos o problema como:

> PROBLEMA: O CNJ não possui uma ferramenta que possa auxiliá-los a identificar os problemas de desempenho das Unidades Judiciárias semelhantes. Na mesma medida, os Juízes e Desembargadores também não possuem uma ferramenta que possa auxiliá-los a incrementar sua produtividade, identificando onde estão os problemas de sua unidade e sugerindo ações para corrigi-los ou minimizá-los.

Através da formalização do problema, pudemos identificar vários subproblemas (desafios) que deveriam ser endereçados para que o problema pudesse ser resolvido.

- Identificar indicadores de produtividade relevantes
- Definir uma forma de simplificar e comparar os processos de unidades distintas
- Definir um critério de agrupamento de unidades judiciárias semelhantes levando em consideração as competências, situação atual e os recursos disponíveis da unidade judiciária

Após análise da persona, nós planejamos a solução criamos a Panorama.

## O que a Panorama se propõe

**Identificar e solucionar os gargalos de tramitações processuais de unidades judiciárias similares, considerando a colaboração, o alerta de desempenho e a geração de informação para tomada de decisão.**

Falando de maneira mais clara (para quem não é da área jurídica), a Panorama compara o tempo dos processos de unidades jurídicas (UJs) que tratam do mesmo assunto, após essa comparação, o sistema ranqueia as melhores e as piores. Para ajudar nessa comparação e ranqueamento, separamos em macro etapas padrões que são associadas a todos os processos.

### Macro etapas

Algumas características foram pensadas para guiar nossa solução, organizamos em 10 etapas. Elas serviram como guias para a tomada de decisões.

<figure>
   <img src="https://bitbucket.org/wagnerbeethoven/2021-02-13-hackathon-cnj-inova/raw/fd40f3e50aa824a6e2781d4d7e54b9b9e8bebbb8/hackathon/macro-etapas.svg" alt="1 - Distribuição; 2 - Conclusão; 3 - Liminar; 4 - Despacho; 5 - Citação; 6 - Audiência; 7 - Decisão; 8 - Julgamento; 9 - Trânsito em Julgado; 10 - Arquivamento;">
   <figcaption>1 - Distribuição; 2 - Conclusão; 3 - Liminar; 4 - Despacho; 5 - Citação; 6 - Audiência; 7 - Decisão; 8 - Julgamento; 9 - Trânsito em Julgado; 10 - Arquivamento;</figcaption>
</figure>

### Principais características da solução

A panorama vai além do ranqueamento. Essas funcionalidades foram as apresentadas na 2ª fase da competição.

<figure><img src="https://bitbucket.org/wagnerbeethoven/2021-02-13-hackathon-cnj-inova/raw/fd40f3e50aa824a6e2781d4d7e54b9b9e8bebbb8/hackathon/principais-caracteristicas.svg" alt="1 - Simplicidade; 2 - Objetividade; 3 - Rapidez; 4 - Qualidade; 5 - Foco no problema; 6 - Encontrar soluções; 7 - Associados as Boas Práticas do CNJ; 8 - Interatividade; 9 - Avisos e Alertas de situações em crise; 10 - Sugere melhorias baseadas em inteligência artificial;"><figcaption>1 - Simplicidade; 2 - Objetividade; 3 - Rapidez; 4 - Qualidade; 5 - Foco no problema; 6 - Encontrar soluções; 7 - Associados as Boas Práticas do CNJ; 8 - Interatividade; 9 - Avisos e Alertas de situações em crise; 10 - Sugere melhorias baseadas em inteligência artificial;</figcaption></figure>

### Funcionalidades principais

<figure class="w-75 h-auto mx-auto d-block"><img src="https://bitbucket.org/wagnerbeethoven/2021-02-13-hackathon-cnj-inova/raw/fd40f3e50aa824a6e2781d4d7e54b9b9e8bebbb8/hackathon/macro-funcionalidade.svg" alt="Grupo de UJs simulares; Alertas de movimentos anormais; Ranking de UJs; Notificações de UJ; Compartilhamento de boas práticas; Suporte a decisões;"><figcaption>Grupo de UJs simulares; Alertas de movimentos anormais; Ranking de UJs; Notificações de UJ; Compartilhamento de boas práticas; Suporte a decisões;</figcaption></figure>

### As tecnologias utilizadas

<figure><img src="https://bitbucket.org/wagnerbeethoven/2021-02-13-hackathon-cnj-inova/raw/fd40f3e50aa824a6e2781d4d7e54b9b9e8bebbb8/hackathon/tecnologias.svg" alt="Ícones representando as tecnoligias: HTML; CSS; JS; Phython; Bootstrap; Mongo; Heroku; Sass; Docker;"><figcaption>HTML; CSS; JS; Phython; Bootstrap; Mongo; Heroku; Sass; Docker</figcaption></figure>

Não irei detalhar aspectos de back-end, tais como: fluxos e manipulação de dados, arquitetura do sistema.  
Maiores detalhes podem ser acessados no [GitHub do projeto][github-front-2].

## Entregáveis

Inicialmente o Diogo Lages construiu uma versão preliminar, porém já muito complexa, essa complexidade não era um entregável ruim, longe disso, porém inviável pelo pouquíssimo tempo que tínhamos, já que nenhum membro da equipe tinha dedicação exclusiva ao projeto, ficando apenas com as noites e os finais de semana.

O material apresentando abaixo - versão "zero", foi idealizado por Diego, porém reorganizado por mim. Os arquivos podem ser acessados através dos links abaixo, porém só estão navegáveis se o `.pdf` for aberto no navegador. Não é facilmente compreendido por usuários que não estão familiarizados com as terminologias jurídicas e de análise de dados.

<a href="https://bitbucket.org/wagnerbeethoven/2021-02-13-hackathon-cnj-inova/raw/1e60349a3c9f150a5001787dadb9055aee14b5d1/0-cnj-inova-wireframe-diego.pdf" class="documento">Versão preliminar construída por Diogo <small>2.42 MB</small></a>

<a href="https://bitbucket.org/wagnerbeethoven/2021-02-13-hackathon-cnj-inova/raw/e38a0f6a5243ed970126ea47e3d2161285050907/hackathon/1-cnj-inova-wireframe-diego.pdf" class="documento">Versão "Zero" refeita <small>1.11 MB</small></a>

### Fase 1

Na fase 1 a aplicação ainda estava baseada no Juiz e o foco era comparação da finalização de etapas e/ou processos. A interação com os grafos era muito forte, neles, o Juiz poderia visualizar a duração de cada macro etapa e quantidade de movimentações.

As funcionalidades dessa primeira entrega foram:

1. Posicionamento da UJ - a classificação entre as instituições é sempre entre as etapas e a finalização do processo;
2. Alertas (grafos) com os maiores (piores) tempos de conclusão das etapas;
3. Destaques (grafos) de melhores tempos de conclusão de cada etapa;
4. Comentários dos juízes das mais bem posicionadas UJs relacionadas as etapas exibidas em tela;
5. Exibição de alguns números: tempo de baixa de processo, movimentação por processo, processos julgados, etapa com o melhor e pior desempenho;
6. Gráfico de análise das macro etapas;
7. Ranking com os melhores tempos;
8. "Unidades vizinhas" - baseado na posição da UJ. Serão exibidas as duas da posição acima e as duas abaixo, e;
9. Mapa de distribuição geográfica das UJs semelhantes

**Wireframe**

<div class="row">
<div class="col-12 col-md"><figure><img class="rounded" data-toggle="modal" data-target="#cnj-4" title="Clique para abrir a imagem maior" alt="Página inicial da Panorama da fase 1 do Hackathon" src="https://bitbucket.org/wagnerbeethoven/2021-02-13-hackathon-cnj-inova/raw/fd40f3e50aa824a6e2781d4d7e54b9b9e8bebbb8/hackathon/2-cnj-inova-wireframe-1-home.png"><figcaption>Página inicial da Panorama da fase 1 do Hackathon</figcaption></figure></div>
<div class="col-12 col-md"><figure><img class="rounded" data-toggle="modal" data-target="#cnj-5" title="Clique para abrir a imagem maior" alt="Página de detalhes da Panorama da fase 1 do Hackathon" src="https://bitbucket.org/wagnerbeethoven/2021-02-13-hackathon-cnj-inova/raw/fd40f3e50aa824a6e2781d4d7e54b9b9e8bebbb8/hackathon/2-cnj-inova-wireframe-2-detalhes.png"><figcaption>Página de detalhes da Panorama da fase 1 do Hackathon</figcaption></figure></div>
</div>

### Fase 1 e ½

Entre as fases 1 e 2 e das mentorias, nós tivemos um tempo e fizemos algumas seções de _brainstorm_, infelizmente a versão não foi desenvolvida, apenas desenhada, coloquei o nome dessa versão de "fase 1 e ½".

<figure><img alt="Página inicial da Panorama da fase 1 e ½ do Hackathon" src="https://bitbucket.org/wagnerbeethoven/2021-02-13-hackathon-cnj-inova/raw/fd40f3e50aa824a6e2781d4d7e54b9b9e8bebbb8/hackathon/3-cnj-inova-wireframe-apontamento.png"><figcaption>Tela inicial</figcaption></figure>

1. Região que exibe qual é a posição da unidade jurídica no ranking com as demais com mesmo tipo;
2. Espaço destinado ao usuário filtrar as informações da tela;
3. Menu da aplicação
4. Área do usuário - aqui ele poderá visualizar seu nome e foto, acesso as configurações da aplicação e link para sair;
5. Região de informações rápidas associadas a unidade jurídica do usuário logado, com essas informações o juiz irá visualizar:
   - quanto tempo em média leva cada processo;
   - quantidade de etapas passa cada processo até a finalização;
   - quantos processos são julgados mensalmente;
   - qual é a etapa com o melhor desempenho (a mais veloz);
   - qual é a etapa com o pior desempenho (a mais lenta);
6. A região de "Análise detalhada das unidades jurídicas" é o único local de interação do usuário. Aqui o juiz irá enxergar os números de outras UJs;
7. Seletor que tipo de informação ele quer saber, as etapas das UJs com bons (destaques) ou maus (gargalos) números;
8. O sistema exibe as informações conforme o ranking, porém filtrar quais etapas ele quer exibir na tela, assim saber quais UJs tem determinada posição e quais os comentários. Esse filtro deverá ser utilizado em conjunto com o seletor de Destaques ou Gargalos;
9. Essa seção mostra os detalhes das etapas, tais como: duração, posição da UJ do usuário logado e a quantidade de vezes que essa etapa ocorre, além de comentário de UJs sobre as mesmas etapas.  
   Aqui ,o juiz pode compartilhar impressões de bons resultados sobre as etapas e o usuário logado poderá curtir ou escrever um comentário;
10. As informações descritas acima são exibidas com o mesmo formato, porém com etapas diferentes.  
    Não há limite para a quantidade de vezes que esse contêiner pode aparecer;
11. Um gráfico com as macro etapas mostrando a média percentual de cada uma delas e o nome das melhores UJs;
12. Lista dos melhores tempos das UJs do mesmo tipo;
13. Mapa com a posição geográfica e informações de contato das 10 melhores UJs, e ;
14. Ranking mostrando a UJ do usuário logado e as duas com posição acima e as duas com posição abaixo.

### Fase 2

Na fase 2, a mentoria na segunda fase [**sugeriu** mudássemos](#2ª-etapa) a persona, com isso, precisamos mudar alguns contextos apresentados anteriormente. Aproveitamos parte da etapa 1 e da 1 e ½. Aqui, o filtro passou a considerar além da justiça e o grau, o grupo. O sistema parou de usar grafos, passou a focar nos alertas e a possibilidade de o CNJ mandar mensagens para as UJs sobre as atividades fora do esperado ou enviar elogios para as UJs que superaram as expectativas. Consideramos mostrar a tela de login e assim mostrar que o sistema está interessado com o uso das boas práticas do CNJ.

<div class="row">
<div class="col-12 col-md"><figure><img class="rounded" data-toggle="modal" data-target="#cnj-1" title="Clique para abrir a imagem maior" src="https://bitbucket.org/wagnerbeethoven/2021-02-13-hackathon-cnj-inova/raw/fd40f3e50aa824a6e2781d4d7e54b9b9e8bebbb8/hackathon/3-cnj-inova-home.png"><figcaption>Página inicial</figcaption></figure></div>
<div class="col-12 col-md"><figure><img class="rounded" data-toggle="modal" data-target="#cnj-2" title="Clique para abrir a imagem maior" src="https://bitbucket.org/wagnerbeethoven/2021-02-13-hackathon-cnj-inova/raw/fd40f3e50aa824a6e2781d4d7e54b9b9e8bebbb8/hackathon/3-cnj-inova-detalhes-destaques.png"><figcaption>Tela de detalhes - Destaques</figcaption></figure></div>
<div class="col-12 col-md"><figure><img class="rounded" data-toggle="modal" data-target="#cnj-3" title="Clique para abrir a imagem maior" src="https://bitbucket.org/wagnerbeethoven/2021-02-13-hackathon-cnj-inova/raw/fd40f3e50aa824a6e2781d4d7e54b9b9e8bebbb8/hackathon/3-cnj-inova-detalhes-gargalo.png"><figcaption>Tela de detalhes - Gargalos</figcaption></figure></div>
</div>

# Pitch da Panorama

Para o nosso Pitch, escolhemos Renato Cirne, pelo conhecimento na área jurídica. Vou compartilhar as anotações:

## Dicas de Pitch

- Falar da forma como os juízes entendem
- Não memorizar cada palavra (ter um discurso natural)
- Antecipar perguntas e respostas na fala
- Tranquilidade
- Ser respeitoso
- Relaxar e sorrir

## Critérios

- Efetividade na Resolução do problema proposto
- Completude da solução
- Viabilidade de Implantação
- Criatividade e inovação da solução

## Possíveis perguntas

Para antecipar as dúvidas, elaboramos algumas perguntas e respostas, a fim de acabar com as possíveis lacunas deixadas na apresentação.

<details><summary>1. O que acontece se quisermos carregar todos os dados na solução?</summary><p>Nossa solução está preparada. Limitamos o que foi carregado no banco de dados para fins demonstrativos, porém a solução foi arquitetada para receber todos os dados.</p></details>
<details><summary>2. Achei os tempos das UJs que tem o mesmo gargalo muito inferiores aos da UJ sendo analisada. Isso está correto?</summary><p>exitSim, é o que os dados nos revelam. Aí é um bom momento para que juízes e analistas possam conversar, discutir seus processos e compartilhar boas práticas.</p></details>
<details><summary>3. Quem iria usar a solução?</summary><p>A solução pode ser utilizada pelos membros do CNJ e suas equipes. Avaliamos que a solução pode e deve ser expandida para o uso por todos Tribunais e UJs. Disponibiliza informações tanto em nível de grupos como de unidades judiciárias específicas.</p></details>
<details><summary>4. O grupo contém muito poucas UJs. Qual a justificativa?</summary><p>Isso se deve às especificidades das UJs. O algoritmo inteligente agrupa-as de acordo com as classes e assuntos dos processos que chegam em cada UJ. Assim, é possível a formação de grupos com dezenas de membros ou até centenas. A ferramenta está preparada para incorporar novas variáveis para ampliar a acurácia da clusterização.</p></details>
<details><summary>5. O que quer dizer o gráfico de barras (macro etapas)</summary><p>Traz o tempo percentual gasto pela UJ em cada fase do processo.</p></details>
<details><summary>6. Como as macro etapas são calculadas?</summary><p>Através de agrupamentos de atividades utilizando a hierarquia de nomenclatura dos movimentos processuais disponibilizado pelo CNJ. Exemplo: “Contas Aprovadas” e “Homologação de Transação” são atividades que a solução reconhece como “Julgamento”. Outro exemplo: “Acolhimento de Exceção” e “Declaração de Prisão Civil” são reconhecidos como “Decisão”.</p></details>
<details><summary>7. Como você acha que essa solução resolve o problema?</summary><p>Nossa solução permite a celeridade e compartilhamento de boas práticas através do agrupamento de UJs semelhantes, geração de alertas de desempenho, identificação dos marcos processuais e principalmente através da identificação de onde estão os gargalos processuais colocando pra conversar quem se parece comigo e que consequentemente tem dores semelhantes às minhas.</p></details>
<details><summary>8. O que você acha que fará com que os juízes queiram comentar sobre as transições?</summary><p>A própria curiosidade. Como essa UJ vizinha consegue esse resultado? Como eles gastam tão pouco tempo no “Julgamento”? Além disso, implementar gamificação está no nosso roadmap e acreditamos que também impulsionará a colaboração.</p></details>

# Links do projeto

❗ Como o projeto foi construído exclusivamente para o hackathon e não foi feito nenhum investimento por isso utilizamos o Heroku, então navegação pode sofrer instabilidade.

- Aplicação final: [**http://panorama-fase2.herokuapp.com/index.html**][panorama-final]
- Repositório front-end: [https://github.com/lfvvercosa/fase2_desafio_cnj][github-front-2]
- Repositório back-end: [https://github.com/gabriel-bandeira/backend-desafio-cnj][github-back-2]  

<p><br><strong>Aviso!</strong><br>Alguns trechos do material apresentando aqui foram extraídos da comunicação oficial do CNJ e do repositório no GitHub do projeto.</p>

<div title="Clique para fechar a janela" class="modal fade" id="cnj-1" tabindex="-1" role="dialog" aria-labelledby="cnj-1" aria-hidden="true"><div class="modal-dialog modal-image" title="clique para fechar" role="document"><img src="https://bitbucket.org/wagnerbeethoven/2021-02-13-hackathon-cnj-inova/raw/fd40f3e50aa824a6e2781d4d7e54b9b9e8bebbb8/hackathon/3-cnj-inova-home.png"></div></div>
<div title="Clique para fechar a janela" class="modal fade" id="cnj-2" tabindex="-1" role="dialog" aria-labelledby="cnj-2" aria-hidden="true"><div class="modal-dialog modal-image" title="clique para fechar" role="document"><img src="https://bitbucket.org/wagnerbeethoven/2021-02-13-hackathon-cnj-inova/raw/fd40f3e50aa824a6e2781d4d7e54b9b9e8bebbb8/hackathon/3-cnj-inova-detalhes-destaques.png"></div></div>
<div title="Clique para fechar a janela" class="modal fade" id="cnj-3" tabindex="-1" role="dialog" aria-labelledby="cnj-3" aria-hidden="true"><div class="modal-dialog modal-image" title="clique para fechar" role="document"><img src="https://bitbucket.org/wagnerbeethoven/2021-02-13-hackathon-cnj-inova/raw/fd40f3e50aa824a6e2781d4d7e54b9b9e8bebbb8/hackathon/3-cnj-inova-detalhes-gargalo.png"></div></div>

<div title="Clique para fechar a janela" class="modal fade" id="cnj-4" tabindex="-1" role="dialog" aria-labelledby="cnj-3" aria-hidden="true"><div class="modal-dialog modal-image" title="clique para fechar" role="document"><img src="https://bitbucket.org/wagnerbeethoven/2021-02-13-hackathon-cnj-inova/raw/fd40f3e50aa824a6e2781d4d7e54b9b9e8bebbb8/hackathon/2-cnj-inova-wireframe-1-home.png"></div></div>
<div title="Clique para fechar a janela" class="modal fade" id="cnj-5" tabindex="-1" role="dialog" aria-labelledby="cnj-3" aria-hidden="true"><div class="modal-dialog modal-image" title="clique para fechar" role="document"><img src="https://bitbucket.org/wagnerbeethoven/2021-02-13-hackathon-cnj-inova/raw/fd40f3e50aa824a6e2781d4d7e54b9b9e8bebbb8/hackathon/2-cnj-inova-wireframe-2-detalhes.png"></div></div>

[^1]: Formação de conjuntos de dados que ‘se assemelham’ de alguma forma - independentemente de classes predefinidas.

[panorama-final]: http://panorama-fase2.herokuapp.com/index.html
[github-front-2]: https://github.com/lfvvercosa/fase2_desafio_cnj
[github-back-2]: https://github.com/gabriel-bandeira/backend-desafio-cnj
[demoday-final]: https://www.youtube.com/watch?v=2-9nHdoP_-Y
[briefing]: https://bitbucket.org/wagnerbeethoven/2021-02-13-hackathon-cnj-inova/raw/15a857406571d7f9e08f873923b0fba4431577db/hackathon/cnj-inova-2-briefing.pdf
