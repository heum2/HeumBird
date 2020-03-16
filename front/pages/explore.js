import React, { useEffect, useRef, useCallback } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_EXPLORE_POSTS_REQUEST } from '../reducers/post';
import Loading from '../components/Loading';
import ImageLayout from '../components/ImageLayout';

const Explore = () => {
  const dispatch = useDispatch();
  const { mainPosts, hasMorePost } = useSelector(state => state.post);
  const { me } = useSelector(state => state.user);
  const countRef = useRef([]);

  const onScroll = useCallback(() => {
    if (
      window.scrollY + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 300
    ) {
      if (mainPosts.length !== 0 && hasMorePost) {
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
  }, [hasMorePost, mainPosts.length]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    countRef.current = [];
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts.length, hasMorePost]);

  useEffect(() => {
    if (!me) {
      Router.push('/');
    }
  }, [me]);

  return (
    <>
      {me ? (
        <>
          {mainPosts.length !== 0 && (
            <ImageLayout
              title={'탐색 탭'}
              mainPosts={mainPosts}
              hasMorePost={hasMorePost}
              location={'explore'}
            />
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

Explore.getInitialProps = async context => {
  context.store.dispatch({
    type: LOAD_EXPLORE_POSTS_REQUEST,
  });
};

export default Explore;
