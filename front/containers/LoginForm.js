import React, { useState, useCallback, memo } from 'react';
import Link from 'next/link';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import useForm from 'rc-form-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';

import { LOG_IN_REQUEST } from '../reducers/user';

const LoginForm = memo(({ setLogin, setSignup }) => {
  const { isLoggingIn } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { getFieldDecorator, validateFields, getFieldValue } = useForm();

  const onSubmitForm = useCallback(e => {
    e.preventDefault();
    validateFields()
      .then(
        dispatch({
          type: LOG_IN_REQUEST,
          data: {
            userId: getFieldValue('email'),
            password: getFieldValue('password'),
            remember: getFieldValue('remember'),
          },
        }),
      )
      .catch(e => console.error(e.message));
  }, []);

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
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: '이메일을 입력해주세요!' }],
            })(
              <Input
                prefix={
                  <FontAwesomeIcon icon={faUser} color="rgba(0,0,0,.25)" />
                }
                placeholder="E-mail"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '비밀번호를 입력해주세요!' }],
            })(
              <Input
                prefix={
                  <FontAwesomeIcon icon={faLock} color="rgba(0,0,0,.25)" />
                }
                type="password"
                placeholder="Password"
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
