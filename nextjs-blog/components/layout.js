import React from "react";
import styles from "./layout.module.css";

import HeaderHome from "./HeaderHome";
import HeaderPost from "./HeaderPost";

export const siteTitle = "64j0 Blog";

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        {
          home ? (<HeaderHome />) : (<HeaderPost />)
        }
      </header>

      <main className={styles.mainContainer}>
        {children}
      </main>
    </div>
  );
}
