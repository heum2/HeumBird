import React, { useState, useCallback, memo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { Card, Button } from './style';
import CommentForm from '../CommentForm';
import PostCardIcon from '../PostCardIcon';
import PostOption from '../PostOption';
import PostEdit from '../PostEdit';
import FollowButton from '../FollowButton';
import ProfileLink from '../../components/ProfileLink';
import UserImage from '../../components/UserImage';
import ImageSlider from '../../components/ImageSlider';
import PostCardContent from '../../components/PostCardContent';
import PostCardTime from '../../components/PostCardTime';
import PostCardComment from '../../components/PostCardComment';

const PostCard = memo(({ post }) => {
  const [optionModal, setOptionModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const { postEdited } = useSelector(state => state.post);
  const { me } = useSelector(state => state.user);
  const textRef = useRef(null);
  useEffect(() => {
    if (postEdited) {
      setEditModal(false);
    }
  }, [postEdited]);

  const onShowModal = useCallback(() => {
    setOptionModal(true);
  }, []);

  return (
    <Card>
      <div className="title">
        <Row>
          <Col xs={3} md={2}>
            <UserImage
              image={post.User.Image}
              nickname={post.User.nickname}
              size={32}
            />
          </Col>
          <Col xs={2} className="nickname">
            <h4>
              <ProfileLink nickname={post.User.nickname} />
            </h4>
          </Col>
          <Col xs={3} className="bY2yH">
            <h4>
              {!me || post.UserId === me.id ? null : <span>•</span>}
              <FollowButton userId={post.UserId} />
            </h4>
          </Col>
          <Col className="headerCol">
            <Button onClick={onShowModal}>
              <FontAwesomeIcon
                icon={faEllipsisH}
                color={'#000000'}
                size={'sm'}
              />
            </Button>
            {optionModal && (
              <PostOption
                postId={post.id}
                content={post.content}
                userId={post.UserId}
                visible={optionModal}
                setVisible={setOptionModal}
                setEdit={setEditModal}
                location={'main'}
              />
            )}
            {editModal && (
              <PostEdit
                postId={post.id}
                content={post.content}
                publictarget={post.publictarget}
                visible={editModal}
                setVisible={setEditModal}
              />
            )}
          </Col>
        </Row>
      </div>
      <ImageSlider images={post.Images} size={'616px'} />
      <PostCardIcon postId={post.id} likers={post.Likers} textRef={textRef} />
      <div style={{ padding: '0px 16px' }}>
        <PostCardContent
          nickname={post.User.nickname}
          contentData={post.content}
        />
      </div>
      <PostCardComment comments={post.Comments} postId={post.id} />
      <div style={{ margin: '0px 0px 4px', paddingLeft: '16px' }}>
        <PostCardTime timeStamp={post.createdAt} />
      </div>
      <CommentForm postId={post.id} textRef={textRef} />
    </Card>
  );
});

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    Comments: PropTypes.array,
    Likers: PropTypes.array,
    content: PropTypes.string,
    Images: PropTypes.array,
    createdAt: PropTypes.string,
  }).isRequired,
};

export default PostCard;
