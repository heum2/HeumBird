import React from 'react';
import Link from 'next/link';
import { AStyle } from './style';

const ProfileLink = ({ nickname }) => {
  return (
    <Link
      href={{
        pathname: '/profile',
        query: { nickname: nickname },
      }}
      as={`/${nickname}`}
    >
      <AStyle>{nickname}</AStyle>
    </Link>
  );
};

export default ProfileLink;
