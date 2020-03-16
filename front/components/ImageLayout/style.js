import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  position: relative;
  flex-grow: 1;
  flex-direction: column;
  margin: 0 auto 30px;
  @media (min-width: 736px) {
    box-sizing: content-box;
    max-width: 935px;
    padding: 0px 20px 0;
    width: calc(100% - 40px);
  }

  .title {
    color: #999;
    font-size: 14px;
    font-weight: 600;
    line-height: 18px;
    margin-bottom: 16px;
    text-align: left;
    display: block;
  }
`;

export const Container = styled.div`
  @media (min-width: 736px) {
    margin: 0 -28px 0 0;
  }
  margin-right: -2px;
  display: flex;
  align-items: stretch;
  border: 0 solid #000;
  box-sizing: border-box;
  flex-direction: column;
  flex-shrink: 0;
  padding: 0;
  position: relative;
`;
