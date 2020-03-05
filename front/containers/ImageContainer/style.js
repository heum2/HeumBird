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
    // font-size: 16px;
    // font-weight: 600;
    // top: 45%;
    // left: 45%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    position: absolute;
    z-index: 2;
    backgroud-color: rgba(0, 0, 0, 0.3);
  }

  .hoverUl {
    align-item: center;
    color: #fff;
    display: flex;
    font-size: 16px;
    font-weight: 600;
    justify-content: center;
    list-style: none;
  }

  .hoverLi {
    display: inline-flex;
    flex-direction: row-reverse;
    margin-right: 30px;
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
