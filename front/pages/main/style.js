import styled from 'styled-components';

export const PostContainer = styled.div`
  float: left;
  margin-right: 28px;
  max-width: 614px;
  width: 100%;
`;

export const SideContainer = styled.div`
  display: flex;
  position: fixed;
  height: 100vh;
  margin-bottom: 30px;
  padding: 0;
  max-width: 293px;
  width: 100%;
  top: 80px;
  float: left;
  margin-left: 642px;
  flex-direction: column;

  @media (max-width: 1000px) {
    display: none;
  }

  .sideProfileLayout {
    align-items: center;
    display: flex;
    flex-direction: row;
    height: 62px;
    justify-content: space-between;
    flex-shrink: 0;
    margin: 0;
    padding: 0;
    position: relative;
    border: 0 solid #000;
  }

  .sideProfileContainer {
    align-items: center;
    display: flex;
    flex-direction: row;
    height: 100%;
    margin-bottom: 12px;
    max-height: 50px;
    width: 100%;
    padding-left: 5px;
  }

  .sideProfileImage {
    cursor: pointer;
    align-self: center;
    display: block;
    flex: none;
  }

  .sideProfileNick {
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

  .sideFollowLayout {
    margin-top: 4px;
    margin-bottom: 12px;
    flex: 0 0 auto;
    justify-content: flex-start;
    align-items: stretch;
    align-content: stretch;
    background-color: rgba(var(--cdc,255,255,255),1);
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid rgba(var(--b6a,219,219,219),1);
  }

  .sideFollowHeaderContainer {
    padding-bottom: 4px;
    padding-top: 4px;
    padding-left: 16px;
    padding-right: 16px;
    margin-top: 12px;
    flex: 0 0 auto;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
    align-content: stretch;
    box-sizing: border-box;
    display: flex;
    position: relative;
    a,
    a:visited {
      text-decoration: none;
      color: #262626;
      font-weight: 600;
      font-size: 12px;
    line-height: 14px;
    margin: -2px 0 -3px;
    }
  }

  .sideFollowHeader {
    flex: 1 1 auto;
    min-height: 0;
    min-width: 0;
    justify-content: flex-start;
    align-items: stretch;
    align-content: stretch;
    display: flex;
    position: relative;
    border: 0 solid #000;
    box-sizing: border-box;
  }
  .sideFollowContent {
    display: block;
    color: #999;
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    margin: -3px 0 -4px;
    position: relative;
  }
  .sideFollowListContainer {
    display: flex;
    margin-left: 4px;
    margin-bottom: 4px;
    flex: 0 0 auto
    justify-content: flex-start;
    align-items: stretch;
    align-content: stretch;
    position: relative;
    padding-bottom: 8px;
    padding-top: 8px;
    background-color: #fff;
  }
}
`;

export const FollowList = styled.div`
  padding-bottom: 8px;
  padding-top: 8px;
  padding-left: 16px;
  padding-right: 16px;
  flex: 0 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  align-content: stretch;

  .imageContainer {
    margin-right: 12px;
    flex: 0 0 auto;
    justify-content: flex-start;
    align-items: stretch;
  }

  .followListContent {
    display: block;
    flex: 1 1 auto;
    min-height: 0;
    min-width: 0;
    justify-content: center;
    align-items: stretch;
  }

  .sideFollowList {
    flex: 0 0 auto;
    align-items: stretch;
  }

  .followButtonContainer {
    margin-left: 8px;
    flex: 0 0 auto;
    justify-content: center;
    flex-direction: row;
    align-items: center;
  }
`;
