import React from 'react';
import LayoutHeader from '../LayoutHeader';
import { Container } from './style';

const AppLayout = ({ children }) => {
  console.log(children);
  return (
    <>
      <LayoutHeader />
      <Container>{children}</Container>
    </>
  );
};

export default AppLayout;
