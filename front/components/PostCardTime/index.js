import React, { memo } from 'react';

const PostCardTime = memo(({ timeStamp }) => {
  const timeBefore = () => {
    const nowDate = new Date();
    const postDate = new Date(timeStamp);
    let ago, day, sec, hour, min;
    if (nowDate.getFullYear() > postDate.getFullYear()) {
      // 몇 년 전
      ago = nowDate.getFullYear() - postDate.getFullYear();
      return ago + '년 전';
    } else if (nowDate.getMonth() > postDate.getMonth()) {
      // 몇 달 전
      ago = nowDate.getMonth - postDate.getMonth();
      return ago + '달 전';
    } else if (nowDate.getDate() > postDate.getDate()) {
      // 몇 일 전
      ago = nowDate.getDate() - postDate.getDate();
      return ago + '일 전';
    } else if (nowDate.getDate() == postDate.getDate()) {
      // 당일 비교
      const nowTime = nowDate.getTime();
      const postTime = postDate.getTime();
      if (nowTime > postTime) {
        sec = parseInt(nowTime - postTime) / 1000;
        day = parseInt(sec / 60 / 60 / 24);
        sec = sec - day * 60 * 60 * 24;
        hour = parseInt(sec / 60 / 60);
        sec = sec - hour * 60 * 60;
        min = parseInt(sec / 60);
        sec = parseInt(sec - min * 60);
        if (hour > 0) {
          //몇 시간 전
          return hour + '시간 전';
        } else if (min > 0) {
          //몇 분 전
          return min + '분 전';
        } else if (sec > 0) {
          //몇 초 전
          return sec + '초 전';
        }
      }
    }
  };

  return (
    <>
      <h5 style={{ color: '#999999', marginBottom: '5px' }}>{timeBefore()}</h5>
    </>
  );
});

export default PostCardTime;
