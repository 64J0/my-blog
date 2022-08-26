import React, { useRef, useEffect } from "react";
import Head from "next/head";
import { FaLinkedin, FaGithub } from "react-icons/fa";

import Layout from "../../components/Layout";
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
      const ageMark = "$X$";

      if (!pEl.current) return;
      
      const currentText = pEl.current.innerHTML;
      pEl.current.innerHTML = currentText.replace(ageMark, `${myAge.getMyAge()}`);
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
          <p ref={pEl}>Hey people, hope you're ok. My name is Vinícius Gajo and I'm the owner of this blog. I'm currently $X$ years old, living in Brazil, and I'm graduated at Mechatronics Engineering by CEFET-MG.</p>
          <p>
            I have being presented to several topics along my graduation, covering other engineering fields like mechanics, electric, control systems, electronic and computation. Nowadays I'm working as a software/infrastructure engineer, dealing with many tools and technologies, ranging from the JS/TS stack (React.JS, Vue, Next.js, Node.js) to F# (Saturn, Fable/Feliz), and DevOps stuff (Docker, Kubernetes, Terraform, Azure, Gitlab CI/Github Actions).
          </p>
          <p>
            In my free time I like to read books, watch movies, learn new things, relax with my family and sometimes play some sport.
          </p>
          <p>
            At this moment I'm striving to learn technologies like Functional Programming, Azure, Nix, Ansible and Security. But, in the future, my goal is to dive deeper in Control Theory.
          </p>
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

      {/* <GithubContribGraph contribChartHTML={contribChartHTML} /> */}
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


