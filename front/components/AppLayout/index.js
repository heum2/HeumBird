import React from 'react';
import { Row, Col } from 'antd';

import LayoutHeader from '../AppLayoutHeader';
import { Container } from './style';

const AppLayout = ({ children }) => {
  return (
    <>
      <LayoutHeader />
      <Container>
        <Row
          gutter={16}
          type="flex"
          justify="center"
          style={{ padding: '60px 0px 0px' }}
        >
          {children}
        </Row>
        {/* <div className="layout"></div> */}
      </Container>
    </>
  );
};

export default AppLayout;
