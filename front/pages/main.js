import React from 'react';
import Link from 'next/link';

import MainHeader from '../components/MainHeader';
import Head from 'next/head';

const Main = () => {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Luckiest+Guy&display=swap"
          rel="stylesheet"
        />
      </Head>
      <MainHeader />
    </>
  );
};

export default Main;
