import styled from 'styled-components';

const MOBILE = 768;
const TABLET = 992;
const PC = 1200;

export const HomeLayout = styled.div`
  @media only screen and (min-width: ${MOBILE}px) {
  }

  @media only screen and (min-width: ${TABLET}px) {
  }

  @media only screen and (min-width: ${PC}px) {
    position: absolute;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    background: linear-gradient(90deg, #3498db 50%, #ffffff 50%);
    backgroundsize: cover;
  }
`;
