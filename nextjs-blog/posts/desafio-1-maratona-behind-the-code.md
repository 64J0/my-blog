---
title: "Desafio 1 da Maratona Behind the Code"
date: "2020-08-15"
---

Nesse post irei colocar algumas informações e divagações a respeito do desafio 1 da Maratona Behind the Code da IBM.

Esse desafio foi proposto pela **Cocamar** e as informações a respeito estão disponíveis no seguinte [link do github](https://github.com/maratonadev-br/desafio-1-2020). Essa empresa começou suas operações focada na produção de café porém atualmente atende uma variedade maior de culturas (**soja**, milho, trigo, café e laranja).

*Observação:* O título da segunda seção do README do github é Desafio de Negócio, será que os desafios posteriores serão focados em outras áreas fora do mercado, por exemplo Desafio Acadêmico? 

Seguindo a leitura é citado o objetivo do desafio: 

* **Criar uma ferramenta rápida e automatizada de identificação de pragas que atingem a lavoura de soja com a utilização de técnicas de reconhecimento visual.**

Como a Maratona está sendo desenvolvida pela IBM eles sugerem a utilização do serviço de reconhecimento de imagens da própria empresa, o *IBM Watson Visual Recognition*. 

Para utilizar essa ferramenta devemos definir uma base de imagens que serão usadas para treinar o algoritmo.

*Observação:* No texto é mencionado que os participantes podem manipular as imagens da base previamente afim de melhorar a acurácia de classificação do modelo do Watson, porém não ensinam a fazer isso.

## Pragas que o sistema deve reconhecer

Para facilitar o desafio, o sistema que será implementado deve reconhecer apenas as quatro principais pragas que atingem a lavoura de soja, sendo elas:

1. Lagarta da soja
2. Percevejo marrom
3. Percevejo pequeno
4. Percevejo verde

A primeira parte do desafio é buscar imagens dessas pragas e criar um modelo de reconhecimento visual capaz de identificar corretamente cada uma delas.

## Resumo das tarefas

O resumo das tarefas segundo o próprio README é:

1. Instanciar o IBM Watson Visual Recognition na IBM Cloud, que é a ferramenta responsável por reconhecer as imagens, classificando-as e detectando objetos;
2. Instanciar o Watson Studio (Cloud Pak for Data as a Service) na IBM Cloud, que é uma interface gráfica para os procedimentos que estão sendo realizados, tornando mais intuitivo e agradável o processo de configuração de alguma ação;
3. Instanciar o Cloud Object Storage na IBM Cloud, que funciona como um HD onde podemos armazenar arquivos que serão usados para criação dos modelos;
4. Buscar por imagens que representam as classes especificadas: **lagarta**, **percevejo_marrom**, **percevejo_pequeno** e **percevejo_verde**;
5. Treinar o modelo;
6. Subir a aplicação de submissão;
7. Acessar a aplicação de submissão e submeter sua solução.

<iframe width="560" height="315" src="https://www.youtube.com/embed/ODorFVi9bL4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Algumas dicas

Para o modelo ficar bom é necessário fornecer imagens de qualidade. Não necessariamente é necessário enviar 1000 imagens de cada praga, porém é necessário fornecer imagens com boas propriedades.

Segundo o instrutor, um valor recomendado de quantidade de imagens com qualidade é entre 10 e 50. 

Uma imagem de qualidade deve apresentar pouco ruído, ou seja, o objeto que será identificado deve estar em destaque na imagem, evitando outros detalhes ao redor.

É importante enviar também um conjunto de imagens relacionadas a alguns insetos parecidos com as pragas que desejamos detectar porém que se caracterizariam como falsos positivos. Nesse caso o conjunto de imagens terá o nome de Negative, por exemplo, joaninhas, borboletas, etc. 

## Avaliação

O sistema testará o reconhecimento das quatro classes citadas acima, ou seja, seu classificador deve reconhecer as classes **lagarta**, **percevejo_marrom**, **percevejo_pequeno** e **percevejo_verde**. A pontuação é baseada em quantas imagens o modelo reconheceu corretamente e na certeza que ele tem nesse reconhecimento.

O  autor do README ainda recomenda testar bastante o modelo e utilizar imagens de qualidade como exemplo, sem muito ruído e com foco no que deve ser reconhecido.

## Especificações técnicas

Para a resolução do desafio, você irá utilizar o serviço de [Visual Recognition](https://cloud.ibm.com/catalog/services/visual-recognition) no plano Lite. Nesse plano existe um limite de 1000 eventos por mês, em que cada evento corresponde, por exemplo, a classificação de uma imagem. **Portanto, tome cuidado ao usar muitas imagens e treinar muitas vezes para não extrapolar o limite do plano, o que invalidaria seu modelo para submissão.** Deixe uma margem de pelo menos 100 eventos para que seu modelo possa ser avaliado com sucesso.

*Exemplo: Um usuário extrapola o limite do plano Lite criando 4 classes com 250 imagens cada e treinando o modelo, pois 4\*250 = 1000.*

## Estratégia adotada

Bom, baseado no que foi descrito acima, a minha estratégia vai ser:

* Coletar um conjunto de imagens de boa qualidade, sem ruído, das pragas em suas fases de vida, contendo pelo menos 10 imagens de cada fase;
* Coletar um conjunto de imagens relacionadas a alguns outros tipos de insetos que podem ser encontrados numa lavoura e que poderiam gerar falsos positivos, e salvar no conjunto de Negatives;

Quando terminar de fazer isso volto aqui e atualizo o post. É isso.

## Material de apoio

* [O que é a IBM Cloud e como subir a sua primeira aplicação na nuvem](https://medium.com/ibmdeveloperbr/o-que-%C3%A9-o-ibm-cloud-e-como-subir-a-sua-primeira-aplica%C3%A7%C3%A3o-na-nuvem-41bfd260a2b7)
* [Documentação do IBM Watson Visual Recognition](https://cloud.ibm.com/docs/visual-recognition?topic=visual-recognition-getting-started-tutorial)