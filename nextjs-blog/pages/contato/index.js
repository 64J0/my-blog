import React, { useRef, useEffect } from "react";
import Head from "next/head";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

import Layout from "../../components/layout";
import Age from "../../utils/Age";

import contatoStyles from "./styles.module.scss";

export default function Contato() {
  const pEl = useRef(null);

  useEffect(() => {
    const defineMyAge = () => {
      const myAge = new Age();

      const myAgeMessage = `Saudações leitor, meu nome é Vinícius Gajo Marques Oliveira e tenho ${myAge.calculate()} anos.`;
      return pEl.current ? pEl.current.innerHTML = myAgeMessage : null;
    };

    defineMyAge();
  }, []);

  return (
    <Layout>
      <Head>
        <title>Contato</title>
      </Head>

      <div className={contatoStyles.container}>

        <section>
          <h1>Sobre mim:</h1>
          <p ref={pEl}>Saudações leitor, meu nome é Vinícius Gajo Marques Oliveira e tenho X anos.</p>
          <p>Estou terminando o curso de Engenharia Mecatrônica no <a href="http://www.divinopolis.cefetmg.br/">CEFET-MG</a> e trabalhando como dev front-end na <a href="https://jmvtechnology.com/">JMV Technology</a>.</p>
          <p>Antes disso já fui analista de redes de teleprocessamento no NOC (<i>Network Operations Center</i>) da <a href="https://www.soumaster.com.br/">Master Internet</a> e estagiário de engenharia na <a href="http://fullengenharia.com.br/">Full Engenharia</a>.</p>
        </section>

        <section className={contatoStyles.networks}>
          <h1>Entre em contato:</h1>
          <ul>
            <li>
              <h3>
                <a href="https://www.linkedin.com/in/vinicius-gajo/">
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
            <li>
              <h3>
                <a href="https://twitter.com/viniciusgajo">
                  <FaTwitter size="2rem" />
                Twitter
                </a>
              </h3>
            </li>
          </ul>
        </section>
      </div>
    </Layout>
  );
}