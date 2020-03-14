import React from 'react';
import AppLayoutHeader from '../AppLayoutHeader';
import { Layout, ContentLayout, Container } from './style';

const AppLayout = ({ children }) => {
  return (
    <>
      <Layout>
        <header id="myHeader" className="sticky">
          <AppLayoutHeader page={children.type.name} />
        </header>
        <Container>
          <ContentLayout>{children}</ContentLayout>
        </Container>
      </Layout>
    </>
  );
};

export default AppLayout;
