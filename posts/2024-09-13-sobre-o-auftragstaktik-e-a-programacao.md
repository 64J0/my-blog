---
title: "Sobre o auftragstaktik e a programação"
date: "2024-09-13"
show: true
---

O auftragstaktik é uma tática de liderança surgida no contexto militar, que mostrou suas qualidades em grandes guerras. Hoje em dia essa doutrina é mais comumente associada a unidades de elite, em vez do exército completo.

Ela consiste num método de comando e delegação onde o comandante militar dá aos líderes subordinados objetivos claramente definidos, provê detalhes de alto nível como algum prazo, e as forças necessárias/disponíveis para alcançar aquele objetivo. Aos líderes subordinados é dada a liberdade para planejar e executar: eles decidem os métodos que serão empregados de maneira independente, podendo inclusive improvisar com base nos cenários encontrados na batalha.

Isto por sua vez provê uma alta flexibilidade nos níveis de comando operacional e tático, o que acelera a tomada de decisão no campo além de liberar as altas lideranças do gerenciamento de detalhes táticos, podendo se concentrar na parte estratégica.

> Nenhum plano de batalha sobrevive ao contato com o inimigo.

O sucesso dessa doutrina está na capacidade de entendimento dos subordinados, na sua vontade e capacidade de atingir o objetivo, e na capacidade de apresentação e explicação das lideranças.

Podemos traçar alguns paralelos entre esta abordagem militar e estilos de gerenciamento corporativo, ou mesmo com estilos de programação.

No contexto dos estilos de programação, temos, para citar um exemplo básico:

-   Programação imperativa: O programa deve especificar detalhadamente quais comandos e instruções serão executados para alcançar determinado resultado. Pode gerar um programa mais otimizado para determinada plataforma, mas em alguns cenários de mudança, por exemplo no hardware, essas otimizações podem ser perdidas, ou pior, podem piorar o seu desempenho.

    Um exemplo de linguagem onde temos este paradigma é com o código Assembly.
-   Programação declarativa: Assim como o auftragstaktik, nosso foco ao escrever os programas é descrever os resultados desejados, sem necessariamente especificar as etapas para alcançá-los. Deixamos a decisão de usar determinada otimização a cargo de outros componentes como o compilador, por exemplo.

    Um exemplo de ferramenta que aplica esse conceito é o Terraform, onde basicamente definimos quais componentes queremos provisionar usando uma linguagem chamada HSL, e o mínimo de configurações necessárias para que esses componentes funcionem corretamente. O provisionamento por sua vez é totalmente gerenciado por essa ferramenta.

# Referências

-   [1] Mission-type tactics. Wikipedia. Disponível em: [link](https://en.wikipedia.org/wiki/Mission-type_tactics).
