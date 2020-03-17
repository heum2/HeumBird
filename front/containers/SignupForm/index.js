import React, { useCallback, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Row, Col, Button, Checkbox } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { faOdnoklassniki } from '@fortawesome/free-brands-svg-icons';
import {
  DUPLICATE_USER_REQUEST,
  SIGN_UP_REQUEST,
  EMAIL_INPUT_FAILURE,
  EMAIL_REGEX_FAILURE,
  NICKNAME_INPUT_FAILURE,
  NICKNAME_REGEX_FAILURE,
  DUPLICATE_NICK_REQUEST,
} from '../../reducers/user';

const SignUpForm = memo(({ setLogin, setSignup }) => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
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

  const {
    isSigningUp,
    emailValidate,
    emailErrorReason,
    nickValidate,
    nickErrorReason,
  } = useSelector(state => state.user);

  const emailRegex = /^[A-Za-z0-9]([-_.]?[0-9a-zA-Z])+@[A-Za-z0-9]([-_.]?[0-9a-zA-Z])+\.[A-Za-z]{2,3}$/i;
  const nickRegex = /^\S[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{1,20}$/;
  const passwordRegex = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
  const phoneNumberRegex = /^[01]{3}[\d]{3,4}[\d]{4}$/;
  const dispatch = useDispatch();

  const onChangeEmail = useCallback(
    e => {
      const { value } = e.target;
      setEmail(value);
      if (value === undefined || value === '') {
        dispatch({
          type: EMAIL_INPUT_FAILURE,
        });
      } else if (!value.match(emailRegex)) {
        dispatch({
          type: EMAIL_REGEX_FAILURE,
        });
      } else {
        dispatch({
          type: DUPLICATE_USER_REQUEST,
          data: { email: value },
        });
      }
    },
    [email],
  );

  const onChangeNickname = useCallback(
    e => {
      const { value } = e.target;
      setNickname(value);
      if (value === undefined || value === '') {
        dispatch({
          type: NICKNAME_INPUT_FAILURE,
        });
      } else if (!value.match(nickRegex)) {
        dispatch({
          type: NICKNAME_REGEX_FAILURE,
        });
      } else {
        dispatch({
          type: DUPLICATE_NICK_REQUEST,
          data: { nickname: value },
        });
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
      } else if (confirm !== '') {
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
      nickValidate === 'success' &&
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
    nickValidate,
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
            src="/favicon.png"
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
            />
          </Form.Item>
          <Form.Item
            hasFeedback
            validateStatus={nickValidate}
            help={nickErrorReason}
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
