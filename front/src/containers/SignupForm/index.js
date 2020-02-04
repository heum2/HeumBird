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
  const [email, setEmail] = useState('');
  const [emailValidate, setEmailValidate] = useState('');
  const [emailErrorReason, setEmailErrorReason] = useState('');
  const [nickname, setNickname] = useState('');
  const [nicknameValidate, setNicknameValidate] = useState('');
  const [nicknameErrorReason, setNicknameErrorReason] = useState('');
  const [password, setPassword] = useState('');
  const [passwordValidate, setPasswordValidate] = useState('');
  const [passwordErrorReason, setPasswordErrorReason] = useState('');
  const [confirm, setConfirm] = useState('');
  const [confirmValidate, setConfirmValidate] = useState('');
  const [confirmErrorReason, setConfirmErrorReason] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberValidate, setPhoneNumberValidate] = useState('');
  const [phoneNumberErrorReason, setPhoneNumberErrorReason] = useState('');
  const [agreement, setAgreement] = useState(false);
  const [agreementValidate, setAgreementValidate] = useState('');
  const [agreementErrorReason, setAgreementErrorReason] = useState('');

  const { isSigningUp, isDuplicateUser } = useSelector(state => state.user);

  const emailRegex = /^[A-Za-z0-9]([-_.]?[0-9a-zA-Z])+@[A-Za-z0-9]([-_.]?[0-9a-zA-Z])+\.[A-Za-z]{2,3}$/i;
  const passwordRegex = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
  const phoneRegex = /^[01]{3}[\d]{3,4}[\d]{4}$/;
  const dispatch = useDispatch();

  const onChangeEmail = useCallback(
    e => {
      const { value } = e.target;
      setEmail(value);
      if (value === undefined || value === '') {
        setEmailValidate('error');
        setEmailErrorReason('이메일을 입력해주세요!');
      } else if (!value.match(emailRegex)) {
        setEmailValidate('error');
        setEmailErrorReason('이메일 형식으로 입력해주세요!');
      } else {
        dispatch({
          type: DUPLICATE_USER_REQUEST,
          data: value,
        });
        setEmailValidate('validating');
        setEmailErrorReason('');
      }
    },
    [email],
  );

  const onBlurEmail = useCallback(
    e => {
      console.log('onBlurEmail isDuplicateUser : ', isDuplicateUser);
      if (isDuplicateUser && isDuplicateUser === true) {
        setEmailValidate('error');
        setEmailErrorReason('이미 등록된 이메일입니다!');
      } else if (isDuplicateUser === false && emailValidate === 'validating') {
        setEmailValidate('success');
      }
    },
    [emailValidate, isDuplicateUser],
  );

  const onChangeNickname = useCallback(
    e => {
      const { value } = e.target;
      setNickname(value);
      if (
        value === undefined ||
        value === '' ||
        value.substring(0, 1) === ' '
      ) {
        setNicknameValidate('error');
        setNicknameErrorReason('닉네임을 입력해주세요!');
      } else {
        setNicknameValidate('success');
        setNicknameErrorReason('');
      }
    },
    [nickname],
  );

  const onChangePassword = useCallback(
    e => {
      const { value } = e.target;
      setPassword(value);
      if (value === undefined || value === '') {
        setPasswordValidate('error');
        setPasswordErrorReason('비밀번호를 입력해주세요!');
      } else if (!value.match(passwordRegex)) {
        setPasswordValidate('error');
        setPasswordErrorReason('영문, 숫자, 특수문자(!@#$%^&+=) (8~15자)');
      } else {
        setPasswordValidate('success');
        setPasswordErrorReason('');
      }
    },
    [password],
  );

  const onChangeConfirm = useCallback(
    e => {
      const { value } = e.target;
      setConfirm(value);
      if (value === undefined || value === '') {
        setConfirmValidate('error');
        setConfirmErrorReason('비밀번호 확인란을 입력해주세요!');
      } else if (value !== password) {
        setConfirmValidate('error');
        setConfirmErrorReason('입력한 비밀번호가 일치하지 않습니다!');
      } else {
        setConfirmValidate('success');
        setConfirmErrorReason('');
      }
    },
    [confirm, password],
  );

  const onBlurConfirm = useCallback(
    e => {
      const { value } = e.target;
      console.log('confirm onblur : ', value);
      if (value && value !== password) {
        setConfirmValidate('error');
        setConfirmErrorReason('입력한 비밀번호가 일치하지 않습니다!');
      }
    },
    [password],
  );

  // const onPasswordCheckBlur = e => {
  //   const { value } = e.target;
  //   return setPasswordError(passwordError || !!value);
  // };

  // const validateToNextPassword = (rule, value, callback) => {
  //   if (value === undefined || value === '') {
  //     return callback('비밀번호를 입력해주세요!');
  //   }
  //   if (!value.match(passwordRegex)) {
  //     return callback('영문, 숫자, 특수문자(!@#$%^&+=) (8~15자)');
  //   }
  //   if (value && passwordError) {
  //     return validateFields(['passwordcheck'], { force: true }).catch(e =>
  //       console.error(e.message),
  //     );
  //   }
  //   return callback();
  // };

  // const compareToFirstPassword = (rule, value, callback) => {
  //   if (value === undefined || value === '') {
  //     return callback('비밀번호 확인 칸을 입력해주세요!');
  //   }
  //   if (value && value !== getFieldValue('password')) {
  //     return callback('입력한 비밀번호가 일치하지 않습니다!');
  //   }
  //   return callback();
  // };

  // const checkAgreement = (rule, value, callback) => {
  //   if (!value) {
  //     return callback('이용 약관을 동의하셔야 합니다!');
  //   }
  //   return callback();
  // };

  // const validatePhoneNumber = (rule, value, callback) => {
  //   if (value && !value.match(phoneRegex)) {
  //     return callback('(-) 을 제외하고 입력해주세요!');
  //   }
  //   return callback();
  // };

  const onLoginButton = useCallback(() => {
    setSignup(false);
    setLogin(true);
  }, []);

  const onBackButton = useCallback(() => {
    setSignup(false);
  }, []);

  // const onChangePhone = useCallback(e => {
  //   const { value } = e.target;
  //   setFieldsValue({
  //     phone: `${value.replace(/[^\d]/g, '')}`,
  //   });
  // }, []);

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
          <Form.Item
            hasFeedback
            validateStatus={emailValidate}
            help={emailErrorReason}
          >
            <Input
              prefix={<FontAwesomeIcon icon={faUser} color="rgba(0,0,0,.25)" />}
              placeholder="E-mail"
              value={email}
              onChange={onChangeEmail}
              onBlur={onBlurEmail}
            />
          </Form.Item>
          <Form.Item
            hasFeedback
            validateStatus={nicknameValidate}
            help={nicknameErrorReason}
          >
            <Input
              prefix={
                <FontAwesomeIcon
                  icon={faOdnoklassniki}
                  color="rgba(0,0,0,.25)"
                />
              }
              placeholder="닉네임"
              maxLength={16}
              value={nickname}
              onChange={onChangeNickname}
            />
          </Form.Item>
          <Form.Item
            hasFeedback
            validateStatus={passwordValidate}
            help={passwordErrorReason}
          >
            {/* {getFieldDecorator('password', {
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
            )} */}
            <Input.Password
              prefix={<FontAwesomeIcon icon={faLock} color="rgba(0,0,0,.25)" />}
              placeholder="비밀번호"
              value={password}
              onChange={onChangePassword}
            />
          </Form.Item>
          <Form.Item
            hasFeedback
            validateStatus={confirmValidate}
            help={confirmErrorReason}
          >
            {/* {getFieldDecorator('passwordcheck', {
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
            )} */}
            <Input.Password
              prefix={<FontAwesomeIcon icon={faLock} color="rgba(0,0,0,.25)" />}
              placeholder="비밀번호 확인"
              value={confirm}
              onChange={onChangeConfirm}
              onBlur={onBlurConfirm}
            />
          </Form.Item>
          <Form.Item>
            {/* {getFieldDecorator('phone', {
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
              )} */}
            <Input
              prefix={
                <FontAwesomeIcon icon={faMobileAlt} color="rgba(0,0,0,.25)" />
              }
              maxLength={11}
              placeholder="휴대폰 번호"
              // onChange={onChangePhone}
            />
          </Form.Item>
          <Form.Item>
            {/* {getFieldDecorator('agreement', {
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
            )} */}
            <Checkbox>
              <Link href="">
                <a>이용 약관 보기</a>
              </Link>
            </Checkbox>
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
