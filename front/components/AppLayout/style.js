import styled from 'styled-components';

export const Layout = styled.div`
  .header {
    border-bottom: 1px solid lightgrey;
    background-color: #ffffff;
    padding: 20px 10px;
  }
  .sticky {
    position: fixed;
    top: 0;
    width: 100%;
    padding: 0px 10px;
    z-index: 3;
  }
  .container {
    background: #fafafa;
    position: relative;
    width: 100%;
    height: 100%;
  }
`;
