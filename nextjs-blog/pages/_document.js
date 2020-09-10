import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

import GoogleAnalytics from "../components/GoogleAnalytics";

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
          <meta name="og:title" content="64j0 Blog" />
          <meta name="og:site_name" content="64j0 blog" />
          <meta name="og:image" content="/favicon.ico" />
          <meta name="og:locale" content="pt_BR" />
          <meta name="og:url" content="https://gajo.vercel.app" />
          <meta name="og:type" content="website" />

          <GoogleAnalytics />

          <link rel="stylesheet"
            href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.2.0/build/styles/default.min.css" />
          <script src="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.2.0/build/highlight.min.js"></script>
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