import styled from 'styled-components';

export const Card = styled.div`
  background: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: auto;
  margin: 0px -1px 60px;
  clear: both;

  :hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  .coment {
    padding: 0px 16px;
  }

  .title {
    padding: 16px;
    & h4 {
      margin-top: 4px;
    }
  }
`;
