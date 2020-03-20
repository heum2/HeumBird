import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import ImageSlider from '../ImageSlider';
import UserImage from '../UserImage';
import ProfileLink from '../ProfileLink';
import PostCardIcon from '../../containers/PostCardIcon';
import CommentForm from '../../containers/CommentForm';
import SinglePostContent from '../../containers/SinglePostContent';
import FollowButton from '../../containers/FollowButton';
import { PostContainer, Comment, CotentComment } from './style';

const PostCardTime = dynamic(() => import('../PostCardTime'), { ssr: false });

const SinglePostCard = () => {
  const { me } = useSelector(state => state.user);
  const { singlePost } = useSelector(state => state.post);
  const textRef = useRef(null);

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
  );
};

export default SinglePostCard;
