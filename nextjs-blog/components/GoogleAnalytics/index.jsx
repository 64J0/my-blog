import React, { useMemo } from "react";

export default function GoogleAnalytics() {
  const analyticsString = useMemo(() => {
    return ("window.dataLayer = window.dataLayer || []; " +
      "function gtag(){dataLayer.push(arguments);} " +
      "gtag('js', new Date()); " +
      "gtag('config', 'UA-174653740-1');");
  }, []);

  return (
    <>
      {/* Global site tag (gtag.js) - Google Analytics */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-174653740-1"></script>
      <script dangerouslySetInnerHTML={{
        __html: analyticsString
      }}>
      </script>
    </>
  );
}