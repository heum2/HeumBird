import styled from 'styled-components';
export const Content = styled.div`
  display: flex;
  flex-grow: 1;
  margin: 0 auto 30px;
  @media (min-width: 736px) {
    padding-top: 30px;
    box-sizing: content-box;
    max-width: 935px;
    padding: 40px 20px 0;
    width: calc(100% - 40px);
  }
`;
