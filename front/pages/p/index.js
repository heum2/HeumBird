import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Avatar, Row, Col } from 'antd';
import Router from 'next/router';
import {
  Container,
  PostContainer,
  Comment,
  CotentComment,
  ContentCol,
  CommentCol,
} from './style';
import ImageSlider from '../../components/ImageSlider';
import {
  LOAD_POST_REQUEST,
  LOAD_EXPLORE_POSTS_REQUEST,
} from '../../reducers/post';
import Loading from '../../components/Loading';
import PostCardIcon from '../../containers/PostCardIcon';
import CommentForm from '../../containers/CommentForm';
import PostCardTime from '../../components/PostCardTime';
import PostCardContent from '../../components/PostCardContent';

const Post = ({ id }) => {
  const { me } = useSelector(state => state.user);
  // const [post, setPost] = useState({});
  const { mainPosts, singlePost } = useSelector(state => state.post);
  const postIndex = mainPosts.findIndex(it => it.id === id);

  let post;

  // useEffect(() => {
  //   if (mainPosts.length !== 0) {
  //     setPost(Object.assign({}, mainPosts[postIndex]));
  //   } else {
  //     setPost(Object.assign({}, singlePost));
  //   }
  // }, [post]);

  if (mainPosts.length !== 0) {
    post = Object.assign({}, mainPosts[postIndex]);
  } else {
    post = Object.assign({}, singlePost);
  }

  useEffect(() => {
    if (!me) {
      Router.push('/');
    }
  }, [me]);

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
                  <a>{post.User.nickname}</a>
                </div>
              </header>
              <div className="imageMargin">
                <div className="rQdP3">
                  <ImageSlider images={post.Images} size={'479px'} />
                </div>
              </div>
              <Comment>
                <CotentComment>
                  <div className="ZyFrc">
                    {/* 게시글 시작 */}
                    <Row>
                      <ContentCol>
                        <Col span={3}>
                          <a>
                            <Avatar
                              size={32}
                              src="https://cdn.pixabay.com/photo/2020/02/07/14/15/landscape-4827278__340.jpg"
                            />
                          </a>
                        </Col>
                        <Col span={20}>
                          <PostCardContent
                            nickname={post.User.nickname}
                            contentData={post.content}
                          />
                          <Row>
                            <div style={{ marginTop: '2px' }}>
                              <PostCardTime timeStamp={post.createdAt} />
                            </div>
                          </Row>
                        </Col>
                      </ContentCol>
                    </Row>
                    {/* 댓글시작 */}
                    <Row>
                      <ContentCol>
                        <Col span={3}>
                          <a>
                            <Avatar
                              size={32}
                              src="https://cdn.pixabay.com/photo/2020/02/07/14/15/landscape-4827278__340.jpg"
                            />
                          </a>
                        </Col>
                        <Col span={20}>
                          <PostCardContent
                            nickname={post.User.nickname}
                            contentData={post.content}
                          />
                          <Row>
                            <div style={{ marginTop: '2px' }}>
                              <PostCardTime timeStamp={post.createdAt} />
                            </div>
                          </Row>
                        </Col>
                      </ContentCol>
                    </Row>
                  </div>
                </CotentComment>
                <section className="ltpMr">
                  <PostCardIcon postId={post.id} likers={post.Likers} />
                </section>
                <section className="k_Q0X">
                  <div style={{ margin: '0px 0px 4px', paddingLeft: '16px' }}>
                    <PostCardTime timeStamp={post.createdAt} />
                  </div>
                </section>
                <section className="sH9wk">
                  <CommentForm postId={post.id} />
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
  // } else {
  console.log('주소창으로 검색해서 온 사람들 또는 새로고침 한 사람들..');
  context.store.dispatch({
    type: LOAD_POST_REQUEST,
    id,
  });
  // }
  return { id };
};

export default Post;
