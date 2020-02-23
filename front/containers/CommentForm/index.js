import React, { useState, useCallback, useEffect } from 'react';
import { Form, Button, Mentions, Avatar } from 'antd';
import { CommentDiv } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../../reducers/post';

const CommentForm = ({ postId }) => {
  const [text, setText] = useState('');
  const [disabled, setDisabled] = useState(true);
  const { Option } = Mentions;
  const dispatch = useDispatch();
  const { isAddingComment, commentAdded } = useSelector(state => state.post);

  useEffect(() => {
    if (commentAdded) {
      setText('');
    }
  }, [commentAdded]);

  const onChangeMentions = useCallback(value => {
    setText(value);
    if (value.length != 0) {
      setDisabled(false);
      //metions 비동기로 ex) @a -> a가 들어가 있는 유저목록(nickname) #a -> a가 들어가 있는 가장 많은 게시물의 해쉬태그 목록 포함 최대 54개
    } else {
      setDisabled(true);
    }
  }, []);

  const onSelectMentions = useCallback(option => {
    console.log('select', option);
  }, []);

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
          <Mentions
            className="mentions"
            placeholder="댓글 달기..."
            vlaue={text}
            onChange={onChangeMentions}
            onSelect={onSelectMentions}
            prefix={['@', '#']}
          >
            <Option value="afc163">
              <Avatar>흠</Avatar>afc163
            </Option>
            <Option value="zombieJ">zombieJ</Option>
            <Option value="yesmeck">yesmeck</Option>
          </Mentions>
        </Form.Item>
        <Form.Item
          wrapperCol={{ sm: 24 }}
          style={{ width: '10%', marginRight: 0 }}
        >
          <Button
            type="link"
            htmlType="submit"
            disabled={disabled}
            loading={isAddingComment}
          >
            <b>게시</b>
          </Button>
        </Form.Item>
      </Form>
    </CommentDiv>
  );
};

export default CommentForm;
