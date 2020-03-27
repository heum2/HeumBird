import React, { memo } from 'react';
import Link from 'next/link';
import { Row, Col, Avatar } from 'antd';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCompass as regularCompass,
  faHeart as regularHeart,
} from '@fortawesome/free-regular-svg-icons';
import {
  faCompass as solidCompass,
  faHeart as solidHeart,
} from '@fortawesome/free-solid-svg-icons';
import { LogoImg, Luckiest, ALink } from './style';
import SearchContainer from '../../containers/SearchContainer';

const AppLayoutHeader = memo(({ page }) => {
  const { me } = useSelector(state => state.user);

  return (
    <>
      {me && (
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
            <SearchContainer />
          </Col>
          <Col xs={11} sm={{ offset: 0, span: 11 }} md={{ offset: 1, span: 5 }}>
            <Link href="/explore" passHref>
              <ALink>
                {page === 'Explore' ? (
                  <FontAwesomeIcon
                    icon={solidCompass}
                    style={{
                      height: '24px',
                      width: '24px',
                      verticalAlign: 'middle',
                    }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={regularCompass}
                    style={{
                      height: '24px',
                      width: '24px',
                      verticalAlign: 'middle',
                    }}
                  />
                )}
              </ALink>
            </Link>
            &emsp;&emsp;
            <Link href="/like">
              <ALink>
                {page === 'Like' ? (
                  <FontAwesomeIcon
                    icon={solidHeart}
                    style={{
                      height: '24px',
                      width: '24px',
                      verticalAlign: 'middle',
                    }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={regularHeart}
                    style={{
                      height: '24px',
                      width: '24px',
                      verticalAlign: 'middle',
                    }}
                  />
                )}
              </ALink>
            </Link>
            &emsp;&emsp;
            <Link
              href={{ pathname: '/profile', query: { nickname: me.nickname } }}
              as={`/profile/${me.nickname}`}
              passHref
            >
              <ALink>
                {me.Image ? (
                  <Avatar
                    src={me.Image.src}
                    style={{ height: '24px', width: '24px' }}
                  />
                ) : (
                  <Avatar style={{ height: '24px', width: '24px' }}>
                    {me.offsetnickname[0]}
                  </Avatar>
                )}
              </ALink>
            </Link>
          </Col>
        </Row>
      )}
    </>
  );
});

export default AppLayoutHeader;
