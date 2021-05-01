import React from "react";
import Link from "next/link";

import styles from "../layout.module.css";
import utilStyles from "../../styles/utils.module.css";

import headerStyles from "./styles.module.scss";

export default function Header() {
  return (
    <div className={headerStyles.backgroundHeader}>
      <Link href="/contato">
        <img
          src="/images/profile.jpg"
          className={`${styles.headerHomeImage} ${utilStyles.borderCircle}
              ${utilStyles.shadow}`}
          alt="Vinícius Gajo"
        />
      </Link>
      <h1 className={utilStyles.heading2X}>Vinícius Gajo</h1>
    </div >
  );
}