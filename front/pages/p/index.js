import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from 'antd';
import Router from 'next/router';
import { Container, PostContainer, Comment, CotentComment } from './style';
import ImageSlider from '../../components/ImageSlider';
import { LOAD_POST_REQUEST } from '../../reducers/post';
import Loading from '../../components/Loading';
import PostCardIcon from '../../containers/PostCardIcon';
import CommentForm from '../../containers/CommentForm';
import PostCardTime from '../../components/PostCardTime';
import SinglePostContent from '../../containers/SinglePostContent';
import FollowButton from '../../containers/FollowButton';

const Post = ({ id }) => {
  const { me } = useSelector(state => state.user);
  const { mainPosts, singlePost } = useSelector(state => state.post);
  // const postIndex = mainPosts.findIndex(v => v.id === id);

  // let post;

  // if (mainPosts.length !== 0) {
  //   post = Object.assign({}, mainPosts[postIndex]);
  // } else {
  //   post = Object.assign({}, singlePost);
  // }

  useEffect(() => {
    if (!me) {
      Router.push('/');
    }
  }, [me]);

  if (Object.keys(singlePost).length === 0) {
    return <div>잠시만 기다려주세요!</div>;
  }

  return (
    <>
      {me ? (
        <Container>
          <PostContainer>
            <article className="ltEkP">
              <header className="Ppjfr">
                <div className="image">
                  <a>
                    <Avatar
                      size={32}
                      src="https://cdn.pixabay.com/photo/2020/02/07/14/15/landscape-4827278__340.jpg"
                    />
                  </a>
                </div>
                <div className="nickname">
                  <a>{singlePost.User.nickname}</a>
                </div>
                <div className="bY2yH">
                  {!me || singlePost.UserId === me.id ? null : <span>•</span>}
                  <FollowButton userId={singlePost.UserId} />
                </div>
              </header>
              <div className="imageMargin">
                <div className="rQdP3">
                  <ImageSlider images={singlePost.Images} size={'479px'} />
                </div>
              </div>
              <Comment>
                <CotentComment>
                  <div className="ZyFrc">
                    {/* 게시글 시작 */
                    singlePost.content && (
                      <SinglePostContent
                        image="https://cdn.pixabay.com/photo/2020/02/07/14/15/landscape-4827278__340.jpg"
                        nickname={singlePost.User.nickname}
                        contentData={singlePost.content}
                        timeStamp={singlePost.createdAt}
                      />
                    )}
                    {/* 댓글시작 */}
                    {singlePost.Comments.length != 0 &&
                      singlePost.Comments.map((v, i) => (
                        <SinglePostContent
                          image="https://cdn.pixabay.com/photo/2020/02/07/14/15/landscape-4827278__340.jpg"
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
                  />
                </section>
                <section className="k_Q0X">
                  <div style={{ margin: '0px 0px 4px', paddingLeft: '16px' }}>
                    <PostCardTime timeStamp={singlePost.createdAt} />
                  </div>
                </section>
                <section className="sH9wk">
                  <CommentForm postId={singlePost.id} />
                </section>
              </Comment>
            </article>
          </PostContainer>
        </Container>
      ) : (
        <Loading />
      )}
    </>
  );
};

Post.getInitialProps = async context => {
  const id = parseInt(context.query.id, 10);
  const name = context.query.name;
  // if (name === 'explore') {
  //   context.store.dispatch({
  //     type: LOAD_EXPLORE_POSTS_REQUEST,
  //   });
  // } else if (name === 'main') {
  //   context.store.dispatch({
  //     type: LOAD_MAIN_POSTS_REQUEST,
  //   });
  // }
  // if (!name) {
  console.log('주소창으로 검색해서 온 사람들 또는 새로고침 한 사람들..');
  context.store.dispatch({
    type: LOAD_POST_REQUEST,
    id,
  });
  // }

  // }
  return { id };
};

export default Post;
