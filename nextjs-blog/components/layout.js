import Link from "next/link";

import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";

import Header from './Header';

const name = "Vinícius Gajo";
export const siteTitle = "64j0 Blog";

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        {home ? (
          <Header />
        ) : (
            <div className={`${utilStyles.backgroundWhite}`}>
              <Link href="/">
                <a>
                  <img
                    src="/images/profile.jpg"
                    className={`${styles.headerImage} ${utilStyles.borderCircle} ${utilStyles.shadow}`}
                    alt={home}
                  />
                </a>
              </Link>
              <h2 className={utilStyles.headingLg}>
                <Link href="/">
                  <a className={utilStyles.colorInherit}>{name}</a>
                </Link>
              </h2>
            </div>
          )}
      </header>

      <main className={utilStyles.backgroundWhite}>{children}</main>

      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
}
