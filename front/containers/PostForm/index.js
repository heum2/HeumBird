import React, { useState, memo, useCallback, useRef } from 'react';
import { Form, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';

import { Card, PostText } from './style';

const PostForm = memo(() => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const { isAddingPost } = useSelector(state => state.post);
  const imageInput = useRef();
  const hashtagRegex = /\#([0-9a-zA-Z가-힣]*)\s/;

  const onSubmitForm = useCallback(e => {
    e.preventDefault();
  }, []);

  const onChangeTextArea = useCallback(e => {
    console.log(e.currentTarget.innerText);
    // const { value } = e.target;
    setText(e.currentTarget.innerText);
    // if (value.match(hashtagRegex)) {
    // } else {
    // }
  }, []);

  const onChangeImages = useCallback(e => {}, []);

  const onClickImageUpload = useCallback(() => {}, []);

  return (
    <Card>
      <Form encType="multipart/form-data" onSubmit={onSubmitForm}>
        <div
          contentEditable="true"
          placeholder="무슨 일이 일어나고 있나요?"
          className="postTextInput"
          suppressContentEditableWarning={true}
          onInput={onChangeTextArea}
        ></div>
        <div className="postTextOutput">{text}</div>
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
