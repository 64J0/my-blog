import Document, { Html, Head, Main, NextScript } from 'next/document';

const siteTitle = "64j0 Blog";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          <link rel="icon" href="/favicon.ico" />

          <meta
            name="description"
            content="Blog pessoal onde pretendo compartilhar algumas coisas que estou estudando."
          />
          <meta name="og:title" content={siteTitle} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;