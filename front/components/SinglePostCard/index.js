import React, { useRef, useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import ImageSlider from '../ImageSlider';
import UserImage from '../UserImage';
import ProfileLink from '../ProfileLink';
import Option from '../../containers/PostOption';
import PostEdit from '../../containers/PostEdit';
import PostCardIcon from '../../containers/PostCardIcon';
import CommentForm from '../../containers/CommentForm';
import SinglePostContent from '../../containers/SinglePostContent';
import FollowButton from '../../containers/FollowButton';
import { PostContainer, Comment, CotentComment, SingleOption } from './style';

const PostCardTime = dynamic(() => import('../PostCardTime'), { ssr: false });

const SinglePostCard = () => {
  const [optionModal, setOptionModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const { me } = useSelector(state => state.user);
  const { singlePost, postEdited } = useSelector(state => state.post);
  const textRef = useRef(null);

  const handleShowModal = useCallback(
    e => {
      setOptionModal(true);
    },
    [singlePost],
  );

  useEffect(() => {
    if (postEdited) {
      setEditModal(false);
    }
  }, [postEdited, singlePost]);

  return (
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
                    contentId={v.id}
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
        <SingleOption>
          <button onClick={handleShowModal}>
            <FontAwesomeIcon icon={faEllipsisH} color={'#000000'} size={'sm'} />
          </button>
        </SingleOption>
        {optionModal && (
          <Option
            postId={singlePost.id}
            userId={singlePost.UserId}
            visible={optionModal}
            setVisible={setOptionModal}
            setEdit={setEditModal}
            move={true}
          />
        )}
        {editModal && (
          <PostEdit
            postId={singlePost.id}
            content={singlePost.content}
            publictarget={singlePost.publictarget}
            visible={editModal}
            setVisible={setEditModal}
          />
        )}
      </article>
    </PostContainer>
  );
};

export default SinglePostCard;
