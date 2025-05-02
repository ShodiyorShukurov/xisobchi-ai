import { Button, Modal } from 'antd';
import React from 'react';

const UserDelete = ({
  deleteModalVisible,
  setDeleteModalVisible,
  userReset,
}) => {
  return (
    <Modal
      title={"O'chirish"}
      open={deleteModalVisible}
      onCancel={() => setDeleteModalVisible(false)}
      footer={[
        <Button key="submit" type="primary" danger onClick={userReset}>
          Ha
        </Button>,
        <Button key="back" onClick={() => setDeleteModalVisible(false)}>
          Bekor qilish
        </Button>,
      ]}
    >
      <p>O'chirmoqchimisiz</p>
    </Modal>
  );
};

export default UserDelete;
