import React, { useCallback, useState, memo } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import useForm from 'rc-form-hooks';
import { Form, Input, Row, Col, Button, Checkbox } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { faOdnoklassniki } from '@fortawesome/free-brands-svg-icons';
import { DUPLICATE_USER_REQUEST } from '../../reducers/user';

const SignUpForm = memo(({ setLogin, setSignup }) => {
  const [passwordError, setPasswordError] = useState(false);
  const [agreementError, setAgreementError] = useState(false);
  const { isSigningUp, isDuplicateUser } = useSelector(state => state.user);
  const passwordRegex = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
  const phoneRegex = /^[01]{3}[\d]{3,4}[\d]{4}$/;
  const dispatch = useDispatch();

  const {
    getFieldDecorator,
    validateFields,
    getFieldValue,
    setFieldsValue,
  } = useForm();

  const validateEmail = (rule, value, callback) => {
    dispatch({
      type: DUPLICATE_USER_REQUEST,
      data: value,
    });

    if (value === undefined || value === '') {
      return callback('이메일을 입력해주세요!');
    } else if (isDuplicateUser) {
      return callback('이미 등록되어 있는 이메일입니다!');
    }
    return callback();
  };

  const onPasswordCheckBlur = e => {
    const { value } = e.target;
    return setPasswordError(passwordError || !!value);
  };

  const validateToNextPassword = (rule, value, callback) => {
    if (value === undefined || value === '') {
      return callback('비밀번호를 입력해주세요!');
    }
    if (!value.match(passwordRegex)) {
      return callback('영문, 숫자, 특수문자(!@#$%^&+=) (8~15자)');
    }
    if (value && passwordError) {
      return validateFields(['passwordcheck'], { force: true }).catch(e =>
        console.error(e.message),
      );
    }
    return callback();
  };

  const compareToFirstPassword = (rule, value, callback) => {
    if (value === undefined || value === '') {
      return callback('비밀번호 확인 칸을 입력해주세요!');
    }
    if (value && value !== getFieldValue('password')) {
      return callback('입력한 비밀번호가 일치하지 않습니다!');
    }
    return callback();
  };

  const checkAgreement = (rule, value, callback) => {
    if (!value) {
      return callback('이용 약관을 동의하셔야 합니다!');
    }
    return callback();
  };

  const validatePhoneNumber = (rule, value, callback) => {
    if (value && !value.match(phoneRegex)) {
      return callback('(-) 을 제외하고 입력해주세요!');
    }
    return callback();
  };

  const onLoginButton = useCallback(() => {
    setSignup(false);
    setLogin(true);
  }, []);

  const onBackButton = useCallback(() => {
    setSignup(false);
  }, []);

  const onChangePhone = useCallback(e => {
    const { value } = e.target;
    setFieldsValue({
      phone: `${value.replace(/[^\d]/g, '')}`,
    });
  }, []);

  const onSubmitForm = useCallback(e => {
    e.preventDefault();
    validateFields(
      ['email', 'nickname', 'password', 'passwordcheck', 'phone'],
      {
        force: true,
      },
    ).catch(e => console.error(e.message));
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
            {!isDuplicateUser &&
              getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: '이메일 형식을 입력해주세요!',
                  },
                  {
                    validator: validateEmail,
                  },
                ],
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
            {getFieldDecorator('nickname', {
              rules: [
                {
                  required: true,
                  message: '닉네임을 입력해주세요!',
                  whitespace: true,
                },
              ],
            })(
              <Input
                prefix={
                  <FontAwesomeIcon
                    icon={faOdnoklassniki}
                    color="rgba(0,0,0,.25)"
                  />
                }
                placeholder="닉네임"
              />,
            )}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  validator: validateToNextPassword,
                },
              ],
            })(
              <Input.Password
                prefix={
                  <FontAwesomeIcon icon={faLock} color="rgba(0,0,0,.25)" />
                }
                placeholder="비밀번호"
              />,
            )}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator('passwordcheck', {
              rules: [
                {
                  validator: compareToFirstPassword,
                },
              ],
            })(
              <Input.Password
                prefix={
                  <FontAwesomeIcon icon={faLock} color="rgba(0,0,0,.25)" />
                }
                placeholder="비밀번호 확인"
                onBlur={onPasswordCheckBlur}
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Form.Item>
              {getFieldDecorator('phone', {
                rules: [
                  { required: true, message: '휴대폰 번호를 입력해주세요!' },
                  { validator: validatePhoneNumber },
                ],
              })(
                <Input
                  prefix={
                    <FontAwesomeIcon
                      icon={faMobileAlt}
                      color="rgba(0,0,0,.25)"
                    />
                  }
                  maxLength={11}
                  placeholder="휴대폰 번호"
                  onChange={onChangePhone}
                />,
              )}
            </Form.Item>
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
              rules: [
                {
                  validator: checkAgreement,
                },
              ],
            })(
              <Checkbox>
                <Link href="">
                  <a>이용 약관 보기</a>
                </Link>
              </Checkbox>,
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isSigningUp}
              block
            >
              회원가입
            </Button>
            <Button
              type="link"
              onClick={onLoginButton}
              style={{ float: 'right' }}
            >
              로그인
            </Button>
          </Form.Item>
        </Form>
      </Row>
    </>
  );
});

export default SignUpForm;
