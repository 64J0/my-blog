---
title: "Iniciando com o Docker e Containers"
date: "2020-09-28"
show: true
tags: ["docker", "virtualization"]
---

Saudações caro leitor, espero que você esteja bem.

Neste post pretendo colocar algumas informações a respeito de uma tecnologia que tenho estudado recentemente visando entender melhor o processo de subir uma aplicação *WEB* para um servidor. Sem mais delongas vou tratar de alguns assuntos iniciais sobre **Docker**, **Containers**, **Images** e **Kubernetes** de maneira resumida apenas para dar uma ideia de como fazer as primeiras aplicações e entender a utilidade dessas ferramentas/conceitos.

## Containers

Segundo o post da **Red Hat [2]**, os *containers* *Linux* são tecnologias que permitem empacotar e isolar aplicações com todo o ambiente de execução delas, ou seja, com todos os arquivos necessários para implementá-los, dessa forma facilitando migrá-las de um ambiente para outro (*dev*, *test*, *prod*, etc) sem perder funcionalidades.

Você pode implantar os *containers* para diversas cargas de trabalho e casos de uso, independentemente do tamanho. Com os *containers* sua equipe tem acesso a tecnologia subjacente necessária à abordagem de desenvolvimento nativo em nuvem e pode adotar *devOps*, *CI/CD* (implantação e integração contínuas) e até mesmo o modelo sem servidor.

As aplicações baseadas em container funcionam em arquiteturas de nuvem altamente distribuídas.

## Containers e máquinas virtuais

Um *container* executa nativamente no *Linux* e compartilha o kernel da máquina *host* com outros *containers*. Ele executa um processo discreto, pegando o mínimo de memória necessária para sua operação, tornando-o bem mais leve quando comparado às outras opções.

Em contraste, uma **máquina virtual** (**VM**) executa um sistema operacional "convidado" completo com acesso virtual aos recursos do *host* através de um *hypervisor*. Em geral, **VMs** necessitam de muito mais recursos que os necessários para executar apenas a lógica da aplicação.

Portanto, a utilização dos containers é uma opção bem mais interessante do ponto de vista prático.

## Docker

Segundo a própria documentação da ferramenta [1], o *Docker* é uma plataforma onde *devs* e *sysadmins* podem executar, *buildar* e compartilhar aplicações com *containers*.

Abaixo seguem alguns dos benefícios de utilizar *containers*:

* **Flexibilidade:** Mesmo as aplicações mais complexas podem ser transformadas em *containers*.
* **Leve:** *Containers* usam e compartilham o *kernel* do *host*, tornando muito mais eficiente em termos de recursos do sistema que as máquinas virtuais.
* **Portável:** È possível *buildar* localmente, *deployar* pra *cloud* e rodar em qualquer lugar.
* **Pouco acoplados:** *Containers* são altamente auto-suficientes e encapsulados, permitindo trocar ou melhorar um sem afetar outros.
* **Escalável:** É possível aumentar e distribuir automaticamente réplicas de *containers* por um *datacenter* de maneira bastante fácil.
* **Seguro:** Os *containers* aplicam restrições agressivas e isolam processos sem a necessidade de qualquer configuração por parte do usuário.

## Images e Containers:

Fundamentalmente, um *container* não é nada mais que um processo executando com algumas funcionalidades encapsuladas aplicadas para mantê-lo isolado do *host* e de outros *containers*.

Um dos aspectos mais importantes do isolamento de *containers* é que cada *container* interage com seu próprio e privado *filesystem*; onde esses arquivos são disponibilizados de uma Imagem *Docker* (**Docker Image**).

Uma Imagem *Docker* inclui tudo que é necessário para executar uma aplicação - os códigos ou binários, *runtimes*, dependências, e qualquer outro arquivo de sistema obrigatório.

Abaixo seguem alguns exemplos de imagens sendo instaladas pela linha de comando num computador com sistema operacional *Linux*:

```bash
# Instala o mongodb configurado para escutar na porta padrão 27017
sudo docker run --name mongodb -p 27017:27017 --detach -t mongo

# Instala o postgres configurado para escutar na porta padrão 5432
sudo docker run --name postgres_sql -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

Os comentários acima dos comandos explicam resumidamente o que cada instrução está fazendo. Caso você tenha curiosidade de entender as opções que não foram abordadas basta conferir na documentação oficial buscando essas mesmas opções ([link da documentação](https://docs.docker.com/reference/)).

## Workflow de desenvolvimento

Abaixo segue o *workflow* apresentado no guia do *Docker* das fases de um projeto sendo desenvolvido com essa tecnologia. É basicamente um passo a passo direto com as etapas que devem ser seguidas.

1. Crie e teste *containers* individuais para cada componente da sua aplicação primeiro criando *Docker Images*.
2. Monte seus *containers* e a infraestrutura de suporte em uma aplicação completa, através de um *Dockerfile* por exemplo.
3. Teste, compartilhe, e faça *deploy* da aplicação completa em algum servidor para validação.

## Dockerfile

O arquivo chamado *Dockerfile* contém uma receita para configurar o ambiente onde o projeto será executado. Com essa receita o *Docker* tem uma imagem customizada do projeto onde a ferramenta entende como configurar todo o ambiente automaticamente.

Exemplo de um Dockerfile bem simples:

```bash
# Define uma imagem do Node.js que será usada como base.
FROM node:current-slim

