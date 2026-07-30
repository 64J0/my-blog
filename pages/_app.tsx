import React from "react";
import Script from "next/script";
import type { AppProps } from "next/app";
import { Inter, Roboto_Mono } from "next/font/google";

// @ts-ignore -- Next.js global CSS side-effect import in _app.tsx
import "../styles/global.css";

import GoogleAnalytics from "../components/GoogleAnalytics";
import MicrosoftClarity from "../components/MicrosoftClarity";

const ADSENSE_ID = "ca-pub-1710724306210780";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-roboto-mono",
  display: "swap",
});

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <GoogleAnalytics />
      <MicrosoftClarity />
      <Script
        strategy="lazyOnload"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
        crossOrigin="anonymous"
      />
      <div className={`app-root ${inter.variable} ${robotoMono.variable}`}>
        <Component {...pageProps} />
      </div>
    </>
  );
};

export default App;
