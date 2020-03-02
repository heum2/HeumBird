import React, { memo } from 'react';

const PostCardTime = memo(({ timeStamp }) => {
  const timeBefore = () => {
    const nowDate = new Date();
    const postDate = new Date(timeStamp);

    const betweenTime = Math.floor(
      (nowDate.getTime() - postDate.getTime()) / 1000 / 60,
    );
    if (betweenTime < 1) return '방금 전';
    if (betweenTime < 60) return betweenTime + '분 전';

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) return betweenTimeHour + '시간 전';

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 7) {
      return betweenTimeDay + '일 전';
    }

    const year = postDate.getFullYear();
    let MM = postDate.getMonth() + 1;
    const month = MM >= 10 ? MM : '0' + MM;
    let dd = postDate.getDate();
    const day = dd >= 10 ? dd : '0' + dd;

    if (nowDate.getFullYear() > postDate.getFullYear()) {
      return year + '-' + month + '-' + day;
    } else {
      return month + '-' + day;
    }
  };

  return (
    <>
      <h5 style={{ color: '#999999', marginBottom: '5px' }}>{timeBefore()}</h5>
    </>
  );
});

export default PostCardTime;
