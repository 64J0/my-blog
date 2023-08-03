import React, { useRef, useEffect } from "react";
import Head from "next/head";
import { FaLinkedin, FaGithub } from "react-icons/fa";

import Layout from "../../components/Layout";

import Age from "../../utils/Age";
import { getGithubData } from "../../lib/github";

import contatoStyles from "./styles.module.scss";

const Contato: React.FC = () => {
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
        <title>About me</title>
      </Head>

      <div className={contatoStyles.container}>

        <section>
          <h1>About me:</h1>
          <p ref={pEl}>
            Hey people, I hope you're ok. My name is <strong>Vinícius Gajo</strong> and I'm the owner of this blog. I'm currently $X$ years old, living in Brazil, and graduated in <strong>Mechatronics Engineering</strong> by <a href="https://www.eng-mecatronica.divinopolis.cefetmg.br/">CEFET-MG</a>.
          </p>
          <p>
            Due to my graduation area, I have been presented with several unusual topics, covering other engineering fields like Mechanics, Electric, Automation and Control Systems, Electronics, and Computation. During graduation time I joined the campus's BAJA team, where our goal was to develop an off-road single-seated vehicle to compete with other teams in many challenges promoted by SAE (Society of Automotive Engineers). I was assigned to the breaking and electronics team.
          </p>
          <p>
            While in the university, I also worked as a monitor student for some disciplines: Hydraulics and Pneumatic Systems (Theory and Lab), and Metrology (Theory and Lab).
          </p>
          <p>
            By the end of my graduation, I decided to study more about mechanics and vibration. With this in mind, my final thesis was the study and theoretical characterization of a didactic system composed of a De Laval rotor, in order to understand its dynamical/vibrational properties. You can find more information in <a href="https://github.com/64J0/64J0/blob/master/TCC_2___Vinicius_Gajo.pdf">this link</a> from my Github if you can read Portuguese.
          </p>
          <p>
            By the time I was doing the necessary internship at the end of graduation, I was working in a mechanical/industrial engineering company. The environment was pretty cool, and I was able to learn a lot with my teammates. There I was basically working in static mechanical projects, dealing with tools like AutoCAD for 2D draws, Autodesk Inventor for 3D models, and Ansys Workbench for <a href="https://en.wikipedia.org/wiki/Finite_element_method">FEM</a> (Finite Element Method) analysis.
          </p>
          <p>
            It was also in this place that I started my developer career. There was a necessity for software to keep track of the projects that the company was dealing with. Since by this time I had some fundamental knowledge of HTML5, CSS3, and JavaScript, I was assigned to bootstrap this project. It was a very cool experience, and I definitely learned a lot.
          </p>
          <p>
            For this project, I started using only JavaScript for the cool part, with React.JS for the front-end and Node.js for the back-end. For the database, since I did not have knowledge of SQL, I decided to pick the hype of the time: MongoDB. I kept working on this project for several months straight, but unfortunately, when I left the company later they decided to not use it anymore since they did not have the intention to hire another person just to keep updating it.
          </p>
          <p>
            My next work experience was in a network company. It was also pretty cool to learn more about the infrastructure behind the internet, and some new technologies, like fiber connection with FTTH, and wireless connections. There I worked in the NOC (Network Operations Center) team, dealing with support and some small fixes. Also, for the first time, I was working in a night job, working on a scale of 12/36.
          </p>
          <p>
            During this time I was sharpening my skills in software development by watching boot camps (Rocketseat s2) and practicing a lot. Eventually, I decided to search for a full-time job focused only on web development. Then, I joined a company in the city I was living.
          </p>
          <p>
            In this software development world, I have played many different roles. In the beginning, I was working as a front-end developer, playing with JavaScript using React.JS with class components and Angular JS (Angular 1), but later I started working as a full-stack developer, dealing with Vue.js 2 and Node.js. During a small period, I was even studying FFMPEG.
          </p>
          <p>
            As time goes by, my friend Iago invited me to join the company he was working by the time. I thought it would be pretty cool to work there since the environment presented as very challenging and innovative. In the end, it was even better than I thought.
          </p>
          <p>
            At this company, we used the functional paradigm to create products related to machine learning models. The language of choice is F# from the .NET environment, which presents a very good static typing system. With this feature we strive to use and create correct abstractions that are easier to understand (types can work as documentation sometimes), basically catching bugs before submitting the code to further development. Finally, with the type system, we can model the system in a way that invalid states are harder to be achieved.
          </p>
          <p>
            Although initially I was assigned to work as a full-stack developer for a consultancy project using F# for both the back-end (Saturn) and the front-end (Fable/Feliz), and PostgreSQL as the main database of the system. Later I went to the DevSecOps team.
          </p>
          <p>
            At this new team, I was required to learn lots of other tools and concepts, and prepare myself with some knowledge that usually a software developer does not need to get. There I got more in touch with Docker, Git, and the CI environment from both Gitlab (Gitlab CI) and Github (Github Actions). I was also presented to Kubernetes, Terraform, and Microsoft Azure. Another aspect that I feel that I'm still a beginner about is the security of computer systems. Due to the "Sec" part, I am required to get more knowledge in this topic, and this is something I'm striving to get better. And this is the job I'm currently assigned.
          </p>
          <p>
            In my free time, I like to read books, watch movies, learn new things, relax with my family and sometimes play some sport.
          </p>
          <p>
            At this moment, although still learning things about the tools I'm currently using at work, I'm also striving to learn other tools/technologies like Emacs, Functional Programming, Azure, Nix, Ansible, DevOps/DevSecOps, and Security/Hacking. But, in the future, my goal is to dive deeper into Control Theory, although it's not clear yet how this will happen.
          </p>
        </section>

        <hr />

        <section className={contatoStyles.networks}>
          <h2>Open-source projects:</h2>
          <p>
            At this section I share some open-source projects that I have created along the time and that I think are cool. To know more about them, you can follow their links to the GitHub repository.
          </p>
          <ul>
            <li>
              <a href="https://github.com/64J0/daily-verse-telegram-bot">
                <FaGithub size="2rem" />
                daily-verse-telegram-bot
              </a>
              <a href="https://github.com/64J0/fsharp-monitoring">
                <FaGithub size="2rem" />
                fsharp-monitoring
              </a>
              <a href="https://github.com/64J0/my-blog">
                <FaGithub size="2rem" />
                my-blog
              </a>
              <a href="https://github.com/64J0/custom-fsharp-gh-action-and-dynamic-matrix">
                <FaGithub size="2rem" />
                custom-fsharp-gh-action-and-dynamic-matrix
              </a>
              <a href="https://github.com/64J0/literate-prog-finance">
                <FaGithub size="2rem" />
                literate-prog-finance
              </a>
              <a href="https://github.com/64J0/AzureFunctions-OpenCV">
                <FaGithub size="2rem" />
                AzureFunctions-OpenCV
              </a>
              <a href="https://github.com/64J0/Extensions_Chrome">
                <FaGithub size="2rem" />
                Extensions_Chrome
              </a>
            </li>
          </ul>
        </section>

        <hr />

        <section className={contatoStyles.networks}>
          <h2>Contact:</h2>
          <p>
            You can reach me in the following platforms:
          </p>
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


