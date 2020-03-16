import React from 'react';
import { Row } from 'antd';
import PropTypes from 'prop-types';
import ImageContainer from '../../containers/ImageContainer';
import { Layout, Container } from './style';
import PostLoader from '../PostLoader';

const ImageLayout = ({ title, mainPosts, hasMorePost, location }) => {
  return (
    <>
      <Layout>
        <h2 className="title">{title}</h2>
        <Container style={{ paddingBottom: '0px', paddingTop: '0px' }}>
          <Row>
            {mainPosts.map((value, index) => {
              return (
                <ImageContainer key={index} post={value} location={location} />
              );
            })}
          </Row>
        </Container>
        {hasMorePost && <PostLoader />}
      </Layout>
    </>
  );
};

ImageLayout.propTypes = {
  title: PropTypes.string,
  mainPosts: PropTypes.array.isRequired,
  hasMorePost: PropTypes.bool.isRequired,
  location: PropTypes.string.isRequired,
};

export default ImageLayout;
