import React from 'react';
import Link from 'next/link';
import { Avatar } from 'antd';
import { useSelector } from 'react-redux';
import {
  SideProfile,
  SideFollow,
  FollowList,
  Button,
  SideFooter,
} from './style';

const MainSide = () => {
  const { me, suggestedList } = useSelector(state => state.user);

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
        {suggestedList.length !== 0 ? (
          <>
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
                    {/* 팔로우 추천 개수 만큼 반복해야함. */}
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
          </>
        ) : (
          <div className="d-header-layout">
            <div className="header-container">
              <div className="header-content">팔로우를 시작해 볼까요?</div>
            </div>
            <Link href="/explore">
              <a>탐색 하기</a>
            </Link>
          </div>
        )}
      </SideFollow>
      <SideFooter>
        <div className="content">@ 2020 HEUMBIRD FROM HEUMHEUM2</div>
      </SideFooter>
    </>
  );
};

export default MainSide;
