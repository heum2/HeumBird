import React, { memo } from 'react';
import Link from 'next/link';
import Comment from './comment';

const PostCardComment = memo(({ comments }) => {
  const count = comments.length;

  if (count !== 0) {
    return (
      <>
        {count > 2 ? (
          <Link href={'#'}>
            <a>댓글 {count}개 모두 보기</a>
          </Link>
        ) : null}
        {comments.map((comment, index) => {
          if (index == count - 2 || index == count - 1) {
            return (
              <Comment
                key={comment.id + comment + index}
                nickname={comment.User.nickname}
                content={comment.content}
              />
            );
          }
        })}
      </>
    );
  }
  return null;
});

export default PostCardComment;
