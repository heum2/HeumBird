import React, { memo, useState, useCallback, useEffect } from 'react';
import Router from 'next/router';
import { Input, Dropdown, Menu, Avatar } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { FIND_USER_REQUEST, FIND_USER_NULLURE } from '../../reducers/user';
import {
  FIND_HASHTAG_REQUEST,
  FIND_HASHTAG_NULLURE,
} from '../../reducers/post';
const { Search } = Input;

const SearchForm = memo(({ placeholder }) => {
  const [searching, setSearching] = useState(false);
  const [finded, setFinded] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchList, setSearchList] = useState('user');
  const { usersList, userSearching, userFinded } = useSelector(
    state => state.user,
  );
  const { hashtagList, hashtagSearching, hashtagFinded } = useSelector(
    state => state.post,
  );
  const dispatch = useDispatch();
  const peopleTagReg = /@[^\s]+/g;
  const hashTagReg = /#[^\s]+/g;

  useEffect(() => {
    setSearching(userSearching || hashtagSearching);
  }, [userSearching, hashtagSearching]);

  useEffect(() => {
    setFinded(userFinded || hashtagFinded);
  }, [userFinded, hashtagFinded]);

  useEffect(() => {
    if (usersList.length && hashtagList.length) {
      console.log('아무것도 안쳤을떄');
      setSearchList('usertag');
    } else if (!!usersList.length) {
      setSearchList('user');
      console.log('유저목록 들어가라');
    } else if (!!hashtagList.length) {
      setSearchList('tag');
      console.log('태그목록 들어가라');
    }
  }, [usersList.length, hashtagList.length]);

  const handleChange = useCallback(e => {
    e.persist();
    const { value } = e.target;
    setSearchValue(value);
    if (!value.trim()) {
      dispatch({
        type: FIND_USER_NULLURE,
      });
      dispatch({
        type: FIND_HASHTAG_NULLURE,
      });
    } else if (value.match(peopleTagReg)) {
      dispatch({
        type: FIND_USER_REQUEST,
        data: value.split('@')[1],
      });
    } else if (value.match(hashTagReg)) {
      dispatch({
        type: FIND_HASHTAG_REQUEST,
        data: value.split('#')[1],
      });
    } else if (value.substr(0, 1) !== '#' && value.substr(0, 1) !== '@') {
      dispatch({
        type: FIND_HASHTAG_REQUEST,
        data: value,
      });
      dispatch({
        type: FIND_USER_REQUEST,
        data: value,
      });
    }
  }, []);

  const handleSearch = useCallback(
    value => {
      console.log(`값 확인 : ${value}`);
    },
    [searchValue],
  );

  const handleBlur = useCallback(e => {
    e.persist();
    console.log(e);
    setFinded(false);
  }, []);

  const handleMenuClick = useCallback(e => {
    if (searchList === 'user') {
      Router.push(
        {
          pathname: '/profile',
          query: { nickname: e.key.split('@')[1] },
        },
        `/profile/${e.key.split('@')[1]}`,
      );
    }
    if (e.key.match(hashTagReg)) {
      Router.push(
        { pathname: '/tag', query: { tag: e.key.split('#')[1] } },
        `/tag/${e.key.split('#')[1]}`,
      );
    }
    setSearchValue(e.key);
    setFinded(false);
  }, []);

  // const handleVisibleChange = useCallback(flag => {
  //   console.log(flag);
  //   if (flag === false) {
  //     setFinded(false);
  //   }
  // }, []);

  const menu = value => {
    if (value === 'user') {
      return (
        <Menu onClick={handleMenuClick} onBlur={e => setFinded(false)}>
          {(usersList || []).map((v, i) => (
            <Menu.Item key={'@' + v.nickname} value={v.nickname}>
              {!v.Image ? (
                <Avatar>{v.nickname[0]}</Avatar>
              ) : (
                <Avatar src={v.Image.src} />
              )}
              <span style={{ marginLeft: '10px' }}>
                <b>{v.nickname}</b>
              </span>
            </Menu.Item>
          ))}
        </Menu>
      );
    } else if (value === 'tag') {
      return (
        <Menu onClick={handleMenuClick} onBlur={e => setFinded(false)}>
          {(hashtagList || []).map((v, i) => (
            <Menu.Item key={'#' + v.name} value={v.name}>
              <Avatar style={{ backgroundColor: '#3897f0' }}>#</Avatar>
              <span style={{ marginLeft: '10px' }}>
                <b>{v.name}</b>
              </span>
            </Menu.Item>
          ))}
        </Menu>
      );
    }
    return (
      <Menu onClick={handleMenuClick} onBlur={e => setFinded(false)}>
        {(usersList || []).map((v, i) => (
          <Menu.Item key={'@' + v.nickname} value={v.nickname}>
            {!v.Image ? (
              <Avatar>{v.nickname[0]}</Avatar>
            ) : (
              <Avatar src={v.Image.src} />
            )}
            <span style={{ marginLeft: '10px' }}>
              <b>{v.nickname}</b>
            </span>
          </Menu.Item>
        ))}
        {(hashtagList || []).map((v, i) => (
          <Menu.Item key={'#' + v.name} value={v.name}>
            <Avatar style={{ backgroundColor: '#3897f0' }}>#</Avatar>
            <span style={{ marginLeft: '10px' }}>
              <b>{v.name}</b>
            </span>
          </Menu.Item>
        ))}
      </Menu>
    );
  };

  return (
    <Dropdown
      overlay={menu(searchList)}
      visible={finded}
      placement="bottomCenter"
      // onVisibleChange={handleVisibleChange}
      overlayStyle={{
        maxHeight: '362px',
        overflowX: 'hidden',
        overflowY: 'auto',
        padding: 0,
        position: 'fixed',
      }}
    >
      <Search
        onSearch={handleSearch}
        placeholder={placeholder}
        loading={searching}
        value={searchValue}
        onChange={handleChange}
      />
    </Dropdown>
  );
});

export default SearchForm;
