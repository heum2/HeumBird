import React from 'react';
import { Row, Col, Avatar } from 'antd';
import PostCardContent from '../../components/PostCardContent';
import PostCardTime from '../../components/PostCardTime';
import { Container } from './style';

const SinglePostContent = ({ image, nickname, contentData, timeStamp }) => {
  return (
    <Row>
      <Container>
        <Col span={3}>
          <a>
            <Avatar size={32} src={image} />
          </a>
        </Col>
        <Col offset={1} span={20}>
          <PostCardContent nickname={nickname} contentData={contentData} />
          <Row>
            <div style={{ marginTop: '16px' }}>
              <PostCardTime timeStamp={timeStamp} />
            </div>
          </Row>
        </Col>
      </Container>
    </Row>
  );
};

export default SinglePostContent;
