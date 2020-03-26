import React, { useState, useCallback, useEffect } from 'react';
import { Form, Button, Input } from 'antd';
import { CommentDiv } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { FIND_USER_REQUEST } from '../../reducers/user';
import { ADD_COMMENT_REQUEST, FIND_HASHTAG_REQUEST } from '../../reducers/post';
import SearchDropdown from '../SearchDropdown';
const { TextArea } = Input;

const CommentForm = ({ postId, textRef }) => {
  const [disabled, setDisabled] = useState(true);
  const [searching, setSearching] = useState(false);
  const [text, setText] = useState('');
  const [finded, setFinded] = useState(false);
  const { userCommnetSearching } = useSelector(state => state.user);
  const {
    isAddingComment,
    commentAdded,
    hashtagCommentSearching,
  } = useSelector(state => state.post);
  const dispatch = useDispatch();
  const peopleTagReg = /(?<=@)[^@\s]+$/g;
  const hashTagReg = /(?<=#)[^#\s]+$/g;

  useEffect(() => {
    if (commentAdded) {
      setText('');
      setDisabled(true);
    }
  }, [commentAdded]);

  useEffect(() => {
    setSearching(userCommnetSearching || hashtagCommentSearching);
  }, [userCommnetSearching, hashtagCommentSearching]);

  const handleChange = useCallback(e => {
    e.persist();
    const { value } = e.target;
    setText(value);
    if (!value) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }

    const peopleTag = value.match(peopleTagReg);
    const hashTag = value.match(hashTagReg);

    if (peopleTag) {
      const nickname = peopleTag[peopleTag.length - 1];
      dispatch({
        type: FIND_USER_REQUEST,
        data: nickname,
      });
      dispatch({
        type: FIND_HASHTAG_REQUEST,
        data: undefined,
      });
      setFinded(true);
    } else if (value.match(/@$/g)) {
      dispatch({
        type: FIND_USER_REQUEST,
        data: undefined,
      });
      setFinded(false);
    }
    if (hashTag) {
      const name = hashTag[hashTag.length - 1];
      dispatch({
        type: FIND_HASHTAG_REQUEST,
        data: name,
      });
      dispatch({
        type: FIND_USER_REQUEST,
        data: undefined,
      });
      setFinded(true);
    } else if (value.match(/#$/g)) {
      dispatch({
        type: FIND_HASHTAG_REQUEST,
        data: undefined,
      });
      setFinded(false);
    }
  }, []);

  const handleMenuClick = useCallback(
    ({ key }) => {
      const people = text.match(/@[^@\s]+/g);
      const hash = text.match(/#[^#\s]+/g);
      let index;
      let replaceStr = '';
      if (key.match(peopleTagReg)) {
        index = text.lastIndexOf(people[people.length - 1]);
        replaceStr =
          text.substr(0, index) + key + ' ' + text.substr(index + key.length);
      } else if (key.match(hashTagReg)) {
        index = text.lastIndexOf(hash[hash.length - 1]);
        replaceStr =
          text.substr(0, index) + key + ' ' + text.substr(index + key.length);
      }
      setText(replaceStr);
      textRef.current.focus();
      setFinded(false);
    },
    [text],
  );

  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();
      dispatch({
        type: ADD_COMMENT_REQUEST,
        data: {
          postId,
          content: text,
        },
      });
    },
    [text],
  );

  return (
    <CommentDiv>
      <Form layout="inline" onSubmit={onSubmitForm}>
        <Form.Item
          wrapperCol={{ sm: 24 }}
          style={{
            width: '90%',
            marginBottom: 0,
            marginRight: 0,
          }}
        >
          <SearchDropdown
            placement={'topCenter'}
            finded={finded}
            setFinded={setFinded}
            handleMenuClick={handleMenuClick}
            position={'absolute'}
            searching={searching}
          >
            <TextArea
              style={{ resize: 'none', border: 'none', boxShadow: 'none' }}
              value={text}
              onChange={handleChange}
              placeholder="댓글 달기..."
              autoSize
              ref={textRef}
            />
          </SearchDropdown>
        </Form.Item>
        <Form.Item style={{ width: '10%', marginRight: 0 }}>
          <Button
            type="link"
            htmlType="submit"
            disabled={disabled}
            loading={isAddingComment}
            style={{ padding: 0 }}
          >
            <b>게시</b>
          </Button>
        </Form.Item>
      </Form>
    </CommentDiv>
  );
};

export default CommentForm;
