import React, { useState, useCallback, memo } from 'react';
import Link from 'next/link';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';

import { LOG_IN_REQUEST } from '../reducers/user';

const LoginForm = memo(({ setLogin, setSignup }) => {
  const [email, setEmail] = useState('');
  const [emailValidate, setEmailValidate] = useState('');
  const [emailErrorReason, setEmailErrorReason] = useState('');
  const [password, setPassword] = useState('');
  const [passwordValidate, setPasswordValidate] = useState('');
  const [passwordErrorReason, setPasswordErrorReason] = useState('');
  const [remember, setRemember] = useState(false);
  const { isLoggingIn } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const onChangeEmail = useCallback(
    e => {
      setEmail(e.target.value);
      setEmailValidate('');
      setEmailErrorReason('');
    },
    [email],
  );

  const onChangePassword = useCallback(
    e => {
      setPassword(e.target.value);
      setPasswordValidate('');
      setPasswordErrorReason('');
    },
    [password],
  );

  const onChangeRemember = useCallback(
    e => {
      setRemember(e.target.checked);
    },
    [remember],
  );

  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();
      if (email === undefined || email === '') {
        setEmailValidate('error');
        setEmailErrorReason('이메일을 입력해주세요!');
      }

      if (password === undefined || password === '') {
        setPasswordValidate('error');
        setPasswordErrorReason('비밀번호를 입력해주세요!');
      }
      if (emailValidate !== 'error' && passwordValidate !== 'error') {
        dispatch({
          type: LOG_IN_REQUEST,
          data: {
            email,
            password,
            remember,
          },
        });
      }
    },
    [email, password],
  );

  const onBackButton = useCallback(() => {
    setLogin(false);
  }, []);

  const onSignupButton = useCallback(() => {
    setLogin(false);
    setSignup(true);
  }, []);

  return (
    <>
      <Row>
        <Col span={4} offset={9}>
          <img
            src="favicon.png"
            onClick={onBackButton}
            style={{ width: '100px', height: '100px', cursor: 'pointer' }}
          ></img>
        </Col>
      </Row>
      <Row>
        <Form onSubmit={onSubmitForm}>
          <Form.Item validateStatus={emailValidate} help={emailErrorReason}>
            <Input
              prefix={<FontAwesomeIcon icon={faUser} color="rgba(0,0,0,.25)" />}
              placeholder="E-mail"
              value={email}
              onChange={onChangeEmail}
            />
          </Form.Item>
          <Form.Item
            validateStatus={passwordValidate}
            help={passwordErrorReason}
          >
            <Input
              prefix={<FontAwesomeIcon icon={faLock} color="rgba(0,0,0,.25)" />}
              type="password"
              placeholder="Password"
              value={password}
              onChange={onChangePassword}
            />
          </Form.Item>
          <Form.Item>
            <Checkbox checked={remember} onChange={onChangeRemember}>
              로그인 유지
            </Checkbox>
            <Link href="">
              <a style={{ float: 'right' }}>비밀번호 찾기</a>
            </Link>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoggingIn}
              style={{ width: '100%' }}
            >
              로그인
            </Button>
            <Button
              type="link"
              onClick={onSignupButton}
              style={{ float: 'right' }}
            >
              회원가입
            </Button>
            <Link href="/main">
              <a>
                <Button>다음페이지 테스트</Button>
              </a>
            </Link>
          </Form.Item>
        </Form>
      </Row>
    </>
  );
});

export default LoginForm;
