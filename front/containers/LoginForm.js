import React, { useState, useCallback, memo } from 'react';
import Link from 'next/link';
import { Form, Input, Button, Card, Checkbox } from 'antd';
import useForm from 'rc-form-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { faCaretSquareLeft } from '@fortawesome/free-regular-svg-icons';
import { useSelector, useDispatch } from 'react-redux';

import { LOG_IN_REQUEST } from '../reducers/user';

const LoginForm = memo(({ setLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoggingIn } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { getFieldDecorator, validateFields, errors, values } = useForm();
  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();
      validateFields()
        .then(
          dispatch({
            type: LOG_IN_REQUEST,
            data: {
              userId: values.email,
              password: values.password,
              remember: values.remember,
            },
          }),
        )
        .catch(e => console.error(e.message));

      // dispatch({
      //   type: LOG_IN_REQUEST,
      //   data: {
      //     userId: email,
      //     password,
      //   },
      // });
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
          {getFieldDecorator('email', {
            rules: [{ required: true, message: '이메일을 입력해주세요!' }],
          })(
            <Input
              prefix={<FontAwesomeIcon icon={faUser} color="rgba(0,0,0,.25)" />}
              placeholder="E-mail"
              value={email}
              onChange={onChangeId}
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '비밀번호를 입력해주세요!' }],
          })(
            <Input
              prefix={<FontAwesomeIcon icon={faLock} color="rgba(0,0,0,.25)" />}
              type="password"
              placeholder="Password"
              value={password}
              onChange={onChangePassword}
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: false,
          })(<Checkbox>로그인 유지</Checkbox>)}
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
          <Link href="/main">
            <a>
              <Button>다음페이지 테스트</Button>
            </a>
          </Link>
        </Form.Item>
      </Form>
    </Card>
  );
});

export default LoginForm;
