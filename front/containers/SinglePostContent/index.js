import React, { useState, useCallback } from 'react';
import { Row, Col } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import PostOption from '../PostOption';
import UserImage from '../../components/UserImage';
import PostCardContent from '../../components/PostCardContent';
import PostCardTime from '../../components/PostCardTime';
import { Container, Option } from './style';

const SinglePostContent = ({
  image,
  nickname,
  contentData,
  timeStamp,
  contentId,
}) => {
  const [optionModal, setOptionModal] = useState(false);
  const [hover, setHover] = useState(false);
  const handleShowModal = useCallback(
    e => {
      setOptionModal(true);
      setHover(false);
    },
    [contentData],
  );
  const hoverOn = useCallback(() => {
    setHover(true);
  }, []);

  const hoverOff = useCallback(() => {
    setHover(false);
  }, []);

  return (
    <Row>
      <Container onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
        <Col span={3}>
          <UserImage image={image} nickname={nickname} size={32} />
        </Col>
        <Col offset={1} span={20}>
          <PostCardContent nickname={nickname} contentData={contentData} />
          <Row>
            <div style={{ marginTop: '16px' }}>
              <PostCardTime timeStamp={timeStamp} />
            </div>
          </Row>
          <Option hover={hover}>
            <button onClick={handleShowModal}>
              <FontAwesomeIcon
                icon={faEllipsisH}
                color={'#000000'}
                size={'sm'}
              />
            </button>
          </Option>
          {optionModal && (
            <PostOption
              postId={contentId}
              userId={nickname}
              visible={optionModal}
              setVisible={setOptionModal}
              move={true}
            />
          )}
        </Col>
      </Container>
    </Row>
  );
};

export default SinglePostContent;
