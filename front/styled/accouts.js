import styled from 'styled-components';

export const Main = styled.main`
  max-width: 935px;
  overflow: hidden;
  width: 100%;
  border: 1px solid rgba(var(--b6a, 219, 219, 219), 1);
  border-radius: 3px;
  background-color: rgba(var(--cdc, 255, 255, 255), 1);
  flex-direction: row;
  flex-grow: 1;
  justify-content: stretch;
  display: flex;
`;

export const Side = styled.ul`
  border-right: 1px solid #dbdbdb;
  flex-basis: 236px;
  flex-grow: 0;
  flex-shrink: 0;
  list-style: none;
  margin: 0;
  padding: 0;
  font: inherit;
  vertical-align: baseline;

  a {
    color: #262626;
    border-left: 2px solid transparent;
    display: block;
    font-size: 16px;
    height: 100%;
    line-height: 20px;
    padding: 16px 16px 16px 30px;
    cursor: pointer;
  }

  a:hover {
    border-left-color: #b2b2b2;
    color: #262626;
    background: #e2e2e2;
  }

  a:active {
    border-left-color: #e2e2e2;
    color: #e2e2e2;
    background: #ffffff;
  }

  .HRM,
  .HRM :hover,
  .HRM :active {
    border-left-color: #262626;
    background: #ffffff;
    color: #262626;
    font-weight: 600;
  }
`;

export const Article = styled.article`
  flex: 1 1 400px;
  min-width: 50px;
`;
