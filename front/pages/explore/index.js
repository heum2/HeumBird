import React, { useEffect } from 'react';
import Router from 'next/router';
import { Row, Col } from 'antd';
import { Layout, Container } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_EXPLORE_POSTS_REQUEST } from '../../reducers/post';
import Loading from '../../components/Loading';

const Explore = () => {
  const dispatch = useDispatch();
  const { compassPosts } = useSelector(state => state.post);
  const { me, suggestedList } = useSelector(state => state.user);

  useEffect(() => {
    if (!me) {
      Router.push('/');
    }
  }, [me]);

  return (
    <>
      {me ? (
        <Layout>
          <div className="title">탐색 탭</div>
          <Container>
            <Row gutter={[48, 32]}>
              <Col span={8}>
                <img
                  style={{ width: '100%' }}
                  src="https://cdn.pixabay.com/photo/2020/02/07/14/15/landscape-4827278__340.jpg"
                />
              </Col>
              <Col span={8}>
                <img
                  style={{ width: '100%' }}
                  src="https://cdn.pixabay.com/photo/2020/02/07/14/15/landscape-4827278__340.jpg"
                />
              </Col>
              <Col span={8}>
                <img
                  style={{ width: '100%' }}
                  src="https://cdn.pixabay.com/photo/2020/02/07/14/15/landscape-4827278__340.jpg"
                />
              </Col>
              <Col span={8}>xc</Col>
              <Col span={8}>xc</Col>
              <Col span={8}>xc</Col>
              <Col span={8}>xc</Col>
              <Col span={8}>xc</Col>
              <Col span={8}>xc</Col>
            </Row>
          </Container>
        </Layout>
      ) : (
        <Loading />
      )}
    </>
  );
};

Explore.getInitialProps = async context => {
  const state = context.store.getState();
  context.store.dispatch({
    type: LOAD_EXPLORE_POSTS_REQUEST,
  });
};

export default Explore;
