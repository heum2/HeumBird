import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './header';
import { Input, Button } from 'antd';
import { Aside, Form, Row, InputSide } from './style';

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
  const { isEditingPassword } = useSelector(state => state.user);

  const onDisabled = useCallback(() => {
    if (!prePassword || !newPassword || !newConfirm) {
      return true;
    }
    return false;
  }, [prePassword, newPassword, newConfirm]);

  return (
    <>
      <Header />
      <Form>
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
