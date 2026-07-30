import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-US">
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function () {
                  try {
                    var stored = window.localStorage.getItem("color-mode");
                    var mode = stored || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
                    document.documentElement.setAttribute("data-color-mode", mode);
                  } catch (e) {}
                })();
              `,
            }}
          />
          <link rel="icon" href="/favicon.ico" />

          {/* Page-independent OG data. Page-specific tags (title, description,
              url, type, image) are set per-page via next/head so each page
              controls its own social preview without duplicating properties. */}
          <meta property="og:site_name" content="64j0 blog" />
          <meta property="og:locale" content="en_US" />

          <meta name="google-adsense-account" content="ca-pub-1710724306210780" />

          {/* For LaTeX/KaTeX styles */}
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css"
            integrity="sha384-Xi8rHCmBmhbuyyhbI88391ZKP2dmfnOl4rT9ZfRI7mLTdk1wblIUnrIq35nqwEvC"
            crossOrigin="anonymous"
          />
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
