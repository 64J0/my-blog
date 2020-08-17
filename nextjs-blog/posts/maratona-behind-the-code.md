---
title: "Introdução da Maratona Behind the Code"
date: "2020-08-14"
---

Saudações caro leitor, neste post irei tratar alguns assuntos sobre a **Maratona Behind The Code** que é composta por alguns desafios de tecnologia propostos pela IBM e outras empresas parceiras visando implementar as soluções com a plataforma da própria IBM.

Provavelmente o post vai ser longo, mas é a vida...

Algumas informações introdutórias.

## Inteligência artificial: 
<iframe width="100%" height="315" src="https://www.youtube.com/embed/kOmgVS9v0rs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Dar as soluções a capacidade cognitiva de aprender e interpretar dados não estruturados. Watson é o sistema de inteligência artificial e serviço da IBM.

* Visual Recognition -> reconhecimento automático de imagem.
* Natural Language Understanding -> reconhecimento de textos em várias línguas diferentes retirando meta-dados, palavras-chave, sentimentos.
* Watson assistant -> Chat bot, tem a capacidade de aprender com perguntas e respostas.

## IoT: 
<iframe width="100%" height="315" src="https://www.youtube.com/embed/yaE0dQYYy4Q" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Interconexão de dispositivos na rede, coletando dados automaticamente para resolver problemas sem a necessidade de supervisão humana.

Estrutura de um sistema iot:

* Publishers -> coletam os dados do meio físico e enviam para outro ambiente onde será analisado
* Broker -> recebe os dados dos sensores e repassa pros sistemas que analisarão estes dados (protocolo MQTT)
* Subscribers -> aplicações e serviços que consomem os dados coletados pelos sensores através do processamento dessas informações

## kubernetes: 
<iframe width="100%" height="315" src="https://www.youtube.com/embed/o8JO5aNZ82g" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Popularmente conhecido como orquestrador de containeres (tecnologia de virtualização de sistemas operacionais, semelhante a VM porém mais leves). 
Auxilia os desenvolvedores no desenvolvimento de uma aplicação utilizando micro-serviços.

Contruído em cima do docker que é o framework mais famoso para trabalhar com containers.

Arquitetura:
* Developer's machine (kubecti) -> .yaml
* k8s Master Node (API server)
* k8s Worker Node (kubelet)

Mais informações: [link](https://developer.ibm.com/br/technologies/containers/articles/setup-guide-for-kubernetes-developers)

---
## Live: Inteligência Artificial, por onde começar?

Abaixo vou colocar um resumo das minhas anotações a respeito da live que ocorreu em 14/08/2020 no canal da Rocketseat em conjunto com o canal da Shawee. 

<iframe width="100%" height="315" src="https://www.youtube.com/embed/34fiafm5gz4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

**Quais informações seriam mais necessárias para salvar no banco de dados para se guiar no futuro ao desenvolver uma ferramenta de inteligência artificial? Como estruturar melhor um setor da empresa para abrigar uma área dedicada à análise de dados?**

Basicamente o cientista de dados da empresa que irá definir quais informações são mais importantes e isso deve ser discutido com a equipe de desenvolvimento da plataforma para que tudo caminhe da maneira correta.

De toda forma é bom todo o time de desenvolvimento ter uma noção de como funcionam as ferramentas e procedimentos do mundo da ciência de dados para entender o impacto de alguma ação que será tomada.

Para definir quais dados deverão ser monitorados deve-se primeiro definir qual o objetivo que pretende-se alcançar, ou seja, qual tarefa será realizada com base nos algoritmos de inteligência artificial?

**Exemplos práticos de onde a inteligência artificial está tendo bons resultados**

É muito difícil saber quanto de lucro a aplicação de uma determinada técnica da inteligência artificial trará, porém é possível aplicar testes e monitorar os resultados, por exemplo usando um chatbot para conversar com o cliente, usando algoritmos para melhorar a base de dados, etc.

Em seguida a empresa pode definir quais estratégias tiveram os melhores resultados e investir com mais capital. Alguns dos exemplos são: automatização do SAC como ocorreu na TIM com assistentes artificiais, manutenção preditivia em equipamentos a partir de modelos computacionais, mudar a jornada de contratação de seguro utilizando plataformas mais acessíveis com a utilização de chatbots especializados.

**Como foram os seus primeiros passos na carreira? A tecnologia utilizada no desenvolvimento é realmente só Python?**

Letícia: Eu comecei na área de TI com programação (várias linguagens) e suporte técnico. Quando surgiu uma oportunidade para trabalhar na catalogação de dados ela começou a se interessar mais. As linguagens que ela mais utilizou foram Python, R, Scala e Java.

**Quais serviços são mais legais e disponibilizados prontos pela comunidade?**

As ferramentas de inteligência artificial podem ser classificadas de duas formas distintas, algumas tarefas podem ser realizadas por algoritmos genéricos e outras requerem um modelo mais customizado.

Por exemplo, o reconhecimento de imagens e de linguagem natural pode ser utilizado em diversas situações, portanto é possível criar uma ferramenta mais genérica que pode ser treinada com os dados específicos da sua aplicação. Esse tipo de algoritmo é disponibilizado pela IBM e outras empresas para serem usados.

Já algoritmos de personalidade tendem a ser mais customizados, que levam em consideração as diretrizes da própria empresa em que será aplicada a tecnologia.

**Existe alguma base de dados ou ferramenta que pode ser usada para melhorar a performance e facilitar a aplicação das tecnologias de inteligência artificial posteriormente?**

Letícia: Até hoje ela só trabalhou com bancos de dados relacionais. O que mais interfere é a forma de captura dos dados. Por exemplo a empresa tem vários bancos e um colaborador responsável pela coleta dos dados e enviar pra cientista de dados. Essa captura manual é um problema pois pode gerar perda de dados e trabalhar diretamente com arquivos muito grandes pode gerar corrompimento de dados. Já em relação ao tipo de banco de dados a única informação mencionada é que eram relacionais, sem citar um tipo específico.

Daniel: Trabalha majoritariamente com o MongoDB que é um banco não relacional. Caso não seja feito um levantamento de propriedades que serão salvas no banco de dados da maneira correta isso pode levar a muita dor de cabeça no futuro.

Diego: Se você não tiver certeza do banco de dados então use Postgres.

**A pessoa que vai participar da maratona Behind the code precisa saber IA ou ciência de dados?**

Não, a cada semana (sábado e domingo pela manhã) a IBM vai lançar dois desafios acompanhados de um kit de informações e conhecimentos já vinculando a um serviço da própria IBM que pode ser usado para resolver o problema.

Será necessário apenas estudar o material disponibilizado pela IBM e no máximo consultar alguma informação externa.

Toda a maratona e a IBM cloud será totalmente gratuita, inclusive a utilização das ferramentas que são pagas. O evento é bastante focado em educação e será possível aprender várias coisas bem bacanas para a carreira, resolvendo desafios práticos e com a possibilidade de ganhar vários prêmios.

**Onde encontrar bases de dados para usar no início dos estudos?**

Um site super bacana com vários dados que podem ser usados para montar um portfólio é o [Kaggle](https://www.kaggle.com/.)

**Como vocês enxergam a relação da ciência de dados com a matemática?**

É possível ser bom na ciência de dados mesmo sem ser muito bom na matemática. Por exemplo algumas pessoas podem ter dificuldade com matemática abstrata mas quando é aplicada em um caso prático fica muito mais fácil o entendimento.