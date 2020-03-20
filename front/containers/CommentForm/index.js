import React, { useState, useCallback, useEffect } from 'react';
import { Form, Button, Mentions, Avatar } from 'antd';
import { CommentDiv } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../../reducers/post';
const { Option } = Mentions;

const CommentForm = ({ postId, textRef }) => {
  const [text, setText] = useState('');
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();
  const { isAddingComment, commentAdded } = useSelector(state => state.post);

  useEffect(() => {
    if (commentAdded) {
      setText('');
      setDisabled(true);
    }
  }, [commentAdded]);

  const onChangeMentions = useCallback(value => {
    setText(value);
    if (value.length != 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, []);

  const onSelectMentions = useCallback(option => {}, []);

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

  const onTextarea = e => {
    console.log('hi');
  };

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
          <Mentions
            className="mentions"
            placeholder="댓글 달기..."
            value={text}
            onChange={onChangeMentions}
            onSelect={onSelectMentions}
            prefix={['']}
            ref={textRef}
          >
            <Option value="afc163">
              <Avatar>흠</Avatar>afc163
            </Option>
            <Option value="zombieJ">zombieJ</Option>
            <Option value="yesmeck">yesmeck</Option>
          </Mentions>
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
