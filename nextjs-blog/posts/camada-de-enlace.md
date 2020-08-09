---
title: "A camada de enlace"
date: "2020-08-06"
---

Segundo [1], a segunda camada da pilha do modelo OSI é chamada **camada de enlace de dados**. Essa camada implementa diversos algoritmos que permitem uma comunicação eficiente e confiável de unidades de informação inteiras, chamadas de quadros (ou *frames*, em inglês), em vez de bits individuais, como na camada física, entre dois computadores adjacentes.

Em outras palavras, a camada de enlace de dados usa os serviços da camada física para enviar e receber bits pelos canais de comunicação. Algumas das funções dessa camada são:

1. Fornecer uma interface de serviço bem definida à camada de rede (camada 3);
2. Lidar com erros de transmissão;
3. Regular o fluxo de dados de tal forma que receptores lentos não sejam atropelados por transmissores rápidos.

Para alcançar esses objetivos, a camada de enlace de dados recebe os pacotes da camada de rede e os encapsula em **quadros** para transmissão. Cada quadro contém um cabeçalho (*header*), um campo de carga útil que conterá o pacote, e um final de quadro (*trailer*). O gerenciamento de quadros constitui o núcleo das atividades da camada de enlace de dados.


### Serviço orientado a conexões

O serviço mais sofisticado que a camada de enlace de dados é capaz de oferecer à camada de rede é o serviço orientado a conexões. Com ele, as máquinas de origem e destino estabelecem uma conexão antes de qualquer dado ser transferido. Cada quadro enviado pela conexão é numerado, e a camada de enlace de dados garante que cada quadro será, de fato, recebido. Além disso, essa camada garante que todos os quadros serão recebidos uma única vez e na ordem correta. Assim, os serviços orientados a conexões fornecem aos processos da camada de rede o equivalente a um fluxo de bits confiável. Isso é apropriado para enlaces longos, não confiáveis, como um canal de satélite ou um circuito telefônico interurbano.

Quando o serviço orientado a conexões é usado, as transferências passam por três fases distintas. Na primeira fase, a conexão é estabelecida, fazendo ambos os lados inicializar as variáveis e os contadores necessários para controlar os quadros que são recebidos e os que não são. Na segunda fase, um ou mais quadros são realmente transmitidos. Na terceira e última fase, a conexão é desfeita, liberando-se as variáveis, os buffers e os outros recursos usados para mantê-la.


### Enquadramento

Para transmitir os quadros gerados recebidos na segunda camada são utilizados os serviços fornecidos a ela pela primeira camada (camada física). O que a camada física faz é aceitar um fluxo de bits brutos e tentar entregá-lo ao destino.

Para contornar os possíveis problemas ocasionados na transmissão, em geral, a estratégia adotada pela camada de enlace de dados é dividir o fluxo de bits em quadros distintos, calcular um pequeno valor (um *token*), chamado de **checksum** (somatório de verificação), para cada quadro e incluir essa soma de verificação no quadro quando ele for transmitido.

Quando um quadro chega a seu destino, o *checksum* é recalculado. Se o *checksum* recém-calculado for diferente do que está contido no quadro, a camada de enlace de dados saberá que houve um erro e tomará providências para lidar com ele (por exemplo, descartando o quadro defeituoso e possivelmente também enviando de volta um relatório de erros).

### Controle de erros

É possível lidar com erros na camada de enlace, verificando os quadros que trafegam na rede, certificando-se que a entrega dos pacotes ocorreu corretamente.

A forma mais comum de garantir uma entrega confiável é dar ao transmissor algum tipo de feedback sobre o que está acontecendo no outro extremo da linha. Normalmente, o protocolo solicita que o receptor retorne quadros de controle especiais com confirmações positivas ou negativas sobre os quadros recebidos. Se receber uma mensagem positiva sobre o quadro, o transmissor saberá que o quadro chegou em segurança ao destino. Por outro lado, uma mensagem negativa significa que algo saiu errado e o quadro deve ser retransmitido.

Deve ficar claro que um protocolo no qual o transmissor envia um quadro e depois espera por uma confirmação, positiva ou negativa, permanecerá suspenso para sempre caso um quadro tenha sido completamente perdido - por exemplo, em consequência de mau funcionamento do hardware ou canal de comunicação deficiente.

Essa possibilidade é tratada com a introdução de timers na camada de enlace de dados. Quando o transmissor envia um quadro, em geral ele também inicializa um timer. Este é ajustado para ser desativado após um intervalo suficientemente longo para o quadro chegar ao destino, ser processado ali e ter sua confirmação enviada de volta ao transmissor. Em geral, o quadro será recebido de forma correta e a confirmação voltará antes que se alcance o tempo-limite do timer e, nesse caso, ele será cancelado.

Esse reenvio de quadros cria um novo problema pois o recepetor pode receber um quadro mais de uma vez. Para contornar este problema os quadros são numerados de forma sequencial, de modo que o receptor possa distinguir as retransmissões dos originais.

A questão do gerenciamento dos timers e dos números de sequências para garantir que cada quadro seja realmente passado para a camada de rede no destino exatamente uma vez, nem mais nem menos, é uma parte importante das atribuições da camada de enlace de dados (e das camadas mais altas).

### Controle de fluxo

Outro aspecto de projeto importante que ocorre na camada de enlace de dados (e também nas camadas mais altas) é o que fazer com um transmissor que sistematicamente deseja transmitir quadros mais rápido do que o receptor pode aceitá-los.

Para contornar essa situação são usadas comumente duas abordagens. Na primeira, chamada **controle de fluxo baseado em feedback**, o receptor envia de volta ao transmissor informações que permitam a ele enviar mais dados, ou que pelo menos mostrem ao transmissor a situação real do receptor. Na segunda, chamada **controle de fluxo baseado na velocidade**, o protocolo tem um mecanismo interno que limita a velocidade com que os transmissores podem enviar os dados, sem usar o feedback do receptor.

---
### Referência:

[1] - Redes de Computadores - 5ª edição.