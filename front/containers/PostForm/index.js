import React, { useState, memo, useCallback, useRef, useEffect } from 'react';
import { Form, Button, Dropdown, Menu, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faImage,
  faTrashAlt,
  faEye,
} from '@fortawesome/free-regular-svg-icons';
import {
  faSortDown,
  faGlobeAsia,
  faUserFriends,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import 'draft-js-hashtag-plugin/lib/plugin.css';
import Editor from 'draft-js-plugins-editor';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import createHashtagPlugin from 'draft-js-hashtag-plugin';

import hashtagStyles from './style/hashtag.module.css';
import editorStyles from './style/editor.module.css';
import { USER_ACCESS_TARGET_REQUEST } from '../../reducers/user';
import { UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE } from '../../reducers/post';
import { Card, ImageContainer, PreView } from './style/FormStyle';

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
const hashtagPlugin = createHashtagPlugin({ theme: hashtagStyles });
const plugins = [hashtagPlugin];

const PostForm = memo(() => {
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(emptyContentState),
  );
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewURL, setPreviewURL] = useState('');
  const [hover, setHover] = useState('');
  const dispatch = useDispatch();
  const { isAddingPost, imagePaths } = useSelector(state => state.post);
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

  const onPreviewImage = useCallback(
    value => () => {
      setPreviewVisible(true);
      setPreviewURL(`http://localhost:3060/${value}`);
    },
    [],
  );

  const onRemoveImage = useCallback(
    index => () => {
      dispatch({
        type: REMOVE_IMAGE,
        index,
      });
    },
    [],
  );

  const onCancelModal = useCallback(() => {
    setPreviewVisible(false);
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

  const hoverOn = useCallback(
    e => {
      setHover(e.target.alt);
    },
    [hover],
  );

  const hoverOff = useCallback(
    e => {
      setHover('');
    },
    [hover],
  );

  return (
    <>
      <Card>
        <Form>
          <div className={editorStyles.editor} onClick={onfocus}>
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
          <ImageContainer onMouseLeave={hoverOff}>
            {imagePaths.map((v, i) => (
              <div key={v} className="content">
                <img
                  src={`http://localhost:3060/${v}`}
                  className="image"
                  alt={v}
                  onMouseEnter={hoverOn}
                />
                {hover === v ? (
                  <>
                    <PreView>
                      <Button type="link" onClick={onPreviewImage(v)}>
                        <FontAwesomeIcon icon={faEye} size="lg" />
                      </Button>
                    </PreView>
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-20%, -50%)',
                      }}
                    >
                      <Button type="link" onClick={onRemoveImage(i)}>
                        <FontAwesomeIcon icon={faTrashAlt} size="lg" />
                      </Button>
                    </div>
                    <Modal
                      visible={previewVisible}
                      footer={null}
                      onCancel={onCancelModal}
                    >
                      <img src={previewURL} style={{ width: '100%' }} alt={v} />
                    </Modal>
                  </>
                ) : null}
              </div>
            ))}
          </ImageContainer>
        </Form>
      </Card>
    </>
  );
});

export default PostForm;
