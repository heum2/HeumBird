import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const LogoImg = styled.img`
  width: 50px;
  height: 50px;
`;

export const Header = styled.div`
  border-bottom: 1px solid lightgrey;
  padding: 16px 50px;

  @media only screen and (max-width: 767px) {
    padding: 16px 20px;
  }
`;

export const Sticky = styled.div`
  border-bottom: 1px solid lightgrey;
  position: fixed;
  top: 0;
  width: 100%;
`;

export const Luckiest = styled.h2`
  font-family: 'Luckiest Guy', cursive;
  color: #00ccff;
  margin: 0;
`;
