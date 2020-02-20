import React, { useCallback, useEffect } from 'react';
import Router from 'next/router';
import { Row, Col, Avatar } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import PostForm from '../containers/PostForm';
import PostCard from '../containers/PostCard';
import Loading from '../components/Loading';
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';

const Main = () => {
  const { me } = useSelector(state => state.user);
  const { mainPosts } = useSelector(state => state.post);
  useEffect(() => {
    if (!me) {
      Router.push('/');
    }
  }, [me]);

  return (
    <>
      {me ? (
        <>
          <Col sm={12} md={18} lg={15} xl={12} xxl={10}>
            <PostForm />
            {mainPosts.map(c => (
              <PostCard key={c.id} post={c} />
            ))}
          </Col>
          <Col xs={0} sm={0} md={0} lg={6} xl={6} xxl={4}>
            <div style={{ margin: '0 0 12px', padding: '0 0 0 5px' }}>
              <Row>
                <Col xl={4}>
                  <Avatar
                    size="large"
                    src="https://cdn.pixabay.com/photo/2020/02/07/14/15/landscape-4827278__340.jpg"
                  />
                </Col>
                <Col>
                  <h3>
                    <b>{me.nickname}</b>
                  </h3>
                </Col>
              </Row>
            </div>
          </Col>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

Main.getInitialProps = async context => {
  context.store.dispatch({
    type: LOAD_MAIN_POSTS_REQUEST,
  });
};

export default Main;
