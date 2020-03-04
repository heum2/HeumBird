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

export const ContentLayout = styled.div`
  flex-grow: 1;
  margin: 0 auto;
  position: relative;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  max-width: 935px;

  @media (min-width: 640px) {
    padding-top: 30px;
  }
`;
