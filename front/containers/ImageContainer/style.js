import styled from 'styled-components';

export const ImgContainer = styled.div`
  display: block;
  float: left;
  margin: 2px 2px 0 0;
  width: calc(33.3333% - 2px);

  img {
    display: block;
  }

  ul {
    padding-inline-start: 0px;
  }

  @media (min-width: 736px) {
    width: calc(33.3333% - 28px);
    margin: 0 28px 28px 0;
  }

  .QzzMf {
    width: 100%;
    flex: 0 0 auto;
    justify-content: flex-start;
    align-items: stretch;
    align-content: stretch;
    display: block;
    position: relative;
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
  .BcNgP {
    -webkit-box-align: end;
    align-items: flex-end;
    bottom: 0;
    display: flex;
    -webkit-box-pack: start;
    justify-content: flex-start;
    left: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    flex-direction: column;
    @media (min-width: 736px) {
      margin: 15px 15px 0 0;
    }
  }

  .edmGd {
    filter: drop-shadow(0 0 0.75px rgba(0, 0, 0, 0.42))
      drop-shadow(0 1px 0.5px rgba(0, 0, 0, 0.18))
      drop-shadow(0 2px 3px rgba(0, 0, 0, 0.2));
    display: block;
    position: relative;
    fill: rgb(255, 255, 255);
    height: 28;
    width: 28;
    pointer-events: none;
    -webkit-box-direction: normal;
  }

  .hoverContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    color: #fff;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .hoverContainer li {
    display: inline-block;
    font-size: 1.2rem;
    font-weight: 600;
  }

  .item-likes {
    margin-right: 2.2rem;
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
  filter: ${props => (props.hover ? 'brightness(0.8)' : '')};
`;
