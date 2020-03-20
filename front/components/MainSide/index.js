import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { SideProfile, SideFollow, SideFooter } from './style';
import UserImage from '../UserImage';
import FollowListLayout from '../FollowListLayout';

const MainSide = () => {
  const { me, suggestedList } = useSelector(state => state.user);

  return (
    <>
      <SideProfile>
        <div className="container">
          <div className="image">
            <UserImage image={me.Image} nickname={me.nickname} size={50} />
          </div>
          <div className="nickname">
            <Link
              href={{
                pathname: '/profile',
                query: { nickname: me.nickname },
              }}
              as={`/profile/${me.nickname}`}
            >
              <a>{me.nickname}</a>
            </Link>
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
                  {suggestedList.map((v, i) => (
                    <FollowListLayout key={i} value={v} />
                  ))}
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
