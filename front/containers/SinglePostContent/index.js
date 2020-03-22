import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { REMOVE_COMMENT_REQUEST } from '../../reducers/post';
import ProfileOption from '../../components/ProfileOption';
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
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);

  const handleShowModal = useCallback(e => {
    setOptionModal(true);
    setHover(false);
  }, []);
  const handleHideModal = useCallback(e => {
    setOptionModal(false);
  }, []);
  const hoverOn = useCallback(() => {
    if (contentId !== undefined) {
      setHover(true);
    }
  }, []);

  const hoverOff = useCallback(() => {
    setHover(false);
  }, []);

  const handleDeleteComment = useCallback(() => {
    dispatch({
      type: REMOVE_COMMENT_REQUEST,
      data: contentId,
    });
  }, [contentData]);

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
            <ProfileOption
              visible={optionModal}
              invisible={handleHideModal}
              close={false}
            >
              {me.nickname === nickname && (
                <>
                  <button
                    className="modalbutton -ColorRed"
                    onClick={handleDeleteComment}
                  >
                    삭제
                  </button>
                </>
              )}
            </ProfileOption>
          )}
        </Col>
      </Container>
    </Row>
  );
};

export default SinglePostContent;
