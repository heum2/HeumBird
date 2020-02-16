import React, { useState, memo, useCallback, useRef, useEffect } from 'react';
import { Form, Button, Dropdown, Menu } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import {
  faSortDown,
  faGlobeAsia,
  faUserFriends,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import Editor from 'draft-js-plugins-editor';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';

import { Card } from './style';

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
  const dispatch = useDispatch();
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(emptyContentState),
  );
  const editor = useRef(null);
  const { isAddingPost } = useSelector(state => state.post);
  const imageInput = useRef();

  const onSubmitForm = useCallback(e => {
    e.preventDefault();
  }, []);

  const renderContentAsRawJs = () => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    console.log(raw.blocks[0].text);
    return JSON.stringify(raw, null, 2);
  };

  const onChangeEditor = editorState => {
    setEditorState(editorState);
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    console.log(raw.blocks[0].text.length);
  };

  const focus = useCallback(() => {
    if (editor.current) editor.current.focus();
  }, []);

  const onClickMenu = useCallback(({ key }) => {
    console.log('click', key);
  }, []);

  const menu = (
    <Menu onClick={onClickMenu}>
      <Menu.Item key="2">
        <FontAwesomeIcon icon={faGlobeAsia} />
        전체 공개
      </Menu.Item>
      <Menu.Item key="1">
        <FontAwesomeIcon icon={faUserFriends} />
        팔로우들만
      </Menu.Item>
      <Menu.Item key="0">
        <FontAwesomeIcon icon={faLock} />
        나만 보기
      </Menu.Item>
    </Menu>
  );

  const onChangeImages = useCallback(e => {}, []);

  const onClickImageUpload = useCallback(() => {}, []);

  return (
    <>
      <div
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
          <div style={{ padding: '5px' }}>
            <Editor
              placeholder="무슨 일이 일어나고 있나요?"
              editorKey="foobaz"
              editorState={editorState}
              onChange={onChangeEditor}
              plugins={plugins}
              ref={editor}
            />
          </div>
          <input
            type="file"
            multiple
            hidden
            ref={imageInput}
            onChange={onChangeImages}
          />
          <div align="left" style={{ padding: 2, margin: 'auto' }}>
            <Button type="link" onClick={onClickImageUpload} size="large">
              <FontAwesomeIcon icon={faImage} size={'2x'} />
            </Button>

            <div
              style={{
                float: 'right',
                marginRight: '1%',
              }}
            >
              <Button
                type="primary"
                shape="round"
                htmlType="submit"
                loading={isAddingPost}
              >
                흐밋
              </Button>
            </div>
            <div
              style={{
                float: 'right',
                marginRight: '1%',
              }}
            >
              <Dropdown overlay={menu}>
                <Button>
                  Button &nbsp;
                  <FontAwesomeIcon icon={faSortDown} />
                </Button>
              </Dropdown>
            </div>
          </div>
        </Form>
      </div>
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
