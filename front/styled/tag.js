import styled from 'styled-components';

export const Main = styled.main`
  background-color: #fafafa;
  flex-grow: 1;
  order: 4;

  header {
    color: #262626;
    text-align: center;
  }

  h1 {
    font-size: 4rem;
    color: #999;
  }

  @media (min-width: 736px) {
    header {
      margin: 2.5rem auto 3rem;
      align-items: center;
      display: flex;
      flex-direction: row;
      line-height: 24px;
      max-width: 935px;
      width: 100%;
    }
  }
`;
