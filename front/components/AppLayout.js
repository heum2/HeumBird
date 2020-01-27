import React from 'react';
import { Layout } from 'antd';

const AppLayout = ({ children }) => {
  const { Header, Footer, Content } = Layout;
  return (
    <>
      <Layout>
        <Header></Header>
        <Content>{children}</Content>
        <Footer></Footer>
      </Layout>
    </>
  );
};

export default AppLayout;
