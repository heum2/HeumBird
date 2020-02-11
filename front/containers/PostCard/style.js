import styled from 'styled-components';

export const Card = styled.div`
  background: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: auto;

  :hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  .coment {
    padding: 0px 16px;
  }

  .cover {
    width: 100%;
  }

  .title {
    padding: 16px;
    & h4 {
      margin-top: 4px;
    }
  }

  .comentForm {
    margin: 4px 0px 0px;
    padding: 0px 16px;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
  }
`;
