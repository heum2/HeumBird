import React, { useCallback, useState, memo } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import useForm from 'rc-form-hooks';
import { Form, Input, Row, Col, Button, Checkbox } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { faOdnoklassniki } from '@fortawesome/free-brands-svg-icons';

const SignUpForm = memo(({ setLogin, setSignup }) => {
  const [passwordError, setPasswordError] = useState(false);
  const [agreementError, setAgreementError] = useState(false);
  const { isSigningUp } = useSelector(state => state.user);

  const dispatch = useDispatch();

  const { getFieldDecorator, validateFields, getFieldValue } = useForm();

  const onPasswordCheckBlur = e => {
    const { value } = e.target;
    return setPasswordError(passwordError || !!value);
  };

  const validateToNextPassword = (rule, value, callback) => {
    // if(value.match());
    if (value && passwordError) {
      return validateFields(['passwordcheck'], { force: true }).catch(e =>
        console.error(e.message),
      );
    }
    return callback();
  };

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== getFieldValue('password')) {
      callback('입력한 비밀번호가 일치하지 않습니다!');
    } else {
      callback();
    }
  };

  const checkAgreement = (rule, value, callback) => {
    console.log('checkAgreement : ', value);
    if (!value) {
      callback('이용 약관을 동의하셔야 합니다!');
    } else {
      callback();
    }
  };

  const onBackButton = useCallback(() => {
    setSignup(false);
  }, []);

  const onSubmitForm = useCallback(e => {
    e.preventDefault();
  }, []);

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  };

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
              rules: [
                {
                  type: 'email',
                  message: '이메일 형식을 입력해주세요!',
                },
                {
                  required: true,
                  message: '이메일을 입력해주세요!',
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
                  required: true,
                  message: '비밀번호를 입력해주세요!',
                },
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
                  required: true,
                  message: '비밀번호 확인 칸을 입력해주세요!',
                },
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
                ],
              })(
                <Input
                  prefix={
                    <FontAwesomeIcon
                      icon={faMobileAlt}
                      color="rgba(0,0,0,.25)"
                    />
                  }
                  placeholder="휴대폰 번호"
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
            <Button type="primary" htmlType="submit" block>
              회원가입
            </Button>
          </Form.Item>
        </Form>
      </Row>
    </>
  );
});

export default SignUpForm;
