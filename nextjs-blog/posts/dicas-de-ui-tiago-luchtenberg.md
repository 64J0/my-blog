---
title: "Dicas de UI - Workshop Tiago Luchtenberg"
date: "2020-08-21"
---

Saudações leitor. Nesse post irei destacar alguns pontos sobre o workshop de UI do Tiago Luchtenberg da Rocketseat [Behance](https://www.behance.net/tiagoluchtenberg/moodboards).

Esse cara é fera, ele é senior designer na Rocketseat e faz basicamente os projetos de User Interface da empresa.

Pra conferir alguns projetos que esse cara já fez basta seguir os links no final do artigo.

## A técnica dos 8 pontos

É uma técnica desenvolvida na Gooogle e está presente no design system deles ([Material.io](https://material.io/)) e é aplicada para criar hierarquia e espaçamento no design.

Boas interfaces são construídas por **hierarquias**. Do maior para o menor, elas levam o usuário até onde ele precisa.

A técnica especifica que devemos usar sempre múltiplos de 8 para definir os espaçamentos dos componentes no layout.

## Grid na interface

O grid é de extrema importância para criar alinhamento e harmonia na interface. Ele vai te ajudar a criar blocos de texto e imagens.

* Desktop
  * 1440
  * Count: 12
  * Width: 64
  * Gutter: 32
* Tablet
  * 768
  * Count: 8
  * Width: 56
  * Gutter: 32
* Mobile Android
  * 360
  * Count: 4
  * Width: 56
  * Gutter: 16
* Mobile iOS
  * 375
  * Count: 6
  * Width: 41
  * Gutter: 16

A imagem abaixo, retirada da referência [1], ilustra algumas propriedades mencionadas nesse tópico.

![Sistema Grid](/post-images/dicas-de-ui-tiago-luchtenberg/grid-system.png "Sistema Grid")

Legenda:

1. Columns
2. Gutters
3. Margins

## Tipografia

É a parte mais difícil da UI design. Tipos expressam sentimentos, emoções e precisam ser no mínimo legíveis.

Local para pesquisar: [Google Fonts](https://fonts.google.com/).

## Títulos e textos

**Perfect Fifth**

Esse é um padrão modular para escalar tipografias hierarquicamente. Você vai pegar o tamanho da fonte de texto base e multiplicar por 1,5.

Por exemplo:
* Complementos: 12px
* Texto base: 16px ou 18px (*depende da fonte*)
* Título secundário: 24px
* Subtítulo: 36px
* Título principal: 54px
* Chamada: 80px (*era pra ser 81*)

## Cores e círculo cromático

Elas afetam nosso comportamento e decisões em ações online. Transmitem emoções, sensações, são destaque e chamam a atenção.

A imagem abaixo ilustra algumas possibilidades de utilização do círculo cromático para definir quais cores devemos utilizar no nosso design.

![Combinação harmônica das cores](/post-images/dicas-de-ui-tiago-luchtenberg/Circulo_cromatico.jpg "Combinação harmônica das cores")

Imagem retirada desse [link do Pinterest](https://br.pinterest.com/pin/150870656251690468/), que fala sobre combinação cromática.

O entedimento do círculo cromático é de fundamental importância para criar uma boa paleta de cores.

## Ícones

São importantes para reforçar a comunicação de determinado texto na interface. Nossos olhos interpretam símbolos e imagens mais rápido que textos.

É sempre importante manter uma harmonia entre o tipo de ícones do projeto. Por exemplo usando apenas ícones de linha ou apenas ícones fechados.

## Imagens e ilustrações

Assim como os ícones, as imagens e ilustrações também são importantes na comunicação. É importante saber utilizar para transmitir a informação necessária e correta.

## Atomic design

É uma metodologia que nos ajuda a pensar na interface do usuário de maneira hierárquica.

O atomic design detalha o que acontece durante a criação e manutenção de sistemas de design (design system), permitindo mais consistência e qualidade.

---
## Referências:

[1] - https://material.io/design/layout/understanding-layout.html