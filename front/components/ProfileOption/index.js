import React, { useState } from 'react';
import { Modal } from 'antd';
import { ModalContent } from '../../containers/PostOption/style';

const ProfileOption = ({ title, children, visible, onHide }) => {
  return (
    <>
      <Modal
        title={
          title && (
            <div style={{ textAlign: 'center', fontWeight: 600 }}>
              프로필 사진 바꾸기
            </div>
          )
        }
        centered
        visible={visible}
        footer={null}
        closable={false}
        onCancel={onHide}
        bodyStyle={{
          padding: 0,
        }}
      >
        <ModalContent>
          {children}
          <button className="modalbutton" onClick={onHide}>
            취소
          </button>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileOption;
