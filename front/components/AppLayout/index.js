import React, { useEffect } from 'react';

import AppLayoutHeader from '../AppLayoutHeader';
import { Layout, ContentLayout } from './style';

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
        <AppLayoutHeader page={children.type.name} />
      </header>
      <div className="container">
        <ContentLayout>{children}</ContentLayout>
      </div>
    </Layout>
  );
};

export default AppLayout;
