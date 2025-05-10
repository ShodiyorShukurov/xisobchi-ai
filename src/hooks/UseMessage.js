import React from 'react';
import Api from '../api';

const UseMessage = () => {
  const [message, setMessage] = React.useState('');
  const [next, setNext] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(null);
  const [moreInfoModal, setMoreInfoModal] = React.useState(false);
  const [moreInfoId, setMoreInfoId] = React.useState(null);

  const showMoreInfoModal = (id) => {
    setMoreInfoId(id);
    setMoreInfoModal(true);
  };

  const handleMoreInfoCancel = () => {
    setMoreInfoModal(false);
    setMoreInfoId(null);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getMessage = async () => {
    setIsLoading(true);
    try {
      const res = await Api.get(`/messages/list?limit=10&page=${next}`);
      setMessage(res.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleDeleteModal = (id) => {
    setDeleteId(id);
    setOpenDeleteModal(true);
  };

  const handleDelete = async () => {
      if (!deleteId) return;
      setIsLoading(true);
    try {
      await Api.delete(`/message/delete/${deleteId}`);
      setOpenDeleteModal(false);
      setDeleteId(null);
      getMessage();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getMessage();
  }, [next]);

  return {
    message,
    next,
    setNext,
    isLoading,
    isModalVisible,
    showModal,
    handleCancel,
    getMessage,
    setIsLoading,
    openDeleteModal,
    setOpenDeleteModal,
    handleDelete,
    handleDeleteModal,
    showMoreInfoModal,
    moreInfoModal,
    handleMoreInfoCancel,
    moreInfoId,
  };
};

export default UseMessage;
