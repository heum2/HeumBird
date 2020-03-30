import React, { useState, useEffect, useCallback } from 'react';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { LOG_OUT_REQUEST } from '../../reducers/user';
import FollowButton from '../FollowButton';
import ProfileImage from '../../components/ProfileImage';
import ProfileOption from '../../components/ProfileOption';
import PostLoader from '../../components/PostLoader';
import InfoList from './infolist';
import ImageChange from '../ImageChange';

const ProfileHeader = () => {
  const [logoutModal, setLogoutModal] = useState(false);
  const { userInfo, me } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const showLogoutModal = useCallback(() => {
    setLogoutModal(true);
  }, []);

  const hideLogoutModal = useCallback(() => {
    setLogoutModal(false);
  }, []);

  const handleMoveAccounts = useCallback(() => {
    Router.push('/accounts');
  }, []);

  const onLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, [me]);

  const introduceCheck = useCallback(introduce => {
    if (!introduce) {
      return '소개글이 없습니다.';
    }
    return introduce;
  }, []);

  if (!userInfo) {
    return <PostLoader />;
  }

  return (
    <header>
      <div className="container">
        <div className="profile">
          <div className="profile-image">
            {me.id === userInfo.id ? (
              <ImageChange />
            ) : (
              <ProfileImage info={userInfo} />
            )}
          </div>
          <div className="profile-user-settings">
            <h3 className="profile-user-name">{userInfo.nickname}</h3>
            {me.id === userInfo.id ? (
              <>
                <button
                  className="btn profile-edit-btn"
                  onClick={handleMoveAccounts}
                >
                  프로필 편집
                </button>
                <button
                  className="btn profile-settings-btn"
                  aria-label="profile settings"
                  onClick={showLogoutModal}
                >
                  <FontAwesomeIcon icon={faCog} />
                </button>
                <ProfileOption
                  visible={logoutModal}
                  invisible={hideLogoutModal}
                  close={false}
                >
                  <button className="modalbutton" onClick={onLogout}>
                    로그아웃
                  </button>
                </ProfileOption>
              </>
            ) : (
              <span className="profile-follow-btn">
                <FollowButton userId={userInfo.id} />
              </span>
            )}
          </div>
          <InfoList />
          <div className="profile-bio">
            <p>
              <span className="profile-real-name"></span>
              {me.id === userInfo.id
                ? introduceCheck(me.introduce)
                : introduceCheck(userInfo.introduce)}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
