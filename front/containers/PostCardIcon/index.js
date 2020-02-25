import React, { useCallback } from 'react';
import { Col, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faComment,
  faPaperPlane,
} from '@fortawesome/free-regular-svg-icons';
import { faHeart as fulHeart } from '@fortawesome/free-solid-svg-icons';

import { LIKE_POST_REQUEST, UNLIKE_POST_REQUEST } from '../../reducers/post';
import { Button, IconRow } from './style';

const numberFormat = inputNumber => {
  return inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const PostCardIcon = ({ postId, likers }) => {
  const id = useSelector(state => state.user.me && state.user.me.id);
  const dispatch = useDispatch();
  const liked = id && likers && likers.find(v => v.id === id);

  const onToggleLike = useCallback(() => {
    if (!id) {
      return message.error('로그인이 필요합니다!');
    }
    if (liked) {
      dispatch({
        type: UNLIKE_POST_REQUEST,
        data: postId,
      });
    } else {
      dispatch({
        type: LIKE_POST_REQUEST,
        data: postId,
      });
    }
  }, [id && postId, liked]);

  const onClickComment = useCallback(() => {
    console.log('Comment');
  }, []);
  const onClickShare = useCallback(() => {
    console.log('Share');
  }, []);
  return (
    <>
      <IconRow>
        <Col className="col" xs={6} sm={6} md={24}>
          <Button key="like" onClick={onToggleLike}>
            <FontAwesomeIcon
              icon={liked ? fulHeart : faHeart}
              color={liked && 'red'}
              style={{
                display: 'block',
                position: 'relative',
                width: 24,
                height: 24,
              }}
            />
          </Button>
          <Button key="comment" onClick={onClickComment}>
            <FontAwesomeIcon
              icon={faComment}
              flip="horizontal"
              style={{
                display: 'block',
                position: 'relative',
                width: 24,
                height: 24,
              }}
            />
          </Button>
          <Button key="share" onClick={onClickShare}>
            <FontAwesomeIcon
              icon={faPaperPlane}
              style={{
                display: 'block',
                position: 'relative',
                width: 24,
                height: 24,
              }}
            />
          </Button>
        </Col>
      </IconRow>
      <div style={{ margin: '0px 0px 8px', padding: '0px 16px' }}>
        <h4>
          {likers && likers.length !== 0 ? (
            <b>좋아요 {numberFormat(likers.length)}개</b>
          ) : null}
        </h4>
      </div>
    </>
  );
};

export default PostCardIcon;
