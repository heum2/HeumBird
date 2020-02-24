import React, { memo } from 'react';

const Comment = memo(({ nickname, content, depth = 0 }) => {
  return (
    <div>
      <b>{nickname}</b> {content}
    </div>
  );
});

export default Comment;
