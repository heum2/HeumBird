import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import ProfileOption from '../../components/ProfileOption';
import FollowListLayout from '../../components/FollowListLayout';
import { List } from './style';

const InfoList = () => {
  const { userInfo, followerList, followingList } = useSelector(
    state => state.user,
  );
  const [followerModal, setFollowerModal] = useState(false);
  const [titlename, setTitlename] = useState('');
  const [followList, setFollowList] = useState(null);
  const showFollowerModal = useCallback(
    (name, list) => e => {
      setTitlename(name);
      setFollowerModal(true);
      setFollowList(list);
    },
    [followerList, followingList],
  );

  const hideFollowerModal = useCallback(e => {
    setFollowerModal(false);
  }, []);

  return (
    <>
      <div className="profile-stats">
        <ul>
          <li>
            게시물 <span className="profile-stat-count">{userInfo.Posts}</span>
          </li>
          <li
            className="li-pointer"
            onClick={showFollowerModal('팔로우', followerList)}
          >
            팔로워{' '}
            <span className="profile-stat-count">{userInfo.Followers}</span>
          </li>
          <li
            className="li-pointer"
            onClick={showFollowerModal('팔로잉', followingList)}
          >
            팔로우{' '}
            <span className="profile-stat-count">{userInfo.Followings}</span>
          </li>
        </ul>
      </div>
      <ProfileOption
        titlename={titlename}
        visible={followerModal}
        invisible={hideFollowerModal}
        close={true}
      >
        <List>
          <ul>
            {followList !== null &&
              followList.map((v, i) => (
                <div key={i}>
                  <li>
                    <FollowListLayout value={v} />
                  </li>
                </div>
              ))}
          </ul>
        </List>
      </ProfileOption>
    </>
  );
};

export default InfoList;
