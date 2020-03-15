import React, { useEffect, useCallback, useState } from 'react';
import Router from 'next/router';
import { Avatar, Row } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { Body } from './style';
import { LOAD_USER_POSTS_REQUEST } from '../../reducers/post';
import {
  LOAD_USER_REQUEST,
  LOG_OUT_REQUEST,
  UPLOAD_USER_IMAGE_REQUEST,
  REMOVE_USER_IMAGE_REQUEST,
} from '../../reducers/user';
import FollowButton from '../../containers/FollowButton';
import ImageContainer from '../../containers/ImageContainer';
import PostLoader from '../../components/PostLoader';
import ProfileOption from '../../components/ProfileOption';

const ProfileImage = ({ info }) => {
  if (info.Image) {
    return (
      <img
        style={{ objectFit: 'cover' }}
        src={`http://localhost:3060/${info.Image.src}`}
        alt={info.Image}
      />
    );
  }
  return (
    <Avatar size={150} style={{ fontSize: '7rem' }}>
      {info.nickname[0]}
    </Avatar>
  );
};

const Profile = ({ nickname }) => {
  const [imageModal, setImageModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const { mainPosts, hasMorePost } = useSelector(state => state.post);
  const { userInfo, me, isImageUploading } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const countRef = [];

  useEffect(() => {
    if (!me) {
      Router.push('/');
    }
  }, [me]);

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

  useEffect(() => {
    if (!isImageUploading) {
      setImageModal(false);
    }
  }, [isImageUploading]);

  const showImageModal = useCallback(() => {
    setImageModal(true);
  }, []);

  const hideImageModal = useCallback(() => {
    setImageModal(false);
  }, []);

  const showLogoutModal = useCallback(() => {
    setLogoutModal(true);
  }, []);

  const hideLogoutModal = useCallback(() => {
    setLogoutModal(false);
  }, []);

  const onInputImage = useCallback(e => {
    const imageFormData = new FormData();
    imageFormData.append('image', e.target.files[0]);
    dispatch({
      type: UPLOAD_USER_IMAGE_REQUEST,
      data: imageFormData,
    });
  }, []);

  const onRemoveImage = useCallback(e => {
    dispatch({
      type: REMOVE_USER_IMAGE_REQUEST,
    });
  }, []);

  const onLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, [me]);

  if (userInfo === null) {
    return null;
  }

  return (
    <Body>
      {me && (
        <>
          <header>
            <div className="container">
              <div className="profile">
                <div className="profile-image">
                  {me.id === userInfo.id ? (
                    <button
                      className="btn"
                      title="프로필 사진 바꾸기"
                      onClick={showImageModal}
                    >
                      <ProfileImage info={userInfo} />
                    </button>
                  ) : (
                    <ProfileImage info={userInfo} />
                  )}
                </div>
                <ProfileOption
                  title={true}
                  visible={imageModal}
                  invisible={hideImageModal}
                >
                  <label className="modalbutton -ColorBlue">
                    <input
                      type="file"
                      style={{ display: 'none' }}
                      onChange={onInputImage}
                    />
                    <span>사진 업로드</span>
                  </label>
                  {userInfo.Image && (
                    <button
                      className="modalbutton -ColorRed"
                      onClick={onRemoveImage}
                    >
                      현재 사진 삭제
                    </button>
                  )}
                </ProfileOption>
                <div className="profile-user-settings">
                  <h3 className="profile-user-name">{nickname}</h3>
                  {me.id === userInfo.id ? (
                    <>
                      <button className="btn profile-edit-btn">
                        프로필 편집
                      </button>

                      <button
                        className="btn profile-settings-btn"
                        aria-label="profile settings"
                        onClick={showLogoutModal}
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
                <ProfileOption
                  visible={logoutModal}
                  invisible={hideLogoutModal}
                >
                  <button className="modalbutton" onClick={onLogout}>
                    로그아웃
                  </button>
                </ProfileOption>
                <div className="profile-stats">
                  <ul>
                    <li>
                      게시물{' '}
                      <span className="profile-stat-count">
                        {userInfo.Posts}
                      </span>
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
                    <span className="profile-real-name"></span>
                    소개글이 없습니다.
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
              {hasMorePost && <PostLoader />}
            </div>
          </main>
        </>
      )}
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
