import React, { useState, memo, useCallback, useRef } from 'react';
import { Form, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';

import { Card } from './style';

const PostForm = memo(() => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const { isAddingPost } = useSelector(state => state.post);
  const imageInput = useRef();

  const onSubmitForm = useCallback(e => {
    e.preventDefault();
  }, []);

  const onChangeTextArea = useCallback(e => {
    setText(e.target.value);
  }, []);

  const onChangeImages = useCallback(e => {}, []);

  const onClickImageUpload = useCallback(() => {}, []);

  return (
    <Card>
      <Form encType="multipart/form-data" onSubmit={onSubmitForm}>
        <Input.TextArea
          className="comentTextarea"
          maxLength={140}
          placeholder="무슨 일이 일어나고 있나요?"
          value={text}
          onChange={onChangeTextArea}
        />
        <div>
          <input
            type="file"
            multiple
            hidden
            ref={imageInput}
            onChange={onChangeImages}
          />
          <Button
            type="link"
            shape="circle"
            onClick={onClickImageUpload}
            size="large"
            style={{ marginLeft: 10 }}
          >
            <FontAwesomeIcon icon={faImage} size={'lg'} />
          </Button>
          <Button
            type="primary"
            style={{ float: 'right', marginRight: 10 }}
            shape="round"
            htmlType="submit"
            loading={isAddingPost}
          >
            흐밋
          </Button>
        </div>
        {/* <div>
        {imagePaths.map((v, i) => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img src={v} style={{ width: '200px' }} alt={v} />
            <div>
              <Button onClick={onRemoveImage(i)}>제거</Button>
            </div>
          </div>
        ))}
      </div> */}
      </Form>
    </Card>
  );
});

export default PostForm;
