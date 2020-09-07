// Página padrão de erro 404

import Link from "next/link";
import Head from "next/head";
import { FiHome } from "react-icons/fi";

import Layout from "../components/layout";
import errorCss from "../styles/errors.module.css";
import btn from "../styles/botoes/index.module.scss";

export default function Custo404() {
  return (
    <Layout>
      <Head>
        <title>404 - Full Engenharia</title>
      </Head>
      <div className="flex-center flex-collumn vh-100">
        <figure>
          <img src="/images/fullE_tcon.png" alt="Logo da Full Engenharia" />
        </figure>
        <h1>Erro 404</h1>
        <p className="ft-400">Página não encontrada, retorne para a...</p>

        {/* Call to the action */}
        <button
          className={`${btn.btPrimarioStyles} ${btn.btRow} ${btn.btPrimarioStructure}`}
        >
          <FiHome size={20} />
          <Link href="/">
            <a>Home Page</a>
          </Link>
        </button>
      </div>
    </Layout>
  );
}
