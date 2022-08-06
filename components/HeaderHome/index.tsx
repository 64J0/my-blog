import React from "react";
import Link from "next/link";

import styles from "../Layout/styles.module.scss";
import utilStyles from "../../styles/utils.module.css";

import headerStyles from "./styles.module.scss";

const Header: React.FC = () => {
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
      <h1 className={utilStyles.heading2X}>
        Vinícius Gajo's Blog
      </h1>
    </div >
  );
}

export default Header;