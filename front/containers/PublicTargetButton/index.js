import React from 'react';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSortDown,
  faGlobeAsia,
  faUserFriends,
  faLock,
} from '@fortawesome/free-solid-svg-icons';

const PublicTargetButton = () => {
  const { userPublicTarget } = useSelector(state => state.user);

  let preIcon = null;
  if (userPublicTarget === '전체 공개') {
    preIcon = <FontAwesomeIcon icon={faGlobeAsia} />;
  } else if (userPublicTarget === '팔로우들만') {
    preIcon = <FontAwesomeIcon icon={faUserFriends} />;
  } else if (userPublicTarget === '나만 보기') {
    preIcon = <FontAwesomeIcon icon={faLock} />;
  }
  // const publicTarget = publicTarget => {
  //     let icon;
  //     if (publicTarget === '전체 공개') {
  //       icon = <FontAwesomeIcon icon={faGlobeAsia} />;
  //     } else if (publicTarget === '팔로우들만') {
  //       icon = <FontAwesomeIcon icon={faUserFriends} />;
  //     } else {
  //       icon = <FontAwesomeIcon icon={faLock} />;
  //     }
  //     return (
  //       <>
  //         {icon}&nbsp;
  //         {publicTarget} &nbsp; <FontAwesomeIcon icon={faSortDown} />
  //       </>
  //     );
  //   };

  return <Button>{preIcon}&nbsp;</Button>;
};

export default PublicTargetButton;
