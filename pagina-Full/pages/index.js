// Home page
import Link from "next/link";
import Layout from "../components/layout";
import { FiMail } from "react-icons/fi";

import hS from "../styles/home.module.scss";

export default function Index() {
  return (
    <Layout>
      <section className={`${hS.banner} ${hS.topImage}`}>
        <div className={`${hS.bannerTitle}`}>
          <p>
            <strong>JUNTOS</strong> NÓS PODEMOS FAZER{" "}
            <strong>MUITO MAIS</strong>
          </p>

          <hr className={`${hS.bottomHr}`} />
        </div>
      </section>

      <main className={`${hS.mainContainer}`}>
        <h1 className={`${hS.mainTitle}`}>
          SOMOS UM GRUPO DE PROFISSIONAIS{" "}
          <strong>ALTAMENTE QUALIFICADOS</strong> COM EXPERIÊNCIAS NOS MAIORES
          PROJETOS DE ENGENHARIA <strong>DO BRASIL E DO MUNDO</strong>.
        </h1>

        <div className={`${hS.mainContent}`}>
          <article>
            <h3>NOSSA HISTÓRIA...</h3>
            <p>
              A Full Engenharia foi fundada em 2011 impulsionada em conseguir
              sempre a solução e a satisfação dos nossos clientes. Oferecemos um
              serviço de projetos e consultorias multidisciplinar, em todas as
              áreas da indústria. Além de soluções em gerenciamento
              personalizadas para o seu negócio.
            </p>
            <p>
              Nossa equipe desenvolve o melhor projeto e planejamento em
              engenharia, para que sejam evitados erros e gastos desnecessários.
              Acreditamos que a relação com os nossos clientes é a base
              principal para o nosso trabalho. Assim, mantendo uma comunicação
              constante, chegamos sempre no resultado desejado.
            </p>
            <p>
              Contamos com um time de pessoas distribuídas nas diversas áreas da
              engenharia. Nossos colaboradores são nosso pilar, afinal são eles
              que colocam a mão na massa. Inspirada em promover um ambiente
              agradável e saudável para se trabalhar, a Full Engenharia se
              empenha em buscar sempre o desenvolvimento humano de sua equipe e
              criar laços duradouros, para que além de colegas de trabalho,
              sejamos bons amigos.
            </p>
          </article>
          <article>
            <div
              style={{
                border: "1px solid red",
                backgroundColor: "green",
              }}
              className={`${hS.videoContent}`}
            >
              Vídeo
            </div>
          </article>
        </div>

        <div className={`${hS.mainContent}`}>
          <section>
            <h3>NOSSA MISSÃO...</h3>
            <p>
              Melhorar o desempenho e a vida de nossos clientes, por meio de
              consultorias e projetos que gerem reais soluções para o negócio.
            </p>
          </section>
        </div>

        <div className={`${hS.mainContent} ${hS.carrousel}`}>
          <h2>CLIENTES</h2>
        </div>
      </main>

      <section className={`${hS.contactBanner} ${hS.contactImage}`}>
        <div className={`${hS.bannerTitle}`}>
          <p>
            Gostou do que viu? Tem alguma dúvida? Quer conversar com a gente
            sobre algum serviço ou produdo?
          </p>
          <div className={`${hS.contactBtn}`}>
            <Link href="/contato">
              <a>
                <FiMail color="#ffffff" />
                <p>CLIQUE AQUI</p>
              </a>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
