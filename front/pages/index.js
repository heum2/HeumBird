import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { Row, Col, Button } from 'antd';
import Link from 'next/link';

import { HomeLayout } from '../styled/home';
import HomeLoginForm from '../containers/HomeLoginForm';

const Home = () => {
  return (
    <HomeLayout>
      <Row style={{ marginTop: '10px' }}>
        <Col span={12} offset={15}>
          <HomeLoginForm />
        </Col>
      </Row>
      <Row gutter={8} type="flex" justify="space-around">
        <Col
          span={6}
          style={{ fontSize: 'x-large', color: 'white', marginTop: '300px' }}
        >
          <p>
            <FontAwesomeIcon icon={faSearch} /> <b>관심사를 팔로우 하세요.</b>
          </p>
          <p>
            <FontAwesomeIcon icon={faUserFriends} />{' '}
            <b>사람들이 이야기하고 있는 주제에 대해 알아보세요.</b>
          </p>
          <p>
            <FontAwesomeIcon icon={faComment} /> <b>대화에 참여하세요.</b>
          </p>
        </Col>
        <Col span={6} style={{ color: 'black', marginTop: '220px' }}>
          <img
            src="favicon.png"
            style={{ width: '80px', height: '80px' }}
          ></img>
          <p style={{ fontSize: 'xx-large' }}>
            <b>지금 세계 곳곳에서 무슨 일이 일어나고 있는지 확인하세요.</b>
          </p>
          <p style={{ fontSize: 'x-large' }}>
            <b>지금 흠버드에 가입하세요.</b>
          </p>
          <Link href="/signup">
            <a>
              <Button type="primary" shape="round" size="large" block>
                가입하기
              </Button>
            </a>
          </Link>
          <br />
          <br />
          <Link href="/login">
            <a>
              <Button shape="round" size="large" block>
                로그인
              </Button>
            </a>
          </Link>
        </Col>
      </Row>
    </HomeLayout>
  );
};

export default Home;
