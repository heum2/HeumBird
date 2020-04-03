import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-grow: 1;
  margin: 0 auto;
  max-width: 600px;
  width: 100%;
  flex-direction: column;
  position: relative;
  @media (min-width: 640px) {
    padding-top: 60px;
    padding-bottom: 60px;
  }
  @media (max-width: 735px) {
    margin-bottom: 30px;
  }
`;

export const Title = styled.div`
  padding-left: 12px;
  padding-right: 12px;
  margin-top: 16px;
  margin-bottom: 12px;
  flex: 0 0 auto;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
  width: 100%;
  display: flex;
  h4 {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    margin: -6px 0 -6px;
  }
`;

export const Content = styled.div`
  padding-bottom: 8px;
  padding-top: 8px;
  flex: 0 0 auto;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
  background-color: #fff;
  display: flex;
`;
