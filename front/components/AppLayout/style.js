import styled from 'styled-components';

export const Layout = styled.div`
  .header {
    border-bottom: 1px solid lightgrey;
    background-color: #ffffff;
    padding: 0px 10px;
    width: 100%;
  }
  .sticky {
    position: fixed;
    top: 0;
    width: 100%;
    padding: 0px 10px;
    transition: 0.3s;
    z-index: 99;
  }

  .container {
    background: #fafafa;
    position: relative;
    width: 100%;
    height: 100%;
    flex-grow: 1;
    order: 4;
  }
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
