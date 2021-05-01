import React from "react";
import type { AppProps } from "next/app";

// Para o Highligh.js
import "highlight.js/styles/agate.css";
import "../styles/global.css";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
}

export default App;
