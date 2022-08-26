import React from "react";
import Head from "next/head";
import Link from "next/link";

import Layout, { siteTitle } from "../components/Layout";
import { getSortedPostData } from "../lib/posts";
import Date from "../components/Date";

import homeStyles from "../styles/home.module.css";

interface AllPostsData {
  id: string;
  date: string;
  title: string;
}

// This is a Next.js function that runs to get data from external sources
// like API's, DB's or even the file-system like in this case.
// In production, `getStaticProps` runs at build time
export async function getStaticProps() {
  const allPostsData = getSortedPostData();
  return {
    props: {
      allPostsData,
    },
  };
}

const Home: React.FC<{ allPostsData: AllPostsData[]; }> = ({ allPostsData }) => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <div className={homeStyles.mainContent}>
        <section>
          <p className={homeStyles.paragraphHeading}>
            Mechatronics engineer graduated by CEFET-MG, turned software engineer with infrastructure (cloud) and DevOps skills. Currently working in Datarisk with functional programming (F#).
            {/* I have being presented to several topics along my graduation, covering other engineering fields like mechanics, electric, control systems, electronic and computation. Nowadays I'm working as a software/infrastructure engineer, dealing with many tools and technologies, ranging from the JS/TS stack (React.JS, Vue, Next.js, Node.js) to F# (Saturn, Fable/Feliz), and DevOps stuff (Docker, Kubernetes, Terraform, Azure, Gitlab CI/Github Actions). */}
          </p>
        </section>
        <section>
          <h2>Posts</h2>
          <ul className={homeStyles.postsList}>
            {
              allPostsData.map(({ id, date, title }: AllPostsData) => (
                <li className={homeStyles.postsListItem} key={id}>
                  <Link href="/posts/[id]" as={`/posts/${id}`}>
                    <a>{title}</a>
                  </Link>
                  <br />
                  <small className={homeStyles.postsListDate}>
                    <Date dateString={date} />
                  </small>
                </li>
              ))
            }
          </ul>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
