import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Main } from '../styled/tag';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../reducers/post';
import ImageLayout from '../components/ImageLayout';

const Tag = ({ tag }) => {
  const dispatch = useDispatch();
  const { mainPosts, hasMorePost } = useSelector(state => state.post);
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
            type: LOAD_HASHTAG_POSTS_REQUEST,
            lastId,
            data: tag,
          });
          countRef.current.push(lastId);
        }
      }
    }
  }, [hasMorePost, mainPosts.length, tag]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts.length, hasMorePost, tag]);

  return (
    <Main>
      {mainPosts.length !== 0 ? (
        <>
          <style global jsx>{`
            html,
            body,
            body > div:first-child,
            div#__next,
            div#__next > div,
            div#__next > div > div {
              height: 100%;
              background: #fafafa;
            }
          `}</style>
          <header>
            <h1>#{tag}</h1>
            <h4>
              게시물 : <b>{mainPosts.length}</b>
            </h4>
          </header>
          <ImageLayout
            title={'게시물'}
            mainPosts={mainPosts}
            hasMorePost={hasMorePost}
            location={'tag'}
          />
        </>
      ) : null}
    </Main>
  );
};

Tag.propTypes = {
  tag: PropTypes.string.isRequired,
};

Tag.getInitialProps = async context => {
  const tag = context.query.tag;
  context.store.dispatch({
    type: LOAD_HASHTAG_POSTS_REQUEST,
    data: tag,
  });
  return { tag };
};
export default Tag;
