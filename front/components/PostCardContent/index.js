import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import ProfileLink from '../ProfileLink';
const PostCardContent = ({ nickname, contentData }) => {
  return (
    <div>
      <ProfileLink nickname={nickname} />
      &nbsp;
      {contentData.split(/([#|@][^\s]+)/g).map((v, i) => {
        if (v.match(/(#[^#\s]+)/g)) {
          return (
            <Link
              href={{ pathname: '/tag', query: { tag: v.slice(1) } }}
              as={`/tag/${v.slice(1)}`}
              key={v}
            >
              <a>{v}</a>
            </Link>
          );
        } else if (v.match(/(@[^@\s]+)/g)) {
          return (
            <Link
              href={{ pathname: '/profile', query: { nickname: v.slice(1) } }}
              as={`/profile/${v.slice(1)}`}
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
};

PostCardContent.propTypes = {
  contentData: PropTypes.string.isRequired,
};

export default PostCardContent;
