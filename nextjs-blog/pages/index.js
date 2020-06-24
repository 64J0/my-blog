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

// For Server Side Rendering:
/*
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    }
  }
}
*/

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Mechatronic Engineer/WEB Developer (JS stack)/Network Operations
          Center Analyst
        </p>
        <p>
          (This is a sample website - you'll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href="/posts/[id]" as={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
