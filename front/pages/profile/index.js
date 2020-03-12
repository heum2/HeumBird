import React, { useEffect, useCallback, useState } from 'react';
import { Avatar, Row } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { Body } from './style';
import { LOAD_USER_POSTS_REQUEST } from '../../reducers/post';
import { LOAD_USER_REQUEST } from '../../reducers/user';
import FollowButton from '../../containers/FollowButton';
import ImageContainer from '../../containers/ImageContainer';

const ProfileImage = ({ info }) => {
  if (info.Image !== null) {
    return <img src={info.Image} alt={info.Image} />;
  }
  return (
    <Avatar size={150} style={{ fontSize: '7rem' }}>
      {info.nickname[0]}
    </Avatar>
  );
};

const Profile = ({ nickname }) => {
  const { mainPosts, hasMorePost } = useSelector(state => state.post);
  const { userInfo, me } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const countRef = [];

  const onScroll = useCallback(() => {
    if (
      window.scrollY + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 300
    ) {
      if (mainPosts.length && hasMorePost) {
        const lastId = mainPosts[mainPosts.length - 1].id;
        if (!countRef.includes(lastId)) {
          dispatch({
            type: LOAD_USER_POSTS_REQUEST,
            data: nickname,
            lastId,
          });
          countRef.push(lastId);
        }
      }
    }
  }, [hasMorePost, mainPosts.length]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts.length]);

  if (userInfo === null) {
    return null;
  }

  return (
    <Body>
      <header>
        <div className="container">
          <div className="profile">
            <div className="profile-image">
              {me.id === userInfo.id ? (
                <button className="btn" title="프로필 사진 바꾸기">
                  <ProfileImage info={userInfo} />
                </button>
              ) : (
                <ProfileImage info={userInfo} />
              )}
            </div>

            <div className="profile-user-settings">
              <h3 className="profile-user-name">{nickname}</h3>
              {me.id === userInfo.id ? (
                <>
                  <button className="btn profile-edit-btn">프로필 편집</button>

                  <button
                    className="btn profile-settings-btn"
                    aria-label="profile settings"
                  >
                    <FontAwesomeIcon icon={faCog} />
                  </button>
                </>
              ) : (
                <span className="profile-follow-btn">
                  <FollowButton userId={userInfo.id} />
                </span>
              )}
            </div>
            <div className="profile-stats">
              <ul>
                <li>
                  게시물{' '}
                  <span className="profile-stat-count">{userInfo.Posts}</span>
                </li>
                <li className="li-pointer">
                  팔로워{' '}
                  <span className="profile-stat-count">
                    {userInfo.Followers}
                  </span>
                </li>
                <li className="li-pointer">
                  팔로우{' '}
                  <span className="profile-stat-count">
                    {userInfo.Followings}
                  </span>
                </li>
              </ul>
            </div>
            <div className="profile-bio">
              <p>
                <span className="profile-real-name">Jane Doe</span>
              </p>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="container">
          <Row>
            {mainPosts.length !== 0 &&
              mainPosts.map((value, index) => {
                return (
                  <ImageContainer
                    key={index}
                    post={value}
                    location={value.User.nickname}
                  />
                );
              })}
          </Row>
          {hasMorePost && <div className="loader"></div>}
        </div>
      </main>
    </Body>
  );
};

Profile.getInitialProps = async context => {
  const nickname = context.query.nickname;
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
    data: nickname,
  });
  context.store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    data: nickname,
  });
  return { nickname };
};

export default Profile;
