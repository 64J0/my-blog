---
title: "Quando usar Geração Estática v.s. Renderização do Lado do Servidor"
date: "2020-08-01"
---

É recomendado usar a **Geração Estática** (com ou sem dados) sempre que possível porque a página pode ser construída apenas uma vez e servida por um CDN, o que torna muito mais rápido servir os conteúdos para os usuários.

É possível usar a Geração Estática para muitos tipos de páginas, incluindo:

- Páginas de marketing
- Posts de blog
- Listagem de produtos de e-commerce
- Documentação e páginas de ajuda

Você deve se perguntar: "Eu posso pré-renderizar esta página **antes** da requisição de um usuário?" Se a resposta for sim então deve ser escolhida a Geração Estática.

Por outro lado, a Geração Estática **não** é uma boa ideia se não for possível pré-renderizar uma página antes da requisição do usuário. Talvez a página mostre muitos dados atualizados frequentemente, e o conteúdo da página muda em cada requisição.

Neste caso é possível usar a **Renderização do Lado do Servidor**. Será mais lento, mas as páginas pré-renderizadas serão sempre atualizadas. Ou então é possível pular a pré-renderização e usar JavaScript no lado do cliente para popular os dados, sendo esta a abordagem convencional do React JS.
