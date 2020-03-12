import styled from 'styled-components';

export const Button = styled.button`
  border: 0;
  color: ${props => (props.follow ? '#3897f0' : '#262626')};
  display: inline;
  padding: 0;
  position: relative;
  background: 0 0;
  box-sizing: border-box;
  cursor: pointer;
  font-weight: 600;
  text-align: center;
  text-transform: inherit;
  text-overflow: ellipsis;
  user-select: none;
  width: auto;
  font-size: 14px;
  line-height: 18px;
  outline: none;
`;
