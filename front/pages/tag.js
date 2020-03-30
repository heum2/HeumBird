import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import { Main } from '../styled/tag';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../reducers/post';
import PostLoader from '../components/PostLoader';
import GlobalStyle from '../components/GlobalStyle';

const ImageLayout = dynamic(() => import('../components/ImageLayout'), {
  loading: () => <PostLoader />,
});

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
    <>
      <Head>
        <title>#{tag} 해시태그 • HeumBird 사진</title>
        <meta name="description" content="여기를 눌러 링크를 확인하세요" />
        <meta
          name="og:title"
          content={'#' + tag + ' 해시태그 • HeumBird 사진'}
        />
        <meta name="og:description" content="여기를 눌러 링크를 확인하세요" />
        <meta property="og:type" content="website" />
      </Head>
      <Main>
        <header>
          <h1>#{tag}</h1>
          <h4>
            게시물 : <b>{mainPosts.length}</b>
          </h4>
        </header>
        {mainPosts.length < 4 && <GlobalStyle />}
        <ImageLayout
          title={'게시물'}
          mainPosts={mainPosts}
          hasMorePost={hasMorePost}
          location={'#' + tag}
        />
      </Main>
    </>
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
