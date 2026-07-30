import React from "react";
import Script from "next/script";

const GA_ID = "G-6YQ15XLQDX";

const GoogleAnalytics: React.FC = () => (
  <>
    <Script
      strategy="afterInteractive"
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
    />
    <Script strategy="afterInteractive" id="google-analytics">
      {`window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_ID}');`}
    </Script>
  </>
);

export default GoogleAnalytics;