import React from 'react';
import Helmet from 'react-helmet';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

const HeumBird = ({ Component, pageProps }) => {
  return (
    <>
      <Helmet
        title="HeumBird"
        htmlAttributes={{ lang: 'ko' }}
        meta={[
          {
            charset: 'UTF-8',
          },
          {
            name: 'viewport',
            content:
              'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover',
          },
          {
            'http-equiv': 'X-UA-Compatible',
            content: 'IE=edge',
          },
          {
            name: 'description',
            content: '흠흠이의 NodeBird SNS',
          },
          {
            name: 'og:title',
            content: 'NodeBird',
          },
          {
            name: 'og:description',
            content: '흠흠이의 NodeBird SNS',
          },
          {
            property: 'og:type',
            content: 'website',
          },
          {
            property: 'og:image',
            content: 'http://heumbird.com/favicon.ico',
          },
        ]}
        link={[
          {
            rel: 'shortcut icon',
            href: '/favicon.ico',
          },
          {
            rel: 'stylesheet',
            href: 'https://cdnjs.cloudflare.com/ajax/libs/antd/3.25.3/antd.css',
          },
          {
            rel: 'stylesheet',
            href:
              'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css',
          },
          {
            rel: 'stylesheet',
            href:
              'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css',
          },
          {
            rel: 'stylesheet',
            href:
              'https://use.fontawesome.com/releases/v5.12.0/css/svg-with-js.css',
          },
        ]}
      />
      <Component {...pageProps} />
    </>
  );
};

export default HeumBird;
