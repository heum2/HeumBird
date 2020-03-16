import styled from 'styled-components';

export const Footer = styled.footer`
  order: 5;
  padding: 0 20px;
  background-color: #fafafa;
  flex-direction: column;
  display: flex;
  position: relative;
  div {
    max-width: 1012px;
    @media (min-width: 876px) {
      padding: 38px 0;
      justify-content: space-between;
      flex-wrap: wrap;
      flex-direction: row;
      font-size: 12px;
      font-weight: 600;
      margin: 0 auto;
      text-transform: uppercase;
      width: 100%;
      position: relative;
      flex-shrink: 0;
    }
  }
  span {
    color: #999;
  }
`;
