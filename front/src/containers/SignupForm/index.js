import React, { useCallback, useState, memo } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Row, Col, Button, Checkbox } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { faOdnoklassniki } from '@fortawesome/free-brands-svg-icons';
import { DUPLICATE_USER_REQUEST, SIGN_UP_REQUEST } from '../../reducers/user';

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
  const [term, setTerm] = useState(false);
  const [policy, setPolicy] = useState(false);

  const { isSigningUp, isDuplicateUser } = useSelector(state => state.user);

  const emailRegex = /^[A-Za-z0-9]([-_.]?[0-9a-zA-Z])+@[A-Za-z0-9]([-_.]?[0-9a-zA-Z])+\.[A-Za-z]{2,3}$/i;
  const passwordRegex = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
  const phoneNumberRegex = /^[01]{3}[\d]{3,4}[\d]{4}$/;
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
      if (confirm && confirm !== value) {
        setConfirmValidate('error');
        setConfirmErrorReason('입력한 비밀번호가 일치하지 않습니다!');
      } else {
        setConfirmValidate('success');
        setConfirmErrorReason('');
      }
    },
    [password, confirm],
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

  const onChangePhoneNumber = useCallback(
    e => {
      const { value } = e.target;
      setPhoneNumber(value.replace(/[^\d]/g, ''));
      if (value === undefined || value === '') {
        setPhoneNumberValidate('error');
        setPhoneNumberErrorReason('휴대폰 번호를 입력해주세요!');
      } else if (!value.match(phoneNumberRegex)) {
        setPhoneNumberValidate('error');
        setPhoneNumberErrorReason(
          '휴대폰 양식으로 입력해주세요! (01011112222)',
        );
      } else {
        setPhoneNumberValidate('success');
        setPhoneNumberErrorReason('');
      }
    },
    [phoneNumber],
  );

  const onChangeTerm = useCallback(
    e => {
      setTerm(e.target.checked);
    },
    [term],
  );

  const onChangePolicy = useCallback(
    e => {
      setPolicy(e.target.checked);
    },
    [policy],
  );

  const onLoginButton = useCallback(() => {
    setSignup(false);
    setLogin(true);
  }, []);

  const onBackButton = useCallback(() => {
    setSignup(false);
  }, []);

  const onDisabled = useCallback(() => {
    if (
      emailValidate === 'success' &&
      nicknameValidate === 'success' &&
      confirmValidate === 'success' &&
      phoneNumberValidate === 'success' &&
      term &&
      policy
    ) {
      return false;
    }
    return true;
  }, [
    emailValidate,
    nicknameValidate,
    confirmValidate,
    phoneNumberValidate,
    term,
    policy,
  ]);

  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();
      dispatch({
        type: SIGN_UP_REQUEST,
        data: {
          email,
          nickname,
          password,
          phoneNumber,
        },
      });
    },
    [email, nickname, password, phoneNumber],
  );

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
            <Input.Password
              prefix={<FontAwesomeIcon icon={faLock} color="rgba(0,0,0,.25)" />}
              placeholder="비밀번호 확인"
              value={confirm}
              onChange={onChangeConfirm}
            />
          </Form.Item>
          <Form.Item
            hasFeedback
            validateStatus={phoneNumberValidate}
            help={phoneNumberErrorReason}
          >
            <Input
              prefix={
                <FontAwesomeIcon icon={faMobileAlt} color="rgba(0,0,0,.25)" />
              }
              maxLength={11}
              placeholder="휴대폰 번호"
              value={phoneNumber}
              onChange={onChangePhoneNumber}
            />
          </Form.Item>
          <Form.Item>
            <Checkbox checked={term} onChange={onChangeTerm}>
              이용약관보기
            </Checkbox>
            <Checkbox checked={policy} onChange={onChangePolicy}>
              개인정보처리방침
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isSigningUp}
              disabled={onDisabled()}
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
