// O Next.js por padrão não permite editar as tags HTML e BODY, do projeto. Para que possam ser editadas estas propriedades devemos criar este arquivo _document.js dentro da pasta /pages.
// As tags HEAD, MAIN, NEXTSCRIPT são necessárias para que o projeto seja corretamento executado.

import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-BR">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
