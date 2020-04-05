import React, { useEffect, useState, useCallback } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Title, Content } from '../styled/suggested';
import FollowListLayout from '../components/FollowListLayout';
import {
  LOAD_SUGGESTED_OTHER_REQUEST,
  LOAD_SUGGESTED_FOLLOW_REQUEST,
} from '../reducers/user';
const Suggested = () => {
  const [suggestedList, setSuggestedList] = useState(null);
  const {
    me,
    suggestedOtherList,
    hasMoreSuggestedOther,
    suggestedFollowList,
    hasMoreSuggestedFollow,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (suggestedOtherList.length && suggestedFollowList.length) {
      let result = suggestedOtherList.concat(suggestedFollowList);
      result = result.filter(
        (thing, index, self) =>
          index === self.findIndex((t) => t.id === thing.id),
      );
      setSuggestedList(result);
    } else if (suggestedOtherList.length) {
      setSuggestedList(suggestedOtherList);
    } else if (suggestedFollowList.length) {
      setSuggestedList(suggestedFollowList);
    }
  }, [suggestedOtherList, suggestedFollowList]);

  const onScroll = useCallback(() => {
    if (
      window.scrollY + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 300
    ) {
      let offset;
      if (suggestedOtherList.length && hasMoreSuggestedOther) {
        offset = suggestedOtherList.length;
        dispatch({
          type: LOAD_SUGGESTED_OTHER_REQUEST,
          offset,
        });
      }
      if (suggestedFollowList.length && hasMoreSuggestedFollow) {
        offset = suggestedFollowList.length;
        dispatch({
          type: LOAD_SUGGESTED_OTHER_REQUEST,
          offset,
        });
      }
    }
  }, [
    suggestedOtherList.length,
    hasMoreSuggestedOther,
    suggestedFollowList.length,
    hasMoreSuggestedFollow,
  ]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [suggestedOtherList, suggestedFollowList]);

  useEffect(() => {
    if (!me) {
      Router.push('/');
    }
  }, [me]);

  return (
    <Layout>
      <Title>
        <h4>추천</h4>
      </Title>
      <Content>
        <div
          style={{
            height: 'auto',
            overflow: 'hidden auto',
            display: 'flex',
            width: '100%',
          }}
        >
          <div
            style={{
              flexDirection: 'column',
              paddingBottom: 0,
              paddingTop: 0,
              display: 'flex',
              width: '100%',
            }}
          >
            {!!suggestedList &&
              suggestedList.map((v, i) => (
                <FollowListLayout key={i} value={v} />
              ))}
          </div>
        </div>
      </Content>
    </Layout>
  );
};

Suggested.getInitialProps = async (context) => {
  const state = context.store.getState();
  context.store.dispatch({
    type: LOAD_SUGGESTED_OTHER_REQUEST,
    data: state.user.me && state.user.me.id,
  });
  context.store.dispatch({
    type: LOAD_SUGGESTED_FOLLOW_REQUEST,
    data: state.user.me && state.user.me.id,
  });
};

export default Suggested;
