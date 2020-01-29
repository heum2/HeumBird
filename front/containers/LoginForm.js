import React, { useState, useCallback, memo } from 'react';
import { Form, Input, Button, Card, Checkbox } from 'antd';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLock,
  faUser,
  faStepBackward,
} from '@fortawesome/free-solid-svg-icons';
import { faCaretSquareLeft } from '@fortawesome/free-regular-svg-icons';
import { useSelector, useDispatch } from 'react-redux';

import { LOG_IN_REQUEST } from '../reducers/user';

const LoginForm = memo(({ setLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoggingIn } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();
      dispatch({
        type: LOG_IN_REQUEST,
        data: {
          userId: email,
          password,
        },
      });
    },
    [email, password],
  );

  const onChangeId = useCallback(e => {
    setEmail(e.target.value);
  }, []);

  const onChangePassword = useCallback(e => {
    setPassword(e.target.value);
  }, []);

  const onBackButton = useCallback(() => {
    setLogin(false);
  }, []);

  return (
    <Card
      title="로그인"
      extra={
        <FontAwesomeIcon
          icon={faCaretSquareLeft}
          size="2x"
          onClick={onBackButton}
          style={{ cursor: 'pointer' }}
        />
      }
    >
      <Form onSubmit={onSubmitForm}>
        <Form.Item>
          <Input
            prefix={<FontAwesomeIcon icon={faUser} color="rgba(0,0,0,.25)" />}
            placeholder="E-mail"
            value={email}
            onChange={onChangeId}
            required
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<FontAwesomeIcon icon={faLock} color="rgba(0,0,0,.25)" />}
            type="password"
            placeholder="Password"
            value={password}
            onChange={onChangePassword}
            required
          />
        </Form.Item>
        <Form.Item>
          <Checkbox>로그인 유지</Checkbox>
          <Link href="">
            <a style={{ float: 'right' }}>비밀번호 찾기</a>
          </Link>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={false}
            loading={isLoggingIn}
            style={{ width: '100%' }}
          >
            로그인
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
});

export default LoginForm;
