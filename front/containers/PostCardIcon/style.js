import styled from 'styled-components';
import { Row, Col } from 'antd';

export const IconRow = styled(Row)`
  margin: 4px 0px 0px;
  padding: 0px 16px;

  .col {
    display: inline-block;
    margin-left: -8px;
  }
`;

export const Button = styled.button`
  border: 0;
  align-items: center;
  background: 0 0;
  cursor: pointer;
  outline: none;
  padding: 8px;
`;
