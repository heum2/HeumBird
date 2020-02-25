import React, { memo, useCallback, useEffect } from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ModalContent } from './style';
import { REMOVE_POST_REQUEST } from '../../reducers/post';

const PostOption = memo(({ postId, content, userId, visible, inVisible }) => {
  const { me } = useSelector(state => state.user);
  const { postRemoved, removePostErrorReason } = useSelector(
    state => state.post,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (postRemoved) {
      inVisible();
    }
  }, [postRemoved]);

  const onPostDelete = useCallback(() => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: postId,
    });
  }, []);
  const onUnFollow = useCallback(() => {}, []);
  const onPostEdit = useCallback(() => {}, []);

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
        <button className="modalbutton -ColorRed" onClick={onUnFollow}>
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
        onCancel={inVisible}
        bodyStyle={{
          padding: 0,
        }}
      >
        <ModalContent>
          {authTarget()}
          <button className="modalbutton">게시물로 이동</button>
          <button className="modalbutton">공유하기</button>
          <button className="modalbutton" onClick={inVisible}>
            취소
          </button>
        </ModalContent>
      </Modal>
    </>
  );
});

export default PostOption;