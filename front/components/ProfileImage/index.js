import React from 'react';
import { Avatar } from 'antd';

const ProfileImage = ({ info }) => {
  if (info.Image) {
    return (
      <img
        style={{ objectFit: 'cover' }}
        src={info.Image.src}
        alt={info.Image}
      />
    );
  }
  return (
    <Avatar size={150} style={{ fontSize: '7rem' }}>
      {info.nickname[0]}
    </Avatar>
  );
};

export default ProfileImage;
