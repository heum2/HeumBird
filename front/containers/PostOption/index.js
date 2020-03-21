import React, { useCallback, useEffect, useState } from 'react';
import { Modal, message } from 'antd';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { ModalContent } from './style';
import { REMOVE_POST_REQUEST, EDIT_POST_NULLURE } from '../../reducers/post';
import { UNFOLLOW_USER_REQUEST } from '../../reducers/user';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const PostOption = ({
  postId,
  userId,
  visible,
  setVisible,
  setEdit,
  location,
  move,
}) => {
  const { me } = useSelector(state => state.user);
  const [followCheck, setFollowCheck] = useState(false);
  const [copied, setCopied] = useState(false);
  const { postRemoved, removePostErrorReason } = useSelector(
    state => state.post,
  );
  const dispatch = useDispatch();

  const onHideModal = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (postRemoved) {
      onHideModal();
    }
  }, [postRemoved]);

  useEffect(() => {
    if (copied) {
      message.info('클립보드에 저장되었습니다!');
      onHideModal();
    }
  }, [copied]);

  const onPostDelete = useCallback(() => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: postId,
    });
    onHideModal();
  }, [postId, userId]);
  const onPostEdit = useCallback(() => {
    dispatch({
      type: EDIT_POST_NULLURE,
    });
    setEdit(true);
    onHideModal();
  }, [postId, userId]);

  const onUnfollow = useCallback(
    userId => () => {
      dispatch({
        type: UNFOLLOW_USER_REQUEST,
        data: userId,
      });
      onHideModal();
    },
    [userId],
  );

  const onClickSinglePost = useCallback(() => {
    Router.push(
      {
        pathname: '/p',
        query: { id: postId, nickname: location },
      },
      `/p/${postId}`,
    );
  }, []);

  useEffect(() => {
    if (me.Followings.findIndex(v => v.id === userId) !== -1) {
      setFollowCheck(true);
    } else {
      setFollowCheck(false);
    }
  }, [me && me.Followings]);

  return (
    <>
      <Modal
        visible={visible}
        centered
        footer={null}
        closable={false}
        onCancel={onHideModal}
        bodyStyle={{
          padding: 0,
        }}
      >
        <ModalContent>
          {followCheck && (
            <button
              className="modalbutton -ColorRed"
              onClick={onUnfollow(userId)}
            >
              팔로우 취소
            </button>
          )}
          {!move && (
            <button className="modalbutton" onClick={onClickSinglePost}>
              게시물로 이동
            </button>
          )}
          <CopyToClipboard
            text={`https://heumbird.com/p/${postId}`}
            onCopy={() => setCopied(true)}
          >
            <button className="modalbutton">공유하기</button>
          </CopyToClipboard>
          {me.id === userId && (
            <>
              <button className="modalbutton -ColorBlue" onClick={onPostEdit}>
                수정
              </button>
              <button className="modalbutton -ColorRed" onClick={onPostDelete}>
                삭제
              </button>
            </>
          )}
          <button className="modalbutton" onClick={onHideModal}>
            취소
          </button>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PostOption;
