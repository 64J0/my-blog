---
title: "Sobre gerenciamento de redes"
date: "2020-08-04"
show: true
---

Saudações leitor, neste post irei abordar alguns tópicos de gerenciamento de redes. 

Esse material está inicialmente ligado à playlist disponibilizada pelo canal do [NICbr no youtube](https://www.youtube.com/channel/UCscVLgae-2f9baEXhVbM1ng).

Enfim, para que uma empresa desempenhe corretamente o seu papel é de fundamental importância que todos os funcionários cumpram seus deveres corretamente. E para analisar o cumprimento desses deveres é necessário conhecer os cargos e as pessoas, implementar métricas de desempenho e manter uma fiscalização constante.

No mundo das redes a ideia é a mesma. Para garantir o funcionamento correto de uma rede é necessário:

- Conhecer bem a topologia da rede
  - Ter um inventário dos equipamentos
  - Ter um diagrama e documentos mostrando as suas funções e como estão ligados
- Fazer backup (de preferência automático) de todas as configurações importantes dos equipamentos
- Gerar alertas automáticos quando for detectado algum problema
- Identificar e corrigir problemas o mais rápido possível
- Conhecer o comportamento padrão da rede em relação a:
  - Velocidades
  - Largura de banda
  - Disponibilidade
  - Quantidade de CPU e memória utilizados

---
## Gerenciamento de grupo de IP's

Quando as redes começam a ficar maiores é importante manter um documento com a relação de IP's disponíveis e IP's utilizados. O termo técnico para o documento que fazer essa gestão é **IPAM** (IP Address Management).

Dentre as ferramentas já criadas que merecem destaque temos:

* **IPplan:** Essa ferramenta foi desenvolvida em 2001 e funciona como apoio ao planejamento de redes, para configuração de DNS e DHCP, suporta o IPv6 porém sua última atualização foi em 2010.

* **phpIPAM:** Possui funções semelhantes ao IPplan, com suporte a VLAN's, interface mais amigável.

* **NetDot:** Ferramenta mais completa. É capaz de descobrir automaticamente os nós da rede utilizando o protocolo SNMP. Faz o mapeamento da topologia da rede. Gera scripts para ferramentas de gerenciamento como Nagios, RANCID e Cacti.

* **GestióIP:** É capaz de descobrir automaticamente os nós da rede utilizando o protocolo SNMP. Apresenta ferramentas mais simples de gerenciamento de dispositivos, testes de disponibilidade e logs.

---
## IDS

Nas redes de computadores existem ferramentas que monitoram o tráfego de pacotes gerando alertas caso o tráfego apresente comportamento fora do normal para aquela rede, identificando uma possível tentativa de invasão.

Essas ferramentas são chamadas de **IDS** que significa *Intrusion Detection System* e funcionam justamente analisando os pacotes comparando com padrões de ataques e gerando alertas sobre ameaças.

Uma das implementações de um IDS mais utilizada é chamada [**Snort**](https://www.snort.org/), que pode gerar alertas em tempo real e é *open source*. Essa ferramenta analisa tanto o cabeçalho quanto os dados do pacote, comparando a regras configuradas pelo administrador da rede e a assinaturas de ataque.

Para deixar o **snort** mais eficiente e diminuir a quantidade de falsos-positivos e falsos-negativos, é possível usar alguns programas complementares, como o [snortsam](https://www.snortsam.net) e o [chaotic](https://www.chaotic.org/guardian), que podem criar regras de *firewall* automaticamente.

Quando o **snort** é usado com estes programas complementares ele torna-se um **IPS** que significa *Intrusion Prevention System*, passando a ter ações efetivas em caso de ataque.

É necessário ter um conhecimento mais aprofundado para configurar o **IDS**, pois caso seja configurado incorretamente pode tornar a rede bem mais lenta.

---
## SNMP

O **SNMP** é o protocolo padrão para monitorar dispositivos em redes IP e consequentemente determinar a saúde da rede e dos equipamentos. Essa sigla significa *Simple Network Management Protocol*.

Esse protocolo é baseado na ideia de **Agentes** e **Gerentes**. O Agente é o dispositivo da rede que está sendo gerenciado, de onde são coletadas as informações que se deseja monitorar. Já o Gerente é o dispositivo que realiza essas coletas, solicitando e analisando informações dos agentes sobre uso de memória e CPU, temperatura, quantidade de pacotes recebidos e enviados, e uma infinidade de outras informações.

Apesar de dar nome a solução, o **SNMP** é apenas uma parte dela. Ele atua em conjunto com outras duas estruturas, o **SMI**, que significa *Structure of Management Information* e as **MIBS** que significam *Management Information Base*.

O **SMI** é um protocolo que define a estrutura básica das informações que serão coletadas. Uma espécie de template que define as regras de criação de nomes, tipos e a forma como as informações serão codificadas para enviar ao gerente.

Já as **MIBS** definem com base na **SMI** quais informações podem ser coletadas dos Agentes, sendo estruturadas de forma hierárquica.

```
  MIB IP
  |- ipRouteTable
    |- ipRouteEntry
      |- ...
```

Já o **SNMP** é o protocolo responsável apenas pela comunicação entre os Agentes e o Gerente. É ele quem define o formato e os tipos de pacotes além de interpretas e analisar as informações coletadas.

Na parte de análise e interpretação dos dados podem ser utilizados outros *softwares* para traduzir e facilitar a visualização dos dados por seres humanos.

---
## Ferramentas para monitoraramento

Para administrar uma rede de computadores é fundamental a utilização de ferramentas de monitoramento. Podemos classificar o monitoramento da rede em dois tipos:

- Monitoramento passivo: O sistema de monitoramento analisa os dados de tráfego normais, sem gerar novos dados que trafegam.
- Monitoramento ativo: O sistema de monitoramento gera o tráfego de dados para obter as informações.

Para realizar o monitoramento dos equipamentos em uma rede podem ser utilizados softwares que fazem consultas **SNMP** regularmente, coletando os dados e mostrando de forma gráfica, possibilitando a análise e monitoramento dos dispositivos.

Algumas das ferramentas disponíveis são:

* **MRTG:** Ferramenta básica, *open source*, feita com *Pearl* e capaz de obter informações via **SNMP** de diversos dispositivos e então gerar gráficos com os dados.
* **RRDtool:** Ferramenta básica, *open source*, especializada em armazenar dados periodicamente e gerar gráficos. Essa ferramenta implementa um banco de dados no formato Round-Robin, o que significa que tem um tamanho fixo e os dados mais novos sobrescrevem os mais antigos. Pode ser usado em conjunto com o **MRTG** ou outros programas para melhorar o desempenho do sistema.
* **Cacti:** Ferramenta com interface Web, grátis, e utiliza o **RRDtool** para gerar os gráficos. Além de ter suporte ao **SNMP**, permite a execuçao de *scripts* personalizados.
* **Zabbix:** Possui suporte ao **SNMP** e implementa agentes de monitoramento que geram alertas automaticamente, que podem ser enviados por e-mail, sms ou mensagem instantânea.
* **Nagios:** Possui suporte ao **SNMP** e implementa agentes de monitoramento que geram alertas automaticamente, que podem ser enviados por e-mail, sms ou mensagem instantânea.
* **Icinga:** Possui suporte ao **SNMP** e implementa agentes de monitoramento que geram alertas automaticamente, que podem ser enviados por e-mail, sms ou mensagem instantânea.

---
## ICMP

O **ICMP**, ou *Internet Control Message Protocol*, é um protocolo bastante simples, mas muito útil para identificar problemas na rede, como por exemplo falha na disponibilidade de um nó da rede, erros no processamento de pacotes IP ou problemas em seu envio.

Existem duas versões do **ICMP**:

<table>
  <tr>
    <th>
      Possibilita
    </th>
    <th>
      ICMPv4
    </th>
    <th>
      ICMPv6
    </th>
  </tr>
  <tr>
    <td>
      Testes e diagnóstico
    </td>
    <td>
      X
    </td>
    <td>
      X
    </td>
  </tr>
  <tr>
    <td>
      Descoberta de vizinhança
    </td>
    <td>
      -
    </td>
    <td>
      X
    </td>
  </tr>
  <tr>
    <td>
      Gerenciamento de grupos multicast
    </td>
    <td>
      -
    </td>
    <td>
      X
    </td>
  </tr>
</table>

Implementa os comandos de *PING*, *TRACEROUTE*.

**Observação:** Muitos pacotes perdidos ou latência alta, no caso do *PING*, nem sempre apontam problemas reais na rede. Os roteadores no meio do caminho geralmente tratam os pacotes ICMP com prioridade menor que os pacotes TCP e UDP. Em caso de sobrecarregamento é possível que os pacotes ICMP sejam descartados ou sofram um atraso para serem entregados. Além disso é possível implementar um filtro na rede para descartar todos os pacotes ICMP. Uma outra possibilidade é que realmente não existe a conexão, porém, utilizando apenas o comando ping é difícil afirmar isto.

Para obter uma informação mais completa deve-se utilizar o comando *TRACEROUTE* ou *TRACERT* no *windows*. Com esse comando é possível checar a acessibilidade e o caminho do pacote, podendo identificar problemas no percurso.

Para determinar o caminho percorrido pelo pacote, o *TRACEROUTE* utiliza um truque bastante interessante que se baseia no *HOP LIMIT* (IPv6) ou *TTL* (IPv4). Esses parâmetros são campos do pacote IP que determinam a quantidade de saltos possíveis no caminho do pacote, sendo decrementado de 1 a cada vez que o pacote passa por um roteador. Ao chegar a 0, o pacote é descartado, evitando um *loop* infinito de pacotes na rede.

Quando o pacote é descartado, o roteador que descartou envia uma mensagem *ICMP* de erro do tipo *Time Exceeded*. Isso permite ao *host* de origem identificar esse primeiro roteador.

Na análise do resultado é necessário entender que os endereços da resposta nem sempre são da *interface* que recebeu a mensagem. Os endereços são, na realidade, da *interface* que **enviou** a mensagem de erro.

---
#### Referências:

[1] - [Introdução ao gerenciamento de redes](https://www.youtube.com/watch?v=RntTxnDsM9g&list=PLQq8-9yVHyOYDZ7F57KAsy6q2q10QaWtUs).