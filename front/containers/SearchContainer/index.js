import React, { useState, useCallback, useEffect } from 'react';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { Input } from 'antd';
import { FIND_USER_REQUEST } from '../../reducers/user';
import { FIND_HASHTAG_REQUEST } from '../../reducers/post';
import SearchDropdown from '../SearchDropdown';
const { Search } = Input;

const SearchContainer = () => {
  const [searching, setSearching] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [finded, setFinded] = useState(false);
  const { userSearching, userFinded } = useSelector(state => state.user);
  const { hashtagSearching, hashtagFinded } = useSelector(state => state.post);
  const dispatch = useDispatch();
  const peopleTagReg = /@[^\s]+/g;
  const hashTagReg = /#[^\s]+/g;

  useEffect(() => {
    setSearching(userSearching || hashtagSearching);
  }, [userSearching, hashtagSearching]);

  useEffect(() => {
    setFinded(userFinded || hashtagFinded);
  }, [userFinded, hashtagFinded]);

  const handleMenuClick = useCallback(({ key }) => {
    if (key.match(peopleTagReg)) {
      Router.push(
        {
          pathname: '/profile',
          query: { nickname: key.split('@')[1] },
        },
        `/profile/${key.split('@')[1]}`,
      );
    }
    if (key.match(hashTagReg)) {
      Router.push(
        { pathname: '/tag', query: { tag: key.split('#')[1] } },
        `/tag/${key.split('#')[1]}`,
      );
    }
    setSearchValue(key);
    setFinded(false);
  }, []);

  const handleChange = useCallback(e => {
    e.persist();
    const { value } = e.target;
    setSearchValue(value);
    if (!value.trim() || value === '#' || value === '@') {
      dispatch({
        type: FIND_USER_REQUEST,
        data: undefined,
      });
      dispatch({
        type: FIND_HASHTAG_REQUEST,
        data: undefined,
      });
    } else if (value.match(peopleTagReg)) {
      dispatch({
        type: FIND_USER_REQUEST,
        data: value.split('@')[1],
        search: 'search',
      });
    } else if (value.match(hashTagReg)) {
      dispatch({
        type: FIND_HASHTAG_REQUEST,
        data: value.split('#')[1],
        search: 'search',
      });
    } else if (value.substr(0, 1) !== '#' && value.substr(0, 1) !== '@') {
      dispatch({
        type: FIND_HASHTAG_REQUEST,
        data: value,
        search: 'search',
      });
      dispatch({
        type: FIND_USER_REQUEST,
        data: value,
        search: 'search',
      });
    }
  }, []);

  return (
    <SearchDropdown
      placement={'bottomCenter'}
      finded={finded}
      setFinded={setFinded}
      handleMenuClick={handleMenuClick}
      position={'fixed'}
    >
      <Search
        placeholder="검색"
        loading={searching}
        value={searchValue}
        onChange={handleChange}
        allowClear={!searching}
      />
    </SearchDropdown>
  );
};

export default SearchContainer;
