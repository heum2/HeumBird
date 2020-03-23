import React, { memo, useState, useCallback, useEffect } from 'react';
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
    if (!!usersList.length) {
      setSearchList('user');
      console.log('유저목록 들어가라');
    } else if (!!hashtagList.length) {
      setSearchList('tag');
      console.log('태그목록 들어가라');
    }
  }, [usersList, hashtagList]);

  const handleChange = useCallback(e => {
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
      console.log('그냥 검색');
    }
  }, []);

  const handleSearch = useCallback(
    value => {
      console.log(`값 확인 : ${value}`);
    },
    [searchValue],
  );

  const handleMenuClick = useCallback(e => {
    console.log('click: ', e.key);
    setSearchValue(e.key);
    setFinded(false);
  }, []);

  const handleBlur = useCallback(e => {
    setFinded(false);
  }, []);

  const menu = value => {
    if (value === 'user') {
      return (
        <Menu onClick={handleMenuClick} onBlur={handleBlur}>
          {(usersList || []).map((v, i) => (
            <Menu.Item key={v.nickname} value={v.nickname}>
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
        <Menu onClick={handleMenuClick} onBlur={handleBlur}>
          {(hashtagList || []).map((v, i) => (
            <Menu.Item key={v.name} value={v.name}>
              {v.name}
            </Menu.Item>
          ))}
        </Menu>
      );
    }
    return (
      <Menu onClick={handleMenuClick} onBlur={handleBlur}>
        <Menu.Item>1st menu item</Menu.Item>
        <Menu.Item>2nd menu item</Menu.Item>
        <Menu.Item>3rd menu item</Menu.Item>
      </Menu>
    );
  };

  return (
    <Dropdown
      overlay={menu(searchList)}
      visible={finded}
      placement="bottomCenter"
      overlayStyle={{
        maxHeight: '362px',
        overflowX: 'hidden',
        overflowY: 'auto',
        padding: 0,
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
