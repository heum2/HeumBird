import React, { memo } from 'react';
import Link from 'next/link';

const Comment = memo(({ nickname, content, depth = 0 }) => {
  return (
    <div>
      <b>{nickname}</b>{' '}
      {content.split(/(#[^\s]+)/g).map((v, i) => {
        if (v.match(/(#[^\s]+)/g)) {
          return (
            <Link
              href={{ pathname: '/hashtag', query: { tag: v.slice(1) } }}
              as={`/hashtag/${v.slice(1)}`}
              key={v}
            >
              <a>{v}</a>
            </Link>
          );
        }
        return v;
      })}
    </div>
  );
});

export default Comment;
