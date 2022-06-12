// Pages that begin with '[' and end with ']' are dynamic pages in Next.js
import React, { useEffect } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import hljs from "highlight.js";

import Layout from "../../components/layout";
import Date from "../../components/date";

import { getAllPostIds, getPostData } from "../../lib/posts";

import utilStyles from "../../styles/utils.module.css";
import postStyles from "./styles.module.scss";

interface PostData {
  title: string;
  date: string;
  tags?: string[];
  contentHtml: string;
}

const Post: React.FC<{ postData: PostData }> = ({ postData }) => {
  useEffect(() => {
    function highlightPreElement() {
      const preEl = document.querySelectorAll("pre");

      return (
        preEl && preEl.forEach((element) => {
          for (let child of element.children) {
            child.className = child.className.replace(/language-/, "");
            return hljs.highlightBlock((child as HTMLElement));
          }
        })
      );
    }

    highlightPreElement();
  }, []);

  return (
    <Layout home="">
      <Head>
        <title>{postData.title}</title>
      </Head>

      <article className={postStyles.container}>
        <h1 className={utilStyles.headingX1}>
          {postData.title}
        </h1>
        <div className={`${utilStyles.textRight} + ${utilStyles.lightText}`}>
          <Date dateString={postData.date} /><br/>
          {postData.tags && <small>Tags: [{postData.tags.join(", ")}]</small>}
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  // Return a list of possible value for id
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  // Fetch necessary data for the blog post using params.id
  const { params } = context;
  const postData = await getPostData(params?.id);
  return {
    props: {
      postData,
    },
  };
};
