import React, { useCallback, useState, memo } from 'react';
import Link from 'next/link';
import { Row, Col, Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCompass as regularCompass,
  faHeart as regularHeart,
  faUser as regularUser,
} from '@fortawesome/free-regular-svg-icons';
import {
  faCompass as solidCompass,
  faHeart as solidHeart,
  faUser as solidUser,
} from '@fortawesome/free-solid-svg-icons';
import { LogoImg, Luckiest } from './style';

const AppLayoutHeader = memo(() => {
  const [compass, setCompass] = useState(regularCompass);
  const [heart, setHeart] = useState(regularHeart);
  const [user, setUser] = useState(regularUser);
  const onSearchInput = useCallback(value => {
    console.log(value);
  }, []);

  return (
    <Row type="flex" justify="center" align="middle">
      <Col xs={13} sm={13} md={6} lg={4}>
        <Link href="/main">
          <a>
            <Luckiest>
              <LogoImg src="favicon.png" /> HeumBrid
            </Luckiest>
          </a>
        </Link>
      </Col>
      <Col xs={0} sm={0} md={{ offset: 1, span: 4 }} xl={{ offset: 0 }}>
        <Input.Search
          placeholder="검색"
          onSearch={onSearchInput}
        ></Input.Search>
      </Col>
      <Col xs={11} sm={{ offset: 0, span: 11 }} md={{ offset: 1, span: 5 }}>
        <Link href="/explore">
          <a>
            <FontAwesomeIcon
              icon={compass}
              style={{ height: '24', width: '24' }}
            />
          </a>
        </Link>
        &emsp;&emsp;
        <FontAwesomeIcon
          icon={heart}
          style={{ height: '24', width: '24' }}
          onClick={() => {
            console.log('hi');
          }}
        />
        &emsp;&emsp;
        <FontAwesomeIcon
          icon={user}
          style={{ height: '24', width: '24' }}
          onClick={() => {
            console.log('hi');
          }}
        />
      </Col>
    </Row>
  );
});

export default AppLayoutHeader;
