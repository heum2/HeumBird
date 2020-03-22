import React, { useEffect, useCallback } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { useSelector, useDispatch } from 'react-redux';
import { Row } from 'antd';
import { Body } from '../styled/profile';
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';
import {
  LOAD_USER_REQUEST,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
} from '../reducers/user';
import PostLoader from '../components/PostLoader';
const ImageContainer = dynamic(() => import('../containers/ImageContainer'), {
  loading: () => <PostLoader />,
});
const ProfileHeader = dynamic(() => import('../containers/ProfileHeader'), {
  loading: () => <PostLoader />,
});

const Profile = ({ nickname }) => {
  const { mainPosts, hasMorePost } = useSelector(state => state.post);
  const { me } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const countRef = [];

  useEffect(() => {
    if (!me) {
      Router.push('/');
    }
  }, [me]);

  const onScroll = useCallback(() => {
    if (
      window.scrollY + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 300
    ) {
      if (mainPosts.length && hasMorePost) {
        const lastId = mainPosts[mainPosts.length - 1].id;
        if (!countRef.includes(lastId)) {
          dispatch({
            type: LOAD_USER_POSTS_REQUEST,
            data: nickname,
            lastId,
          });
          countRef.push(lastId);
        }
      }
    }
  }, [hasMorePost, mainPosts.length, nickname]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts.length, hasMorePost, nickname]);

  return (
    <>
      <Head>
        <title>@{nickname} • HeumBird 사진</title>
        <meta name="description" content="여기를 눌러 링크를 확인하세요" />
        <meta name="og:title" content="로그인 • HeumBird" />
        <meta name="og:description" content="여기를 눌러 링크를 확인하세요" />
        <meta property="og:type" content="website" />
      </Head>
      <Body>
        {me && (
          <>
            <ProfileHeader />
            <main>
              <div className="container">
                <Row>
                  {mainPosts.map((value, index) => (
                    <ImageContainer
                      key={index}
                      post={value}
                      location={value.User.nickname}
                    />
                  ))}
                </Row>
                {hasMorePost && <PostLoader />}
              </div>
            </main>
          </>
        )}
      </Body>
    </>
  );
};

Profile.propTypes = {
  nickname: PropTypes.string.isRequired,
};

Profile.getInitialProps = async context => {
  const nickname = context.query.nickname;
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
    data: nickname,
  });
  context.store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    data: nickname,
  });
  context.store.dispatch({
    type: LOAD_FOLLOWERS_REQUEST,
    data: nickname,
  });
  context.store.dispatch({
    type: LOAD_FOLLOWINGS_REQUEST,
    data: nickname,
  });
  return { nickname };
};

export default Profile;
