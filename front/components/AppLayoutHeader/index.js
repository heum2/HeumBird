import React, { useCallback, useState, memo, useEffect } from 'react';
import Link from 'next/link';
import { Row, Col, Input } from 'antd';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCompass as regularCompass,
  faHeart as regularHeart,
  faUser as regularUser,
} from '@fortawesome/free-regular-svg-icons';
import {
  faCompass as solidCompass,
  faHeart as solidHeart,
  faUser as solidUser,
} from '@fortawesome/free-solid-svg-icons';
import { LogoImg, Luckiest, ALink } from './style';

const AppLayoutHeader = memo(({ page }) => {
  const [explore, setExplore] = useState(false);
  const [profile, setProfile] = useState(false);
  const { me } = useSelector(state => state.user);

  useEffect(() => {
    if (page === 'Explore') {
      setProfile(false);
      setExplore(true);
    } else if (page === 'Profile') {
      setExplore(false);
      setProfile(true);
    } else {
      setExplore(false);
      setProfile(false);
    }
  }, [page]);

  const onSearchInput = useCallback(value => {
    console.log(value);
  }, []);

  return (
    <Row type="flex" justify="center" align="middle">
      <Col xs={13} sm={13} md={6} lg={4}>
        <Link href="/main">
          <a>
            <Luckiest>
              <LogoImg src="/favicon.png" /> HeumBird
            </Luckiest>
          </a>
        </Link>
      </Col>
      <Col xs={0} sm={0} md={{ offset: 1, span: 4 }} xl={{ offset: 0 }}>
        <Input.Search
          placeholder="검색"
          onSearch={onSearchInput}
        ></Input.Search>
      </Col>
      <Col xs={11} sm={{ offset: 0, span: 11 }} md={{ offset: 1, span: 5 }}>
        <Link href="/explore" passHref>
          <ALink>
            {explore ? (
              <FontAwesomeIcon
                icon={solidCompass}
                style={{ height: '24', width: '24' }}
              />
            ) : (
              <FontAwesomeIcon
                icon={regularCompass}
                style={{ height: '24', width: '24' }}
              />
            )}
          </ALink>
        </Link>
        &emsp;&emsp;
        <FontAwesomeIcon
          icon={regularHeart}
          style={{
            height: '24',
            width: '24',
            color: 'rgb(38, 38, 38)',
            cursor: 'pointer',
          }}
          onClick={() => {
            console.log('hi');
          }}
        />
        &emsp;&emsp;
        <Link
          href={{ pathname: '/profile', query: { nickname: me.nickname } }}
          as={`/profile/${me.nickname}`}
          passHref
        >
          <ALink>
            {profile ? (
              <FontAwesomeIcon
                icon={solidUser}
                style={{ height: '24', width: '24' }}
              />
            ) : (
              <FontAwesomeIcon
                icon={regularUser}
                style={{ height: '24', width: '24' }}
              />
            )}
          </ALink>
        </Link>
      </Col>
    </Row>
  );
});

export default AppLayoutHeader;
