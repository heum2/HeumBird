import styled from 'styled-components';

export const Layout = styled.div`
  flex-grow: 1;
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
  }
`;

export const Container = styled.div`
  margin-right: -2px;
  @media (min-width: 736px) {
    margin: 0 -28px 0 0;
  }
`;
