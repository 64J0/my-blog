---
title: "Desenvolvendo a feature 'GitHub Contrib Graph'"
date: "2020-11-28"
show: true
tags: ["javascript"]
---

Boa tarde pessoal, tudo jóia? Espero que sim.

Meus caros, no post de hoje vou compartilhar o processo de desenvolvimento de uma nova feature aqui pro blog. Vou falar sobre minha linha de raciocínio nessa implementação ilustrando sempre que for conveniente com o código implementado.

## A ideia:

A ideia pra essa feature surgiu quando estava scrollando pelo meu perfil no GitHub e notei o gráfico de contribuições, muito semelhante à imagem mostrada abaixo.

![Github Contrib](/post-images/feature-github-contrib/screenshot-github-contrib.png "Gráfico de contribuições do GitHub")

Como esse gráfico é bonito pensei... Hum... E se eu colocasse isso no meu blog? Talvez as pessoas também achem legal... Daí surgiu a ideia da feature. 

Inicialmente minha intenção é colocar apenas na página de *contato do blog* (que pode ser acessada clicando em qualquer foto minha em qualquer página) pois é onde acredito que faça mais sentido atualmente.

## Desenvolvimento:

No início estava muito iludido e acreditava que seria super simples implementar a feature, bastando apenas chamar alguma rota da API do GitHub, que por sinal é super bem feita e documentada, e **SHAZAM**, apareceria todo configurado na página certa. 

Porém, como a vida sempre guarda surpresas, descobri lendo a documentação que não seria assim tão simples (*ainda bem, pois esse impecilho me permitiu estudar bem mais coisas, como será abordado posteriormente*).

Como a ideia inicial teve um resultado negativo corri ao Google para procurar mais sobre o gráfico de contribuições do Github e possíveis soluções para o problema.

Encontrei algumas ferramentas que poderiam ser utilizadas para automatizar a captura desse gráfico e cheguei em uma totalmente funcional e muito bacana que basicamente importa uma imagem das contribuições atualizadas de maneira transparente para o usuário da ferramenta.

Estou falando do projeto **Github Chart API**, que pode ser acessado neste link: https://ghchart.rshah.org/.

Essa ferramenta foi desenvolvida em *Ruby* e para utilizá-la basta preencher ao final da URL com o seu nome de usuário do Github, por exemplo: https://ghchart.rshah.org/64J0.

O resultado de chamar essa rota é uma imagem, com a qual podemos apenas associá-la à propriedade *src* de uma tag *img*, como ilustrado no trecho de código abaixo.

```html
<img 
  src="https://ghchart.rshah.org/<github-account>" 
  alt="Github's contrib chart" />
```

E pronto, a imagem será carregada com o conteúdo das suas contribuições de maneira atualizada.

Por um instante realmente considerei utilizar essa estratégia no blog, porém, fiquei bastante intrigado com a maneira como esse projeto funcionava por baixo dos panos e decidi implementar uma solução própria. 

Para resumir, após pensar um pouco cheguei no seguinte algoritmo:

1. Faço uma requisição pro Github;

2. Com o resultado dessa requisição faço um **document.querySelector(".js-calendar-graph")** para copiar o conteúdo da tag *div* cuja *class* é ".js-calendar-graph";

3. Injeto esse *div* no meu componente de maneira automática e pronto.

Porém, quando fui realmente implementar esse algoritmo bati de cara numa primeira barreira clássica e que num primeiro momento não estava óbvia... O **CORS**.

Pra quem não sabe o acrônico **CORS** significa *Cross-Origin Resource Sharing* e estabelece uma política de segurança implementada em basicamente todos os navegadores da atualidade. [4]

Graças a essa tecnologia, dentre outras coisas, um site teoricamente não pode fazer uma requisição por conteúdo fora de sua origem, desta maneira preservando o usuário do navegador de alguns tipos de ataques cybernéticos.

Bom... Com isso em mente tive que mudar um pouco os planos e me vi forçado a implementar essa parte da requisição em um servidor sem o navegador, ou seja, no *back-end*. PORÉM, o servidor não tem o **DOM** (*Document Object Model*) e portanto não tenho a instrução **document.querySelector()** a disposição.

Haha... Sem problemas... Eu já conhecia por alto (só sabia o nome da técnica na verdade) como contornar essa situação. Bastava apenas fazer o **web scraping** dessa página no servidor e entregar o alvo desejado para o *front-end* processar.

Novamente, neste ponto recorri ao Google para buscar conhecimento e cheguei à referência [2] que me mostrou um pacote do **NPM** (*Node Package Manager*) sensacional chamado **Cheerio**[5].

O **Cheerio** é como se fosse um **jQuery** para o *back-end*, inclusive com uma sintaxe muito parecida ou idêntica em alguns aspectos. 

