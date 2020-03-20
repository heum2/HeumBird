import styled from 'styled-components';
import { Mentions } from 'antd';

export const CommentDiv = styled.div`
  margin: 5px 0px 0px;
  padding: 0px 16px;
  border-top: 1px solid rgba(var(--ce3, 239, 239, 239), 1);

  .mentions {
    border: none !important;
    background: transparent;
    resize: none;
    width: 100%;
    box-shadow: none;
  }
  mentions,
  .ant-mentions > textarea {
    height: auto;
    min-height: @input-height-base;
  }
`;
