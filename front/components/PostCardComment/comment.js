import React, { memo } from 'react';
import Link from 'next/link';
import ProfileLink from '../ProfileLink';

const Comment = memo(({ nickname, content, depth = 0 }) => {
  return (
    <div>
      <ProfileLink nickname={nickname} />
      &nbsp;
      {content.split(/(#[^\s]+)/g).map((v, i) => {
        if (v.match(/(#[^\s]+)/g)) {
          return (
            <Link
              href={{ pathname: '/tag', query: { tag: v.slice(1) } }}
              as={`/tag/${v.slice(1)}`}
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
