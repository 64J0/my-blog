import React from "react";
import Head from "next/head";
import Link from "next/link";

import Layout, { siteTitle } from "../components/Layout";
import { getSortedPostData } from "../lib/posts";
import { SITE_URL } from "../lib/site";
import Date from "../components/Date";
import { PostMeta } from "../types/posts";

import homeStyles from "../styles/home.module.css";

const SITE_DESCRIPTION = "Personal blog where I write about technology, programming, philosophy, theology, and more.";
const DEFAULT_OG_IMAGE = "https://avatars1.githubusercontent.com/u/50725287?s=460&u=a543b28cd2cae2b76fdc3cd4ea1699c35b7b7f06&v=4";

export async function getStaticProps() {
  const allPostsData = getSortedPostData();
  return {
    props: {
      allPostsData,
    },
  };
}

const Home: React.FC<{ allPostsData: PostMeta[]; }> = ({ allPostsData }) => {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="canonical" href={SITE_URL} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
      </Head>

      <div className={homeStyles.mainContent}>
        <section>
          <p className={homeStyles.paragraphHeading}>
            Mechatronics engineer graduated from CEFET-MG, turned software engineer with skills in infrastructure (cloud) and DevOps. Postgraduate in SWE from FIA Business School. Currently working with backend software development using functional programming (F#), and making a better world with open source contributions. Other than technology, I like philosophy and theology.
          </p>
        </section>
        <section>
          <h2>Posts</h2>
          <ul className={homeStyles.postsList}>
            {
              allPostsData.map(({ id, date, title }: PostMeta) => (
                <li className={homeStyles.postsListItem} key={id}>
                  <Link href={`/posts/${id}`}>{title}</Link>
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
