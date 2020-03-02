import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { message } from 'antd';
import { useSelector } from 'react-redux';
import PostForm from '../../containers/PostForm';
import PostCard from '../../containers/PostCard';
import MainSide from '../../components/MainSide';
import Loading from '../../components/Loading';
import { LOAD_MAIN_POSTS_REQUEST } from '../../reducers/post';
import { LOAD_FOLLOWERS_REQUEST } from '../../reducers/user';
import { PostContainer, SideContainer, FollowList, Button } from './style';

const Main = () => {
  const { me } = useSelector(state => state.user);
  const { mainPosts, postEdited } = useSelector(state => state.post);

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

  return (
    <>
      {me ? (
        <>
          <PostContainer>
            <PostForm />
            {mainPosts.map((c, i) => (
              <PostCard key={i + c.id} post={c} />
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
    type: LOAD_FOLLOWERS_REQUEST,
    data: state.user.me && state.user.me.id,
  });
};

export default Main;
