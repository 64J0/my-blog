---
title: "O que é o Next.js"
date: "2020-07-30"
show: true
tags: ["javascript"]
---

Saudações caro leitor, neste primeiro post do blog irei apresentar uma introdução a respeito do *framework* que funciona em conjunto com o *React JS* e se chama **Next.js**. Esse framework foi a tecnologia escolhida para criar este o blog devido principalmente a sua otimização em relação ao **SEO** (*Search Engine Optimization*). Sem mais delongas...

Segundo a própria documentação, o **Next.js** é um *framework* criado para melhorar a experiência de desenvolvimento de projetos WEB utilizando o **ReactJS**.
Algumas das características deste *framework* que melhoram a experiência de desenvolvimento consistem em:

- O código já é empacotado (*bundled*) utilizando um *bundler* tipo o **Webpack**, e é transpilado usando um compilador semelhante ao **Babel**.
- São realizadas otimizações no código em produção como por exemplo *code splitting* (divisão do código), para aumentar a velocidade de carregamento do projeto. Essa funcionalidade é executada automaticamente pelo **Next.js**, para que cada página carregue apenas o necessário para sua exibição.
- É possível pré-renderizar algumas páginas para melhorar a performance e consequentemente o **SEO** (*Search Engine Optimization*). É possível escolher entre duas opções para renderização do projeto *server-side rendering*, em que o servidor é responsável por fazer a compilação do código *JavaScript* para os componentes *HTML*, *CSS*, etc, ou manter a estratégia de *client-side rendering*, mantendo o padrão do **ReactJS**.
- Facilidade de conexão com a base de dados da aplicação.
- Um sistema de roteamento intuitivo baseado em páginas (com suporte a rotas dinâmicas).
- Pré-renderização, podendo ser estática (*SSG*) ou *server-side rendering* (*SSR*).
- Suporte nativo a **Sass** (podem ser importados arquivos com extensão *.sass*, desde que o módulo **sass** esteja presente no projeto), e qualquer biblioteca do tipo *CSS-in-JS* (*styled-components* por exemplo).
- Etc... Para ler a lista completa acesse: [Tutorial Nextjs](https://nextjs.org/learn/basics/create-nextjs-app)

## Discussões avançadas

Neste tópico serão discutidos alguns termos chave para o entendimento do **Next.js**. São discussões com um nível mais elevado e portanto, direcionadas para um público com mais conhecimento.

### Pré-renderização

Por padrão, o **Next.js** pré-renderiza cada página de maneira antecipada. Isso significa que o **Next.js** gera o *HTML* de cada página antecipadamente, ao contrário do método padrão do **ReactJS** que deixa o próprio navegador do cliente renderizar o projeto. Essa pré-renderização pode resultar em uma performance melhor e consequentemente um melhor *SEO*.

Cada arquivo *HTML* é associado com o mínimo de *JavaScript* necessário para a página. Quando a página é carregada pelo navegador, seu código *JavaScript* é executado e torna a página totalmente interativa (esse processo é chamado **hydration**).

O **Next.js** tem duas formas de pré-renderização:

- **Geração estática**: é o método de pré-renderização que gera o *HTML* em tempo de *build* (*build time*). O *HTML* pré-renderizado é então reutilizado em cada requisição.
- **Server-side Rendering**: é o método de pré-renderização que gera um novo *HTML* a cada requisição.

Importante: O Next.js deixa você **escolher** qual a forma de pré-renderização será utilizada em cada página. É possível criar uma aplicação **híbrida** com o Next.js, usando a Geração Estática para a maioria das páginas e usando a Renderização do Lado do Servidor para outras.

### Quando usar cada tipo de pré-renderização

É recomendado sempre dar preferência para a **Geração estática** sempre que possível porque a página pode ser construída apenas uma vez e servida de um *CDN*, o que a torna muito mais rápida que um servidor tendo que renderizar as páginas a cada requisição.

Alguns tipos de páginas onde pode ser utilizada a Geração estática:

- Páginas de marketing
- Posts de *blog*
- Listagem de produtos de um *e-commerce*
- Páginas de ajuda e documentação

Você deve se perguntar: É possível pré-renderizar esta página antes do usuário fazer uma requisição? Caso a resposta seja sim, então deve ser aplicado o método de Geração estática.

*Observação: O **Next.js** permite a pré-renderização com Geração estática mesmo quando é necessário buscar dados de fontes externas, por exemplo, API's, bancos de dados, etc.*

Para fazer as requisições e buscar os dados de fontes externas é possível utilizar a função pré-definida `getStaticProps` que é executada apenas no lado do servidor (*server-side*) e só pode ser exportada de uma página.

Para utilizar a estratégia de renderização *SSR* (*Server-side Rendering*) é necessário exportar a função `getServerSideProps` de um arquivo de página, assim como no caso de `getStaticProps`. Neste caso, a página precisa ser re-compilada em cada requisição, e o resultado não pode ser *"cacheado"* em um *CDN* sem configuração adicional.

Caso não seja necessário pré-renderizar os dados, é possível ainda utilizar a estratégia de renderizar os dados no navegador do cliente (*Client-side Rendering*). Essa estratégia funciona bem para casos como *Dashboards* de usuários, que tem seus dados alterados constantemente. Para fazer as requisições no lado do cliente, o time de desenvolvimento do **Next.js** criou um *hook* específico chamado **SWR**, e portanto, é recomendado utilizá-lo.

### Rotas dinâmicas

Esse tópico trata da situação em que os caminhos para determinadas páginas dependem de dados externos, que foram obtidos a partir de uma *API*, banco de dados, etc.

### Rotas de API

O Next.js tem suporte a Rotas de *API*, que permite criar facilmente um *endpoint* de *API* como uma função do **Node.js**.

### Final do post

Bom, o primeiro post do blog foi este. No futuro pretendo entrar mais a fundo neste *framework* pois é a ferramenta utilizada para este blog.
