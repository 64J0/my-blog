---
title: "Webpack e Babel - introdução"
date: "2020-08-13"
show: false
---

Saudações leitores, nesse post irei apresentar algumas informações a respeito das famosas ferramentas **Webpack** e **Babel**.

A ideia desse post surgiu quando estava navegando no youtube e encontrei esse [vídeo](https://www.youtube.com/watch?v=sU3W2ZTt-8I) do Ricardo Sanches sobre o tema. Bom, sem mais delongas vamos ao conteúdo...

## Webpack

O Webpack é basicamente um empacotador de módulos (*module bundler*) JS (ou TS) para aplicações front-end modernas que está presente na maioria dos frameworks atuais. Em outras palavras, essa ferramenta coleta todos os arquivos da aplicação que você está desenvolvendo, até mesmo as dependências externas, e transforma tudo em um arquivo só (ou mais de um) de forma otimizada e automática. 

![Imagem do site do webpack](/post-images/webpack-e-babel/webpack-site.JPG)

Segundo [2], dividir sua aplicação em módulo é uma boa prática pelos seguintes benefícios:

* **Manutenibilidade**: as funcionalidades ficam menos acopladas, é mais fácil alterar uma parte do código sem afetar o sistema inteiro.
* **Isolamento**: variáveis e funções declaradas dentro de um módulo são acessíveis apenas dentro dele (exceto aquilo que o módulo explicitamente exporta), evitando conflitos de variáveis e acesso desnessário de uma parte do código a outra não relacionada.
* **Reusabilidade**: um módulo com uma funcionalidade bem definida é como uma peça de um quebra-cabeça. Pode ser reutilizada em outras partes do mesmo sistema, ou em outros sistemas.
* **Testabilidade**: com o código menos acoplado fica mais fácil escrever testes unitários para validar cada funcionalidade.

## Babel

Além do Webpack também é utilizado o Babel, que é um transpilador de código. Transpilar um código, basicamente, significa convertê-lo para um formato compatível com uma sintaxe antiga, geralmente defasada ou não otimizada para desenvolvimento.

![Imagem do site do webpack](/post-images/webpack-e-babel/babel-logo.svg)

Isso é importante para garantir que o seu código, desenvolvido com funcionalidade avançadas de uma linguagem, por exemplo usando a sintaxe da versão 5 do ECMAscript, possa funcionar em um ambiente que só entenda a versão 3 dessa linguagem, como é o caso de alguns navegadores mais antigos.

Os arquivos gerados pelo Webpack são otimizados para utilização no navegador pelo cliente, sendo possível configurar uma grande quantidade de características variando de acordo com o projeto que está sendo desenvolvido e utilizando os diversos plugins já criados e compartilhados com a comunidades de desenvolvedores.

---

### Referências:

[1] - Ricardo Sanches, *Webpack - Curso rápido para iniciantes*. Disponível neste [link](https://www.youtube.com/watch?v=sU3W2ZTt-8I).

[2] - Douglas Matoso, *Webpack sem Medo*. Disponível neste [link](https://www.webdevdrops.com/webpack-sem-medo-introducao-af889eb659e7).