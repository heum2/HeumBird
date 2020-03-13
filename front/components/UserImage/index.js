import React from 'react';
import Link from 'next/link';
import { Avatar } from 'antd';

const UserImage = ({ image, nickname, size }) => {
  return (
    <>
      <Link
        href={{ pathname: '/profile', query: { nickname: nickname } }}
        as={`/profile/${nickname}`}
      >
        <a>
          {image ? (
            <Avatar src={image} size={size} />
          ) : (
            <Avatar size={size}>{nickname[0]}</Avatar>
          )}
        </a>
      </Link>
    </>
  );
};

export default UserImage;
