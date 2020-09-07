# *Projeto descontinuado*

# Landing Page da Full Engenharia

Este projeto consiste no desenvolvimento da nova _landing page_ da empresa **Full Engenharia**.

Como estratégia para melhorar os resultados de **SEO** (_Search Engine Optimization_) será utilizado o [Next.js](https://nextjs.org/), que disponibiliza por padrão a opção de **SSR** (_Server-Side Rendering_) para projetos **React JS**, podendo inclusive "cachear" o resultado desse processo de renderização em um **CDN** diminuindo o tempo para envio do conteúdo.

Como espera-se que a _landing page_ não sofra alterações constantes, essa estratégia torna-se viável e desejável.

### Estrutura de pastas

A estrutura de pastas do projeto segue o padrão definido pelo próprio _framework_ **Next.js**.

Os arquivos em _/pages_ estão associados diretamente a páginas e _URL's_ do site.

Em _/components_ são definidos componentes com **React JS** que poderão ser utilizados em diversas páginas, portanto, garantindo a reutilização do código.

Em _/public_ estão arquivos de suporte ao site, por exemplo, as imagens que serão mostradas em cada página, o logo da empresa, etc.

Finalmente em _/styles_ temos alguns arquivos de estilização _CSS_ ou _SASS_ (_SCSS_).

Vinícius Gajo Marques Oliveira, 2020.
