import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Button } from 'antd';
import { Aside, Form, Row, InputSide } from './style';
import Header from './header';

const useInput = (initValue = null) => {
  const [value, setter] = useState(initValue);
  const handler = useCallback(e => {
    setter(e.target.value);
  }, []);
  return [value, handler];
};

const Edit = () => {
  const { me, isEditingInfo } = useSelector(state => state.user);
  const [email, handleChangeEmail] = useInput(me.email);
  const [nickname, handleChangeNickname] = useInput(me.nickname);
  const [phoneNumber, handleChangePhoneNumber] = useInput(me.phonenumber);
  const [introduce, handleChangeIntroduce] = useInput(me.introduce);
  const dispatch = useDispatch();
  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      // dispatch({
      //   type: SIGN_UP_REQUEST,
      //   data: {
      //     email,
      //     nickname,
      //     phoneNumber,
      //     introduce
      //   },
      // });
    },
    [email, nickname, phoneNumber, introduce],
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
