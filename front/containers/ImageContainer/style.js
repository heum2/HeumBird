import styled from 'styled-components';

export const ImgContainer = styled.div`
  display: block;
  float: left;
  margin: 2px 2px 0 0;
  width: calc(33.3333% - 2px);
  @media (min-width: 736px) {
    width: calc(33.3333% - 28px);
    margin: 0 28px 28px 0;
  }

  .imgbackgroud {
    background-color: rgba(var(--c90, 239, 239, 239), 1);
    display: block;
    width: 100%;
  }
  .KL4Bh {
    display: block;
    overflow: hidden;
    padding-bottom: 100%;
  }
  ._9AhH0 {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
`;

export const Image = styled.img`
  object-fit: cover;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  user-select: none;
  width: 100%;
`;
