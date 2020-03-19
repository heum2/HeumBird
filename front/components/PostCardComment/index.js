import React, { memo } from 'react';
import Link from 'next/link';
import PostCardContent from '../PostCardContent';
import { Container } from './style';

const PostCardComment = memo(({ comments, postId }) => {
  const count = comments.length;

  if (count !== 0) {
    return (
      <Container>
        {count > 2 ? (
          <Link
            href={{
              pathname: '/p',
              query: { id: postId, nickname: 'main' },
            }}
            as={`/p/${postId}`}
          >
            <a>댓글 {count}개 모두 보기</a>
          </Link>
        ) : null}
        {comments.map((comment, index) => {
          if (index == count - 2 || index == count - 1) {
            return (
              <PostCardContent
                key={comment.id + comment + index}
                nickname={comment.User.nickname}
                contentData={comment.content}
              />
            );
          }
        })}
      </Container>
    );
  }
  return null;
});

export default PostCardComment;
