import React from "react";
import Link from "next/link";

import headerStyles from "./styles.module.scss";

const Header: React.FC = () => {
  return (
    <div className={headerStyles.backgroundHeader}>
      <Link href="/about">
        <img
          src="/images/profile.jpg"
          className={headerStyles.headerHomeImage}
          alt="Vinícius Gajo"
          title="Sobre"
        />
      </Link>
      <h1>
        Vinícius Gajo&apos;s Blog
      </h1>
    </div >
  );
};

export default Header;
