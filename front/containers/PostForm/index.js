import React, { useState, memo, useCallback, useRef, useEffect } from 'react';
import { Form, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import Editor from 'draft-js-plugins-editor';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import { EditorState, convertFromRaw } from 'draft-js';

import { Card, DraftEditor } from './style';

const hashtagPlugin = createHashtagPlugin();
const plugins = [hashtagPlugin];

const emptyContentState = convertFromRaw({
  entityMap: {},
  blocks: [
    {
      text: '',
      key: 'foo',
      type: 'unstyled',
      entityRanges: [],
    },
  ],
});

const PostForm = memo(() => {
  useEffect;
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(emptyContentState),
  );
  // const [testeditor, setTestEditor] = useState(createEditorStateWithText(text));
  // const [placeholderState, setPlaceholderState] = useState('block');
  const { isAddingPost } = useSelector(state => state.post);
  const imageInput = useRef();
  const hashtagRegex = /\#([0-9a-zA-Z가-힣]*)\s/;

  const onSubmitForm = useCallback(e => {
    e.preventDefault();
  }, []);

  const onChangeTextArea = useCallback(
    e => {
      const { innerText } = e.currentTarget;
      if (innerText.length > 0) {
        setPlaceholderState('none');
      } else {
        setPlaceholderState('block');
      }

      setText(innerText);
      // if (value.match(hashtagRegex)) {
      // } else {
      // }
    },
    [text],
  );

  const onChangeEditor = editorState => {
    setEditorState(editorState);
  };

  const onChangeImages = useCallback(e => {}, []);

  const onClickImageUpload = useCallback(() => {}, []);

  return (
    <>
      {console.log('렌더링 확인!')}
      {/* <DraftEditor> */}
      <Editor
        placeholder="여기다가 쓰세요!"
        editorKey="foobaz"
        editorState={editorState}
        onChange={onChangeEditor}
        plugins={plugins}
      />
      {/* </DraftEditor> */}
      {/* <div
        style={{
          background: 'white',
          boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
          transition: '0.3s',
          margin: '0px -1px 60px',
          display: 'relative',
          width: '100%',
        }}
      >
        <Form>
          <Editor
            editorKey="editor"
            editorState={editorState}
            onChange={onChangeEditor}
            plugins={plugins}
          /> */}
      {/* <div
            contentEditable="true"
            onInput={onChangeTextArea}
            style={{
              position: 'absolute',
              cursor: 'text',
              width: '100%',
              border: 'none',
              padding: '2px',
              textAlign: 'left',
              zIndex: 1,
            }}
          ></div>
          <div
            style={{
              width: '100%',
              pointerEvents: 'none',
              padding: '2px',
              textAlign: 'left',
              zIndex: 2,
            }}
          >
            {text}
          </div>
          <div
            style={{
              color: '#999',
              pointerEvents: 'none',
              display: placeholderState,
            }}
          >
            무슨 일이 일어나고 있나요?
          </div> */}
      {/* <div
            style={{
              position: 'relative',
            }}
          >
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
              style={{ marginLeft: '2%' }}
            >
              <FontAwesomeIcon icon={faImage} size={'lg'} />
            </Button>
            <Button
              type="primary"
              shape="round"
              htmlType="submit"
              loading={isAddingPost}
            >
              흐밋
            </Button>
          </div>
        </Form>
      </div> */}

      {/* <Card>
        <Form
          encType="multipart/form-data"
          onSubmit={onSubmitForm}
          style={{ display: 'relative' }}
        >
          <div
            contentEditable="true"
            placeholder="무슨 일이 일어나고 있나요?"
            className="postTextInput"
            suppressContentEditableWarning={true}
            onInput={onChangeTextArea}
          ></div>
          <div className="postTextOutput">{text}</div>
          <div className="uploadButton">
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
            >
              <FontAwesomeIcon icon={faImage} size={'lg'} />
            </Button>
            <Button
              type="primary"
              shape="round"
              htmlType="submit"
              loading={isAddingPost}
            >
              흐밋
            </Button>
          </div> */}
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
      {/* </Form>
      </Card> */}
    </>
  );
});

export default PostForm;
