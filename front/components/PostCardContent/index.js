import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const PostCardContent = ({ contentData }) => {
  return (
    <>
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
    </>
  );
};

PostCardContent.propTypes = {
  contentData: PropTypes.string.isRequired,
};

export default PostCardContent;
