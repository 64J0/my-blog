import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

import styles from "./styles.module.scss";

import Header from "../Header";
import ThemeToggle from "../ThemeToggle";

export const siteTitle = "64J0's Blog";

interface LayoutProps {
    children: React.ReactNode;
  }

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <a href="#main-content" className={styles.skipToContent}>
        Skip to main content
      </a>
      <ThemeToggle />
      <header>
        <Header />
      </header>

      <main id="main-content" className={styles.mainContainer}>
        {children}
      </main>

      <footer className={styles.footer}>
        <ul className={styles.footerLinks}>
          <li>
            <a href="https://www.linkedin.com/in/vinicius-gajo/"
              target="_blank"
              rel="noopener noreferrer">
              <FaLinkedin size="1.8rem" title="LinkedIn" aria-label="Navigate to my LinkedIn page" />
            </a>
          </li>
          <li>
            <a href="https://github.com/64J0"
              target="_blank"
              rel="noopener noreferrer">
              <FaGithub size="1.8rem" title="GitHub" aria-label="Navigate to my GitHub page" />
            </a>
          </li>
        </ul>
        <p className={styles.footerEmail}>
          Feel free to send me an email: vinigaio97 -at- gmail -dot- com
        </p>
      </footer>
    </div>
  );
};

export default Layout;
