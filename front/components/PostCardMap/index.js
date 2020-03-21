import React from 'react';
import { Empty, Button } from 'antd';
import { useSelector } from 'react-redux';
import PostCard from '../PostCard';
import GlobalStyle from '../GlobalStyle';
import Link from 'next/link';

const PostCardMap = () => {
  const { mainPosts, hasMorePost } = useSelector(state => state.post);
  if (mainPosts.length !== 0 || hasMorePost) {
    return mainPosts.map((c, i) => <PostCard key={i} post={c} />);
  }
  return (
    <>
      <GlobalStyle />
      <Empty
        image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
        imageStyle={{
          height: 60,
        }}
        description={<span>게시물이 없습니다.</span>}
      >
        <Link href={'/explore'}>
          <a>
            <Button type="primary">유저 탐색하기</Button>
          </a>
        </Link>
      </Empty>
    </>
  );
};

export default PostCardMap;
