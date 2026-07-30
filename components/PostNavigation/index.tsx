import React from "react";
import Link from "next/link";

import { PostMeta } from "../../types/posts";

import styles from "./styles.module.scss";

interface PostNavigationProps {
  older: PostMeta | null;
  newer: PostMeta | null;
}

const PostNavigation: React.FC<PostNavigationProps> = ({ older, newer }) => {
  if (!older && !newer) {
    return null;
  }

  return (
    <nav className={styles.nav} aria-label="More posts">
      {older ? (
        <Link href={`/posts/${older.id}`} className={styles.link}>
          <span className={styles.direction}>&larr; Previous</span>
          <strong>{older.title}</strong>
        </Link>
      ) : <span />}

      {newer ? (
        <Link href={`/posts/${newer.id}`} className={`${styles.link} ${styles.next}`}>
          <span className={styles.direction}>Next &rarr;</span>
          <strong>{newer.title}</strong>
        </Link>
      ) : <span />}
    </nav>
  );
};

export default PostNavigation;
