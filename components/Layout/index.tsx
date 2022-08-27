import React from "react";
import styles from "./styles.module.scss";

import HeaderHome from "../HeaderHome";
import HeaderPost from "../HeaderPost";

export const siteTitle = "64j0 Blog";

interface LayoutProps {
    home?: any;
  }

const Layout: React.FC<LayoutProps> = ({ children, home }) => {
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

      <footer className={styles.footer}>
      </footer>
    </div>
  );
};

export default Layout;
