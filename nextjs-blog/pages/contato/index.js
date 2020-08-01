import Head from 'next/head';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

import Layout from "../../components/layout";

import contatoStyles from './styles.module.scss';

export default function Contato() {
  return (
    <Layout>
      <Head>
        <title>Contato</title>
      </Head>

      <div className={contatoStyles.container}>
        <h1>Entre em contato:</h1>
        <ul>
          <li>
            <h3>
              <a href="https://www.linkedin.com/in/vin%C3%ADcius-gajo-416121146/">
                <FaLinkedin size="2rem" />
                LinkedIn
              </a>
            </h3>
          </li>
          <li>
            <h3>
              <a href="https://github.com/64J0">
                <FaGithub size="2rem" />
                GitHub
              </a>
            </h3>
          </li>
        </ul>
      </div>
    </Layout>
  )
}