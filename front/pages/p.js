import React, { useEffect, memo, useRef } from 'react';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import {
  Container,
  PostContainer,
  Comment,
  CotentComment,
  ImageDiv,
} from '../styled/p';
import ImageSlider from '../components/ImageSlider';
import UserImage from '../components/UserImage';
import ProfileLink from '../components/ProfileLink';
import Loading from '../components/Loading';
import PostCardIcon from '../containers/PostCardIcon';
import CommentForm from '../containers/CommentForm';
import PostCardTime from '../components/PostCardTime';
import SinglePostContent from '../containers/SinglePostContent';
import FollowButton from '../containers/FollowButton';
import ImageContainer from '../containers/ImageContainer';
import { LOAD_POST_REQUEST, LOAD_USER_POSTS_REQUEST } from '../reducers/post';

const Post = memo(({ nickname }) => {
  const { me } = useSelector(state => state.user);
  const { mainPosts, singlePost } = useSelector(state => state.post);
  const textRef = useRef(null);
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
          {mainPosts.length === 0 && (
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
          )}
          <PostContainer>
            <article className="ltEkP">
              <header className="Ppjfr">
                <div className="image">
                  <UserImage
                    image={singlePost.User.Image}
                    nickname={singlePost.User.nickname}
                    size={32}
                  />
                </div>
                <div className="nickname">
                  <ProfileLink nickname={singlePost.User.nickname} />
                </div>
                <div className="bY2yH">
                  {!me || singlePost.UserId === me.id ? null : <span>•</span>}
                  <FollowButton userId={singlePost.UserId} />
                </div>
              </header>
              <div className="imageMargin">
                <div className="rQdP3">
                  <ImageSlider images={singlePost.Images} origin={true} />
                </div>
              </div>
              <Comment>
                <CotentComment>
                  <div className="ZyFrc">
                    {/* 게시글 시작 */
                    singlePost.content && (
                      <SinglePostContent
                        image={singlePost.User.Image}
                        nickname={singlePost.User.nickname}
                        contentData={singlePost.content}
                        timeStamp={singlePost.createdAt}
                      />
                    )}
                    {/* 댓글시작 */}
                    {singlePost.Comments.length != 0 &&
                      singlePost.Comments.map((v, i) => (
                        <SinglePostContent
                          image={v.User.Image}
                          nickname={v.User.nickname}
                          contentData={v.content}
                          timeStamp={v.createdAt}
                          key={i + v}
                        />
                      ))}
                  </div>
                </CotentComment>
                <section className="ltpMr">
                  <PostCardIcon
                    postId={singlePost.id}
                    likers={singlePost.Likers}
                    textRef={textRef}
                  />
                </section>
                <section className="k_Q0X">
                  <div style={{ margin: '0px 0px 4px', paddingLeft: '16px' }}>
                    <PostCardTime timeStamp={singlePost.createdAt} />
                  </div>
                </section>
                <section className="sH9wk">
                  <CommentForm postId={singlePost.id} textRef={textRef} />
                </section>
              </Comment>
            </article>
          </PostContainer>
          {postList && postList.length !== 0 && (
            <ImageDiv>
              <div className="IwRsH">
                <div className="xLCgt">
                  {nickname !== 'explore' && nickname !== 'main' ? (
                    <div className="nickname">
                      <ProfileLink nickname={singlePost.User.nickname} /> 님의
                      게시물 더 보기
                    </div>
                  ) : (
                    nickname
                  )}
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
