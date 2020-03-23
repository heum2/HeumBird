import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import {
  LOG_OUT_REQUEST,
  UPLOAD_USER_IMAGE_REQUEST,
  REMOVE_USER_IMAGE_REQUEST,
} from '../../reducers/user';
import FollowButton from '../FollowButton';
import ProfileImage from '../../components/ProfileImage';
import ProfileOption from '../../components/ProfileOption';
import PostLoader from '../../components/PostLoader';
import InfoList from './infolist';

const ProfileHeader = () => {
  const [imageModal, setImageModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const { userInfo, me, isImageUploading } = useSelector(state => state.user);
  const dispatch = useDispatch();

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

  if (!userInfo) {
    return <PostLoader />;
  }

  return (
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
            titlename="프로필 사진 바꾸기"
            visible={imageModal}
            invisible={hideImageModal}
            close={true}
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
              <button className="modalbutton -ColorRed" onClick={onRemoveImage}>
                현재 사진 삭제
              </button>
            )}
          </ProfileOption>
          <div className="profile-user-settings">
            <h3 className="profile-user-name">{userInfo.nickname}</h3>
            {me.id === userInfo.id ? (
              <>
                <button className="btn profile-edit-btn">프로필 편집</button>

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
            close={false}
          >
            <button className="modalbutton" onClick={onLogout}>
              로그아웃
            </button>
          </ProfileOption>
          <InfoList />
          <div className="profile-bio">
            <p>
              <span className="profile-real-name"></span>
              소개글이 없습니다.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
