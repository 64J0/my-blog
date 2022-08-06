import React from "react";
import Link from "next/link";
import { FiHome, FiChevronLeft } from "react-icons/fi";

import styles from "../Layout/styles.module.scss";
import utilStyles from "../../styles/utils.module.css";

import headerStyles from "./styles.module.scss";

export default function HeaderPost() {
  return (
    <>
      <div className={headerStyles.container}>
        <Link href="/contato">
          <a>
            <img
              src="/images/profile.jpg"
              className={`${styles.headerImage} ${utilStyles.borderCircle} ${headerStyles.contactLink}`}
              alt={"Uma foto minha"}
            />
          </a>
        </Link>
        <h2 className={headerStyles.backToHome}>
          <Link href="/">
            <a>
              <FiChevronLeft size="4rem" className={headerStyles.moveToLeft} />
              <FiHome size="4rem" />
            </a>
          </Link>
        </h2>
      </div>
    </>
  );
}