import styled from 'styled-components';

export const SideProfile = styled.div`
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

  .container {
    align-items: center;
    display: flex;
    flex-direction: row;
    height: 100%;
    margin-bottom: 12px;
    max-height: 50px;
    width: 100%;
    padding-left: 5px;
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
`;

export const SideFollow = styled.div`
  margin-top: 4px;
  margin-bottom: 12px;
  flex: 0 0 auto;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
  background-color: rgba(var(--cdc, 255, 255, 255), 1);
  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid rgba(var(--b6a, 219, 219, 219), 1);

  .header-layout {
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
  .header-container {
    flex: 1 1 auto;
    min-height: 0;
    min-width: 0;
    justify-content: flex-start;
    align-items: stretch;
    align-content: stretch;
    display: flex;
    position: relative;
  }
  .header-content {
    display: block;
    color: #999;
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    margin: -3px 0 -4px;
    position: relative;
  }

  .list-layout {
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

  .d-header-layout {
    padding-bottom: 4px;
    padding-top: 4px;
    padding-left: 16px;
    padding-right: 16px;
    margin-top: 12px;
    margin-bottom: 12px;
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
`;

export const FollowList = styled.div`
  width: 100%;
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
    flex: 1 1 auto;
    min-height: 0;
    min-width: 0;
    justify-content: center;
    align-items: stretch;
    align-content: stretch;
  }

  .sideFollowList {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: relative;
    margin: -3px 0 -4px;
    a,
    a:visited {
      text-decoration: none;
      color: #262626;
      font-weight: 600;
      font-size: 14px;
      line-height: 18px;
      margin: -3px 0 -4px;
    }
  }

  .followButtonContainer {
    margin-left: 8px;
    flex: 0 0 auto;
    justify-content: center;
    flex-direction: row;
    align-items: center;
  }
`;

export const Button = styled.button`
  color: #3897f0; //#262626
  border: 0;
  display: inline;
  padding: 0;
  position: relative;
  background-color: transparent;
  background: 0 0;
  box-sizing: border-box;
  cursor: pointer;
  font-weight: 600;
  text-align: center;
  text-transform: inherit;
  text-overflow: ellipsis;
  user-select: none;
  width: auto;
  font-size: 12px;
`;

export const SideFooter = styled.div`
  padding-top: 0;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;

  .content {
    text-transform: uppercase;
    color: #c7c7c7;
    font-size: 11px;
    font-weight: 400;
    line-height: 13px;
  }
`;
