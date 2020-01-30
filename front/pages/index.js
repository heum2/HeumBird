import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { Row, Col } from 'antd';

import Authentication from '../components/Authentication';
import SignUpForm from '../containers/SignUpForm';
import LoginForm from '../containers/LoginForm';

import { HomeLayout } from '../styled/home';

const Home = () => {
  const [signup, setSignup] = useState(false);
  const [login, setLogin] = useState(false);

  const SignupButton = useCallback(() => {
    setSignup(true);
  }, [signup]);

  const LoginButton = useCallback(() => {
    setLogin(true);
  }, [login]);

  let button = (
    <Authentication SignupButton={SignupButton} LoginButton={LoginButton} />
  );
  if (signup) {
    button = <SignUpForm setSignup={setSignup} />;
  } else if (login) {
    button = <LoginForm setLogin={setLogin} />;
  }

  return (
    <HomeLayout>
      <Row gutter={8} type="flex" justify="space-around">
        <Col
          span={6}
          style={{ fontSize: 'x-large', color: 'white', marginTop: '310px' }}
        >
          <p>
            <FontAwesomeIcon icon={faSearch} /> <b>관심사를 팔로우 하세요.</b>
          </p>
          <p>
            <FontAwesomeIcon icon={faUserFriends} />{' '}
            <b>사람들이 이야기하고 있는 주제에 대해 알아보세요.</b>
          </p>
          <p>
            <FontAwesomeIcon icon={faComment} />
            <b>대화에 참여하세요.</b>
          </p>
        </Col>
        <Col span={6} style={{ color: 'black', marginTop: '230px' }}>
          {button}
        </Col>
      </Row>
    </HomeLayout>
  );
};

export default Home;
