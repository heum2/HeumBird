import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './header';
import { Input, Button, message } from 'antd';
import { Aside, Form, Row, InputSide } from './style';
import {
  EDIT_USER_PASSWORD_REQUEST,
  EDIT_USER_PASSWORD_NULLURE,
} from '../../reducers/user';

const useInput = (initValue = null) => {
  const [value, setter] = useState(initValue);
  const handler = useCallback(e => {
    setter(e.target.value);
  }, []);
  return [value, handler];
};

const Password = () => {
  const [prePassword, handlePrePassword] = useInput('');
  const [newPassword, handleNewPassword] = useInput('');
  const [newConfirm, handleNewConfirm] = useInput('');
  const {
    isEditingPassword,
    passwordEditErrorReason,
    passwordEdited,
  } = useSelector(state => state.user);
  const passwordRegex = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
  const dispatch = useDispatch();

  useEffect(() => {
    if (passwordEdited) {
      message.success('비밀번호가 변경되었습니다!');
    }
  }, [passwordEdited]);

  useEffect(() => {
    if (passwordEditErrorReason) {
      message.error(passwordEditErrorReason);
    }
  }, [passwordEditErrorReason]);

  useEffect(() => {
    return () =>
      dispatch({
        type: EDIT_USER_PASSWORD_NULLURE,
      });
  }, []);

  const onDisabled = useCallback(() => {
    if (!prePassword || !newPassword || !newConfirm) {
      return true;
    }
    return false;
  }, [prePassword, newPassword, newConfirm]);

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      if (!newPassword.match(passwordRegex)) {
        return message.warning('영문, 숫자, 특수문자(!@#$%^&+=) (8~15자)');
      }
      if (newConfirm !== newPassword) {
        return message.warning('입력한 비밀번호가 일치하지 않습니다!');
      }
      dispatch({
        type: EDIT_USER_PASSWORD_REQUEST,
        data: {
          prePassword,
          newPassword,
        },
      });
    },
    [prePassword, newPassword, newConfirm],
  );

  return (
    <>
      <Header />
      <Form onSubmit={handleSubmit}>
        <Row>
          <Aside>
            <label htmlFor="prePasswordInput">이전 비밀번호</label>
          </Aside>
          <InputSide>
            <Input.Password
              value={prePassword}
              onChange={handlePrePassword}
              id="prePasswordInput"
            />
          </InputSide>
        </Row>
        <Row>
          <Aside>
            <label htmlFor="newPasswordInput">새 비밀번호</label>
          </Aside>
          <InputSide>
            <Input.Password
              value={newPassword}
              onChange={handleNewPassword}
              id="newPasswordInput"
            />
          </InputSide>
        </Row>
        <Row>
          <Aside>
            <label htmlFor="newConfirmInput">새 비밀번호 확인</label>
          </Aside>
          <InputSide>
            <Input.Password
              value={newConfirm}
              onChange={handleNewConfirm}
              id="newConfirmInput"
            />
          </InputSide>
        </Row>
        <Row>
          <Aside></Aside>
          <Button
            type="primary"
            htmlType="submit"
            loading={isEditingPassword}
            disabled={onDisabled()}
          >
            비밀번호 변경
          </Button>
        </Row>
      </Form>
    </>
  );
};

export default Password;
