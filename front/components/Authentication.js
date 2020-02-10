import React, { memo } from 'react';
import { Button } from 'antd';
import { LogoImg, StyledXxlP, StyledXlP } from '../styled/authentication';

const Authentication = memo(({ SignupButton, LoginButton }) => {
  return (
    <>
      <LogoImg src="favicon.png" />
      <StyledXxlP>
        지금 세계 곳곳에서 무슨 일이 일어나고 있는지 확인하세요.
      </StyledXxlP>
      <StyledXlP>지금 흠버드에 가입하세요.</StyledXlP>
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
});

export default Authentication;
