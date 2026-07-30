// Pages that begin with '[' and end with ']' are dynamic pages in Next.js
import React, { useRef } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

import Layout from "../../components/Layout";
import Date from "../../components/Date";
import ReadingProgress from "../../components/ReadingProgress";
import TableOfContents from "../../components/TableOfContents";
import PostNavigation from "../../components/PostNavigation";

import { getAllPostIds, getPostData, getAdjacentPosts } from "../../lib/posts";
import { copyCodeToClipboard } from "../../lib/copyToClipboard";
import { buildBlogPostingSchema } from "../../lib/structuredData";
import { SITE_URL } from "../../lib/site";
import { AdjacentPosts, PostData } from "../../types/posts";

import postStyles from "./styles.module.scss";

interface PostProps {
  postData: PostData;
  adjacentPosts: AdjacentPosts;
}

const Post: React.FC<PostProps> = ({ postData, adjacentPosts }) => {
  const articleRef = useRef<HTMLElement>(null);
  const postUrl = `${SITE_URL}/posts/${postData.id}`;
  // Posts with no image of their own get a generated one instead of no
  // og:image at all, since a missing preview image hurts link previews.
  const ogImage = postData.ogImage ?? `${SITE_URL}/api/og?title=${encodeURIComponent(postData.title)}`;
  const structuredData = buildBlogPostingSchema(postData, postUrl, ogImage);

  const handleContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>("[data-copy-button]");
    if (!button) return;

    const code = button.parentElement?.querySelector("pre")?.textContent ?? "";
    copyCodeToClipboard(code, button);
  };

  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
        <meta name="description" content={postData.description} />
        <link rel="canonical" href={postUrl} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={postData.title} />
        <meta property="og:description" content={postData.description} />
        <meta property="og:url" content={postUrl} />
        <meta property="og:image" content={ogImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={postData.title} />
        <meta name="twitter:description" content={postData.description} />
        <meta name="twitter:image" content={ogImage} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <ReadingProgress targetRef={articleRef} />

      <article ref={articleRef} className={postStyles.container}>
        <h1>
          {postData.title}
        </h1>
        <div className={postStyles.meta}>
          <Date dateString={postData.date} /> · {postData.readingTimeMinutes} min read<br/>
          {postData.tags && <small>Tags: [{postData.tags.join(", ")}]</small>}
        </div>

        <TableOfContents entries={postData.toc} />

        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} onClick={handleContentClick} />

        <PostNavigation older={adjacentPosts.older} newer={adjacentPosts.newer} />
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
  const adjacentPosts = getAdjacentPosts(postData.id);

  return {
    props: {
      postData,
      adjacentPosts,
    },
  };
};
