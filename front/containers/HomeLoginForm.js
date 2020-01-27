import React, { useState, useCallback, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';

const LoginForm = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [idError, setIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();
    },
    [id, password],
  );

  const onChangeId = useCallback(e => {
    setId(e.target.value);
  }, []);

  const onChangePassword = useCallback(e => {
    setPassword(e.target.value);
  }, []);

  return (
    <>
      <Form layout="inline" onSubmit={onSubmitForm}>
        <Form.Item validateStatus={idError ? 'error' : ''} help={idError || ''}>
          <Input
            prefix={<FontAwesomeIcon icon={faUser} color="rgba(0,0,0,.25)" />}
            placeholder="id"
            value={id}
            onChange={onChangeId}
            required
          />
        </Form.Item>
        <Form.Item
          validateStatus={passwordError ? 'error' : ''}
          help={passwordError || ''}
        >
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
          <Button
            htmlType="submit"
            shape="round"
            size="large"
            disabled={false}
            loading={isLoggingIn}
          >
            로그인
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;
