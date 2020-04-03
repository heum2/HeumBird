import React, { memo } from 'react';
import AppLayoutHeader from '../AppLayoutHeader';
import { Layout, Container } from './style';
import FooterLayout from '../FooterLayout';
const AppLayout = memo(({ children }) => {
  return (
    <>
      <Layout>
        <header id="myHeader" className="sticky">
          <AppLayoutHeader page={children.type.name} />
        </header>
        <Container>{children}</Container>
        {/* <FooterLayout /> */}
      </Layout>
    </>
  );
});

export default AppLayout;
