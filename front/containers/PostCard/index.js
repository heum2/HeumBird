import React, { useState, useCallback, memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Avatar } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { Card, Button } from './style';
import CommentForm from '../CommentForm';
import PostCardIcon from '../PostCardIcon';
import PostOption from '../PostOption';
import PostEdit from '../PostEdit';
import ImageSlider from '../../components/ImageSlider';
import PostCardContent from '../../components/PostCardContent';
import PostCardComment from '../../components/PostCardComment';
import PostCardTime from '../../components/PostCardTime';

const PostCard = memo(({ post }) => {
  const [optionModal, setOptionModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const { postEdited } = useSelector(state => state.post);

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
            {post.User.image ? (
              <Avatar src={post.User.image} />
            ) : (
              <Avatar>{post.User.nickname[0]}</Avatar>
            )}
          </Col>
          <Col xs={2}>
            <h4>
              <b>{post.User.nickname}</b>
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
      <ImageSlider images={post.Images} />
      <PostCardIcon postId={post.id} likers={post.Likers} />
      <div className="comment">
        <div>
          <b>{post.User.nickname}</b>&nbsp;
          <PostCardContent contentData={post.content} />
        </div>
        {post.Comments && <PostCardComment comments={post.Comments} />}
      </div>
      <div className="timestamp">
        <PostCardTime timeStamp={post.createdAt} />
      </div>
      <CommentForm postId={post.id} />
    </Card>
  );
});

PostCard.propTypes = {
  post: PropTypes.shape({
    User: PropTypes.object,
    content: PropTypes.string,
    img: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
};

export default PostCard;
