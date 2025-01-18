---
title: "Cores e paletas - Material Design"
date: "2020-08-28"
show: true
tags: ["ux/ui"]
---

Saudações leitores. No post de hoje vou falar sobre cores e paletas, segundo a abordagem do **Design Guide** do *Google*, conhecido como **Material Design**.

Segundo a própria documentação [1], o sistema de cores do Material Design ajuda a escolher e aplicar cores à interface de usuário (**UI**) de maneira significativa, refletindo a sua marca ou estilo.

Para utilizar essa ferramenta devemos apenas escolher as cores primária e secundária da aplicação.

As cores no layout são usadas para garantir:

## Hierarquia

As cores indicam quais elementos são interativos, como eles se relacionam a outros elementos e seu nível de destaque. Os elementos importantes devem se destacar mais.

## Legibilidade

Textos e outros elementos importantes, como ícones, devem atender a padrões de legibilidades quando aparecerem em *backgrounds* coloridos.

## Expressividade

Devemos mostrar as cores da marca em momentos memoráveis para reforçar seu estilo.

# Definindo o tema

Para definirmos uma base do tema que será aplicado ao nosso projeto devemos especificar inicialmente uma cor primária e uma cor secundária, ambas com pelo menos uma variação.

Em seguida devem ser definidas as cores adicionais, como as de background, superfícies, erros, tipografia e iconografia.

A imagem abaixo mostra um exemplo retirado da referência [1].

![paleta de cores](/post-images/cores-e-paletas-md/paleta-padrao-md.PNG "Paleta de cores padrão do Material Design")

## Cor primária

A **cor primária** é a que será exibida mais frequentemente nas telas e componentes da aplicação. Devemos escolher algumas variações dessa cor, tanto mais claras quanto mais escuras, podendo ser utilizadas no *layout*.

A imagem abaixo, retirada da referência [1], mostra um exemplo de aplicação da mesma cor primária com diferentes tons para compor a interface da aplicação.

![Layout feito com variações da cor primária](/post-images/cores-e-paletas-md/variacao-de-cor-primaria.png "Layout feito com variações da cor primária")

## Cor secundária

A cor secundária é usada para distinguir de mais formas o produto. Ter uma cor secundária é opcional e deve ser aplicada de maneira espaçada para destacar certas partes da interface.

Se não for especificada uma cor secundária, a cor primária pode ser usada para acentuar os elementos, como mostrado na imagem do tópico superior.

## Cores da superfície, background e erro

Essas cores tipicamente não representam a marca.

A imagem abaixo, também retirada da referência [1] ilustra um layout destacando as cores de background, superfície e erro.

![Cores da superfície, background e erro](/post-images/cores-e-paletas-md/outras-cores.png "Cores da superfície, background e erro")

# Ferramenta para gerar paleta automaticamente

Na referência [1] é exibida uma ferramenta que pode ser utilizada para auxiliar na criação da paleta de cores do projeto.

A imagem abaixo mostra o resultado ao buscar uma paleta cuja cor primária é o #0F679A.

![Paleta com cor primária](/post-images/cores-e-paletas-md/paleta-cor-primaria.PNG "Paleta com cor primária")

---
## Referências

[1] - The color system. Material Design Docs. Disponível [neste link](https://material.io/design/color/the-color-system.html#color-usage-and-palettes).