Pronto. Agora bastava apenas aplicar esse pacote e pegar o conteúdo da *div*. Porém, realizando alguns testes na página verdadeira do Github percebi que apenas o componente *svg*, cuja classe é ".js-calendar-graph-svg" já seria suficiente para renderizar o gráfico como eu gostaria.

Então fiz apenas essa pequena correção no algoritmo e continuei o desenvolvimento.

## Back-end:

Como alguns de vocês já devem ter percebido, esse blog está sendo desenvolvido com o **Next.js** e o código fonte está disponibilizado integralmente no meu perfil do [Github neste link](https://github.com/64J0/Nextjs-projects/tree/master/nextjs-blog).

Bom, e o que isso tem a ver com o *back-end*?

Ótima pergunta jovem. Resumidamente, o **Next.js** permite configurar o *back-end* juntamente com o *front-end*, ainda disponibilizando algumas funcionalidade a mais. Para quem não sabe, o **Next.js** permite pré-renderizar qualquer página do projeto, controlando quais pontos podem ser estáticos e quais devem se manter dinâmicos.

A grande vantagem de se ter elementos estáticos no projeto é a agilidade com que o servidor conseguirá atuar nessa situação. Pense na seguinte situação:

Quando o conteúdo do site deve ser gerado constantemente a cada requisição isso faz com que os servidores que devolvem esse conteúdo tenham um certo processamento e portanto gastem um pouco de tempo para devolver a resposta.

Porém, com arquivos estáticos, como não é necessário renderizar o projeto a cada nova requisição este processo é muito mais rápido.

Além disso, a **Vercel**, empresa dona do **Next.js** e atualmente onde este blog está hospedado conta com uma vasta rede de **CDN's** espalhados ao redor do mundo capazes de devolver os conteúdos estáticos de maneira muito veloz, devido ao *cache* dessas ferramentas.

Bom, essa técnica de gerar arquivos estáticos é uma mistura de duas ideias na verdade. Temos o **Server-side rendering** (*SSR*), pois é o servidor que renderiza o conteúdo, e temos a **Static Generation** (*SG*), onde o conteúdo é servido de forma otimizada com a maior parte de forma estática. 

Ao utilizar essas estratégias, o **Next.js** ainda disponibiliza uma função para os desenvolvedores onde passamos um parâmetro que define de quanto em quanto tempo alguma informação deve ser revalidada.

Por exemplo, no caso desta feature seria bom disparar um evento sempre que o site do Github atualizar o gráfico de contribuições, porém essa opção seria muito complexa de se implementar e portanto não foi a escolhida.

Uma outra opção mais interessante é setar um período de tempo a partir do qual a informação do cache estático deve ser atualizada, neste caso revalidando as informações do blog automaticamente.

E foi justamente isso que eu fiz, utilizando a função <u>*getStaticProps()*</u> do **Next.js** que pode ser vista abaixo da maneira utilizada.

```javascript
// pages/contato/index.js
export async function getStaticProps() {
  const contribChartHTML = await getGithubData();
  
  return {
    props: {
      contribChartHTML
    },
    revalidate: 1 * 60 * 60 // 1 hora
  };
}
```

Nesta função eu estou apenas chamado uma outra função que será abordada posteriormente e que retorna o conteúdo da tag *svg* do site do Github. Esse conteúdo então é injetado no componente *React* automaticamente através da propriedade *contribChartHTML* sendo essa informação revalidada a cada 1 hora.

O código da função <u>*getGithubData()*</u> que eu criei está mostrada logo abaixo.

```javascript
// lib/github.js
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

Nesta função eu utilizei o **Axios** [6], outro pacote do *NPM*, para fazer uma requisição *GET* para a página do meu perfil no Github.

Posteriomente, com o *HTML* dessa página e utilizando o **Cheerio** fiz apenas uma busca pela classe alvo e o resultado disso é encaminhado como resposta, ou seja, o conteúdo da tag *svg* do site do Github.

## Front-end:

É isso, agora basta apenas chamar essa função dentro do componente para renderizar e tudo certo, já vai ficar a imagem bacana e responsiva igual no site do Github... Só que não!!!!

O que garante esse comportamento adequado do *svg* no site do Github são justamente as classes de *CSS* que estilizam o componente, porém, como eu peguei apenas o *HTML* precisaria criar as classes e os comportamentos manualmente para funcionar conforme eu gostaria no meu blog.

Surpreendemente essa parte foi uma das mais complicadas. Precisei fazer vários testes com as propriedades deste elemento e consultar alguns sites, tendo destaque o conteúdo da referência [3].

Todavia, no fim utilizei uma estratégia bem mais complicada que as mostradas nas referências encontradas (*provavelmente tem alguma forma bem mais simples de se garantir a responsividade dessa tag, porém não achei*). 

A minha solução trabalha com eventos da tela do usuário para setar a escala e a *width* do elemento dinamicamente.

Mas chega de *lero lero*, o código do componente *React* completo pode ser visto abaixo:

```javascript
// components/GithubContribGraph/index.jsx
import React, { useCallback, useEffect, useMemo } from "react";

export default function GithubContribGraph({ contribChartHTML }) {
  const svgInitialWidth = 828;
  const layoutMaxScale = 756; // 54rem = 54 * 14
  const svgMaxScale = 728; // 52rem = 52 * 14
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

Como é possível perceber a partir deste código, este é apenas um componente convencional *React* com seus *hooks* normais, que recebe a prop *contribChartHTML* que é apenas o *svg* roubado do site do Github.

Este *svg* vem por padrão configurado com uma *width* de 828 pixels. No início do componente fiz as declarações de constantes que são úteis no decorrer do código.

Em seguida fiz a declaração de valores *memoizados* que são apenas o resultado de uma simples divisão e são posteriormente aplicados para calcular a escala que seria aplicada na figura com base nos limites do *layout* do meu blog.

Dando prosseguimento são declaradas algumas funções para lidar (*handle*) com a aplicação da escala na tag *svg*, selecionar a escala correta e configurar o evento na janela do usuário para monitorar o evento de *resize*, respectivamente.

Continuando, essas funções são usadas no *hook* <u>*useEffect()*</u>, tendo sido configurada uma função para limpar este componente quando ele for destruído, neste caso apenas retirando o monitoramento do evento de *resize*.

O resultado de tudo isso pode ser visto na página de [Contato](https://gaio.dev/contato) do blog, ou apenas na imagem a seguir.

![Github Contrib no meu blog](/post-images/feature-github-contrib/screenshot-blog.png "Gráfico de contribuições do meu blog")

## Conclusões:

Com a realização deste projeto pude experimentar o gostinho de ter criado meu próprio algoritmo e vê-lo funcionando da maneira como desejava, em contraste com uma solução já desenvolvida e disponibilizada online.

Além disso foi bem bacana pois pude aprender sobre alguns conceitos interessantes tanto do *back-end* quanto do *front-end*, mais especificamente:

- Pude aprender sobre **web scraping** com **Node.js** utilizando o **Cheerio** para simular uma **DOM** no lado do servidor;
- Além disso relembrei alguns conceitos do **Next.js** em relação a propriedades estáticas e re-validação destes dados de maneira programática;
- No *front-end* estudei um pouco mais sobre estilização de elementos *svg*;
- Também pude aplicar um evento de maneira pontual para ajustar as propriedades da imagem dinamicamente, desmontando este evento quando o componente fosse destruído, evitando assim que algum comportamento anormal fosse propagado para os demais trechos do blog.

*Observação:* Para conseguir que as cores ficassem iguais às mostradas no Github ainda precisei alterar os estilos globais do projeto, adicionando estas cores:

```css
--color-calendar-graph-day-bg: #ebedf0;
--color-calendar-graph-day-border: rgba(27,31,35,0.06);
--color-calendar-graph-day-L1-bg: #9be9a8;
--color-calendar-graph-day-L2-bg: #40c463;
--color-calendar-graph-day-L3-bg: #30a14e;
--color-calendar-graph-day-L4-bg: #216e39;
--color-calendar-graph-day-L4-border: rgba(27,31,35,0.06);
--color-calendar-graph-day-L3-border: rgba(27,31,35,0.06);
--color-calendar-graph-day-L2-border: rgba(27,31,35,0.06);
--color-calendar-graph-day-L1-border: rgba(27,31,35,0.06);
```

Ou seja, agora consigo mudar as cores de exibição dos quadradinhos caso eu queria!!!

Por fim segue abaixo as referências mencionadas ao longo do texto para que possam ser consultadas posteriormente.

---
## Referências:

[1] - Github Chart API. Disponível neste [link](https://ghchart.rshah.org/).

[2] - Criando um Web Scraper com NodeJs, *Mundo JS*. Disponível neste [link](https://www.mundojs.com.br/2020/05/25/criando-um-web-scraper-com-nodejs/). 

[3] - How to Scale SVG, *CSS tricks*. Disponível neste [link](https://css-tricks.com/scale-svg/).

[4] - Cross-Origin Resource Sharing (CORS), *MDN*. Disponível neste [link](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

[5] - Cheerio, *NPM*. Disponível neste [link](https://www.npmjs.com/package/cheerio).

[6] - Axios, *NPM*. Disponível neste [link](https://www.npmjs.com/package/axios).