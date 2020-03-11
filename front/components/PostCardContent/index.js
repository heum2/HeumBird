import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import ProfileLink from '../ProfileLink';
const PostCardContent = ({ nickname, contentData }) => {
  return (
    <div>
      <ProfileLink nickname={nickname} />
      &nbsp;
      {contentData.split(/(#[^\s]+)/g).map((v, i) => {
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
};

PostCardContent.propTypes = {
  contentData: PropTypes.string.isRequired,
};

export default PostCardContent;
