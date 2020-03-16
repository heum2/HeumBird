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

  .nickname {
    a,
    a:visited {
      text-decoration: none;
      color: #262626;
    }
  }

  .bY2yH {
    span {
      display: inline;
      color: #262626;
      margin-left: 4px;
      margin-right: 4px;
    }
  }

  .title {
    padding: 16px;
    & h4 {
      margin-top: 4px;
    }
  }

  .headerCol {
    top: 0;
    bottom: 0;
    right: 4px;
    justify-content: center;
    position: absolute;
  }

  .slick-dots li.slick-active button:before {
    opacity: 1;
    color: #00ccff;
  }
`;

export const Button = styled.button`
  alignitems: center;
  background: 0 0;
  border: 0;
  outline: none;
  cursor: pointer;
  display: flex;
  justifycontent: center;
  padding: 8px;
`;
