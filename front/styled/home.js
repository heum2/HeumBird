import styled from 'styled-components';

export const HomeLayout = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #3498db 50%, #ffffff 50%);
  backgroundsize: cover;
  @media only screen and (max-width: 768px) {
    background: white;
  }
`;
