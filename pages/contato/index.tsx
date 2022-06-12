import React, { useRef, useEffect } from "react";
import Head from "next/head";
import { FaLinkedin, FaGithub } from "react-icons/fa";

import Layout from "../../components/layout";
import GithubContribGraph from "../../components/GithubContribGraph";

import Age from "../../utils/Age";
import { getGithubData } from "../../lib/github";

import contatoStyles from "./styles.module.scss";

interface ContribChartHTML {
  contribChartHTML: string;
}

const Contato: React.FC<ContribChartHTML> = ({ contribChartHTML }) => {
  const pEl = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const defineMyAge = (): void => {
      const myAge = new Age();

      const myAgeMessage = `Saudações leitor, meu nome é Vinícius Gajo Marques Oliveira e tenho ${myAge.getMyAge()} anos.`;
      pEl.current ? pEl.current.innerHTML = myAgeMessage : null;
    };

    defineMyAge();
  }, []);

  return (
    <Layout home="">
      <Head>
        <title>Contato</title>
      </Head>

      <div className={contatoStyles.container}>

        <section>
          <h1>Sobre mim:</h1>
          <p ref={pEl}>Saudações leitor, meu nome é Vinícius Gajo Marques Oliveira e tenho X anos.</p>
        </section>

        <section className={contatoStyles.networks}>
          <h1>Entre em contato:</h1>
          <ul>
            <li>
              <a href="https://www.linkedin.com/in/vinicius-gajo/">
                <FaLinkedin size="2rem" />
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://github.com/64J0">
                <FaGithub size="2rem" />
                GitHub
              </a>
            </li>
          </ul>
        </section>
      </div>

      <GithubContribGraph contribChartHTML={contribChartHTML} />
    </Layout>
  );
};

export default Contato;

export async function getStaticProps() {
  const contribChartHTML = await getGithubData();
  
  return {
    props: {
      contribChartHTML
    },
    revalidate: 1 * 60 * 60 // 1 hora
  };
}


