---
title: "Testes, TDD e Jest"
date: "2020-08-30"
---

Saudações leitores, nesse post vou colocar algumas anotações e resumos dos meus estudos sobre testes automatizados e tudo que cerca esse assunto, como o padrão de projetos TDD (*Test Driven Development*) e a ferramenta que estou usando atualmente para criar e executar os testes - Jest.

Antes de iniciarmos o post é bom definir o significado de alguns termos. As arquiteturas de software são regras aplicáveis a projetos que deverão escalar e permitir uma manutenção do código mais simples, evitando acoplamento de funcionalidades.

Assim como não devemos matar uma formiga com uma bazuca, **nem sempre é necessário aplicar uma arquitetura de software complexa para projetos mais simples**.

## Testes automatizados

Os testes automatizados monitoram o funcionamento da aplicação mesmo após as atualizações realizadas do código, com o acréscimo de novas funcionalidades e do número de devs do time.

### Tipos de testes:

1. Teste unitário:

Testam funcionalidades específicas e isoladas da aplicação (precisam ser funções puras => não dependem de outras partes da aplicação).

**JAMAIS** realizará chamadas a API's, não apresenta efeitos colaterais, depende apenas da própria aplicação.

2. Teste de integração:

Testam funcionalidades completas, passando por várias camadas da aplicação. 

Por exemplo, um teste que passe por arquivos de: Route -> Controller -> Service -> Repository -> ...

3. Teste E2E (End-to-end):

São testes que simulam a ação do usuário dentro da aplicação. É uma categoria de teste mais comum nos códigos *front-end*.

Exemplo: Clique no input de e-mail -> Preencha com diego@rocketseat.com.br -> Clique no input de senha -> Preencha 123456 -> Clique no botão "Logar" -> Espero que a página tenha enviado o usuário para o *dashboard*.

## TDD (Test Driven Development)

É uma metodologia de desenvolvimento onde os testes são criados antes das próprias funcionalidades. Dessa forma garante-se que os requisitos do código estão explícitos e documentados.

Segundo [1], o TDD se baseia em pequenos ciclos de repetições, onde para cada funcionalidade do sistema um teste é criado antes.

Essa metodologia apresenta três estágios:

* **Red:** Nesta fase os testes são escritos e consequentemente vão falhar quando executados, pois não existe a lógica ainda;
* **Green:** Após serem definidos os testes são escritos os códigos que atendem os requisitos definidos na fase anterior;
* **Refactor:** Por fim, nesta última fase, o código escrito na etapa anterior é refatorado para implementar as melhores práticas do desenvolvimento de *software*.

De acordo com [1], temos diversos ganhos com esta estratégia:

✔ Feedback rápido sobre a nova funcionalidade e sobre as outras existentes no projeto
✔ Código mais limpo, já que escrevemos códigos simples para o teste passar
✔ Segurança no Refactoring pois podemos ver o que estamos ou não afetando
✔ Segurança na correção de bugs
✔ Confiança do desenvolvedor na correção de bugs, pois qualquer passo errado será mostrado pelos testes
✔ Código da aplicação mais flexível, já que para escrever testes temos que separar em pequenos "pedaços" o nosso código, para que sejam testáveis, ou seja, nosso código estará menos acoplado.

## Ferramentas

Agora vou escrever sobre as ferramentas que podem ser utilizadas para implementar o TDD.

A pouco tempo atrás era muito comum encontrar a *stack* de tecnologias *mocha* + *chai* para criar os testes automatizados do projeto no ambiente do Node.js [2].

