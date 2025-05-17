import { Button, Modal } from 'antd';
import React from 'react';

const UserDelete = ({
  deleteModalVisible,
  setDeleteModalVisible,
  userDelete,
}) => {
  return (
    <Modal
      title={"O'chirish"}
      open={deleteModalVisible}
      onCancel={() => setDeleteModalVisible(false)}
      footer={[
        <Button key="submit" type="primary" danger onClick={userDelete}>
          Ha
        </Button>,
        <Button key="back" onClick={() => setDeleteModalVisible(false)}>
          Bekor qilish
        </Button>,
      ]}
    >
      <p>Ushbu userni o'chirmoqchimisiz?</p>
    </Modal>
  );
};

export default UserDelete;
