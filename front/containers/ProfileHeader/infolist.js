import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProfileOption from '../../components/ProfileOption';
import FollowListLayout from '../../components/FollowListLayout';
import { List } from './style';
import {
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
} from '../../reducers/user';

const InfoList = () => {
  const {
    userInfo,
    followerList,
    followingList,
    hasMoreFollow,
    me,
  } = useSelector(state => state.user);
  const [followModal, setFollowModal] = useState(false);
  const [titlename, setTitlename] = useState('');
  const [followList, setFollowList] = useState(null);
  const dispatch = useDispatch();
  const countRef = [];

  const showFollowerModal = useCallback(
    (name, list) => e => {
      setTitlename(name);
      setFollowModal(true);
      setFollowList(list);
    },
    [],
  );

  useEffect(() => {
    if (followModal) {
      titlename === '팔로우'
        ? setFollowList(followerList)
        : setFollowList(followingList);
    }
  }, []); // 조건에 따라, 변경 되거나 안되게 해줘야하는데..

  useEffect(() => {
    return () => setFollowModal(false);
  }, [followerList, followingList]);

  const hideFollowerModal = useCallback(e => {
    setFollowModal(false);
  }, []);

  const handleScroll = useCallback(
    (followList, titlename) => e => {
      if (
        e.target.scrollTop + e.target.clientHeight >
        e.target.scrollHeight - 10
      ) {
        if (followList.length && hasMoreFollow) {
          const lastId = followList[followList.length - 1].id;
          if (!countRef.includes(lastId)) {
            titlename === '팔로우'
              ? dispatch({
                  type: LOAD_FOLLOWERS_REQUEST,
                  data: userInfo.nickname,
                  offset: followList.length,
                })
              : dispatch({
                  type: LOAD_FOLLOWINGS_REQUEST,
                  data: userInfo.nickname,
                  offset: followList.length,
                });
            countRef.push(lastId);
          }
        }
      }
    },
    [followList, titlename, hasMoreFollow],
  );

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
            <span className="profile-stat-count">
              {me.nickname === userInfo.nickname
                ? me.Followers.length
                : userInfo.Followers}
            </span>
          </li>
          <li
            className="li-pointer"
            onClick={showFollowerModal('팔로잉', followingList)}
          >
            팔로우{' '}
            <span className="profile-stat-count">
              {me.nickname === userInfo.nickname
                ? me.Followings.length
                : userInfo.Followings}
            </span>
          </li>
        </ul>
      </div>
      <ProfileOption
        titlename={titlename}
        visible={followModal}
        invisible={hideFollowerModal}
        close={true}
      >
        <List onScroll={handleScroll(followList, titlename)}>
          <ul>
            <div>
              {followList !== null &&
                followList.map((v, i) => (
                  <li key={i}>
                    <FollowListLayout value={v} />
                  </li>
                ))}
            </div>
          </ul>
        </List>
      </ProfileOption>
    </>
  );
};

export default InfoList;
