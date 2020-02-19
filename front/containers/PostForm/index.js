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
import {
  UPLOAD_IMAGES_REQUEST,
  REMOVE_IMAGE,
  ADD_POST_REQUEST,
} from '../../reducers/post';
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

  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();
      const text = renderContentAsRawJs();
      if (!text && imagePaths.length === 0) {
        return alert('게시글 및 이미지를 하나라도 넣어!');
      }
      const postData = new FormData();
      postData.append('content', text);
      imagePaths.forEach(i => {
        postData.append('image', i);
      });
      postData.append('publictarget', me.publictarget);
      // for (let key of postData.keys()) {
      //   console.log(key);
      // }
      // for (let value of postData.values()) {
      //   console.log(value);
      // }
      dispatch({
        type: ADD_POST_REQUEST,
        data: postData,
      });
    },
    [editorState, imagePaths, me.publictarget],
  );

  const renderContentAsRawJs = () => {
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
        <Form onSubmit={onSubmitForm} encType="multipart/form-data">
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
          <ImageContainer>
            {imagePaths.map((v, i) => (
              <div key={v} className="content" onMouseLeave={hoverOff}>
                <img
                  className={hover === v ? 'hover' : 'image'}
                  src={`http://localhost:3060/${v}`}
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
                    <PreView divTransfrom="translate(-10%, -50%)">
                      <Button type="link" onClick={onRemoveImage(i)}>
                        <FontAwesomeIcon icon={faTrashAlt} size="lg" />
                      </Button>
                    </PreView>
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
