import React, { useState, memo, useCallback, useRef, useEffect } from 'react';
import { Form, Button, Dropdown, Menu, message } from 'antd';
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
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import hashtagStyles from './style/hashtag.module.css';
import editorStyles from './style/editor.module.css';
import { USER_ACCESS_TARGET_REQUEST } from '../../reducers/user';
import { UPLOAD_IMAGES_REQUEST, ADD_POST_REQUEST } from '../../reducers/post';
import { Card } from './style/FormStyle';
import PreviewContainer from '../PreviewContainer';

const hashtagPlugin = createHashtagPlugin({ theme: hashtagStyles });
const plugins = [hashtagPlugin];

const PostForm = memo(() => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();
  const { isAddingPost, imagePaths, postAdded } = useSelector(
    state => state.post,
  );
  const { me } = useSelector(state => state.user);
  const editor = useRef(null);
  const imageInput = useRef();

  useEffect(() => {
    if (postAdded) {
      setEditorState(EditorState.createEmpty());
    }
  }, [postAdded]);

  useEffect(() => {
    if (imagePaths.length !== 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [imagePaths]);

  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();
      const text = onEditorText();
      if (imagePaths.length > 10) {
        return message.warning('이미지는 최대 10장 입니다!'); // 변경해야함
      }
      const postData = new FormData();
      postData.append('content', text);
      imagePaths.forEach(i => {
        postData.append('image', i);
      });
      postData.append('publictarget', me.publictarget);
      dispatch({
        type: ADD_POST_REQUEST,
        data: postData,
      });
    },
    [editorState, imagePaths, me.publictarget],
  );

  const onEditorText = () => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    return raw.blocks[0].text.trim();
  };

  const onChangeEditor = editorState => {
    setEditorState(editorState);
  };

  const onfocus = useCallback(() => {
    if (editor.current) editor.current.focus();
  }, []);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback(e => {
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, f => {
      imageFormData.append('image', f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);

  const onClickMenu = useCallback(
    ({ key }) => {
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

  return (
    <>
      <Card>
        <Form onSubmit={onSubmitForm} encType="multipart/form-data">
          <div className={editorStyles.editor} onClick={onfocus}>
            <Editor
              placeholder="무슨 생각을 하고 계신가요? (최소 1장의 이미지를 넣어주세요.)"
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
          <div align="left" style={{ padding: 2 }}>
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
                disabled={disabled}
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
          <PreviewContainer />
        </Form>
      </Card>
    </>
  );
});

export default PostForm;
