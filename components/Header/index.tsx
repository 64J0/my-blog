import React from "react";
import Link from "next/link";
import { FaLinkedin, FaGithub, FaHome, FaUser } from "react-icons/fa";

import headerStyles from "./styles.module.scss";

const Header: React.FC = () => {
  return (
    <div className={headerStyles.backgroundHeader}>
      <h1>
        Vinícius Gajo&apos;s Blog
      </h1>
      <ul>
        <li>
          <Link href="/">
            <FaHome size="2rem" title="Home" aria-label="Navigate to home page" />
          </Link>
        </li>
        <li>
          <Link href="/about">
            <FaUser size="2rem" title="About" aria-label="Navigate to about page" />
          </Link>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/vinicius-gajo/"
             target="_blank"
             rel="noopener noreferrer">
            <FaLinkedin size="2rem" title="LinkedIn" aria-label="Navigate to my LinkedIn page" />
          </a>
        </li>
        <li>
          <a href="https://github.com/64J0"
            target="_blank"
            rel="noopener noreferrer">
            <FaGithub size="2rem" title="GitHub" aria-label="Navigate to my GitHub page" />
          </a>
        </li>
      </ul>
    </div >
  );
};

export default Header;
