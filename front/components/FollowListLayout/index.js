import React from 'react';
import Link from 'next/link';
import UserImage from '../UserImage';
import FollowButton from '../../containers/FollowButton';
import { FollowList } from './style';

const FollowListLayout = ({ value }) => {
  return (
    <FollowList>
      <div className="imageContainer">
        <div className="sideProfileImage">
          <UserImage image={value.Image} nickname={value.nickname} size={32} />
        </div>
      </div>
      <div className="followListContent">
        <div className="sideFollowList">
          <Link
            href={{
              pathname: '/profile',
              query: { nickname: value.nickname },
            }}
            as={`/profile/${value.nickname}`}
          >
            <a>{value.nickname}</a>
          </Link>
        </div>
      </div>
      <div className="followButtonContainer">
        <FollowButton userId={value.id} />
      </div>
    </FollowList>
  );
};

export default FollowListLayout;
