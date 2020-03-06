import React, { useEffect, useRef, useCallback } from 'react';
import Router from 'next/router';
import { Row } from 'antd';
import { Layout, Container } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_EXPLORE_POSTS_REQUEST } from '../../reducers/post';
import ImageContainer from '../../containers/ImageContainer';
import Loading from '../../components/Loading';

const Explore = () => {
  const dispatch = useDispatch();
  const { compassPosts, hasMoreExplore } = useSelector(state => state.post);
  const { me, suggestedList } = useSelector(state => state.user);
  const countRef = useRef([]);

  const onScroll = useCallback(() => {
    if (
      window.scrollY + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 300
    ) {
      if (compassPosts.length !== 0 && hasMoreExplore) {
        const lastId = compassPosts[compassPosts.length - 1].id;
        if (!countRef.current.includes(lastId)) {
          dispatch({
            type: LOAD_EXPLORE_POSTS_REQUEST,
            lastId,
          });
          countRef.current.push(lastId);
        }
      }
    }
  }, [hasMoreExplore, compassPosts.length]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [compassPosts.length]);

  return (
    <>
      {me ? (
        <Layout>
          <h2 className="title">탐색 탭</h2>
          <Container style={{ paddingBottom: '0px', paddingTop: '0px' }}>
            <Row>
              {compassPosts.length !== 0 &&
                compassPosts.map((value, index) => {
                  return <ImageContainer key={index} post={value} />;
                })}
            </Row>
          </Container>
          {hasMoreExplore && (
            <div style={{ marginTop: '40px', height: '48px' }}></div>
          )}
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
