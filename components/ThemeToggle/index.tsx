import React, { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

import styles from "./styles.module.scss";

const STORAGE_KEY = "color-mode";

type ColorMode = "light" | "dark";

const ThemeToggle: React.FC = () => {
  const [colorMode, setColorMode] = useState<ColorMode>("light");

  useEffect(() => {
    // The initial value lives in a DOM attribute set by an inline script in
    // _document.tsx before hydration (so there's no flash of the wrong
    // theme). It can't be read via a lazy useState initializer because that
    // runs during SSR too, where `document` doesn't exist.
    const current = document.documentElement.getAttribute("data-color-mode") as ColorMode | null;
    if (current) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setColorMode(current);
    }
  }, []);

  const toggleColorMode = () => {
    const nextColorMode: ColorMode = colorMode === "dark" ? "light" : "dark";
    setColorMode(nextColorMode);
    document.documentElement.setAttribute("data-color-mode", nextColorMode);
    window.localStorage.setItem(STORAGE_KEY, nextColorMode);
  };

  return (
    <button
      type="button"
      className={styles.themeToggle}
      onClick={toggleColorMode}
      aria-label={colorMode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={colorMode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {colorMode === "dark" ? <FaSun size="1.2rem" /> : <FaMoon size="1.2rem" />}
    </button>
  );
};

export default ThemeToggle;
