---
title: "Algumas informações sobre o GNS3"
date: "2020-08-20"
---

Saudações caro leitor. Nesse post estão algumas informações sobre o software **GNS3**, que segundo a própria documentação é usado por centenas de milhares de engenheiros de redes ao redor do mundo para simular, configurar, testar e resolver problemas em redes virtuais e reais.

Além disso, **o GNS3 é uma ferramenta open source, de código livre que roda em windows, linux e mac.**

Meu objetivo ao usar esse software é testar algumas ideias e entender melhor o processo de projeto de redes, assim como seu funcionamento.

## Arquitetura

O GNS3 consiste em dois componentes de software:

* O GNS3 Graphical User Interface (GUI)
* A máquina virtual do GNS3 (VM)

O GNS3 GUI é a interface gráfica onde os componentes do software podem ser visualizados de maneira mais amigavel. Com esse programa é possível criar as topologias que serão simuladas com uma interface simples.

Quando uma topologia é criada no GUI, os dispositivos da rede são hospedados e executados com um processo de servidor. São disponilizadas três opções para esse servidor.

* Servidor local
* Máquina virtual local
* Máquina virtual remota

Dentre essas opções, a mais recomendada é usar em uma máquina virtual que pode ser instanciada tanto no seu próprio computador quanto na nuvem.

Todavia, para iniciar os estudos e explorar o simulador convém utilizar o servidor local, pois é mais barato embora seja mais limitado, tanto em quantidade quanto em possibilidades de dispositivos na topologia.

O GNS3 suporta dispositivos emulados e simulados.

* **Dispositivos emulados:** O GNS3 copiar ou emula o hardware do dispositivo e é executado uma imagem real no dispositivo virtual. Por exemplo, você pode copiar o sistema operacional Cisco IOS (International Operating System) de um roteador físico real da Cisco e executar em um roteador virtual (emulado) da Cisco no GNS3.

* **Dispositivos simulados:** O GNS3 simula as funcionalidades de um dispositivo como um switch genérico. Nesse caso não está sendo executado um sistema operacional específico, mas sim um dispositivo simulado criado pelo GNS3.

Sim, os conceitos são bem parecidos, mas o importante é fazer a configuração correta no software.

## Dispositivos suportados

O GNS3 suporta uma grande quantidade de dispositivos de múltiplos vendedores. Alguns exemplos são: Cisco, Juniper, Mikrotik, etc.

Uma lista completa dos dispositivos pode ser vista [neste site](https://gns3.com/marketplace/appliances).

Abaixo segue uma imagem demonstrando uma rede simples implementada no software. Essa rede conta apenas com 3 computadores, ligados a um switch.

![Minha primeira rede feita com o GNS3](/post-images/GNS3/minha-primeira-rede.JPG "Rede simples")

---
## Referências:

1. [Documentação oficial do GNS3](https://docs.gns3.com/docs/).

2. [Cisco IOS](https://pt.wikipedia.org/wiki/Cisco_IOS)