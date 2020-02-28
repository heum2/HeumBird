import React, { useEffect } from 'react';
import Router from 'next/router';
import { Row, Col, Avatar, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import PostForm from '../../containers/PostForm';
import PostCard from '../../containers/PostCard';
import Loading from '../../components/Loading';
import { LOAD_MAIN_POSTS_REQUEST } from '../../reducers/post';
import { PostContainer } from './style';

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
          {/* <Col
            sm={12}
            md={18}
            lg={15}
            xl={12}
            xxl={10}
            style={{
              float: 'left',
              margintRight: '28px',
              maxWidth: '614px',
              width: '100%',
            }}
          >
            <PostForm />
            {mainPosts.map(c => (
              <PostCard key={c.id} post={c} />
            ))}
          </Col> */}
          <div
            style={{
              left: '61%',
              position: 'fixed',
              height: '100vh',
              marginBottom: '30px',
              padding: 0,
              maxWidth: '293px',
              right: 0,
              width: '100%',
              top: '80px',
            }}
          >
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                position: 'fixed',
                flexDirection: 'row',
                height: '62px',
              }}
            >
              <div
                style={{
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'row',
                  height: '100%',
                  marginBottom: '12px',
                  maxHeight: '50px',
                  width: '100%',
                  paddingLeft: '5px',
                }}
              ></div>
            </div>
          </div>
          {/* <Col
            xs={0}
            sm={0}
            md={0}
            lg={6}
            xl={6}
            xxl={4}
            style={{
              maxWidth: '293px',
              width: '100%',
            }}
          >
            <Row
              style={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                position: 'fixed',
              }}
            >
              <Row
                style={{
                  alignItems: 'center',
                  height: '100%',
                  maxHeight: '50px',
                  width: '100%',
                  display: 'flex',
                  marginBottom: '12px',
                  paddingLeft: '5px',
                }}
              >
                <Col
                  style={{
                    alignSelf: 'center',
                    display: 'block',
                    flex: 'none',
                    width: '50px',
                  }}
                >
                  <Avatar
                    size={50}
                    src="https://cdn.pixabay.com/photo/2020/02/07/14/15/landscape-4827278__340.jpg"
                  />
                </Col>
                <Col
                  style={{
                    display: 'flex',
                    fontSize: '14px',
                    lineHeight: '18px',
                    marginBottom: '2px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    marginLeft: '14px',
                  }}
                >
                  <a
                    style={{
                      fontWeight: 600,
                      overflowX: 'hidden',
                      textOverflow: 'ellipsis',
                      color: 'rgba(var(--i1d,38,38,38),1)',
                    }}
                  >
                    {me.nickname}
                  </a>
                </Col>
              </Row>
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <Col>
                  <div>dfjlkd</div>
                </Col>
              </Row>
            </Row>
          </Col> */}
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
