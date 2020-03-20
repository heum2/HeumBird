import React from 'react';
import ProfileLink from '../ProfileLink';

const PTitleName = ({ nickname, postNick }) => {
  if (nickname && (nickname === 'main' || nickname === 'explore')) {
    return nickname;
  } else if (nickname && nickname.split('')[0] === '#') {
    return (
      <div className="nickname">
        <b style={{ color: '#262626' }}>{nickname}</b> 더 보기
      </div>
    );
  }
  return (
    <div className="nickname">
      <ProfileLink nickname={postNick} /> 님의 게시물 더 보기
    </div>
  );
};

export default PTitleName;
