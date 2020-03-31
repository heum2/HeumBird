import React, { useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { message } from 'antd';
import { Container, ImageDiv } from '../styled/p';
import Loading from '../components/Loading';
import PTitleName from '../components/PTitleName';
import ImageContainer from '../containers/ImageContainer';
import {
  LOAD_POST_REQUEST,
  LOAD_USER_POSTS_REQUEST,
  REMOVE_COMMENT_NULLURE,
} from '../reducers/post';
import SinglePostCard from '../components/SinglePostCard';

const Post = memo(({ nickname }) => {
  const { me } = useSelector(state => state.user);
  const { mainPosts, singlePost } = useSelector(state => state.post);
  const { postRemoved, commentRemoved, removeCommentErrorReason } = useSelector(
    state => state.post,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (commentRemoved || postRemoved) {
      message.success('삭제되었습니다!');
    }
    return () =>
      dispatch({
        type: REMOVE_COMMENT_NULLURE,
      });
  }, [commentRemoved, postRemoved]);

  useEffect(() => {
    if (removeCommentErrorReason) {
      message.error(removeCommentErrorReason);
    }
  }, [removeCommentErrorReason]);

  useEffect(() => {
    if (!me) {
      Router.push('/');
    }
  }, [me]);

  if (Object.keys(singlePost).length === 0) {
    return null;
  }

  let postList;
  if (mainPosts.length !== 0) {
    const xIndex = mainPosts.findIndex(v => v.id === singlePost.id);
    let nextIndex = xIndex + 3;
    let preIndex = xIndex - 3;
    if (xIndex === 0) {
      nextIndex = xIndex + 6;
    }
    if (xIndex === 1) {
      nextIndex = xIndex + 5;
      preIndex = xIndex - 1;
    }
    if (xIndex === 2) {
      nextIndex = xIndex + 4;
      preIndex = xIndex - 2;
    }
    if (xIndex === mainPosts.length - 1) {
      preIndex = xIndex - 6;
    }
    if (xIndex === mainPosts.length - 2) {
      preIndex = xIndex - 5;
      nextIndex = xIndex + 1;
    }
    if (xIndex === mainPosts.length - 3) {
      preIndex = xIndex - 4;
      nextIndex = xIndex + 2;
    }
    postList = mainPosts.filter(
      (v, i) => v.id !== singlePost.id && i <= nextIndex && i >= preIndex,
    );
  }

  return (
    <>
      {me ? (
        <Container>
          <SinglePostCard />
          {postList && postList.length !== 0 && (
            <ImageDiv>
              <div className="IwRsH">
                <div className="xLCgt">
                  <PTitleName
                    nickname={nickname}
                    postNick={singlePost.User.nickname}
                  />
                </div>
              </div>
              {postList.map((value, index) => (
                <ImageContainer key={index} post={value} location={nickname} />
              ))}
            </ImageDiv>
          )}
        </Container>
      ) : (
        <Loading />
      )}
    </>
  );
});

Post.propTypes = {
  nickname: PropTypes.node.isRequired,
};

Post.defaultProps = {
  nickname: '',
};

Post.getInitialProps = async context => {
  const id = parseInt(context.query.id, 10);
  const nickname = context.query.nickname;
  if (nickname === undefined) {
    context.store.dispatch({
      type: LOAD_USER_POSTS_REQUEST,
      data: id,
    });
  }
  context.store.dispatch({
    type: LOAD_POST_REQUEST,
    id,
  });

  return { nickname };
};

export default Post;
