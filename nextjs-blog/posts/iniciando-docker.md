---
title: "Iniciando com o Docker e Containers"
date: "2020-09-28"
show: true
---

Saudações meu caro leitor. Neste post pretendo colocar algumas informações a respeito de uma tecnologia que tenho estudado recentemente visando entender melhor o processo de subir uma aplicação WEB.

## Containers

Segundo o post da Red Hat, os containers Linux são tecnologias que permitem empacotar e isolar aplicações com todo o ambiente de execução delas, ou seja, com todos os arquivos necessários para executá-las, dessa forma facilitando migrá-las de um ambiente para outro (dev, teste, prod, etc) sem perder funcionalidades.

Você pode implantar os containers para diversas cargas de trabalho e casos de uso, independentemente do tamanho. Com os containers sua equipe tem acesso a tecnologia subjacente necessária à abordagem de desenvolvimento nativo em nuvem e pode adotar devOps, CI/CD (implantação e integração contínuas) e até mesmo o modelo sem servidor.

As aplicações baseadas em container funcionam em arquiteturas de nuvem altamente distribuídas.

## Docker

Segundo a própria documentação da ferramenta, o Docker é uma plataforma para devs e sysadmins para executar, *buildar* e compartilhar aplicações com containers.

Alguns dos benefícios de utilizar containers:

* **Flexibilidade:** Mesmo as aplicações mais complexas podem ser transformadas em containers.
* **Leve:** Containers usam e compartilham o *kernel* do *host*, tornando muito mais eficiente em termos de recursos do sistema que as máquinas virtuais.
* **Portável:** È possível *buildar* localmente, *deployar* pra *cloud* e rodar em qualquer lugar.
* **Pouco acoplados:** Containers são altamente auto-suficientes e encapsulados, permitindo trocar ou melhorar um sem afetar outros.
* **Escalável:** É possível aumentar e distribuir automaticamente réplicas de containers por um *datacenter*.
* **Seguro:** Os containers aplicam restrições agressivas e isolam processos sem a necessidade de qualquer configuração por parte do usuário.

## Images e Containers:

Fundamentalmente, um container não é nada mais que um processo executando com algumas funcionalidades encapsuladas aplicadas para mantê-lo isolado do host e de outros containers.

Um dos aspectos mais importantes do isolamento de containers é que cada container interage com seu próprio e privado arquivo de sistema (*filesystem*); onde esses arquivos de sistema são disponibilizados de uma Imagem Docker (**Docker Image**).

Uma imagem inclui tudo que é necessário para executar uma aplicação - o código ou binário, runtimes, dependências, e qualquer outro arquivo de arquivo de sistema.

Alguns exemplos de imagens sendo instaladas pela linha de comando:

```bash
# Instala o mongodb
sudo docker run --name mongodb -p 27017:27017 --detach -t mongo

# Instala o postgres
sudo docker run --name postgres_sql -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

## Containers e máquinas virtuais

Um container executa nativamente no Linux e compartilha o kernel da máquina host com outros containers. Ele executa um processo discreto, pegando o mínimo de memória necessária para executar, tornando-o leve.

Em contraste, uma **máquina virtual** (VM) executa um sistema operacional "convidado" completo com acesso virtual aos recursos do host através de um *hypervisor*. Em geral, VMs necessitam de muito mais recursos que os necessários para executar apenas a lógica da aplicação.

## Workflow de desenvolvimento

1. Crie e teste containers individuais para cada componente da sua aplicação primeiro criando Docker Images.
2. Monte seus containers e a infraestrutura de suporte em uma aplicação completa.
3. Teste, compartilhe, e faça deploy da aplicação completa.

## Dockerfile

O arquivo chamado Dockerfile contém uma receita para configurar o ambiente onde o projeto será executado. Com essa receita o Docker tem uma imagem onde o mesmo entende como configurar tudo automaticamente.

Exemplo de um Dockerfile bem simples:

```bash
# Define uma imagem do Node.js que será usada como base.
FROM node:current-slim

# Define o diretório de trabalho.
WORKDIR /usr/src/app

# Copia o package.json do host para o diretório de trabalho.
COPY package.json .

# Instala as dependências do projeto dentro dos arquivos de sistema da imagem.
RUN npm install

# Adiciona metadados à imagem para descrever qual porta o container estará escutando quando em execução.
EXPOSE 8080

# Executa o comando de início do servidor dentro do container.
CMD [ "npm", "start" ]

# Copia o resto dos códigos da aplicação do host para os arquivos de sistema da imagem. 
COPY . .
```

A receita que o Dockerfile acima está especificando, em outras palavras, é:

* Iniciando de uma imagem pre-existente do Node (node:current-slim). Esta é uma imagem oficial construída pela equipe do node.js e validada pela equipe do Docker como uma imagem de alta qualidade contendo o interpretador e dependências básicas do Node.js de Suporte Longo (LTS - Long Term Support).
* Usamos o WORKDIR para especificar que todas as ações subsequentes devem ser feitas no diretório */usr/src/app* nos arquivos de sistema da imagem (nunca os arquivos de sistema do host).
* Copiamos o arquivo package.json do host para a localização atual ( . ) na imagem (neste caso */usr/src/app/package.json*).
* Executamos o comando npm install dentro dos arquivos de sistema da imagem (que irá ler o package.json para determinar as dependências e instalá-las).
* Após isso iremos copiar o resto do código fonte do host para os arquivos de sistema da imagem.

Para executar essa imagem devemos primeiramente acessar o diretório onde o Dockerfile no prompt e então:

```bash
# Buildar a imagem
sudo docker build --tag projectname:1.0

# Executar a imagem
sudo docker run --publish 8000:8080 --detach --name bb projectname:1.0
```

As flags usadas aqui são:

* --publish: orienta o Docker a redirecionar o tráfego chegando na porta 8080 do host para a porta 8080 do container. Os containers tem seu próprio conjunto de portas privadas, então se você quiser alcançar alguma pela rede, você deve redirecionar o tráfego deste modo. Em outro caso as regras de firewall irão bloquear o tráfego de chegar ao container, como uma postura de segurança padrão.
* --detach: orienta o Docker a executar o container no background.
* --name: especifica o nome com o qual podemos nos referir ao container nos comandos subsequentes, neste caso bb.

## Compartilhar as imagens

Para compartilhar as imagens que nós construímos podemos usar o próprio serviço do Docker chamado DockerHub. Após realizarmos nosso cadastro nessa plataforma podemos upar a imagem para este local onde a mesma ficará acessível de qualquer dispositivo conectado a internet.

## Bônus: Kubernetes

Para finalizar vou abordar uma última ferramenta que está bastante ligada aos outros tópicos deste post, sendo uma ferramenta para orquestração de containers bastante utilizada.

Segundo o post da Red Hat, o Kubernetes é uma plataforma open source que automatiza as operações dos containers Linux. Essa plataforma elimina grande parte dos processos manuais necessários para implantar e escalar as aplicações em containers.

O Kubernetes oferece uma plataforma para que você possa programar e executar containers em clusters de máquinas físicas ou virtuais. A arquitetura do Kubernetes divide um cluster em componentes que trabalham em conjunto para manter o estado definido dele.

---

## Referências:

[1] - Docker - Orientation and setup. https://docs.docker.com/get-started/

[2] - Introdução aos containers Linux. https://www.redhat.com/pt-br/topics/containers