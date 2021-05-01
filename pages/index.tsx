import React from "react";
import Head from "next/head";
import Link from "next/link";

import Layout, { siteTitle } from "../components/layout";
import { getSortedPostData } from "../lib/posts";
import Date from "../components/date";

import utilStyles from "../styles/utils.module.css";

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

      <div className={utilStyles.mainContent}>
        <section className={utilStyles.headingMd}>
          <p className={utilStyles.adjustText}>
            Formado em engenharia mecatrônica no CEFET-MG, desenvolvedor WEB focado na stack JS (React, Vue, Next.js e Node.js, principalmente) atualmente trabalhando na <a href="https://jmvtechnology.com/">JMV Technology</a>.
          </p>
        </section>
        <section className={utilStyles.headingMd}>
          <h2 className={utilStyles.headingLg}>Posts</h2>
          <ul className={utilStyles.list}>
            {
              allPostsData.map(({ id, date, title }: AllPostsData) => (
                <li className={utilStyles.listItem} key={id}>
                  <Link href="/posts/[id]" as={`/posts/${id}`}>
                    <a>{title}</a>
                  </Link>
                  <br />
                  <small className={utilStyles.lightText}>
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
}

export default Home;
