import React, { useCallback } from 'react';
import { Row, Col, Avatar, Form, Button, Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { Card } from './style';
import CommentForm from '../CommentForm';

const PostCard = () => {
  const onToggleLike = useCallback(() => {}, []);
  const onClickComment = useCallback(() => {}, []);
  return (
    <Card>
      <div className="title">
        <Row>
          <Col xs={3} md={2}>
            <Avatar src="https://cdn.pixabay.com/photo/2020/02/07/14/15/landscape-4827278__340.jpg" />
          </Col>
          <Col xs={2}>
            <h4>
              <b>HeumHeum2</b>
            </h4>
          </Col>
          <Col
            xs={{ offset: 18 }}
            xl={{ offset: 19 }}
            xxl={{ offset: 19 }}
            span={1}
          >
            <FontAwesomeIcon
              icon={faEllipsisH}
              color={'#000000'}
              size={'sm'}
              style={{ marginTop: '45%' }}
            />
          </Col>
        </Row>
      </div>
      <img
        className="cover"
        src={
          'https://cdn.pixabay.com/photo/2020/02/07/14/15/landscape-4827278__340.jpg'
        }
      />
      <Row style={{ margin: '4px 0px 0px', padding: '0px 16px' }}>
        <Col xs={6}>
          <FontAwesomeIcon
            icon={faHeart}
            key="like"
            onClick={onToggleLike}
            style={{ width: 24, height: 24 }}
          />
          &emsp;
          <FontAwesomeIcon
            icon={faComment}
            flip="horizontal"
            key="comment"
            onClick={onClickComment}
            style={{ width: 24, height: 24 }}
          />
        </Col>
      </Row>
      <div style={{ margin: '0px 0px 8px', padding: '0px 16px' }}>
        <h4>
          <b>좋아요 1개</b>
        </h4>
      </div>
      <div className="coment">
        <a>댓글 4개 모두 보기</a>
        <div>
          <b>Hello</b> 머해?
        </div>
        <div>
          <b>HeumHeum2</b> 달 구경 중이야..
        </div>
      </div>
      <div style={{ margin: '0px 0px 4px', padding: '0px 0px 0px 16px' }}>
        <h5 style={{ color: '#999999' }}>4시간 전</h5>
      </div>
      <CommentForm />
    </Card>
  );
};

export default PostCard;
