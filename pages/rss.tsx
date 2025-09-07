import React from "react";
import { GetServerSideProps } from "next";
import { getRssData } from "../lib/rss";

const Rss: React.FC = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  if (res) {
    const rssData = getRssData();
    res.setHeader('Content-Type', 'application/rss+xml');
    // res.setHeader('Content-Type', 'text/xml');
    res.write(rssData);
    res.end();
  }
  return {
    props: {},
  }
};

export default Rss;
