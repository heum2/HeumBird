import React, { useState } from 'react';
import { Modal } from 'antd';
import { ModalContent } from '../../containers/PostOption/style';

const ProfileOption = ({ titlename, close, children, visible, invisible }) => {
  return (
    <>
      <Modal
        title={
          titlename && (
            <div style={{ textAlign: 'center', fontWeight: 600 }}>
              {titlename}
            </div>
          )
        }
        centered
        visible={visible}
        footer={null}
        closable={close}
        onCancel={invisible}
        bodyStyle={{
          padding: 0,
        }}
      >
        <ModalContent>
          {children}
          {!close && (
            <button className="modalbutton" onClick={invisible}>
              취소
            </button>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileOption;
