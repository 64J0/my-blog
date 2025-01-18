---
title: "Syntax Highlight no Código"
date: "2020-09-29"
show: true
tags: ["javascript"]
---

* **ATENÇÂO:** *Para entender o conteúdo deste post é necessário ter conhecimento do React.js e Next.js.*

Fala clã, mais um post novo saindo do forno porque hoje eu tô produtivo haha.

Neste post vou explicar como implementei a funcionalidade de **Syntax Highlight** neste blog.

Para quem não sabe, o **Syntax Highlight** serve para destacar trechos de código que aparecem nos posts, deixando-os bem mais amigáveis, facilitando o entendimento e tornando mais bonito esteticamente.

Bom, para início de conversa vou deixar claro aqui que este blog foi criado com o **Next.js** devido aos motivos mencionados nos primeiros posts e por isso ele segue algumas regras bastante específicas.

Caso queria ver o código completo do blog, ele está disponível num repositório do meu **GitHub** onde guardo meus projetos feitos com o **Next.js**: (https://github.com/64J0/Nextjs-projects/tree/master/nextjs-blog).

Como eu gosto bastante de programar e este blog serve como um lugar onde deposito informações a respeito de coisas que estou estudando é natural pensar que uma hora ele receberia trechos de código.

Quando fiz meu primeiro post onde mostrava os códigos o resultado não ficou muito interessante pois as palavras seguiam apenas o mesmo padrão cromático, o que pode dificultar um pouco o entendimento do código em um primeior momento.

Por isso comecei a buscar conteúdos ensinando a aplicar **Syntax Highlight**...

A estratégia que estou utilizando para escrever os posts é inicialmente desenvolvê-los usando a sintaxe de [Markdown](https://pt.wikipedia.org/wiki/Markdown) que posteriormente é convertida para HTML convencional, seguindo algumas regras específicas de uma combinação de pacotes do *npm*.

Essa informação é importante pois uma das funções implementadas posteriormente para corrigir o código HTML da página só foi criada devido a essa limitação.

Atualmente existem diversas opções que aplicam regras de CSS automaticamente observando a sintaxe da linguagem que está sendo utilizada dentro do bloco de *code*.

Neste blog a opção que escolhi foi o pacote **highlight.js** ([link](https://highlightjs.org/)) pois apresenta uma grande diversidade de opções de layout para escolher, além de ser fácil de usar.

Por definição do HTML5, para simbolizar trechos do conteúdo da página composta por códigos que serão exibidos para os leitores da aplicação são utilizadas, respectivamente, as tags *pre* e *code*.

Logo são essas as tags que devemos buscar no código para estilizar.

Para selecionar o estilo de highlight que eu queria bastou apenas carregar o CSS exportado do pacote **highlight.js** dentro do arquivo *pages/_app.js*, pois este é o único lugar em um projeto **Next.js** onde é possível importar arquivos CSS globais.

O trecho de código abaixo mostra como fiz essa importação do layout que achei bonito (*Agate*).

```javascript
import React from "react";

// Importanto o estilo que eu gostei
import "highlight.js/styles/agate.css";

import "../styles/global.css";

function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default App;
```

E no arquivo que lida diretamente com a renderização do post foi necessário fazer uma pequena alteração na forma como as tags são criadas. Segue abaixo o resultado de */pages/posts/[id].js*:

```javascript
// ... outros imports que não vem ao caso mostrar

import hljs from "highlight.js";

export default function Post({ postData }) {
  useEffect(() => {
    function highlightPreElement() {
      let preEl = document.querySelectorAll("pre");

      return (
        preEl && preEl.forEach((element) => {
          element.childNodes.forEach((child) => {
            child.className = child.className.replace(/language-/, "");

            return hljs.highlightBlock(child);
          });
        })
      );
    }

    highlightPreElement();
  }, []);

  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <article className={postStyles.container}>
        <h1 className={utilStyles.headingX1}>
          {postData.title}
        </h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

// ... outras coisas do Next.js
```

Neste trecho de código é possível perceber que o hook useEffect do React é responsável por ajustar todos os elementos com tag **code** dentro dos elementos com tag **pre** transformando as strings que tinham o formato "language-..." para apenas "...".

Por exemplo: "language-javascript" ==> "javascript".

Em seguida é chamado o método que aplica o highlight propriamente dito.

Bom, neste post foi isso, espero que tenha ajudado vocês a implementarem essa funcionalidade em seus projetos também. Caso tenham alguma dúvida podem me procurar nas redes sociais da página de contato: https://gaio.dev/contato.
