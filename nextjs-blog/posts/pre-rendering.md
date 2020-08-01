---
title: "Duas formas de Pré-renderizar"
date: "2020-08-01"
---

O Next.js tem duas formas de pré-renderizar: **Geração Estática** e **Renderização do Lado do Servidor**. A principal diferente é no **quando** é gerado o HTML da página.

- **Geração Estática** é o método de pré-renderizar que gera o HTML em tempo de construção (**build time**). O HTML pré-renderizado é então *reutilizado* em cada requisição.
- **Renderização do Lado do Servidor** é o método de pré-renderizar que gera o HTML em **cada requisição**.

Importante: O Next.js deixa você **escolher** qual a forma de pré-renderização será utilizada em cada página. É possível criar uma aplicação **híbrida** com o Next.js, usando a Geração Estática para a maioria das páginas e usando a Renderização do Lado do Servidor para outras.