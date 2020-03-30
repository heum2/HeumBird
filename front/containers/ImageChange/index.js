import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProfileImage from '../../components/ProfileImage';
import ProfileOption from '../../components/ProfileOption';
import {
  UPLOAD_USER_IMAGE_REQUEST,
  REMOVE_USER_IMAGE_REQUEST,
} from '../../reducers/user';

const ImageChange = () => {
  const [imageModal, setImageModal] = useState(false);
  const { me, isImageUploading } = useSelector(state => state.user);
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

  return (
    <>
      <button
        className="btn"
        title="프로필 사진 바꾸기"
        onClick={showImageModal}
      >
        <ProfileImage info={me} />
      </button>
      <ProfileOption
        titlename="프로필 사진 바꾸기"
        visible={imageModal}
        invisible={hideImageModal}
        close={false}
      >
        <label className="modalbutton -ColorBlue">
          <input
            type="file"
            style={{ display: 'none' }}
            onChange={onInputImage}
          />
          <span>사진 업로드</span>
        </label>
        {me.Image && (
          <button className="modalbutton -ColorRed" onClick={onRemoveImage}>
            현재 사진 삭제
          </button>
        )}
      </ProfileOption>
    </>
  );
};

export default ImageChange;
