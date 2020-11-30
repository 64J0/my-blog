---
title: "Desenvolvendo a feature GitHub Contrib Graph"
date: "2020-11-28"
show: true
tags: ["javascript"]
---

Boa tarde pessoal, tudo jóia? Espero que sim.

Meus caros, no post de hoje vou compartilhar um dia da minha rotina pois acredito que seja bacana saber essas coisas caso futuramente eu me torne uma pessoa famosa \*-\*. -kkkkkkkk. Bom hoje vou falar sobre minha linha de raciocínio para implementação de uma feature no código deste blog.

A ideia pra essa feature surgiu quando estava scrollando pelo meu perfil no GitHub e notei o gráfico de contribuições, como pode ser visto também na imagem abaixo.

![Github Contrib](/post-images/feature-github-contrib/screenshot-github-config.png "Gráfico de contribuições do GitHub")

Como esse gráfico é bonito pensei... Hum... E se eu colocasse isso no meu blog?

Daí surgiu a ideia de fazer essa feature, sendo que inicialmente irei colocar apenas na página de contato do blog, pois é onde acredito que faça mais sentido atualmente.

No início acreditava que seria super simples fazer isso, bastando apenas chamar alguma rota da API do GitHub e *SHAZAM*, apareceria todo configurado. Porém, como a vida sempre guarda surpresas, descobri lendo na internet que não seria tão simples (ainda bem).

Pesquisei algumas ferramentas que poderiam ser utilizadas para automatizar essa feature e cheguei em uma totalmente funcional que basicamente importa uma imagem das contribuições atualizadas de maneira transparente para o usuário da ferramenta.

Estou falando do projeto **Github Chart API**, que pode ser acessado neste link: https://ghchart.rshah.org/.

Basicamente, para utilizar essa ferramenta basta colocar uma tag:

```javascript
<img src="https://ghchart.rshah.org/<github-account>" />
```

e pronto, a imagem será carregada com o conteúdo das suas contribuições de maneira atualizada.

Por um instante realmente considerei utilizar isto porém fiquei bastante intrigado com a maneira como esse projeto funciona e fiquei pensando em um algoritmo que conseguisse fazer a mesma coisa. Enfim, cheguei nessa solução simplificada:

1. Faço uma requisição pro Github;

2. Com o resultado dessa requisição utilizo alguma ferramenta de **web scraping** para copiar o conteúdo da tag *svg* cuja *class* é ".js-calendar-graph-svg";

3. Injeto esse *svg* no meu componente de maneira automática e *catapimba*, tudo funcionando.

*Observação 1:* Como o **Next.js** permite pré-renderizar o projeto, irei utilizar uma estratégia de **SSR** (*Server-side rendering*) com **Geração Estática**, de maneira a atualizar essa tag apenas em alguns momentos do dia.

*Observação 2:* Inicialmente minha ideia era fazer um *fetch* pro site do *github* pra minha própria página e executar o querySelector no resultado, porém (novamente, por sorte), graças ao erro de *CORS* precisei rever essa estratégia.

Bom... basicamente eu segui o plano inicialmente definido haha. A ferramenta de **web scraping** utilizada neste caso foi o *Cheerio*, que como pode ser visto na referência [2] simula o funcionamento do *jQuery* porém sem a necessidade de renderizar o arquivo visualmente, o que é ideal para aplicações *back-end* que precisam apenas buscar alguma informação em uma página de maneira automatizada.

Para servir esses dados não precisei criar um novo projeto *back-end* separadamente pois estou utilizando o Next.js como ferramenta principal de desenvolvimento e ele apresenta as funcionalidades de *back-end* embutidas com o código de *front-end*.

Para fazer essa tarefa simplesmente criei o arquivo *github.js* dentro da pasta *lib/* na raiz dos arquivos e coloquei o código que seria executado no lado do servidor:

```javascript
import axios from "axios";
import cheerio from "cheerio";

const url = "https://github.com/64J0";

export async function getGithubData() {
  return axios
    .get(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const contribChart = $(".js-calendar-graph");
      return contribChart.html();
    })
    .catch((err) => {
      console.error(err);
      return undefined;
    });
}
```

Neste código eu estou fazendo uma requisição para a página do meu perfil no *Github* e executando um comando semelhante ao *document.querySelector(".js-calendar-graph")*, o resultado é encaminhado como HTML para o componente responsável tratar.

Por fim, esse elemento *svg* vindo do site do *Github* é injetado numa tag *div* e é isso...

Só que não!!!!

Depois de ter feito todos os esses passos descobri que a tag *svg* é bem complicada para estilizar. Precisei fazer vários testes com as propriedades deste elemento e consultar alguns sites, tendo destaque o conteúdo da referência [3].

Por fim, utilizei uma estratégia mais complicada que trabalha com eventos da tela do usuário para setar a escala e a *width* do elemento dinamicamente.

O código do componente completo pode ser visto abaixo:

```javascript
import React, { useCallback, useEffect, useMemo } from "react";

export default function GithubContribGraph({ contribChartHTML }) {
  const svgInitialWidth = 828;
  const layoutMaxScale = 672; // 48rem = 48 * 14
  const svgMaxScale = 644; // 46rem = 46 * 14
  const layoutMinScale = 476; // 34rem = 34 * 14
  const svgMinScale = 476; // 34rem = 34 * 14

  const maxScale = useMemo(() => {
    return svgMaxScale / svgInitialWidth;
  }, []);
  const minScale = useMemo(() => {
    return svgMinScale / svgInitialWidth;
  }, []);

  const handleSetSvgScale = useCallback(({ scale }) => {
    const svgElement = window.document.querySelector(".js-calendar-graph-svg");
    svgElement.currentScale = scale;
    svgElement.width.baseVal.value = svgInitialWidth * scale;
  }, []);

  const handleSelectCorrectScale = useCallback(() => {
    const screenWidth = Math.min(window.innerWidth, window.screen.width);
    if (screenWidth >= layoutMaxScale) {
      return handleSetSvgScale({ scale: maxScale });
    } else if (screenWidth <= layoutMinScale) {
      return handleSetSvgScale({ scale: minScale });
    } else {
      const scale = (screenWidth - 36) / svgInitialWidth;
      return handleSetSvgScale({ scale });
    }
  }, []);

  const handleAddResizeEvent = useCallback(() => {
    return window.addEventListener("resize", handleSelectCorrectScale);
  });

  useEffect(() => {
    handleSelectCorrectScale();
    handleAddResizeEvent();

    return function cleanup() {
      return window.removeEventListener("resize", handleSelectCorrectScale);
    };
  }, []);

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Minhas contribuições no Github:</h2>
      <div
        style={{ marginTop: "3rem" }}
        id="contrib-chart" 
        dangerouslySetInnerHTML={{ __html: contribChartHTML }} 
      />
    </>
  );
}
```

O resultado de tudo isso pode ser visto na página de Contato.

---
## Referências

[1] - Github Chart API. Disponível neste [link](https://ghchart.rshah.org/).

[2] - Criando um Web Scraper com NodeJs, *Mundo JS*. Disponível neste [link](https://www.mundojs.com.br/2020/05/25/criando-um-web-scraper-com-nodejs/). 

[3] - How to Scale SVG, *CSS tricks*. Disponível neste [link](https://css-tricks.com/scale-svg/).