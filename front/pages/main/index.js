import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { Avatar, message } from 'antd';
import { useSelector } from 'react-redux';
import PostForm from '../../containers/PostForm';
import PostCard from '../../containers/PostCard';
import Loading from '../../components/Loading';
import { LOAD_MAIN_POSTS_REQUEST } from '../../reducers/post';
import { PostContainer, SideContainer, FollowList } from './style';

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
            {mainPosts.map(c => (
              <PostCard key={c.id} post={c} />
            ))}
          </PostContainer>
          <SideContainer>
            <div className="sideProfileLayout">
              <div className="sideProfileContainer">
                <div className="sideProfileImage">
                  <Avatar
                    size={50}
                    src="https://cdn.pixabay.com/photo/2020/02/07/14/15/landscape-4827278__340.jpg"
                  />
                </div>
                <div className="sideProfileNick">
                  <a>{me.nickname}</a>
                </div>
              </div>
            </div>
            <div className="sideFollowLayout">
              <div className="sideFollowHeaderContainer">
                <div className="sideFollowHeader">
                  <div className="sideFollowContent">회원님을 위한 추천</div>
                </div>
                <a>모두 보기</a>
              </div>
              <div className="sideFollowListContainer">
                <FollowList>
                  <div className="imageContainer">
                    <div className="sideProfileImage">
                      <Avatar
                        size={32}
                        src="https://cdn.pixabay.com/photo/2020/02/07/14/15/landscape-4827278__340.jpg"
                      />
                    </div>
                  </div>
                  <div className="followListContent">
                    <div className="sideFollowList">
                      <a>{me.nickname}</a>
                    </div>
                  </div>
                  <div className="followButtonContainer">
                    <button>팔로우</button>
                  </div>
                </FollowList>
              </div>
            </div>
          </SideContainer>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

Main.getInitialProps = async context => {
  context.store.dispatch({
    type: LOAD_MAIN_POSTS_REQUEST,
  });
};

export default Main;
