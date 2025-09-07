import React from "react";
import Layout from "../components/Layout";

// pages/404.js
const Custom404: React.FC = () => {
  return (
    <Layout>
      {/* TODO: Move style to another css file */}
      <div style={{ textAlign: "center", padding: "4rem" }}>
        <h1>404 - Página não encontrada</h1>
      </div>
    </Layout>
  );
};

export default Custom404;
