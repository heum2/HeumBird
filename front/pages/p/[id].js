import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from 'antd';
import { Container, PostContainer } from './style';
import ImageSlider from '../../components/ImageSlider';
import { LOAD_POST_REQUEST } from '../../reducers/post';
import Loading from '../../components/Loading';

const Post = ({ id }) => {
  const { me } = useSelector(state => state.user);
  const { singlePost } = useSelector(state => state.post);
  return (
    <>
      {me && singlePost ? (
        <Container>
          {/* {console.log(singlePost.Images)} */}
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
                  <a>HeumHeum2</a>
                </div>
              </header>
              <div className="imageMargin">
                <div className="rQdP3">
                  <ImageSlider images={singlePost.Images} />
                </div>
              </div>
              {/* <h1>{router.query.id}</h1>
          <p>This is the blog post content.</p> */}
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
  context.store.dispatch({
    type: LOAD_POST_REQUEST,
    id,
  });
  return { id };
};

export default Post;
