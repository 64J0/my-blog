---
title: "O que é um modem e  informações sobre FTTH?"
date: "2020-08-02"
show: true
---

Nesse post falarei sobre uma tecnologia relativamente antiga da área de telecomunicações. Provavelmente muitos dos leitores já utilizaram esse equipamento, numa época em que as velocidades de internet eram bastante limitadas... Hoje falaremos sobre o velho e nem tão bom **modem**!

Segundo [1], o **modem** é um dispositivo que converte um fluxo de bits digitais em sinais analógicos e vice-versa. A palavra **modem** é uma abreviação de 'modulador-de-modulador'. Existem muitas variedades de modems: modem de telefone, DSL, a cabo, sem fio, etc.

Os modems de telefone permitem a transferência de dados utilizando a rede de telefonia já instalada, porém com limitação de banda, pois a rede de telefonia convencional analógica é limitada a *3.100 Hz*, suficiente para transportar uma conversa. Portanto, não é surpresa que as taxas de dados dos modems de telefone sejam relativamente baixas.

Curiosidade: o termo *banda larga* (**broadband**) está diretamente ligado a essa limitação de banda do canal telefônico. Ele pode ser utilizado para classificar qualquer serviço de transferência de dados com largura de banda maior que o limite padrão do sistema telefônico, sendo um conceito muito explorado no marketing.

## Linhas Digitais do Assinante (xDSL)

Com o avanço da tecnologia na área de telecomunicações várias empresas começaram a oferecer um novo serviço, conhecido como **linha digital do assinante**, ou **xDSL (Digital Subscriber Line)**, para diversos *x*.

Conforme dito anteriormente, os modems utilizavam a rede telefônica padrão para transferir seus dados, porém, a rede telefônica é uma rede otimizada apenas para transportar dados da voz humana. No ponto em que cada circuito terminal chega à estação final, o fio passa por um filtro que atenua todas as frequência abaixo de 300 Hz e acima de 3.400 Hz, deixando a taxa de transferência de dados restrita a essa banda estreita.

Para contornar este problema foram criados os xDSL. Nessa nova arquitetura quando um cliente se inscreve na rede, a linha de entrada é conectada a um tipo diferente de *switch*, que não tem esse filtro, assim tornando disponível toda a capacidade do circuito terminal. Então, o fator limitador passa a ser a constituição física do circuito terminal, não a largura de banda artificial de 3.100 Hz criada pelo filtro.

Infelizmente, a capacidade do circuito terminal cai rapidamente com a distância da estação final, pois o sinal é degradado cada vez mais ao longo do fio. Ele também depende da espessura e da qualidade geral do par trançado.

Utilizando uma técnica conhecida como ADSL (o **A** é de assimétrico, pois geralmente a provedora aloca mais canais para *downstream*), é possível, em teoria, alcançar uma taxa de dados de até 24 Mbps.

## Fiber To The Home (FTTH)

Devido a limitações da transmissão de dados utilizando sinais elétricos devido a atenuação dos sinais analógicos em frequências elevadas, foi pensado em um novo sistema para transmissão, utilizando a luz que passa por fibras ópticas. Essa tecnologia é conhecida como **Fiber To The Home** ou **FTTH**.

Segundo [1], embora a tecnologia FTTH tenha estado disponível já a um bom tempo, as instalações só começaram a ser feitas em massa a partir de 2005, com o crescimento da demanda por internet de alta velocidade dos clientes.

Normalmente, as fibras das casas são reunidas de modo que apenas uma fibra alcance a estação final por grupo de até 144 casas, na tecnologia **EPON**. Na direção downstream, os divisores ópticos (**splitter**) dividem o sinal da estação final, de modo que alcance todas as casas. A criptografia é necessária por segurança se apenas uma casa puder ser capaz de decodificar o sinal. Na direção upstream, colimadores ópticos mesclam os sinais das casas para um único sinal, que é recebido na estação final (**OLT**).

Essa arquitetura é chamada de **rede óptica passiva**, ou **PON** (**Passive Optical Network**). É comum usar um comprimento de onda compartilhado entre todas as casas para a transmissão downstream, e outro comprimento de onda para a transmissão upstream.

Existem basicamente dois tipos de PON:

- GPON: **Gigabit-capable PON**, vem do mundo das telecomunicações e são definidas por um padrão da ITU.
- EPON: **Ethernet PON**, estão mais ligadas ao mundo das redes, de modo que são definidas por um padrão IEEE.

Para compartilhar a capacidade de uma única fibra na estação final entre diferentes casas é preciso que haja algum protocolo. A direção downstream é fácil. A estação final pode enviar mensagens a cada casa diferente na ordem que desejar. Na direção upstream, porém, as mensagens de diferentes casas não podem ser enviadas ao mesmo tempo, ou diferentes sinais colidiriam. As casas também não podem escutar as transmissões umas das outras, de modo que não podem escutar antes de transmitir. A solução é que o equipamento nas casas solicite e receba fatias de tempo para utilizar o equipamento na estação final. Para que isso funcione existe um processo de localização para ajustar os tempos de transmissão a partir das casas, de modo que todos os sinais recebidos na estação fnal sejam sincronizados.


---
Referências:

[1] - Wetherall, J. e Tanenbaum, A. S. - **Redes de Computadores**, *5ª edição*, editora Pearson.