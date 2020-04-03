import React, { useEffect, useCallback } from 'react';
import Router from 'next/router';
import { message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import dynamic from 'next/dynamic';
import Loading from '../components/Loading';
import PostLoader from '../components/PostLoader';
import {
  LOAD_MAIN_POSTS_REQUEST,
  POST_NULLURE,
  FIND_HASHTAG_NULLURE,
} from '../reducers/post';
import {
  LOAD_SUGGESTED_OTHER_REQUEST,
  LOAD_SUGGESTED_FOLLOW_REQUEST,
  FIND_USER_NULLURE,
} from '../reducers/user';
import { PostContainer, SideContainer, Content } from '../styled/main';

const PostForm = dynamic(() => import('../containers/PostForm'), {
  ssr: false,
});

const PostCardMap = dynamic(() => import('../components/PostCardMap'), {
  loading: () => <PostLoader />,
});
const MainSide = dynamic(() => import('../components/MainSide'), {
  loading: () => <PostLoader />,
});

const Main = () => {
  const { me } = useSelector(state => state.user);
  const {
    mainPosts,
    postEdited,
    postAdded,
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
    if (postAdded) {
      message.success('게시글이 작성되었습니다!');
    }
  }, [postAdded]);

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
        type: POST_NULLURE,
      });
      dispatch({
        type: FIND_USER_NULLURE,
      });
      dispatch({
        type: FIND_HASHTAG_NULLURE,
      });
    };
  }, []);

  return (
    <Content>
      {me ? (
        <>
          <PostContainer>
            <PostForm />
            <PostCardMap />
            {hasMorePost && <PostLoader />}
          </PostContainer>
          <SideContainer>
            <MainSide />
          </SideContainer>
        </>
      ) : (
        <Loading />
      )}
    </Content>
  );
};

Main.getInitialProps = async context => {
  const state = context.store.getState();
  context.store.dispatch({
    type: LOAD_MAIN_POSTS_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_SUGGESTED_OTHER_REQUEST,
    data: state.user.me && state.user.me.id,
  });
  context.store.dispatch({
    type: LOAD_SUGGESTED_FOLLOW_REQUEST,
    data: state.user.me && state.user.me.id,
  });
};

export default Main;
