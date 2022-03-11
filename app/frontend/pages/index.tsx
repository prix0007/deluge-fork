import type { NextPage } from "next";
import React from 'react';
import Head from "next/head";
import styles from "../styles/Home.module.css";

import Products from "../components/products";

const Home: NextPage = () => {

  return (
    <div className="w-100 flex flex-col items-center min-h-screen">
      <Head>
        <title>Nearbay.</title>
      </Head>
      
      <main className="container content-center w-full m-0">

        <p className={styles.description}>
          A marketplace which is secured by
          <code className={styles.code}>Near Blockchain.</code>
        </p>
        <Products />
      </main>
    </div>
  );
};

export default Home;