import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrashAlt } from '@fortawesome/free-regular-svg-icons';

import { PreView } from './style';
import { REMOVE_IMAGE } from '../../reducers/post';

const PreviewImage = ({ value, index }) => {
  const [previewModalVisible, setPreviewModalVisible] = useState(false);
  const [previewURL, setPreviewURL] = useState('');
  const dispatch = useDispatch();

  const onPreviewImage = useCallback(
    value => () => {
      setPreviewModalVisible(true);
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
    setPreviewModalVisible(false);
  }, []);

  return (
    <>
      <PreView>
        <Button type="link" onClick={onPreviewImage(value)}>
          <FontAwesomeIcon icon={faEye} size="lg" />
        </Button>
      </PreView>
      <PreView divTransfrom="translate(-10%, -50%)">
        <Button type="link" onClick={onRemoveImage(index)}>
          <FontAwesomeIcon icon={faTrashAlt} size="lg" />
        </Button>
      </PreView>
      <Modal
        visible={previewModalVisible}
        footer={null}
        onCancel={onCancelModal}
      >
        <img src={previewURL} style={{ width: '100%' }} alt={value} />
      </Modal>
    </>
  );
};

export default PreviewImage;
