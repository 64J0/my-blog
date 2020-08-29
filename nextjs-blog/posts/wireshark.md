---
title: "Algumas informações sobre o Wireshark"
date: "2020-08-02"
---

Saudações leitores do blog. Nesse post irei escrever um pouco sobre o **Wireshark** que é um programa que tenho estudado recentemente. Abaixo seguem as minhas anotações.

Resumidamente, o **Wireshark** é um programa utilizado para analisar os pacotes que trafegam pela rede, identificando e mostrando dados dos pacotes que são capturados (por exemplo, informações sobre os protocolos utilizados, as informações do pacote, etc) da forma mais detalhada possível.

Anteriormente os programas que faziam a captura de pacotes na rede (*packet analyzer*) eram relativamente caros por serem soluções proprietárias, porém, após o lançamento do **Wireshark** tudo mudou.

Segundo a documentação oficial [1], o **Wireshark** é disponibilizado gratuitamente, é *open-source* e um dos melhores analisadores de pacotes disponíveis atualmente em relação a possibilidade e capacidade.

Para entender todas as informações fornecidas pelo *software* é importante ter um sólido conhecimento na pilha de protocolos TCP/IP.

<table>
  <th>
    TCP/IP
  </th>
  <tr>
    <td>
    Aplicação
    </td>
  </tr>
  <tr>
    <td>
    Transporte
    </td>
  </tr>
  <tr>
    <td>
    Rede/Internet
    </td>
  </tr>
  <tr>
    <td>
    Enlace/Interface de Rede
    </td>
  </tr>
</table>

A seguir são mostrados alguns dos protocolos mais comuns de cada camada da pilha TCP/IP, e que portanto devem ser estudados inicialmente:

* Enlace: Ethernet, Wi-Fi (802.11);
* Rede: ARP (Address Resolution Protocol), IP (Internet Protocol), ICMP (Internet Control Message Protocol);
* Transporte: TCP, UDP, RTP (Real-time Transport Protocol);
* Aplicação: HTTP, HTTPS, FTP, SMTP (Simple Mail Transfer Protocol), DNS, POP3, SMTP.

Com base nas informações coletadas pelo software é possível fazer análises e identificar problemas na rede em tempo real.

## Algumas situações em que o Wireshark é utilizado

* Para identificar problemas gerais na rede;
* Para examinar problemas relacionados a segurança;
* Debugar implementações de programas;
* Aprender sobre protocolos de redes.

Com base nestas informações fica claro o poder deste software. Particularmente, pretendo usa-lo atualmente apenas para estudo dos protocolos de rede, mas futuramente caso surja a necessidade com certeza utilizarei para fazer análises mais detalhadas.

---
## Referências:

[1] - Wireshark Docs: 1.1. What is Wireshark? Disponível [neste link](https://www.wireshark.org/docs/wsug_html_chunked/ChapterIntroduction.html#ChIntroWhatIs).