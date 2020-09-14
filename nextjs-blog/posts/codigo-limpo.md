---
title: "Código Limpo - Um resumo"
date: "2020-09-14"
---

Fala clã, tudo jóia? 

Nesse post eu vou colocar um resumo de algumas coisas que aprendi lendo o livro **Código Limpo** (*Clean Code*) do Robert Cecil Martin.

A vontade de ler esse livro veio de várias recomendações de programadores que eu respeito bastante, como por exemplo o pessoal da Rocketseat, Filipe Deschamps, Lucas Montano, Fábio Akita, o pessoal do Código Fonte TV, entre vários outros (sim, é um livro bem popular).

# Nomes Significativos

No universo da programação, quando estamos desenvolvendo nossos programas damos nomes para várias coisas de maneira bem corriqueira.

Algumas vezes não ligamos muito para isso num primeiro momento, focando apenas na criação da funcionalidade, porém futuramente isso pode cobrar um preço alto.

Sempre dê nomes significativos para todos os componentes do código, isso evita inclusive a necessidade de escrever comentários em alguns casos, além de facilitar bastante a leitura e interpretação dos scripts.

Para saber se um nome foi escolhido corretamente verifique se ele transmite as seguintes informações:

* Porque isso existe?
* O que isso faz?
* Como isso é usado?

Caso não, pense um pouco mais e tente atribuir essa informação da melhor forma possível, de forma clara e concisa, baseando-se em <u>termos do domínio do problema ou da solução</u>.

Segundo o autor a diferença entre um programador inteligente e um programador profissional é que o profissional entende que a clareza é tudo. Profissionais usam seus conhecimentos para o bem e escrevem códigos que outras pessoas consigam entender.

Algumas dicas relevantes:

* Nomeie classes usando substantivos ou frases relacionadas a substativos, mas nunca um verbo. Por exemplo *Customer, WikiPage, Account*;
* Nomeie métodos e funções com verbos ou frases relacionadas a verbos *postPayment, deletePage, save*;
* Evite brincadeiras e trocadilhos ao dar nome às coisas, pois outras pessoas podem não ter o background necessários para entender a mensagem - *Say what you mean. Mean what you say.*;
* Escolha uma palavra por conceito abstrato. Por exemplo, seria confuso ter métodos *fetch, retrive* e *get* como métodos equivalentes em classes diferentes;
* Evite suar a mesma palavra para dois propósitos diferentes;
* Use nomes do domínio da solução ou do domínio do problema, ou seja, <u>termos técnicos</u>, pois as pessoas que lerão seu código *teoricamente* terão uma bagagem intectual para entender os termos.

---
## Referências:

[1] - [Blog da Rocketseat](https://blog.rocketseat.com.br/).

[2] - [Canal do Filipe Deschamps no youtube](https://www.youtube.com/channel/UCU5JicSrEM5A63jkJ2QvGYw)

[3] - [Canal do Lucas Montano no youtube](https://www.youtube.com/channel/UCyHOBY6IDZF9zOKJPou2Rgg)

[4] - [Canal do Fábio Akita no youtube](https://www.youtube.com/user/AkitaOnRails)

[5] - [Canal do Código Fonte TV](https://www.youtube.com/user/codigofontetv)