# Define o diretório de trabalho.
WORKDIR /usr/src/app

# Copia o package.json do host para o diretório de trabalho no servidor.
COPY package.json .

# Instala as dependências do projeto dentro dos arquivos de sistema da imagem.
RUN npm install

# Adiciona metadados à imagem para descrever qual porta o container estará escutando quando em execução.
EXPOSE 8080

# Copia o resto dos códigos da aplicação do host para os arquivos de sistema da imagem.
COPY . .

# Executa o comando de início do servidor dentro do container.
CMD [ "npm", "start" ]
```

A receita que o *Dockerfile* acima está especificando em outras palavras está dizendo:

* Iniciando de uma imagem pré-existente do **Node.js** (*node:current-slim*).
* Usamos o WORKDIR para especificar que todas as ações subsequentes devem ser feitas no diretório */usr/src/app* nos arquivos de sistema da imagem (nunca os arquivos de sistema do *host*).
* Copiamos o arquivo **package.json** do *host* para a localização atual ( . ) <u>na imagem</u> (neste caso */usr/src/app/package.json*).
* Executamos o comando *npm install* dentro dos arquivos de sistema da imagem (que irá ler o *package.json* para determinar as dependências e instalá-las).
* Em seguida definimos qual a porta o container irá usar para expor a aplicação (8080).
* Após isso iremos copiar o resto do código fonte do *host* para os arquivos de sistema da imagem.
* Por fim, executamos o comando *npm start* para iniciar a aplicação.

Observação: O *node:current-slim* é uma imagem oficial construída pela equipe do *node.js* e validada pela equipe do *Docker* como uma imagem de alta qualidade contendo o interpretador e dependências básicas do *Node.js* na versão de longo suporte (**LTS - Long Term Support**).

Para executar essa imagem devemos primeiramente acessar o diretório onde está o *Dockerfile* no bash e então rodar as instruções:

```bash
# cd <Dockerfile folder>

# Buildar a imagem
sudo docker build --tag projectname:1.0

# Executar a imagem
sudo docker run --publish 8000:8080 --detach --name bb projectname:1.0
```

As *flags* usadas aqui são:

* --publish: orienta o Docker a redirecionar o tráfego chegando na porta 8080 do host para a porta 8080 do container. Os containers tem seu próprio conjunto de portas privadas, então se você quiser alcançar alguma pela rede, você deve redirecionar o tráfego deste modo. Em outro caso as regras de firewall irão bloquear o tráfego de chegar ao container, como uma postura de segurança padrão.
* --detach: orienta o Docker a executar o container no background.
* --name: especifica o nome com o qual podemos nos referir ao container nos comandos subsequentes, neste caso bb.

Neste caso, apesar a imagem estar sendo executada no *container* a partir da porta 8080, no host ela estará disponível na porta 8000.

## Compartilhar as imagens

Para compartilhar as imagens que nós construímos podemos usar o próprio serviço do *Docker* chamado *DockerHub*. Após realizarmos nosso cadastro nessa plataforma podemos upar a imagem para este local onde a mesma ficará acessível de qualquer dispositivo conectado a internet de maneira semelhante ao encontrado no *GitHub*, ou seja, podemos ter imagens públicas e privadas.

## Bônus: Kubernetes

Para finalizar vou abordar uma última ferramenta que está bastante ligada aos outros tópicos deste post, sendo uma ferramenta para <u>orquestração de *containers*</u> bastante utilizada chamada **Kubernetes**.

Segundo o post da **Red Hat [2]**, o *Kubernetes* é uma plataforma *open source* que automatiza as operações dos *containers* *Linux*. Essa plataforma elimina grande parte dos processos manuais necessários para implantar e escalar as aplicações em *containers*.

O *Kubernetes* oferece uma plataforma para que você possa programar e executar *containers* em *clusters* de máquinas físicas ou virtuais. A arquitetura do *Kubernetes* divide um cluster em componentes que trabalham em conjunto para manter o estado definido dele.

## Final do post

Bom pessoal, o post de hoje foi esse. Como mencionei no início busquei abordar de uma maneira resumida e introdutória alguns conceitos e ferramentas ligadas ao mundo do *deploy* de aplicações e *devOps*.

Espero ter sido claro e objetivo e qualquer dúvida pode entrar em contato comigo em alguma das minhas redes sociais que estão mostradas nessa página do blog: https://gaio.dev/contato.

Até a próxima.

---

## Referências:

[1] - Docker - Orientation and setup. https://docs.docker.com/get-started/

[2] - Introdução aos containers Linux. https://www.redhat.com/pt-br/topics/containers
