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

import { USER_ACCESS_TARGET_REQUEST } from '../../reducers/user';
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
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(emptyContentState),
  );
  const dispatch = useDispatch();
  const { isAddingPost } = useSelector(state => state.post);
  const { me } = useSelector(state => state.user);
  const editor = useRef(null);
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

  const onClickMenu = useCallback(
    ({ key }) => {
      console.log(me.publictarget);
      if (parseInt(key) !== me.publictarget) {
        dispatch({
          type: USER_ACCESS_TARGET_REQUEST,
          data: parseInt(key),
        });
      }
    },
    [me.publictarget],
  );

  const menu = (
    <Menu onClick={onClickMenu}>
      <Menu.Item key="0">
        <FontAwesomeIcon icon={faGlobeAsia} />
        &nbsp; 전체 공개
      </Menu.Item>
      <Menu.Item key="1">
        <FontAwesomeIcon icon={faUserFriends} />
        &nbsp; 팔로우들만
      </Menu.Item>
      <Menu.Item key="2">
        <FontAwesomeIcon icon={faLock} />
        &nbsp; 나만 보기
      </Menu.Item>
    </Menu>
  );

  const publicTarget = publicTarget => {
    let icon;
    let target;
    if (publicTarget === 0) {
      icon = <FontAwesomeIcon icon={faGlobeAsia} />;
      target = '전체 공개';
    } else if (publicTarget === 1) {
      icon = <FontAwesomeIcon icon={faUserFriends} />;
      target = '팔로우들만';
    } else {
      icon = <FontAwesomeIcon icon={faLock} />;
      target = '나만 보기';
    }
    return (
      <>
        {icon} &nbsp;{target}&nbsp;
        <FontAwesomeIcon icon={faSortDown} />
      </>
    );
  };

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
              <Dropdown overlay={menu} trigger={['click']}>
                <Button>{publicTarget(me.publictarget)}</Button>
              </Dropdown>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
});

export default PostForm;
