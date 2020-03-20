import React, { useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button, Dropdown, Menu } from 'antd';
import Editor from 'draft-js-plugins-editor';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSortDown,
  faGlobeAsia,
  faUserFriends,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import { Card } from '../PostForm/style/FormStyle';
import hashtagStyles from '../PostForm/style/hashtag.module.css';
import editorStyles from '../PostForm/style/editor.module.css';
import { EDIT_POST_REQUEST } from '../../reducers/post';

const PostEdit = ({ postId, content, visible, setVisible, publictarget }) => {
  const hashtagPlugin = createHashtagPlugin({ theme: hashtagStyles });
  const plugins = [hashtagPlugin];
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(ContentState.createFromText(content)),
  );
  const [target, setTarget] = useState(publictarget);
  const dispatch = useDispatch();
  const { isEditingPost } = useSelector(state => state.post);
  const editor = useRef(null);

  const onHideModal = () => {
    setVisible(false);
  };

  const onfocus = useCallback(() => {
    if (editor.current) editor.current.focus();
  }, []);

  const onChangeEditor = useCallback(
    editorState => {
      setEditorState(editorState);
    },
    [content],
  );

  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();
      const text = onEditorText();
      dispatch({
        type: EDIT_POST_REQUEST,
        data: {
          publictarget: target,
          content: text,
          postId: postId,
        },
      });
    },
    [editorState, target],
  );

  const onEditorText = () => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    return raw.blocks[0].text.trim();
  };

  const onClickMenu = useCallback(
    ({ key }) => {
      if (parseInt(key) !== target) {
        setTarget(parseInt(key));
      }
    },
    [target],
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
    let auth;
    if (publicTarget === 0) {
      icon = <FontAwesomeIcon icon={faGlobeAsia} />;
      auth = '전체 공개';
    } else if (publicTarget === 1) {
      icon = <FontAwesomeIcon icon={faUserFriends} />;
      auth = '팔로우들만';
    } else {
      icon = <FontAwesomeIcon icon={faLock} />;
      auth = '나만 보기';
    }
    return (
      <>
        {icon} &nbsp;{auth}&nbsp;
        <FontAwesomeIcon icon={faSortDown} />
      </>
    );
  };

  return (
    <>
      <Modal
        visible={visible}
        centered
        footer={null}
        closable={false}
        onCancel={onHideModal}
        bodyStyle={{
          padding: 0,
        }}
      >
        <Card>
          <Form onSubmit={onSubmitForm}>
            <div className={editorStyles.editor} onClick={onfocus}>
              <Editor
                placeholder="무슨 생각을 하고 계신가요?"
                editorState={editorState}
                onChange={onChangeEditor}
                plugins={plugins}
                ref={editor}
              />
            </div>
            <div align="right" style={{ padding: 2 }}>
              <div
                style={{
                  marginRight: '1%',
                }}
              >
                <Dropdown overlay={menu} trigger={['click']}>
                  <Button>{publicTarget(target)}</Button>
                </Dropdown>
                &nbsp; &nbsp;
                <Button
                  type="primary"
                  shape="round"
                  htmlType="submit"
                  loading={isEditingPost}
                >
                  수정
                </Button>
              </div>
            </div>
          </Form>
        </Card>
      </Modal>
    </>
  );
};

export default PostEdit;
