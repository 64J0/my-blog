import React from "react";
import Head from "next/head";
import Link from "next/link";

import Layout, { siteTitle } from "../components/layout";
import { getSortedPostData } from "../lib/posts";
import Date from "../components/date";

import utilStyles from "../styles/utils.module.css";

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

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <div className={`${utilStyles.mainContent}`}>
        <section className={utilStyles.headingMd}>
          <p>
            Formando em engenharia mecatrônica no CEFET-MG, desenvolvedor WEB focado na stack JS (React e Node.js principalmente) atualmente trabalhando com front-end na JMV Technology.
          </p>
        </section>
        <section className={utilStyles.headingMd}>
          <h2 className={utilStyles.headingLg}>Posts</h2>
          <ul className={utilStyles.list}>
            {
              allPostsData.map(({ id, date, title }) => (
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
