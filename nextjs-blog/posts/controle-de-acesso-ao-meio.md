---
title: "A subcamada de controle de acesso ao meio"
date: "2020-08-11"
show: true
tags: ["telecom", "redes"]
---

Neste post está um resumo do assunto tratado no capítulo 4 da referência [1]. De certa forma esse assunto está diretamente ligado ao post anterior, que falou sobre a camada de enlace de dados do modelo OSI, como ficará mais claro adiante.

Os enlaces de rede podem ser divididos em duas categorias: a dos que utilizam **conexões ponto a ponto** e a daqueles que utilizam **canais de broadcast**.

Em qualquer rede de *broadcast*, a questão fundamental é determinar quem tem direito de usar o canal quando há uma disputa por ele. Na literatura, os canais de broadcast às vezes são referidos como **canais de multiacesso** ou **canais de acesso aleatório**.

Os protocolos usados para determinar quem será o próximo em um canal de multiacesso pertencem a uma subcamada da camada de enlace de dados, chamada **MAC** (**Medium Access Control**), sendo esta a parte inferior da camada de enlace de dados.

## Protocolos de acesso múltiplo

### ALOHA

O primeiro protocolo de acesso múltiplo a ter sucesso foi o protocolo ALOHA, desenvolvido principalmente pelo pesquisador Norman Abramson em conjunto com seus colegas da Universidade do Havaí, que estavam tentando conectar usuários nas ilhas remotas ao computador central em Honolulu. Esticar seus próprios cabos sob o Oceano Pacífico estava fora de cogitação e, portanto, eles procuravam uma solução diferente.

A solução encontrada usava rádios de curta distância, com cada terminal de usuário compartilhando a mesma frequência upstream para enviar quadros ao computador principal. Isso incluía um método simples e elegante para resolver o problema de alocação de canal. Seu trabalho foi ampliado por vários pesquisadores desde então. Embora o trabalho de Abramson, denominado sistema ALOHA, usasse a radiofrequência terrestre, a ideia básica é aplicável a qualquer sistema em que usuários sem nenhuma coordenação estão competindo pelo uso de um único canal compartilhado.

---
## Referências:

[1] - Redes de Computadores - 5ª edição.