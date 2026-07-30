import React, { useMemo, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Fuse from "fuse.js";

import Layout from "../components/Layout";
import Date from "../components/Date";
import { getSortedPostData } from "../lib/posts";
import { SITE_URL } from "../lib/site";
import { PostMeta } from "../types/posts";

import searchStyles from "./search.module.scss";

const FUSE_OPTIONS: Fuse.IFuseOptions<PostMeta> = {
  keys: [
    { name: "title", weight: 2 },
    { name: "tags", weight: 1 },
  ],
  threshold: 0.35,
  ignoreLocation: true,
};

export async function getStaticProps() {
  const allPostsData = getSortedPostData();
  return {
    props: {
      allPostsData,
    },
  };
}

const Search: React.FC<{ allPostsData: PostMeta[] }> = ({ allPostsData }) => {
  const [query, setQuery] = useState("");

  const fuse = useMemo(() => new Fuse(allPostsData, FUSE_OPTIONS), [allPostsData]);

  const results = useMemo(() => {
    if (query.trim().length === 0) {
      return allPostsData;
    }
    return fuse.search(query).map((result) => result.item);
  }, [query, fuse, allPostsData]);

  return (
    <Layout>
      <Head>
        <title>Search - 64J0&apos;s Blog</title>
        <meta name="description" content="Search posts by title or tag." />
        <link rel="canonical" href={`${SITE_URL}/search`} />
      </Head>

      <div className={searchStyles.container}>
        <h1>Search</h1>

        <input
          type="search"
          className={searchStyles.input}
          placeholder="Search by title or tag..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Search posts by title or tag"
          autoFocus
        />

        <p className={searchStyles.resultCount}>
          {results.length} {results.length === 1 ? "post" : "posts"}
        </p>

        <ul className={searchStyles.resultList}>
          {results.map(({ id, date, title }) => (
            <li key={id} className={searchStyles.resultItem}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={searchStyles.resultDate}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>

        {results.length === 0 && (
          <p className={searchStyles.emptyState}>No posts match &quot;{query}&quot;.</p>
        )}
      </div>
    </Layout>
  );
};

export default Search;
