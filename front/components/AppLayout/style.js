import styled from 'styled-components';

export const Layout = styled.div`
  height: 100%;
  .sticky {
    border-bottom: 1px solid lightgrey;
    background-color: #ffffff;
    padding: 0px 10px;
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 99;
    transition: 0.3s;
  }
`;

export const Container = styled.div`
  background: #fafafa;
  margin-top: 50px;
  position: relative;
  width: 100%;
  flex-grow: 1;
  order: 4;
  display: flex;
`;
