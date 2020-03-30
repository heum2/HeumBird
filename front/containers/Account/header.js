import React from 'react';
import { useSelector } from 'react-redux';
import { ProfileHeader, ImgContent, NicknameContent } from './style';
import ImageChange from '../ImageChange';

const Header = () => {
  const { me } = useSelector(state => state.user);
  return (
    <ProfileHeader>
      <ImgContent>
        <ImageChange />
      </ImgContent>
      <NicknameContent>
        <h1>{me.nickname}</h1>
      </NicknameContent>
    </ProfileHeader>
  );
};

export default Header;
