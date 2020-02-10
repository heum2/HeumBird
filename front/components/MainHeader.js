import React, { useCallback, useState } from 'react';
import { LogoImg, Header, Luckiest } from '../styled/header';
import { Row, Col, Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons';

const MainHeader = () => {
  const onSearchInput = useCallback(value => {
    console.log(value);
  }, []);

  return (
    <>
      <Header>
        <Row type="flex" justify="space-around" align="middle">
          <Col md={{ offset: 3, span: 4 }}>
            <Luckiest>
              <LogoImg src="favicon.png" /> HeumBird
            </Luckiest>
          </Col>
          <Col md={{ span: 4 }}>
            <Input.Search
              placeholder="검색"
              onSearch={onSearchInput}
            ></Input.Search>
          </Col>
          <Col md={{ span: 2 }}>
            <FontAwesomeIcon
              icon={faHeart}
              size={'lg'}
              onClick={() => {
                console.log('hi');
              }}
            />
          </Col>
          <Col md={{ span: 2, pull: 3 }}>
            <FontAwesomeIcon icon={faUser} size={'lg'} />
          </Col>
        </Row>
      </Header>
    </>
  );
};

export default MainHeader;
