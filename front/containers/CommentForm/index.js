import React, { useState, useCallback, useEffect } from 'react';
import { Form, Button, Input } from 'antd';
import { CommentDiv } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../../reducers/post';
const { TextArea } = Input;

const CommentForm = ({ postId, textRef }) => {
  const [text, setText] = useState('');
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();
  const { isAddingComment, commentAdded } = useSelector(state => state.post);
  // const peopleTagReg = /@[^\s]+/g;
  // const hashTagReg = /#[^\s]+/g;
  useEffect(() => {
    if (commentAdded) {
      setText('');
      setDisabled(true);
    }
  }, [commentAdded]);

  // const handleChange = useCallback(e => {
  //   e.persist();
  //   const { value } = e.target;
  //   setText(value);
  //   if (!value.trim()) {
  //     dispatch({
  //       type: FIND_USER_REQUEST,
  //       data: undefined,
  //     });
  //     dispatch({
  //       type: FIND_HASHTAG_REQUEST,
  //       data: undefined,
  //     });
  //   } else if (value.match(peopleTagReg)) {
  //     dispatch({
  //       type: FIND_USER_REQUEST,
  //       data: value.split('@')[1],
  //     });
  //   } else if (value.match(hashTagReg)) {
  //     dispatch({
  //       type: FIND_HASHTAG_REQUEST,
  //       data: value.split('#')[1],
  //     });
  //   } else if (value.substr(0, 1) !== '#' && value.substr(0, 1) !== '@') {
  //     dispatch({
  //       type: FIND_HASHTAG_REQUEST,
  //       data: value,
  //     });
  //     dispatch({
  //       type: FIND_USER_REQUEST,
  //       data: value,
  //     });
  //   }
  // }, []);

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
          {/* <SearchDropdown placement={'topCenter'} /> */}
          <TextArea
            style={{ resize: 'none', border: 'none', boxShadow: 'none' }}
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="댓글 달기..."
            autoSize
          ></TextArea>
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
