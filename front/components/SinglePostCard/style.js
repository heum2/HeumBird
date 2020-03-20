import styled from 'styled-components';

export const PostContainer = styled.div`
  max-width: 816px;
  display: flex;
  flex-direction: column;
  @media (min-width: 736px) {
    align-items: center;
    margin: 0 auto;
    width: 100%;
  }

  .ltEkP {
    width: 100%;
    padding: 0;
    display: flex;
    flex-direction: column;
    position: relative;
    @media (min-width: 736px) {
      background-color: rgba(var(--cdc, 255, 255, 255), 1);
      border: 1px solid rgba(var(--b6a, 219, 219, 219), 1);
      border-bottom-right-radius: 3px;
      border-top-right-radius: 3px;
    }
  }

  .Ppjfr {
    border-left: 1px solid rgba(var(--ce3, 239, 239, 239), 1);
    height: 72px;
    padding: 16px;
    right: 0;
    width: 335px;
    border-bottom: 1px solid rgba(var(--ce3, 239, 239, 239), 1);
    margin-right: 0px;
    position: absolute;
    align-items: center;
    flex-direction: row;
    display: flex;
  }

  .image {
    cursor: pointer;
    align-self: center;
    display: block;
    flex: none;
  }

  .nickname {
    display: flex;
    flex-direction: column;
    flex-shrink: 1;
    -webkit-box-pack: center;
    justify-content: center;
    margin-left: 14px;
    overflow: hidden;
    line-height: 18px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .bY2yH {
    flex-direction: row;
    align-items: baseline;

    span {
      display: inline;
      color: #262626;
      margin-left: 4px;
      margin-right: 4px;
    }
  }

  .imageMargin {
    background-color: rgba(var(--b3f, 250, 250, 250), 1);
    justify-content: center;
    margin-right: 335px;
    // min-height: 450px;
  }

  .rQdP3 {
    left: 0;
    position: relative;
    top: 0;
  }

  .slick-dots {
    position: absolute;
    bottom: 15px;
  }

  .slick-dots li button:before {
    color: #fff;
    opacity: 0.25;
  }

  .slick-dots li.slick-active button:before {
    opacity: 1;
    color: #fff;
  }
`;

export const Comment = styled.div`
  border-left: 1px solid rgba(var(--ce3, 239, 239, 239), 1);
  top: 72px;
  padding: 0;
  bottom: 0;
  box-sizing: border-box;
  position: absolute;
  right: 0px;
  width: 335px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
  margin: 0;
  align-items: stretch;

  .EtaWk {
    padding: 0;
    margin: 0 0 auto;
    order: 1;
    overflow-x: hidden;
    flex-grow: 1;
    flex-shrink: 1;
    min-height: 0;
    overflow: auto;
    display: flex;
    position: relative;
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
      display: none;
    }
  }

  .ltpMr {
    order: 2;
    border-top: 1px solid rgba(var(--ce3, 239, 239, 239), 1);
  }

  .k_Q0X {
    order: 3;
  }

  .sH9wk {
    order: 4;
  }

  .XQXOT {
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
      display: none;
    }
    box-sizing: content-box;
    flex-grow: 1;
    height: calc(100% - 32px);
    overflow-y: scroll;
    left: 0;
    padding: 16px 12px;
    width: calc(100% - 8px);
    list-style: none;
    display: flex;
  }
`;

export const CotentComment = styled.div`
  padding: 0;
  margin: 0 0 auto;
  order: 1;
  overflow-x: hidden;
  flex-grow: 1;
  flex-shrink: 1;
  min-height: 0;
  overflow: auto;
  display: flex;
  position: relative;
  flex-direction: column;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }

  .ZyFrc {
    padding: 16px 12px;
    height: calc(100% - 32px);
    left: 0;
    width: calc(100% - 8px);
    position: absolute;
    box-sizing: content-box;
  }

  .gElp9 {
    padding-bottom: 16px;
    margin-right: 0;
    padding: 12px 16px;
    width: auto;
    overflow: hidden;
    position: relative;
    word-wrap: break-word;
    margin-top: -5px;
    display: list-item;
    text-align: -webkit-match-parent;
  }
`;
