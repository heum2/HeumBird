import React, { useState, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Avatar } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { Card, Button } from './style';
import CommentForm from '../CommentForm';
import ImageSlider from '../../components/ImageSlider';
import PostCardContent from '../../components/PostCardContent';
import PostCardIcon from '../PostCardIcon';
import PostCardComment from '../../components/PostCardComment';
import PostCardTime from '../../components/PostCardTime';

const PostCard = memo(({ post }) => {
  const [modal, setModal] = useState(null);
  const onClickModal = useCallback(() => {}, []);
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
            <Button onClick={onClickModal}>
              <FontAwesomeIcon
                icon={faEllipsisH}
                color={'#000000'}
                size={'sm'}
              />
            </Button>
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
        <PostCardComment comments={post.Comments} />
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