Atualmente, a ferramenta mais utilizada é o [Jest](https://jestjs.io/), um *framework* simplificado para escrever e executar os testes com Node.js.

Um dos pontos fortes dessa ferramenta é a capacidade de se integrar com vários outros *frameworks* e ferramentas, como: Babel, TypeScript, Node, React, Angular, Vue, etc.

Além disso, é possível executar uma instrução que gera um relatório detalhado informando a quantidade de % coberta pelos testes. Dessa forma temos uma indicação visual de quanto código ainda precisa ser testado.

## Exemplo

Neste exemplo vou mostrar e explicar um trecho de código de um dos testes que implementei no meu projeto Full Plans (pode ser acessado [clicando aqui](https://github.com/64J0/FULL_PLANS)).

O objetivo do teste mostrado é verificar um *service* responsável por autenticar um usuário no sistema - fazer *login*.

```javascript
  // Carregando o módulo bcryptjs que foi baixado utilizando o NPM e está atualmente na pasta node_modules
  const bcrypt = require("bcryptjs");

  // Importando o service que será testado e que é responsável por autenticar o usuário
  const AuthenticateUserService = require("./AuthenticateUserService");

  // Nesse trecho está sendo "mockado" o repositório de usuários
  // Isso se deve ao fato de que o teste não engloba essa parte do sistema, portanto ela está sendo substituída por uma versão customizada e falsa, que implementa as mesmas funcionalidades do repositório real
  jest.mock("../../repositories/users-repository");

  // Também estou "mockando" uma função do framework bcryptjs, pois não é necessário testar essa funcionalidade, visto que não foi desenvolvida por mim
  jest.mock("bcryptjs", () => {
    const compare = async (password, userPassword) => {
      return (
        new Promise((resolve) => {
          resolve(password === userPassword ? 1 : 0);
        }
        ));
    }

    return {
      compare
    }
  });

  // Além disso, também estou "mockando" uma função responsável por fazer sign-in e gerar um token de acesso baseado em tempo da biblioteca jsonwebtoken
  jest.mock("jsonwebtoken", () => {
    const sign = () => {
      return "token-test";
    }

    return {
      sign
    }
  })

  // Aqui começa a descrição do teste de forma generalista
  // Nessa linha é definido que será testado o service AuthenticateUserService
  describe("AuthenticateUserService", () => {

    // Aqui é definido qual o funcionamento esperado do código, neste caso o service deve executar da maneira correta
    // São especificados os parâmetros que serão usados para fazer login e abaixo é descrito o funcionamento esperado da implementação do código
    it("should authenticate", async () => {
      const result = await AuthenticateUserService.execute({
        email: "teste1@teste.com",
        password: "123456"
      });

      // Espera-se que o resultado da execução do service seja um objeto com as chaves auth, token e user
      expect(result).toHaveProperty("auth");
      expect(result).toHaveProperty("token");
      expect(result).toHaveProperty("user");

      // Além disso espera-se que o objeto user tenha uma chave de nome "_id" com valor "1"
      expect(result.user).toHaveProperty("_id", "1");
      // E uma chave chamada "password" com valor undefined
      expect(result.user).toHaveProperty("password", undefined);
    });

    // Nesse teste esperamos que o service não faça a autenticação caso seja enviado um e-mail não presente dentre os valores cadastrados no banco de dados
    it("should not authenticate when it's used a non-existent e-mail in the database", async () => {
      const result = await AuthenticateUserService.execute({
        email: "non-existent@email.com",
        password: "123456"
      });

      // Neste trecho estamos especificando um "espião" para monitorar o chamado da função do módulo bcryptjs chamado compare.
      const spyOnBcrypt_Compare = jest.spyOn(bcrypt, "compare");

      // Esperamos que bcrypt.compare() não tenha sido chamado
      expect(spyOnBcrypt_Compare).not.toHaveBeenCalled();

      // E que o resultado seja um objeto com chave "auth" e valor false.
      expect(result).toHaveProperty("auth", false);
    });

    // Por fim, neste teste verificamos se o service deixará de autenticar um usuário cuja senha informada seja diferente da senha cadastrada na base de dados
    it("should not authenticate when it's send a wrong password", async () => {
      const result = await AuthenticateUserService.execute({
        email: "teste1@teste.com",
        password: "123"
      });

      // Novamente estamos "espiando" a execução da função bcrypt.compare()
      const spyOnBcrypt_Compare = jest.spyOn(bcrypt, "compare");

      // Esperamos que essa função tenha sido chamada apenas uma vez, para verificar se o e-mail informado está presente no banco
      expect(spyOnBcrypt_Compare).toHaveBeenCalledTimes(1);

      // Assim como anteriormente, espera-se que o resultado da aplicação do service recebamos como resultado um objeto com chave "auth" e valor false
      expect(result).toHaveProperty("auth", false);
    });
  });
```

Abaixo segue o código referente ao service que está sendo testado:

```javascript
  const bcrypt = require("bcryptjs");
  const jwt = require("jsonwebtoken");

  const repository = require("../../repositories/users-repository");

  const AuthenticateUserService = async ({ email, password }) => {
    const user = await repository.findByEmail({ email });

    if (!user) {
      return { auth: false, token: null, user: null };
    }

    const resComparacao = await bcrypt.compare(password, user.password);

    if (!resComparacao) {
      return { auth: false, token: null, user: null };
    }

    const id = user._id;
    const token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 28800, // 8 horas
    });

    user.password = undefined;

    return ({ auth: true, token, user });
  }

  exports.execute = AuthenticateUserService;
```

E também o código do users-repository "mockado":

```javascript
  let UserDataBase = [
    {
      _id: "1",
      name: "Nome Teste 1",
      email: "teste1@teste.com",
      password: "123456",
      permission: "read",
      createdAt: Date.now()
    },
    {
      _id: "2",
      name: "Nome Teste 2",
      email: "teste2@teste.com",
      password: "123456",
      permission: "write",
      createdAt: Date.now()
    },
    {
      _id: "3",
      name: "Nome Teste 3",
      email: "teste3@teste.com",
      password: "123456",
      permission: "admin",
      createdAt: Date.now()
    }
  ];

  exports.findByEmail = async ({ email }) => {
    try {
      const user = UserDataBase.find((thisUser) => thisUser.email === email);

      if (!user.name) {
        throw new Error("Usuário não foi encontrado!");
      }

      return user;
    } catch {
      return undefined;
    }
  }

  exports.findById = async ({ id }) => {
    try {
      const user = UserDataBase.find((thisUser) => thisUser._id === id);

      if (!user) {
        throw new Error("Usuário não foi encontrado!");
      }

      return user;
    } catch (err) {
      return { message: err };
    }
  }

  exports.create = async ({ name, email, password, permission }) => {
    const user = { name, email, password, permission };

    const newId = Number(UserDataBase[UserDataBase.length - 1]._id) + 1;
    Object.assign(user, { _id: newId });

    UserDataBase.push(user);

    user.password = undefined;
    return user;
  }

  exports.update = async (id, data) => {
    const updatedData = { ...data };
    const updatedUser = UserDataBase.find(thisUser => thisUser._id === id);

    Object.assign(updatedUser, updatedData);

    updatedUser.password = undefined;
    return updatedUser;
  }

  exports.list = async () => {
    return UserDataBase;
  };

  exports.delete = async (id) => {
    UserDataBase = UserDataBase.filter((thisUser) => thisUser._id !== id);

    return UserDataBase;
  }
```

Após tudo isso basta executar no terminal um *npm test* e o próprio sistema irá testar a minha implementação do código, verificando os requisitos que eu mesmo defini para a funcionalidade. Abaixo segue uma imagem mostrando o resultado da execução dos testes.

![Execução dos testes](/post-images/testes-tdd-jest/test-suites.PNG)

Por enquanto foi isso. A medida que for descobrindo mais coisas pretendo incrementar o texto.

---
## Referências:

[1] - Test Driven Development: TDD Simples e Prático. DEVMEDIA. Pode ser acessado [neste link](https://www.devmedia.com.br/test-driven-development-tdd-simples-e-pratico/18533).

[2] - Testando API REST com Mocha e Chai. Pode ser acessado [neste link](https://medium.com/@rafaelvicio/testando-api-rest-com-mocha-e-chai-bf3764ac2797).