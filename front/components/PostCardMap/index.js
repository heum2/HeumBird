import React from 'react';
import { useSelector } from 'react-redux';
import PostCard from '../PostCard';

const PostCardMap = () => {
  const { mainPosts } = useSelector(state => state.post);
  return mainPosts.map((c, i) => <PostCard key={i} post={c} />);
};

export default PostCardMap;
