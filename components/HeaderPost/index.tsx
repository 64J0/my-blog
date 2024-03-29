import React from "react";
import Link from "next/link";
import { FiHome, FiChevronLeft } from "react-icons/fi";

import headerStyles from "./styles.module.scss";

export default function HeaderPost() {
  return (
    <div className={headerStyles.container}>
      <Link legacyBehavior href="/about">
        <a>
          <img
            src="/images/profile.jpg"
            className={headerStyles.contactLink}
            alt={"Uma foto minha"}
          />
        </a>
      </Link>
      <h2 className={headerStyles.backToHome}>
        <Link legacyBehavior href="/">
          <a>
            <FiChevronLeft size="4rem" className={headerStyles.moveToLeft} />
            <FiHome size="4rem" />
          </a>
        </Link>
      </h2>
    </div>
  );
}
