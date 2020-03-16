import React, { useCallback, memo } from 'react';
import Router from 'next/router';
import { Mentions, Avatar } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { FIND_USER_REQUEST, FIND_USER_NULLURE } from '../../reducers/user';
import {
  FIND_HASHTAG_REQUEST,
  FIND_HASHTAG_NULLURE,
} from '../../reducers/post';
const { Option } = Mentions;

const SearchMentions = memo(({ placeholder }) => {
  const { usersList, userFinding } = useSelector(state => state.user);
  const { hashtagList, hashtagFinding } = useSelector(state => state.post);
  const dispatch = useDispatch();

  const onSearch = useCallback((data, prefix) => {
    if (!data) {
      dispatch({
        type: FIND_USER_NULLURE,
      });
      dispatch({
        type: FIND_HASHTAG_NULLURE,
      });
    }

    if (prefix === '@' && !!data) {
      dispatch({
        type: FIND_USER_REQUEST,
        data: data,
      });
    }
    if (prefix === '#' && !!data) {
      dispatch({
        type: FIND_HASHTAG_REQUEST,
        data: data,
      });
    }
  }, []);
  const onSelectMentions = useCallback(option => {
    if (Array.isArray(option.children)) {
      Router.push(
        {
          pathname: '/profile',
          query: { nickname: option.value },
        },
        `/profile/${option.value}`,
      );
    } else {
      Router.push(
        { pathname: '/tag', query: { tag: option.value } },
        `/tag/${option.value}`,
      );
    }
  }, []);

  const onEnterPress = useCallback(e => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  }, []);

  return (
    <Mentions
      placeholder={placeholder}
      prefix={['@', '#']}
      onSearch={onSearch}
      onSelect={onSelectMentions}
      loading={userFinding || hashtagFinding}
      onKeyPress={onEnterPress}
    >
      {(usersList || []).map(value => (
        <Option key={value} value={value.nickname}>
          {!value.Image ? (
            <Avatar>{value.nickname[0]}</Avatar>
          ) : (
            <Avatar src={`http://localhost:3060/${value.Image.src}`} />
          )}
          <span style={{ marginLeft: '10px' }}>{value.nickname}</span>
        </Option>
      ))}
      {(hashtagList || []).map(value => (
        <Option key={value} value={value.name}>
          {value.name}
        </Option>
      ))}
    </Mentions>
  );
});

export default SearchMentions;
