---
title: "Algumas informações sobre o Wireshark"
date: "2020-08-02"
---

O **Wireshark** é um programa utilzado para analisar os pacotes que trafegam pela rede identificando os protocolos utilizados.

Para entender todas as informações fornecidas pelo programa é importante ter um sólido conhecimento na pilha de protocolos TCP/IP.

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

A seguir são mostrados alguns dos protocolos mais comuns de cada camada da pilha TCP/IP:

* Enlace: Ethernet, Wi-Fi (802.11);
* Rede: ARP (Address Resolution Protocol), IP (Internet Protocol), ICMP (Internet Control Message Protocol);
* Transporte: TCP, UDP, RTP (Real-time Transport Protocol);
* Aplicação: HTTP, HTTPS, FTP, SMTP (Simple Mail Transfer Protocol), DNS, POP3, SMTP.