---
title: "Regex - Expressões regulares"
date: "2020-10-15"
show: false
tags: ["javascript"]
---

*RegEx* (Regular Expressions - "Expressões Regulares"), é uma ferramenta utilizada para encontrar padrões textuais em um conjunto de dados específico.

Uma expressão regular sozinha é apenas uma string, sem qualquer serventia prática. É necessário ter um software para interpretar a *RegEx* e aplicá-la no alvo (*target*). Esse software é o *RegEx Engine* que existe para a maioria das plataformas de desenvolvimento, como JavaScript, C#, Python, PHP, Java, etc.

A imagem abaixo, retirada do curso de *RegEx* da Alura ilustra alguns conceitos relacionados a essa ferramenta, mostrando que toda expressão regular deve ter um padrão que será buscado, e ela também deve receber um alvo, que é a base de dados onde esse padrão será buscado.

Essas informações são então encaminhadas para um motor capaz de interpretar e executar a *RegEx*, podendo utilizar basicamente qualquer linguagem de desenvolvimento moderna como Java, C#, JavaScript, etc. Por fim é mostrado o resultado dessa busca pelo padrão, onde esse resultado pode ser trabalhado posteriormente.

![Fluxo do RegEx](/post-images/regex/regex-flux.png)

## Padrões

Por padrão todos os quantifiers são gananciosos, isto é, selecionam o máximo de caracteres por padrão.

* . -> meta-char que significa qualquer caracter
* ^ -> negação
* ? -> zero ou uma vez
* \+ -> 1 ou mais vezes
* \* -> zero ou mais vezes
* {} -> quantifier, especifica quantas vezes determinado padrão será repetido
  * {n} -> exatamente n vezes
  * {n,} -> no mínimo n vezes
  * {n,m} -> no mínimo n vezes, no máximo m vezes
* [] -> especifica um conjunto de caracteres que buscamos, também chamado de classe. Apenas os caracteres \ (barra invertida), - (hífen) e ^ (circunflexo) realmente são *meta-chars* dentro de uma classe.
  * [a-z] -> especifica as letras minúsculas
  * [A-Z] -> especifica as letras maiúsculas
* \ . -> o caracter do "ponto" propriamente dito
* \w -> letra, semelhante a [A-Za-z0-9_]
* \d -> dígito numérico, semelhante a [0-9]
* \s -> espaços em branco
* | -> significa "ou"

### Âncoras

Uma âncora não casa caracteres como as classes fazem, e nem definem quantidades. Âncoras marcam uma posição específica no alvo, por isso não é possível combiná-las com um quantifier.

Existem várias âncoras predefinidas, mas as mais comuns são ^, $ e \b. Lembrando também que os caracteres ^ e $ são *meta-chars*.

* \b -> seleciona um word boundary, isso é o início ou fim da palavra
* \B -> seleciona padrões que não sejam word boundarys
* ^ -> indica um padrão que deve ser seguido no início da string
* $ -> indica um padrão que deve ser seguido no final da string

### Grupos

O grupos são usados para especificar uma parte definida da expressão regular em que devemos focar a resposta da operação.

Para definir um grupo devemos simplesmente contornar uma regex com "()" para destacar esse trecho.

Caso não quisermos um determinado trecho da regex no resultado podemos utilizar os **non-capturing groups** desta forma:

```javascript
  const regex = /(?:de\s+)/g;
```

Podemos também definir um grupo opcional:

```javascript
  const regex = /(?:de\s+)?/g;
```

Nessa regex dizemos que não queremos no resultado dos grupos uma string formada pelas letras "de" seguidas por um ou mais espaços.

### Backreferences

É possível referenciar grupos anteriormente definidos utilizando a posição do array retornado pela regex, por exemplo neste caso:

```javascript
  const regexBackreference = /<(h1|h2).+?>([\s\wõçã]+)</\1>/g;
```

Neste caso, utilizando o *\1* estaremos referenciando o h1 ou o h2 dependendo de qual padrão foi encontrado inicialmente pela expressão.

## Exemplos

1. Defina a expressão regular para encontrar um CNPJ, por exemplo: **15.123.321/8883-22**:

```javascript
  const regex = /\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/g;
```

2. Defina uma expressão regular para identificar os IPv4 de computadores, lembrando que cada byte pode ser representado com 1 a 3 dígitos na base decimal, por exemplo **192.168.0.1**:

```javascript
  const regex = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/g;
```

3. Na Alura existe um filtro de permissões para habilitar alguns recursos para usuários da Alura ou da Caelum. A sua tarefa é criar a regex que verifica o email desses usuários e extrair o nome do usuário

O email deve ter um @ e terminar com caelum.com.br ou alura.com.br. O nome do usuário (tudo antes do @) tem apenas letras minúsculas, pode ter um número no final e tem de 5 a 15 caracteres.

Por exemplo:

super.mario@caelum.com.br extrai super.mario

donkey.kong@alura.com.br extrai donkey.kong

bowser1@alura.com.br extrai bowser1

```javascript
  const regex = /^([a-z.]{4,14}[a-z\d])@(?:caelum|alura).com.br$/g
```

---

## Referências

[1] - Curso de expressões regulares na plataforma da Alura