import { Button, Modal } from 'antd';
import React from 'react';

const CardDeleteModal = ({ openDeleteModal, handleDelete, setOpenDeleteModal }) => {
  return (
    <Modal
      title={"O'chirish"}
      open={openDeleteModal}
      onCancel={() => setOpenDeleteModal(false)}
      footer={[
        <Button key="submit" type="primary" danger onClick={handleDelete}>
          Ha
        </Button>,
        <Button key="back" onClick={() => setOpenDeleteModal(false)}>
          Bekor qilish
        </Button>,
      ]}
    >
      <p>O'chirmoqchimisiz</p>
    </Modal>
  );
};

export default CardDeleteModal;
