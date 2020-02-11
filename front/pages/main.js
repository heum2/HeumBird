import React, { useCallback } from 'react';
import { Row, Col, Avatar } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../containers/PostCard';

const Main = () => {
  const { me } = useSelector(state => state.user);
  const { followPosts } = useSelector(state => state.post);
  const dispatch = useDispatch();

  return (
    <>
      <Col sm={{ span: 12 }} md={{ span: 12 }}>
        <PostCard />
      </Col>
      <Col md={{ span: 0 }} lg={{ span: 4 }}>
        <div style={{ margin: '0 0 12px', padding: '0 0 0 5px' }}>
          <Avatar
            size="large"
            src="https://cdn.pixabay.com/photo/2020/02/07/14/15/landscape-4827278__340.jpg"
          />
        </div>
      </Col>
    </>
  );
};

export default Main;
