import React from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import { getRssData } from "../lib/rss";

interface RssData {
  rssFeed: string;
}

const Rss: React.FC<{ rssData: RssData }> = ({ rssData }) => {
  return (
    <>
      <Head>
        <title>Rss feed</title>
      </Head>

      <div>
        {rssData.rssFeed}
      </div>
    </>
  );
};

export default Rss;

export const getStaticProps: GetStaticProps = async () => {
  // Fetch necessary data for the blog post using params.id
  const rssData = getRssData();
  return {
    props: {
      rssData: {
        rssFeed: rssData,
      },
    },
  };
};
