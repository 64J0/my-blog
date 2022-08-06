---
title: "Desafio 2 da Maratona Behind the Code"
date: "2020-08-16"
show: true
---

Segundo dia de maratona!!! Bora clã!!!

O desafio lançado hoje foi proposto por uma empresa chamada **UNINASSAU** que é um grupo focado em educação disponibilizando cursos de graduação, pós-graduação, técnico e EAD (Ensino a distância). Para acessar o README com todas as informações basta clicar [neste link](https://github.com/maratonadev-br/desafio-2-2020).

Uma coisa bem bacana desse desafio é que ele tem uma premiação própria ✨. 

O primeiro e segundo colocado serão premiados com bolsas integrais de bacharelado da UNINASSAU na modalidade EAD. Já os dez melhores colocados no ranking final da Maratona serão premiados com bolsas de estudos integrais na modalidade EAD na empresa, nos seguintes cursos: *Coding*, *Data Science*, *Digital Security* e *Game Design*.

*Observação:* Novamente esse desafio é do tipo Desafio de Negócio... Por enquanto foram disponibilizados apenas desafios dessa classificação.

## O desafio - Tutor automatizado

Esse desafio foi pensado para ser implementado no ambiente virtual de um curso de EAD. Atualmente é possível a realização de uma tutoria remota automática com auxílio de **assistentes virtuais** automatizados.

Esses assistentes podem ser integrados com modelos avançados de **aprendizado de máquina**, que são alimentados com dados sobre o estudante e seu desempenho nas diferentes disciplinas de seu curso. Os modelos, por sua vez, podem ser capazes de **identificar áreas ou competências específicas em que o estudante tenha certa dificuldade e recomendar conteúdo personalizado para cada aluno, de forma completamente escalável e com atendimento 24/7**.

Portanto nesse desafio o participante deve criar um assistente virtual baseado em machine learning, utilizando ferramentas da IBM como o *Watson Machine Learning* e o *Cloud Pak for Data*, voltado para tutoria remota. 

**Sua tarefa será aprimorar um modelo já fornecido e integrar os diversos serviços envolvidos nessa solução!**

No modelo, por motivos de simplicidade, serão focados em dados de quatro disciplinas do curso de Administração: Matemática Financeira, Empreendedorismo, Direito Empresarial e Gestão Operacional.

## Resumo das tarefas

Como eu já fiz o desafio 1 não será necessário instanciar novamente o *Watson Studio* e o *Cloud Object Storage*, podendo usar as mesmas instâncias do desafio anterior.

Abaixo será mostrado um conjunto de atividades genérico e detalhado do que deve ser feito e em que momento.

1. Instanciar o *Watson Studio* (*Cloud Pak for Data as a Service*) na *IBM Cloud*;
2. Instanciar o *Watson Machine Learning* na *IBM Cloud*;
3. Instanciar o *Cloud Object Storage* na *IBM Cloud*;
4. Importar o projeto fornecido [deste repositório](https://github.com/maratonadev-br/desafio-2-2020/blob/master/cloud-pak-project-ptbr-2.zip) no *Watson Studio*;
5. Ler e executar as instruções contidas no Notebook *parte-1.ipynb*;
6. Ler e executar as instruções contidas no Notebook *parte-2.ipynb*;
7. Aessar a página https://uninassau.maratona.dev/, testar e submeter sua solução.

## Vídeo-tutorial do desafio

<iframe width="100%" height="315" src="https://www.youtube.com/embed/DKCgfi27PkM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Das ferramentas que serão utilizadas a principal é a linguagem Python. Não é necessário conhecer muito para solucionar o desafio, basta prestar bastante atenção no material disponibilizado no github e no vídeo do youtube.

Algumas biblitecas que serão usadas com o Python:

* Scikit-learn -> treinamento e criação de modelos de machine learning, ou aprendizado estatístico;
* Pandas -> manipulação e processamento de machine learning;

O robô virtual já está pronto e basta integrá-lo com a API disponbilizada pelo modelo de machine learning do Watson.

**Bônus: Para quem entregar o desafio na primeira semana vai receber um acréscimo de 10% na nota final.**

**Dica:** Buscar sobre problemas de classificação e *algoritmo de árvore de decisão* no google.

## Ciência de dados

Esse trecho está sendo retirado do conteúdo do notebook 1 disponibilizado pelo Vanderlei Pereira, instrutor do desafio e funcionário da IBM.

Em projetos de ciência de dados, visando a construção de modelos de machine learning, ou aprendizado estatístico, é muito **incomum** que os dados iniciais estejam já no formato ideal para a construção de modelos. São necessários vários passos intermediários de pré-processamento de dados, como por exemplo, a codificação de variáveis categóricas, normalização de variáveis numéricas, tratamento de dados faltantes, etc.

A biblioteca **scikit-learn** -- uma das mais populares bibliotecas de código-aberto para machine learning no mundo -- possui diversas funções já integradas para a realização das transformações de dados mais utilizadas.

Para facilitar o trabalho com esse tipo de fluxo, o **scikit-learn** possui também uma ferramenta chamada **Pipeline**, que nada mais é do que uma lista ordenada de transformações que devem ser aplicadas nos dados.

Para auxiliar no desenvolvimento e no gerenciamento de todo o ciclo-de-vida dessas aplicações, além do uso de Pipelines, as equipes de cientistas de dados podem utilizar em conjunto o **Watson Machine Learning**, que possui dezenas de ferramentas para treinar, gerenciar, hospedar e avaliar modelos baseados em aprendizado de máquina. 

Além disso, o Watson Machine Learning é capaz de encapsular pipelines e modelos em uma API pronta para uso e integração com outras aplicações.

Durante o desafio 2 da Maratona Behind the Code 2020 iremos aprender a construir uma Pipeline para um modelo de classificação e hospedá-lo como uma API com o auxílio do Watson Machine Learning.

---
## Referências:

1. Um guia para iniciantes sobre inteligência artificial, aprendizado de máquina e computação cognitiva. [Link para acesso](https://developer.ibm.com/br/articles/cc-beginner-guide-machine-learning-ai-cognitive/).

2. Documentação do Cloud Pak for Data as a Service. [Link para acesso](https://dataplatform.cloud.ibm.com/docs/content/wsj/getting-started/welcome-main.html?audience=wdp&context=cpdaas).

3. Visão geral: Watson Machine Learning. [Link para acesso](https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/ml-overview.html).