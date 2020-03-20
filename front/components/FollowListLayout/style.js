import styled from 'styled-components';

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

    button {
      font-size: 12px;
    }
  }
`;
