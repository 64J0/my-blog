---
title: "Código Limpo - Um resumo"
date: "2020-09-14"
---

Fala clã, tudo jóia? 

Nesse post eu vou colocar um resumo de algumas coisas que aprendi lendo o livro **Código Limpo** (*Clean Code*) do Robert Cecil Martin.

A vontade de ler esse livro veio de várias recomendações de programadores que eu respeito bastante, como por exemplo o pessoal da Rocketseat, Filipe Deschamps, Lucas Montano, Fábio Akita, o pessoal do Código Fonte TV, entre vários outros (sim, é um livro bem popular).

---

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

# Funções

Nesse ponto o autor é direto: Funções tem que ser pequenas. Mas quão pequenas? O máximo possível!

Porém, novamente, devemos sempre prezar pela qualidade semântica do código, tentando deixar o conteúdo o mais simples e didático possível para que outras pessoas (ou nós mesmos futuramente) consigam ler e entender o que está escrito facilmente.

### A regra de ouro

A principal regra para a implementação de funções é: 

* Funções devem fazer uma, e apenas uma coisa, executando essa tarefa da melhor maneira possível.

Neste caso, o processo de <u>tratar erros</u> é considerado uma coisa, portanto idealmente uma função que trata erros deve fazer apenas isso.

### Outras regras

Além disso também é apresentada outra regra para a implementação de funções, uma bem mais estranha e que confesso, não entendi direito sua filosofia ainda.

Para o autor as <u>funções devem ter o menor número possível de argumentos</u>, sendo uma função com zero argumentos a melhor situação. 

Suas funções **não** devem apresentar *side effects*. Por exemplo, quando for alterar alguma coisa usando um método isso deve ficar claro de acordo com o nome do método.

Devemos sempre preferir lançar (*throw*) os erros que enviar uma string de erro customizada como resposta caso haja um problema. Com isso evitamos grandes estruturas aninhadas.

O exemplo apresentado no livro para essa situação é:

```java
  if (deletePage(page) == E_OK) {
    if (registry.deleteReference(page.name) == E_OK) {
      if (configKeys.deleteKey(page.name.makeKey()) == E_OK) {
        logger.log("page deleted");
      } else {
        logger.log("configKey not deleted");
      }
    } else {
      logger.log("deleteReference from registry failed");
    }
  } else {
    logger.log("delete failed");
    return E_ERROR;
  }
```

Por outro lado, usando as excessões temos:

```java
  try {
    deletePage(page);
    registry.deleteReference(page.name);
    configKeys.deleteKey(page.name.makeKey());
  }
  catch (Exception e) {
    logger.log(e.getMessage());
  }
```

-- Isso é bem legal e é uma coisa que nunca tinha pensado antes. Agora vou dar mais valor aos blocos de *try catch* com certeza.

# Comentários

Nesse ponto o autor do livro é bastante contrário à utilização de comentários no código. 

Como o código é bastante dinâmico alguns comentários podem ficar datados e com erros pois nem sempre são atualizados com a frequência necessária.

Além disso, segundo o autor, um bom sintoma de que o código está bagunçado pode ser visualizado a partir da quantidade de comentários necessários para explicar o funcionamento deste.

Por exemplo, neste primeiro trecho temos um código bastante confuso e grande que não deixa claro em um primeiro momento o que está fazendo, por isso a necessidade do comentário:

```java
  // Check to see if the employee is eligible for full benefits
  if ((employee.flags & HOURLY_FLAG) && (employee.age > 65)) {
    // ...
  }
```

Já no exemplo abaixo, a funcionalidade foi encapsulada em uma função que já explica a intenção do código, o que deixa muito mais legível e organizado:

```java
  if (employee.isEligibleForFullBenefits()) {
    // ...
  }
```

### Bons comentários

O autor lista algumas situações em que os comentários podem ser utilizados de maneira boa. Abaixo segue um resumo dessas situações.

* Comentários legais, por exemplo de *copyright*, que são exigidos pela organização.

* Informar sobre expressões regulares (RegEx):

```java
  // format matched kk:mm:ss EEE, MMM dd, yyyy
  Pattern timeMatcher = Pattern.compile(
    "\\d*:\\d*:\\d* \\w*, \\w* \\d*, \\d*"
  );
```

* Explicar a intenção do código, discutindo porque foi tomada alguma decisão de implementação.

* Avisar sobre consequências de executar alguma ação.

* Listar coisas que ainda devem ser feitas (*TODO List*).

---
## Referências:

[1] - [Blog da Rocketseat](https://blog.rocketseat.com.br/).

[2] - [Canal do Filipe Deschamps no youtube](https://www.youtube.com/channel/UCU5JicSrEM5A63jkJ2QvGYw).

[3] - [Canal do Lucas Montano no youtube](https://www.youtube.com/channel/UCyHOBY6IDZF9zOKJPou2Rgg).

[4] - [Canal do Fábio Akita no youtube](https://www.youtube.com/user/AkitaOnRails).

[5] - [Canal do Código Fonte TV](https://www.youtube.com/user/codigofontetv).