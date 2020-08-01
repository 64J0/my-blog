<p align="center">
  <h1 align="center">Next.js tutorial 🎉</h1>
</p>

Este projeto está sendo desenvolvido a partir da estrutura do blog feito no tutorial do **Next.js**. Abaixo estão algumas anotações dos meus estudos sobre este **framework**.

O objetivo principal da utilização do **Next.js** é aumentar a eficiência e melhorar a experiência de desenvolvimento de projetos **React**, pois diversas questões ligadas a configurações iniciais e procedimentos são automatizados, e o resultado final do desenvolvimento é um produto otimizado de diversos modos.

## Tabela de conteúdos:

1. [Requisitos](#requisitos)
2. [Resumo](#resumo)
3. [Demonstração](#demonstração)
4. [Objetivo pessoal](#objetivo-pessoal)
5. [Discussões avançadas](#discussões-avançadas)

<hr>

## Requisitos

- JavaScript
- ReactJS
- NodeJS

<hr>

## Resumo

O código deste repositório é um projeto básico desenvolvido seguindo o tutorial do site do _framework_ **Next.js**.
Segundo a própria documentação, o **Next.js** é um _framework_ criado para melhorar a experiência de desenvolvimento de projetos WEB utilizando o **ReactJS**.
Algumas das características deste _framework_ que melhoram a experiência de desenvolvimento consistem em:

- O código já é empacotado (_bundled_) utilizando um _bundler_ tipo o **Webpack**, e é transpilado usando um compilador semelhante ao **Babel**.
- São realizadas otimizações no código em produção como por exemplo _code splitting_ (divisão do código), para aumentar a velocidade de carregamento do projeto. Essa funcionalidade é executada automaticamente pelo **Next.js**, para que cada página carregue apenas o necessário para sua exibição.
- É possível pré-renderizar algumas páginas para melhorar a performance e consequentemente o **SEO** (_Search Engine Optimization_). É possível escolher entre duas opções para renderização do projeto _server-side rendering_, em que o servidor é responsável por fazer a compilação do código _JavaScript_ para os componentes _HTML_, _CSS_, etc, ou manter a estratégia de _client-side rendering_, mantendo o padrão do **ReactJS**.
- Facilidade de conexão com a base de dados da aplicação.
- Um sistema de roteamento intuitivo baseado em páginas (com suporte a rotas dinâmicas).
- Pré-renderização, podendo ser estática (_SSG_) ou _server-side rendering_ (_SSR_).
- Suporte nativo a **Sass** (podem ser importados arquivos com extensão _.sass_, desde que o módulo **sass** esteja presente no projeto), e qualquer biblioteca do tipo _CSS-in-JS_ (_styled-components_ por exemplo).
- Etc... Para ler a lista completa acesse: [Tutorial Nextjs](https://nextjs.org/learn/basics/create-nextjs-app)

O objetivo ao final do tutorial é desenvolver um _blog_ muito simples, como poder visto no site: https://next-tutorial.gajo.vercel.app/.

<hr>

## Demonstração

<p align="center">
  <img src="assets-readme/site-demonstration.gif" alt="Gif de demonstração do resultado do tutorial" />
</p>

<hr>

## Objetivo pessoal

Meu objetivo ao estudar este _framework_ é verificar se essa ferramenta atenderá minha necessidade de criar um _blog_ pessoal onde postarei conteúdos próprios sobre coisas que estou estudando e desenvolvendo, além de me promover como programador.

<hr>

## Discussões avançadas

Neste tópico serão discutidos alguns termos chave para o entendimento do **Next.js**. São discussões com um nível mais elevado e portanto, direcionadas para um público com mais conhecimento.

### Pré-renderização:

Por padrão, o **Next.js** pré-renderiza cada página de maneira antecipada. Isso significa que o **Next.js** gera o _HTML_ de cada página antecipadamente, ao contrário do método padrão do **ReactJS** que deixa o próprio navegador do cliente renderizar o projeto. Essa pré-renderização pode resultar em uma performance melhor e consequentemente um melhor _SEO_.

Cada arquivo _HTML_ é associado com o mínimo de _JavaScript_ necessário para a página. Quando a página é carregada pelo navegador, seu código _JavaScript_ é executado e torna a página totalmente interativa (esse processo é chamado **hydration**).

O **Next.js** tem duas formas de pré-renderização:

- **Geração estática**: é o método de pré-renderização que gera o _HTML_ em tempo de _build_ (_build time_). O _HTML_ pré-renderizado é então reutilizado em cada requisição.
- **Server-side Rendering**: é o método de pré-renderização que gera um novo _HTML_ a cada requisição.

Além disso, é possível definir qual o tipo de pré-renderização será utilizada em **cada página**. Portanto é possível criar um aplicativo **Next.js** "híbrido" que usa as duas formas de pré-renderização.

### Quando usar cada tipo de pré-renderização:

É recomendado sempre dar preferência para a **Geração estática** sempre que possível porque a página pode ser construída apenas uma vez e servida de um _CDN_, o que a torna muito mais rápida que um servidor tendo que renderizar as páginas a cada requisição.

Alguns tipos de páginas onde pode ser utilizada a Geração estática:

- Páginas de marketing
- Posts de _blog_
- Listagem de produtos de um _e-commerce_
- Páginas de ajuda e documentação

Você deve se perguntar: É possível pré-renderizar esta página antes do usuário fazer uma requisição? Caso a resposta seja sim, então deve ser aplicado o método de Geração estática.

_Observação: O **Next.js** permite a pré-renderização com Geração estática mesmo quando é necessário buscar dados de fontes externas, por exemplo, API's, bancos de dados, etc._

Para fazer as requisições e buscar os dados de fontes externas é possível utilizar a função pré-definida `getStaticProps` que é executada apenas no lado do servidor (_server-side_) e só pode ser exportada de uma página.

Para utilizar a estratégia de renderização _SSR_ (_Server-side Rendering_) é necessário exportar a função `getServerSideProps` de um arquivo de página, assim como no caso de `getStaticProps`. Neste caso, a página precisa ser re-compilada em cada requisição, e o resultado não pode ser _"cacheado"_ em um _CDN_ sem configuração adicional.

Caso não seja necessário pré-renderizar os dados, é possível ainda utilizar a estratégia de renderizar os dados no navegador do cliente (_Client-side Rendering_). Essa estratégia funciona bem para casos como _Dashboards_ de usuários, que tem seus dados alterados constantemente. Para fazer as requisições no lado do cliente, o time de desenvolvimento do **Next.js** criou um _hook_ específico chamado **SWR**, e portanto, é recomendado utilizá-lo.

### Rotas dinâmicas:

Esse tópico trata da situação em que os caminhos para determinadas páginas dependem de dados externos, que foram obtidos a partir de uma _API_, banco de dados, etc.

### Rotas de API:

O Next.js tem suporte a Rotas de _API_, que permite criar facilmente um _endpoint_ de _API_ como uma função do **Node.js**.

<hr>

Vinícius Gajo Marques Oliveira, 2020.
