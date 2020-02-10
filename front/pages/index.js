import React, { useState, useCallback, useEffect } from 'react';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { Row, Col } from 'antd';

import Authentication from '../components/Authentication';
import SignUpForm from '../containers/SignupForm';
import LoginForm from '../containers/LoginForm';
import Loading from '../components/Loading';

import { HomeLayout } from '../styled/home';

const Home = () => {
  const [signup, setSignup] = useState(false);
  const [login, setLogin] = useState(false);
  const { me } = useSelector(state => state.user);

  useEffect(() => {
    if (me) {
      Router.push('/main');
    }
  }, [me && me.id]);

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
    button = <SignUpForm setLogin={setLogin} setSignup={setSignup} />;
  } else if (login) {
    button = <LoginForm setLogin={setLogin} setSignup={setSignup} />;
  }

  return (
    <>
      {me ? (
        <Loading />
      ) : (
        <HomeLayout>
          <Row
            gutter={8}
            type="flex"
            justify="space-around"
            align="middle"
            style={{ height: '100%' }}
          >
            <Col
              xs={{ span: 0 }}
              md={{ span: 8 }}
              style={{ fontSize: 'x-large', color: 'white' }}
            >
              <p>
                <FontAwesomeIcon icon={faSearch} />
                <b> 관심사를 팔로우 하세요.</b>
              </p>
              <p>
                <FontAwesomeIcon icon={faUserFriends} />
                <b> 사람들이 이야기하고 있는 주제에 대해 알아보세요.</b>
              </p>
              <p>
                <FontAwesomeIcon icon={faComment} />
                <b> 대화에 참여하세요.</b>
              </p>
            </Col>

            <Col
              xs={{ span: 20 }}
              md={{ span: 8 }}
              span={8}
              style={{
                color: 'black',
              }}
            >
              {button}
            </Col>
          </Row>
        </HomeLayout>
      )}
    </>
  );
};

export default Home;
