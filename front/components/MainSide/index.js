import React from 'react';
import { Avatar } from 'antd';
import { useSelector } from 'react-redux';
import { SideProfile, SideFollow, FollowList, Button } from './style';

const MainSide = () => {
  const { me, followerList } = useSelector(state => state.user);

  return (
    <>
      <SideProfile>
        <div className="container">
          <div className="image">
            <Avatar
              size={50}
              src="https://cdn.pixabay.com/photo/2020/02/07/14/15/landscape-4827278__340.jpg"
            />
          </div>
          <div className="nickname">
            <a>{me.nickname}</a>
          </div>
        </div>
      </SideProfile>
      <SideFollow>
        <div className="header-layout">
          <div className="header-container">
            <div className="header-content">회원님을 위한 추천</div>
          </div>
          <a>모두 보기</a>
        </div>
        <div className="list-container">
          <div
            style={{
              height: 'auto',
              overflow: 'hidden auto',
              width: '100%',
            }}
          >
            <div
              style={{
                flexDirection: 'column',
                paddingBottom: '0px',
                paddingTop: '0px',
              }}
            >
              <FollowList>
                <div className="imageContainer">
                  <div className="sideProfileImage">
                    <Avatar
                      size={32}
                      src="https://cdn.pixabay.com/photo/2020/02/07/14/15/landscape-4827278__340.jpg"
                    />
                  </div>
                </div>
                <div className="followListContent">
                  <div className="sideFollowList">
                    <a>{me.nickname}</a>
                  </div>
                </div>
                <div className="followButtonContainer">
                  <Button>팔로우</Button>
                </div>
              </FollowList>
            </div>
          </div>
        </div>
      </SideFollow>
    </>
  );
};

export default MainSide;
