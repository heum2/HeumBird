import React from 'react';
import { Button } from 'antd';

const Authentication = ({ SignupButton, LoginButton }) => {
  return (
    <>
      <img src="favicon.png" style={{ width: '80px', height: '80px' }}></img>
      <p style={{ fontSize: 'xx-large' }}>
        <b>지금 세계 곳곳에서 무슨 일이 일어나고 있는지 확인하세요.</b>
      </p>
      <p style={{ fontSize: 'x-large' }}>
        <b>지금 흠버드에 가입하세요.</b>
      </p>
      <Button
        type="primary"
        shape="round"
        size="large"
        block
        onClick={SignupButton}
      >
        가입하기
      </Button>
      <br />
      <br />
      <Button shape="round" size="large" block onClick={LoginButton}>
        로그인
      </Button>
    </>
  );
};

export default Authentication;
