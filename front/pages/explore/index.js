import React, { useEffect } from 'react';
import Router from 'next/router';
import { Row } from 'antd';
import { Layout, Container } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_EXPLORE_POSTS_REQUEST } from '../../reducers/post';
import ImageContainer from '../../containers/ImageContainer';
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

  const arrange = () => {
    const X = compassPosts.length;
    console.log('x값 확인: ', X);
    const Y = parseInt(X / 3);
    if (X % 3 != 0) {
      return Y + 1;
    }
    return Y;
  };

  return (
    <>
      {me ? (
        <Layout>
          <h2 className="title">탐색 탭</h2>
          <Container style={{ paddingBottom: '0px', paddingTop: '0px' }}>
            {compassPosts.length !== 0 && arrange()
            // compassPosts.map((v, i) => {
            //   if (i % 3 === 0) {
            //     console.log('다음 줄로!', i % 3);
            //   } else {
            //     console.log('Col', i % 3);
            //   }
            // })
            }
            <Row>
              <ImageContainer />
              <ImageContainer />
              <ImageContainer />
            </Row>
            <Row>
              <ImageContainer />
              <ImageContainer />
              <ImageContainer />
            </Row>
            <Row>
              <ImageContainer />
              <ImageContainer />
              <ImageContainer />
            </Row>
            <Row>
              <ImageContainer />
              <ImageContainer />
              <ImageContainer />
            </Row>
            <Row>
              <ImageContainer />
              <ImageContainer />
              <ImageContainer />
            </Row>
          </Container>
          <div style={{ marginTop: '40px', height: '48px' }}></div>
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
