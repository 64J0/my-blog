import React from "react";
import styles from "./styles.module.scss";

import Header from "../Header";

export const siteTitle = "64j0 Blog";

interface LayoutProps {
    children: any;
  }

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <header>
        <Header />
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
