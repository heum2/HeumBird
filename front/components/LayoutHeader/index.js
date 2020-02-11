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

const LayoutHeader = () => {
  const [webName, setWebName] = useState('HeumBird');
  const [compass, setCompass] = useState(regularCompass);
  const [heart, setHeart] = useState(regularHeart);
  const [user, setUser] = useState(regularUser);
  const onSearchInput = useCallback(value => {
    console.log(value);
  }, []);

  return (
    <Header>
      <Row type="flex" justify="space-around" align="middle">
        <Col
          xs={{ span: 15 }}
          sm={{ span: 7 }}
          md={{ span: 6 }}
          xl={{ span: 4 }}
        >
          <Luckiest>
            <LogoImg src="favicon.png" /> {webName}
          </Luckiest>
        </Col>
        <Col xs={{ span: 0 }} sm={{ span: 4 }}>
          <Input.Search
            placeholder="검색"
            onSearch={onSearchInput}
          ></Input.Search>
        </Col>
        <Col sm={{ offset: 1 }}>
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

export default LayoutHeader;
