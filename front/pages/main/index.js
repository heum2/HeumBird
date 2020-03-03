import React, { useEffect, useRef, useCallback } from 'react';
import Router from 'next/router';
import { message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import PostForm from '../../containers/PostForm';
import PostCard from '../../containers/PostCard';
import MainSide from '../../components/MainSide';
import Loading from '../../components/Loading';
import {
  LOAD_MAIN_POSTS_REQUEST,
  EDIT_POST_NULLURE,
} from '../../reducers/post';
import { LOAD_FOLLOW_SUGGESTED_REQUEST } from '../../reducers/user';
import { PostContainer, SideContainer } from './style';

const Main = () => {
  const { me } = useSelector(state => state.user);
  const { mainPosts, postEdited, hasMorePost } = useSelector(
    state => state.post,
  );
  const dispatch = useDispatch();
  const countRef = useRef([]);

  const onScroll = useCallback(() => {
    if (
      window.scrollY + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 300
    ) {
      if (hasMorePost) {
        const lastId = mainPosts[mainPosts.length - 1].id;
        console.log(lastId);
        if (!countRef.current.includes(lastId)) {
          dispatch({
            type: LOAD_MAIN_POSTS_REQUEST,
            lastId,
          });
          countRef.current.push(lastId);
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
    return () => {
      dispatch({
        type: EDIT_POST_NULLURE,
      });
    };
  }, []);

  return (
    <>
      {me ? (
        <>
          <PostContainer>
            <PostForm />
            {mainPosts.map((c, i) => (
              <PostCard key={i} post={c} />
            ))}
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
