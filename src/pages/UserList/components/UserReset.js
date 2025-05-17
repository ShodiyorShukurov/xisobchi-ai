import { Button, Modal } from 'antd';
import React from 'react';

const UserReset = ({
  resetModalVisible,
  setResetModalVisible,
  userReset,
}) => {
  return (
    <Modal
      title={"O'chirish"}
      open={resetModalVisible}
      onCancel={() => setResetModalVisible(false)}
      footer={[
        <Button key="submit" type="primary" danger onClick={userReset}>
          Ha
        </Button>,
        <Button key="back" onClick={() => setResetModalVisible(false)}>
          Bekor qilish
        </Button>,
      ]}
    >
      <p>Userni faqat datalarini o'chirmoqchimisiz?</p>
    </Modal>
  );
};

export default UserReset;
