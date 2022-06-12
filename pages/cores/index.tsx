import Head from "next/head";
import React, { useState, useCallback } from "react";
import { MdAddCircle } from "react-icons/md";

import Layout from "../../components/layout";
import ColorSection from "./ColorSection";

import styles from "./styles.module.scss";

const Cores: React.FC = () => {
  const [childArray, setChildArray] = useState([0]);

  const handleAddNewElement = useCallback(() => {
    const newArray = [...childArray, childArray.length];
    return setChildArray(newArray);
  }, [setChildArray, childArray]);

  return (
    <Layout home="">
      <Head>
        <title>Paleta de cores</title>
      </Head>

      <div className={styles.container}>
        <h1>Paleta de cores</h1>

        <ul>
          {
            childArray.map((element) => {
              return (<ColorSection key={element} />);
            })
          }
        </ul>

        <button
          type="button"
          onClick={handleAddNewElement}
        >
          <MdAddCircle size="3rem" />
        </button>
      </div>
    </Layout>
  );
};

export default Cores;