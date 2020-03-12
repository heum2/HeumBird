import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  FOLLOW_USER_REQUEST,
  UNFOLLOW_USER_REQUEST,
} from '../../reducers/user';
import { Button } from './style';

const FollowButton = ({ userId }) => {
  const { me } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const onFollow = useCallback(
    userId => () => {
      dispatch({
        type: FOLLOW_USER_REQUEST,
        data: userId,
      });
    },
    [],
  );
  const onUnfollow = useCallback(
    userId => () => {
      dispatch({
        type: UNFOLLOW_USER_REQUEST,
        data: userId,
      });
    },
    [],
  );
  return !me || userId === me.id ? null : me.Followings &&
    me.Followings.find(v => v.id === userId) ? (
    <Button onClick={onUnfollow(userId)}>팔로잉</Button>
  ) : (
    <Button onClick={onFollow(userId)} follow>
      팔로우
    </Button>
  );
};

FollowButton.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default FollowButton;
