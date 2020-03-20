import styled from 'styled-components';

export const ModalContent = styled.div`
  align-items: stretch;
  border: 0 solid;
  border-sizing: border-box;
  flex-direction: column;
  flex-shrink: 0;
  margin: 0;
  justify-content: center;
  display: flex;
  position: relative;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
  }

  .ant-modal-content {
    min-height: 200px;
    max-height: 400px;
  }

  .modalbutton {
    background-color: transparent;
    border-bottom: 0;
    border-left: 0;
    border-right: 0;
    cursor: pointer;
    line-height: 2.8;
    margin: 0;
    min-height: 48px;
    padding: 4px 8px;
    text-align: center;
    user-select: none;
    vertical-align: middle;
    outline: none;
    color: inherit;
  }
  .modalbutton:active {
    background-color: lightgray;
    border-top: 0;
  }

  :only-child .modalbutton:first-child {
    border-top: none;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  .modalbutton:last-of-type {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .-ColorRed {
    color: rgba(var(--g2b, 237, 73, 86), 1);
    font-weight: 700;
  }

  .-ColorBlue {
    color: rgba(var(--h5f, 56, 151, 240), 1);
    font-weight: 700;
  }
`;
