import React, { memo, useState, useCallback, useEffect } from 'react';
import Router from 'next/router';
import { Dropdown, Menu, Avatar, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { FIND_USER_REQUEST } from '../../reducers/user';
import { FIND_HASHTAG_REQUEST } from '../../reducers/post';
const { Search } = Input;

const SearchDropdown = memo(({ placement, status }) => {
  const [finded, setFinded] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchList, setSearchList] = useState('user');
  const { usersList, userFinded, userSearching } = useSelector(
    state => state.user,
  );
  const { hashtagList, hashtagFinded, hashtagSearching } = useSelector(
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
      setSearchList('usertag'); // 유저, 태그 리스트
    } else if (!!usersList.length) {
      setSearchList('user'); // 유저리스트
    } else if (!!hashtagList.length) {
      setSearchList('tag'); // 태그리스트
    }
  }, [usersList.length, hashtagList.length]);

  const handleChange = useCallback(e => {
    e.persist();
    const { value } = e.target;
    setSearchValue(value);
    if (!value.trim()) {
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

  const handleMenuClick = useCallback(({ key }) => {
    if (status) {
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
    }
    setSearchValue(key);
    setFinded(false);
  }, []);

  const handleVisibleChange = useCallback(flag => {
    if (flag === false) {
      setFinded(false);
    }
  }, []);

  const menu = value => {
    if (value === 'user') {
      return (
        <Menu onClick={handleMenuClick}>
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
        <Menu onClick={handleMenuClick}>
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
      <Menu onClick={handleMenuClick}>
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
      placement={placement}
      trigger={['click']}
      onVisibleChange={handleVisibleChange}
      overlayStyle={{
        maxHeight: '362px',
        overflowX: 'hidden',
        overflowY: 'auto',
        padding: 0,
        position: 'fixed',
      }}
    >
      <Search
        placeholder="검색"
        loading={searching}
        value={searchValue}
        onChange={handleChange}
        allowClear={!searching}
      />
    </Dropdown>
  );
});

export default SearchDropdown;
