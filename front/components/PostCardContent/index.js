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
              prefetch={false}
              href={{ pathname: '/tag', query: { tag: v.slice(1) } }}
              as={`/tag/${v.slice(1)}`}
              key={v + i}
            >
              <a>{v}</a>
            </Link>
          );
        } else if (v.match(/(@[^@\s]+)/g)) {
          return (
            <Link
              prefetch={false}
              href={{ pathname: '/profile', query: { nickname: v.slice(1) } }}
              as={`/profile/${v.slice(1)}`}
              key={v + i}
            >
              <a>{v}</a>
            </Link>
          );
        } else if (
          v.match(
            /(http|https|ftp|telnet|news|irc):\/\/([-/.a-zA-Z0-9_~#%$?&=:200-377()]+)/gi,
          )
        ) {
          return (
            <Link href={v} prefetch={false} key={v + i}>
              <a target="_blank">{v}</a>
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
