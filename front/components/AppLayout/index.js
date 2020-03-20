import React, { memo } from 'react';
import AppLayoutHeader from '../AppLayoutHeader';
import { Layout, ContentLayout, Container } from './style';
import FooterLayout from '../FooterLayout';
const AppLayout = memo(({ children }) => {
  return (
    <>
      <Layout>
        <header id="myHeader" className="sticky">
          <AppLayoutHeader page={children.type.name} />
        </header>
        <Container>
          <ContentLayout>{children}</ContentLayout>
        </Container>
        {/* <FooterLayout /> */}
      </Layout>
    </>
  );
});

export default AppLayout;
