import React, { useState, useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import { CommentDiv } from './style';

const CommentForm = () => {
  const [text, setText] = useState('');
  const onChangeTextArea = useCallback(() => {}, []);

  return (
    <CommentDiv>
      <Form layout="inline">
        <Form.Item
          wrapperCol={{ sm: 24 }}
          style={{
            width: '90%',
            marginBottom: 0,
            marginRight: 0,
          }}
        >
          <Input.TextArea
            autoSize
            value={text}
            onChange={onChangeTextArea}
            className="comentTextarea"
            placeholder="댓글 달기..."
          ></Input.TextArea>
        </Form.Item>
        <Form.Item
          wrapperCol={{ sm: 24 }}
          style={{ width: '10%', marginRight: 0 }}
        >
          <Button
            type="link"
            htmlType="submit"
            style={{ paddingRight: 0 }}
            disabled={true}
          >
            <b>게시</b>
          </Button>
        </Form.Item>
      </Form>
    </CommentDiv>
  );
};

export default CommentForm;
