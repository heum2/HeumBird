import React, { memo, useState, useCallback, useEffect } from 'react';
import { Dropdown, Menu, Avatar } from 'antd';
import { useSelector } from 'react-redux';
import PostLoader from '../../components/PostLoader';

const SearchDropdown = memo(
  ({
    placement,
    finded,
    setFinded,
    handleMenuClick,
    children,
    position,
    searching,
  }) => {
    const [searchList, setSearchList] = useState('user');
    const { usersList } = useSelector(state => state.user);
    const { hashtagList } = useSelector(state => state.post);

    useEffect(() => {
      if (usersList.length && hashtagList.length) {
        setSearchList('usertag'); // 유저, 태그 리스트
      } else if (!!usersList.length) {
        setSearchList('user'); // 유저리스트
      } else if (!!hashtagList.length) {
        setSearchList('tag'); // 태그리스트
      } else {
        setFinded(false);
      }
    }, [usersList.length, hashtagList.length]);

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
      } else if (value === 'usertag') {
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
      }
    };

    const loading = (
      <Menu>
        <Menu.Item>
          <PostLoader />
        </Menu.Item>
      </Menu>
    );

    return (
      <Dropdown
        overlay={searching ? loading : menu(searchList)}
        visible={finded}
        placement={placement}
        trigger={['click']}
        onVisibleChange={handleVisibleChange}
        overlayStyle={{
          maxHeight: '362px',
          overflowX: 'hidden',
          overflowY: 'auto',
          padding: 0,
          position: position,
          zIndex: position === 'fixed' ? 100 : 0,
        }}
      >
        {children}
      </Dropdown>
    );
  },
);

export default SearchDropdown;
