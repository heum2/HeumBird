import React, { useCallback, useState } from 'react';
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
import { LogoImg, Header, Luckiest } from './style';

const AppLayoutHeader = () => {
  const [webName, setWebName] = useState('HeumBird');
  const [compass, setCompass] = useState(regularCompass);
  const [heart, setHeart] = useState(regularHeart);
  const [user, setUser] = useState(regularUser);
  const onSearchInput = useCallback(value => {
    console.log(value);
  }, []);

  return (
    <Header>
      <Row type="flex" justify="center" align="middle">
        <Col xs={12} sm={5} md={5} lg={4}>
          <Link href="/main">
            <a>
              <Luckiest>
                <LogoImg src="favicon.png" /> {webName}
              </Luckiest>
            </a>
          </Link>
        </Col>
        <Col xs={0} sm={4} md={4}>
          <Input.Search
            placeholder="검색"
            onSearch={onSearchInput}
          ></Input.Search>
        </Col>
        <Col xs={12} sm={{ offset: 1, span: 4 }} md={{ offset: 1, span: 4 }}>
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
    </Header>
  );
};

export default AppLayoutHeader;
