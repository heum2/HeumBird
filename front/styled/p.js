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
    padding: 4vh 20px 0;
    box-sizing: content-box;
    width: calc(100% - 40px);
  }
`;

export const ContentCol = styled.div`
  margin-left: -12px;
  margin-right: 0;
  padding: 12px 16px;
  width: auto;
  position: relative;
  word-wrap: break-word;
  margin-top: -5px;
`;

export const CommentCol = styled.div`
  display: inline-block;
  flex-shrink: 1;
  min-width: 0;
`;

export const ImageDiv = styled.div`
  padding-top: 6vh;

  .IwRsH {
    margin-bottom: 20px;
    flex: 0 0 auto;
    justify-content: flex-start;
    align-items: stretch;
    align-content: stretch;
    display: flex;
  }
  .xLCgt {
    color: #999;
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    margin: -3px 0 -4px;
    position: relative;
  }
`;
