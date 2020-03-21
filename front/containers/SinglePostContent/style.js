import styled from 'styled-components';

export const Container = styled.div`
  margin-left: -12px;
  margin-right: 0;
  padding: 12px 16px;
  width: auto;
  position: relative;
  word-wrap: break-word;
  margin-top: -5px;
`;

export const Option = styled.div`
  background-image: linear-gradient(
    to right,
    rgba(var(--cdc, 255, 255, 255), 0.8),
    rgba(var(--cdc, 255, 255, 255), 1)
  );
  display: ${props => (props.hover ? 'flex' : 'none')};
  position: absolute;
  right: 12px;
  top: -4px;
  flex-direction: column;
  flex-shrink: 0;
  button {
    align-items: center;
    background: 0 0;
    border: 0;
    cursor: pointer;
    display: flex;
    justify-content: center;
    padding: 8px;
  }
`;
