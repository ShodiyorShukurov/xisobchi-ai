import { Button, Modal } from "antd";
import React from "react";import { data } from "../../../mock/data";
import { useMain } from "../../../hooks/UseMain";

const DeleteModal = ({ closeDeleteModal, handleDelete, isModalDelete }) => {
   const { changeValue } = useMain();

  return (
    <Modal
      title={data[changeValue].trial_list.delete_title}
      open={isModalDelete}
      onCancel={closeDeleteModal}
      footer={[
        <Button key="submit" type="primary" danger onClick={handleDelete}>
          {data[changeValue].trial_list.delete_button_text1}
        </Button>,
        <Button key="back" onClick={closeDeleteModal}>
          {data[changeValue].trial_list.delete_button_text2}
        </Button>,
      ]}
    >
      <p>{data[changeValue].trial_list.delete_text}</p>
    </Modal>
  );
};

export default DeleteModal;
