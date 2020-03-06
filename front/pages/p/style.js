import styled from 'styled-components';

export const Container = styled.div`
  flex-grow: 1;
  margin: 0 auto;
  max-width: 935px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  @media (min-width: 736px) {
    justify-content: normal;
    padding: 0 20px 0;
    box-sizing: content-box;
    width: calc(100% - 40px);
  }
`;

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
    right: 60px;
    width: 335px;
    border-bottom: 1px solid rgba(var(--ce3, 239, 239, 239), 1);
    margin-right: 0px;
    position: absolute;
    top: 30px;
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
    font-size: 14px;
    font-weight: 600;
    line-height: 18px;
    text-overflow: ellipsis;
    white-space: nowrap;
    a,
    a:visited {
      text-decoration: none;
      color: #262626;
    }
  }

  .imageMargin {
    background-color: rgba(var(--b3f, 250, 250, 250), 1);
    justify-content: center;
    margin-right: 335px;
    min-height: 450px;
  }

  .rQdP3 {
    left: 0;
    position: relative;
    top: 0;
  }
`;
