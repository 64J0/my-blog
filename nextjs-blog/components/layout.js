import Link from "next/link";

import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";

import HeaderHome from './HeaderHome';
import HeaderPost from './HeaderPost';

export const siteTitle = "64j0 Blog";

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        {home ? (
          <HeaderHome />
        ) : (
            <HeaderPost />
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
