import React from 'react';
import Link from 'next/link';
const PostCardComment = ({ comments }) => {
  if (comments.length !== 0) {
    return (
      <>
        {comments.length > 2 ? (
          <Link href={'#'}>
            <a>댓글 {comments.length}개 모두 보기</a>
          </Link>
        ) : null}
        {comments.map(comment => (
          <div key={comment.createdAt}>
            <b>{comment.User.nickname}</b> {comment.content}
          </div>
        ))}
        {/* <div>
          <b>Hello</b> 머해?
        </div>
        <div>
          <b>HeumHeum2</b> 달 구경 중이야..
        </div> */}
      </>
    );
  }
  return null;
};

export default PostCardComment;
