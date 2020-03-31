import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Button, message } from 'antd';
import { Aside, Form, Row, InputSide } from './style';
import Header from './header';
import { EDIT_USER_REQUEST, EDIT_USER_NULLURE } from '../../reducers/user';

const useInput = (initValue = null) => {
  const [value, setter] = useState(initValue);
  const handler = useCallback(e => {
    setter(e.target.value);
  }, []);
  return [value, handler];
};

const Edit = () => {
  const { me, isEditingInfo, infoEdited, infoEditErrorReason } = useSelector(
    state => state.user,
  );
  const [email, handleChangeEmail] = useInput(me.email);
  const [nickname, handleChangeNickname] = useInput(me.nickname);
  const [phoneNumber, setPhoneNumber] = useState(me.phonenumber);
  const [introduce, handleChangeIntroduce] = useInput(me.introduce);
  const emailRegex = /^[A-Za-z0-9]([-_.]?[0-9a-zA-Z])+@[A-Za-z0-9]([-_.]?[0-9a-zA-Z])+\.[A-Za-z]{2,3}$/i;
  const nickRegex = /^\S[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{1,20}$/;
  const phoneNumberRegex = /^[01]{3}[\d]{3,4}[\d]{4}$/;
  const dispatch = useDispatch();

  useEffect(() => {
    if (infoEdited) {
      message.success('변경 되었습니다!');
    }
  }, [infoEdited]);

  useEffect(() => {
    if (infoEditErrorReason) {
      message.error(infoEditErrorReason);
    }
  }, [infoEditErrorReason]);

  useEffect(() => {
    return () =>
      dispatch({
        type: EDIT_USER_NULLURE,
      });
  }, []);

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      if (!email.match(emailRegex)) {
        return message.warning('이메일 형식으로 입력해주세요!');
      }
      if (!nickname.match(nickRegex)) {
        return message.warning('2~20글자로 입력해주세요!');
      }
      if (!phoneNumber.match(phoneNumberRegex)) {
        return message.warning('휴대폰번호를 확인해주세요!');
      }
      dispatch({
        type: EDIT_USER_REQUEST,
        data: {
          email,
          nickname,
          phonenumber: phoneNumber,
          introduce,
        },
      });
    },
    [email, nickname, phoneNumber, introduce],
  );

  const handleChangePhoneNumber = useCallback(
    e => {
      const { value } = e.target;
      setPhoneNumber(value.replace(/[^\d]/g, ''));
    },
    [phoneNumber],
  );

  const onDisabled = useCallback(() => {
    if (
      (!email || email === me.email) &&
      (!nickname || nickname === me.nickname) &&
      (!phoneNumber || phoneNumber === me.phonenumber) &&
      introduce === me.introduce
    ) {
      return true;
    }
    return false;
  }, [email, nickname, phoneNumber, introduce]);

  return (
    <>
      <Header />
      <Form onSubmit={handleSubmit}>
        <Row>
          <Aside>
            <label htmlFor="emailInput">이메일</label>
          </Aside>
          <InputSide>
            <Input value={email} onChange={handleChangeEmail} id="emailInput" />
          </InputSide>
        </Row>
        <Row>
          <Aside>
            <label htmlFor="nicknameInput">닉네임</label>
          </Aside>
          <InputSide>
            <Input
              value={nickname}
              onChange={handleChangeNickname}
              id="nicknameInput"
              maxLength={16}
            />
          </InputSide>
        </Row>
        <Row>
          <Aside>
            <label htmlFor="introduceTextArea">소개</label>
          </Aside>
          <InputSide>
            <Input.TextArea
              value={introduce}
              onChange={handleChangeIntroduce}
              id="introduceTextArea"
            />
          </InputSide>
        </Row>
        <Row>
          <Aside>
            <label htmlFor="phoneNumberInput">전화번호</label>
          </Aside>
          <InputSide>
            <Input
              value={phoneNumber}
              onChange={handleChangePhoneNumber}
              id="phoneNumberInput"
              maxLength={11}
            />
          </InputSide>
        </Row>
        <Row>
          <Aside></Aside>
          <Button
            type="primary"
            htmlType="submit"
            loading={isEditingInfo}
            disabled={onDisabled()}
          >
            제출
          </Button>
        </Row>
      </Form>
    </>
  );
};

export default Edit;
