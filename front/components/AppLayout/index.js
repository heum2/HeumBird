import React, { useState, useEffect } from 'react';
import { Row } from 'antd';

import AppLayoutHeader from '../AppLayoutHeader';
import { Layout } from './style';

const AppLayout = ({ children }) => {
  useEffect(() => {
    const header = document.getElementById('myHeader');
    const sticky = header.offsetTop;
    const scrollCallBack = window.addEventListener('scroll', () => {
      if (window.pageYOffset > sticky) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    });
    return () => {
      window.removeEventListener('scroll', scrollCallBack);
    };
  }, []);

  return (
    <Layout>
      <header id="myHeader" className="header">
        <AppLayoutHeader />
      </header>
      <div className="container">
        <Row
          gutter={16}
          type="flex"
          justify="center"
          style={{ padding: '60px 0px 0px' }}
        >
          {children}
        </Row>
      </div>
    </Layout>
  );
};

export default AppLayout;
