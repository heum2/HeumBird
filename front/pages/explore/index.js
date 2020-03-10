import React, { useEffect, useRef, useCallback } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { Row } from 'antd';
import { Layout, Container } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_EXPLORE_POSTS_REQUEST } from '../../reducers/post';
import ImageContainer from '../../containers/ImageContainer';
import Loading from '../../components/Loading';

const Explore = () => {
  const dispatch = useDispatch();
  const { mainPosts, hasMoreExplore } = useSelector(state => state.post);
  const { me, suggestedList } = useSelector(state => state.user);
  const countRef = useRef([]);

  const onScroll = useCallback(() => {
    if (
      window.scrollY + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 300
    ) {
      if (mainPosts.length !== 0 && hasMoreExplore) {
        const lastId = mainPosts[mainPosts.length - 1].id;
        if (!countRef.current.includes(lastId)) {
          dispatch({
            type: LOAD_EXPLORE_POSTS_REQUEST,
            lastId,
          });
          countRef.current.push(lastId);
        }
      }
    }
  }, [hasMoreExplore, mainPosts.length]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts.length]);

  useEffect(() => {
    if (!me) {
      Router.push('/');
    }
  }, [me]);

  return (
    <>
      {me ? (
        <Layout>
          <h2 className="title">탐색 탭</h2>
          <Container style={{ paddingBottom: '0px', paddingTop: '0px' }}>
            <Row>
              {mainPosts.length !== 0 &&
                mainPosts.map((value, index) => {
                  return (
                    <ImageContainer
                      key={index}
                      post={value}
                      location={'explore'}
                    />
                  );
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
