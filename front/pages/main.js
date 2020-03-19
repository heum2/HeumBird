import React, { useEffect, useCallback } from 'react';
import Router from 'next/router';
import { message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import PostForm from '../containers/PostForm';
import GlobalStyle from '../components/GlobalStyle';
import PostCard from '../components/PostCard';
import MainSide from '../components/MainSide';
import Loading from '../components/Loading';
import PostLoader from '../components/PostLoader';
import {
  LOAD_MAIN_POSTS_REQUEST,
  EDIT_POST_NULLURE,
  UPLOAD_IMAGES_NULLURE,
} from '../reducers/post';
import { LOAD_FOLLOW_SUGGESTED_REQUEST } from '../reducers/user';
import { PostContainer, SideContainer } from '../styled/main';

const Main = () => {
  const { me } = useSelector(state => state.user);
  const {
    mainPosts,
    postEdited,
    hasMorePost,
    postRemoved,
    imageUploadErrorReason,
  } = useSelector(state => state.post);
  const dispatch = useDispatch();
  const countRef = [];

  const onScroll = useCallback(() => {
    if (
      window.scrollY + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 300
    ) {
      if (mainPosts.length && hasMorePost) {
        const lastId = mainPosts[mainPosts.length - 1].id;
        if (!countRef.includes(lastId)) {
          dispatch({
            type: LOAD_MAIN_POSTS_REQUEST,
            lastId,
          });
          countRef.push(lastId);
        }
      }
    }
  }, [hasMorePost, mainPosts.length]);

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

  useEffect(() => {
    if (postEdited) {
      message.success('게시글이 수정되었습니다!');
    }
  }, [postEdited]);

  useEffect(() => {
    if (postRemoved) {
      message.success('게시글이 삭제되었습니다!');
    }
  }, [postRemoved]);

  useEffect(() => {
    if (imageUploadErrorReason) {
      message.error(imageUploadErrorReason);
    }
  }, [imageUploadErrorReason]);

  useEffect(() => {
    return () => {
      dispatch({
        type: EDIT_POST_NULLURE,
      });
      dispatch({
        type: UPLOAD_IMAGES_NULLURE,
      });
    };
  }, []);

  return (
    <>
      {me ? (
        <>
          <PostContainer>
            <PostForm />
            {mainPosts.length !== 0 ? (
              mainPosts.map((c, i) => <PostCard key={i} post={c} />)
            ) : (
              <GlobalStyle />
            )}
            {hasMorePost && <PostLoader />}
          </PostContainer>
          <SideContainer>
            <MainSide />
          </SideContainer>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

Main.getInitialProps = async context => {
  const state = context.store.getState();
  context.store.dispatch({
    type: LOAD_MAIN_POSTS_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_FOLLOW_SUGGESTED_REQUEST,
    data: state.user.me && state.user.me.id,
  });
};

export default Main;
