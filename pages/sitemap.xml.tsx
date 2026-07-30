import React from "react";
import { GetServerSideProps } from "next";
import { getSitemapData } from "../lib/sitemap";

const Sitemap: React.FC = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  if (res) {
    const sitemapData = getSitemapData();
    res.setHeader("Content-Type", "application/xml");
    res.write(sitemapData);
    res.end();
  }
  return {
    props: {},
  };
};

export default Sitemap;
