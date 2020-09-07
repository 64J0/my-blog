import Head from "next/head";

import Cabecalho from "./Cabecalho";
import Rodape from "./Rodape";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/images/fullE_tcon.png" />
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initital-scale=1, maximum-scale=1"
        />
        <meta property="og:local" content="pt_BR" />
        <meta
          name="description"
          content="Página oficial da empresa Full Engenharias"
        />
        <title>Full Engenharia</title>
      </Head>

      <Cabecalho />
      {children}
      <Rodape />
    </>
  );
}
