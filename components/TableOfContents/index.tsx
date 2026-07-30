import React from "react";

import { TocEntry } from "../../types/posts";

import styles from "./styles.module.scss";

const MIN_ENTRIES_TO_SHOW = 2;

interface TableOfContentsProps {
  entries: TocEntry[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ entries }) => {
  if (entries.length < MIN_ENTRIES_TO_SHOW) {
    return null;
  }

  return (
    <nav className={styles.toc} aria-label="Table of contents">
      <p className={styles.title}>On this page</p>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id} className={entry.depth === 3 ? styles.subEntry : undefined}>
            <a href={`#${entry.id}`}>{entry.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
