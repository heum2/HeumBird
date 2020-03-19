import React from 'react';
import { useSelector } from 'react-redux';
import ProfileLink from '../ProfileLink';
const PTitleName = ({ nickname, postNick }) => {
  if (!nickname) {
    return (
      <div className="nickname">
        <ProfileLink nickname={postNick} /> 님의 게시물 더 보기
      </div>
    );
  } else if (nickname.split('')[0] === '#') {
    return (
      <div className="nickname">
        <b style={{ color: '#262626' }}>{nickname}</b> 더 보기
      </div>
    );
  }
  return nickname;
};

export default PTitleName;
