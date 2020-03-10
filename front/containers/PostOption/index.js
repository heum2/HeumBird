import React, { memo, useCallback, useEffect } from 'react';
import { Modal } from 'antd';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { ModalContent } from './style';
import { REMOVE_POST_REQUEST, EDIT_POST_NULLURE } from '../../reducers/post';
import { UNFOLLOW_USER_REQUEST } from '../../reducers/user';

const PostOption = memo(
  ({ postId, userId, visible, setVisible, setEdit, location }) => {
    const { me } = useSelector(state => state.user);
    const { postRemoved, removePostErrorReason } = useSelector(
      state => state.post,
    );
    const dispatch = useDispatch();

    const onHideModal = () => {
      setVisible(false);
    };

    useEffect(() => {
      if (postRemoved) {
        onHideModal;
      }
    }, [postRemoved]);

    const onPostDelete = useCallback(() => {
      dispatch({
        type: REMOVE_POST_REQUEST,
        data: postId,
      });
    }, []);
    const onPostEdit = useCallback(() => {
      dispatch({
        type: EDIT_POST_NULLURE,
      });
      setEdit(true);
      onHideModal();
    }, []);

    const onUnfollow = useCallback(
      userId => () => {
        dispatch({
          type: UNFOLLOW_USER_REQUEST,
          data: userId,
        });
        onHideModal();
      },
      [],
    );

    const onClickSinglePost = useCallback(() => {
      Router.push(
        {
          pathname: '/p',
          query: { id: postId, name: location },
        },
        `/p/${postId}`,
      );
    }, []);

    const authTarget = () => {
      if (me.id === userId) {
        // 내가 쓴 글
        return (
          <>
            <button className="modalbutton -ColorRed" onClick={onPostDelete}>
              삭제
            </button>
            <button className="modalbutton" onClick={onPostEdit}>
              수정
            </button>
          </>
        );
      } else if (me.Followings.findIndex(v => v.id === userId) !== -1) {
        // 팔로잉 목록에 있음
        return (
          <button
            className="modalbutton -ColorRed"
            onClick={onUnfollow(userId)}
          >
            팔로우 취소
          </button>
        );
      }
    };

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
            {authTarget()}
            <button className="modalbutton" onClick={onClickSinglePost}>
              게시물로 이동
            </button>
            <button className="modalbutton">공유하기</button>
            <button className="modalbutton" onClick={onHideModal}>
              취소
            </button>
          </ModalContent>
        </Modal>
      </>
    );
  },
);

export default PostOption;
