// Pages that begin with '[' and end with ']' are dynamic pages in Next.js
import React, { useEffect } from "react";
import Head from "next/head";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";

import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Date from "../../components/date";

import utilStyles from "../../styles/utils.module.css";

import postStyles from "./styles.module.scss";

export default function Post({ postData }) {
  useEffect(() => {
    function highlightPreElement() {
      hljs.registerLanguage("language-javascript", javascript);
      let preEl = document.querySelectorAll("pre");

      return (
        preEl && preEl.forEach((element) => {
          /*
          Esse bloco era usado para configurar o nome da 
          class do elemento ficar de acordo com o padrão
          do highlight.js

          element.childNodes.forEach((child) => {
            child.className = child.className.replace(/language-/, "");
          });
          */

          hljs.highlightBlock(element);
        })
      );
    }

    highlightPreElement();
  });

  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <article className={postStyles.container}>
        <h1 className={utilStyles.headingX1}>
          {postData.title}
        </h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>

      <footer className={postStyles.footer}>
        ... Fim do post ...
      </footer>
    </Layout>
  );
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
