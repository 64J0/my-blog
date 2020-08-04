---
title: "Maratona Behind the Code"
date: "2020-08-03"
---

Saudações caro leitor, neste post irei tratar alguns assuntos sobre a **Maratona Behind The Code** que é composta por alguns desafios de tecnologia propostos pela IBM e outras empresas parceiras visando implementar as soluções com a plataforma da própria IBM.

Provavelmente o post vai ser longo, mas é a vida...

Algumas informações introdutórias.

## Inteligência artificial: 
https://www.youtube.com/watch?v=kOmgVS9v0rs

Dar as soluções a capacidade cognitiva de aprender e interpretar dados não estruturados. Watson é o sistema de inteligência artificial e serviço da IBM.

* Visual Recognition -> reconhecimento automático de imagem.
* Natural Language Understanding -> reconhecimento de textos em várias línguas diferentes retirando meta-dados, palavras-chave, sentimentos.
* Watson assistant -> Chat bot, tem a capacidade de aprender com perguntas e respostas.

## IoT: 
https://www.youtube.com/watch?v=yaE0dQYYy4Q

Interconexão de dispositivos na rede, coletando dados automaticamente para resolver problemas sem a necessidade de supervisão humana.

Estrutura de um sistema iot:

* Publishers -> coletam os dados do meio físico e enviam para outro ambiente onde será analisado
* Broker -> recebe os dados dos sensores e repassa pros sistemas que analisarão estes dados (protocolo MQTT)
* Subscribers -> aplicações e serviços que consomem os dados coletados pelos sensores através do processamento dessas informações

## kubernetes: 
https://www.youtube.com/watch?v=o8JO5aNZ82g

Popularmente conhecido como orquestrador de containeres (tecnologia de virtualização de sistemas operacionais, semelhante a VM porém mais leves). 
Auxilia os desenvolvedores no desenvolvimento de uma aplicação utilizando micro-serviços.

Contruído em cima do docker que é o framework mais famoso para trabalhar com containers.

Arquitetura:
* Developer's machine (kubecti) -> .yaml
* k8s Master Node (API server)
* k8s Worker Node (kubelet)

Mais informações: https://developer.ibm.com/br/technologies/containers/articles/setup-guide-for-kubernetes-developers