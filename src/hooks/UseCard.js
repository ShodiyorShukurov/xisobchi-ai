import React, { useState } from 'react';
import Api from '../api';

const UseCard = () => {
  const [cardData, setCardData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = React.useState(null);
  const [next, setNext] = React.useState(1);

  const fetchUserListData = async () => {
    setIsLoading(true);
    try {
      const res = await Api.get(`/cards?limit=10&page=${next}`);
      setCardData(res.data.data);
    } catch (error) {
      console.error(error);
      if (error.message === 'Request failed with status code 404') {
        setCardData([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteModal = (id) => {
    setDeleteId(id);
    setOpenDeleteModal(true);
  };

  const handleDelete = async () => {
    const data = {
      id: deleteId,
    };
    try {
      await Api.delete(`/cards`, { data });
      setOpenDeleteModal(false);
      setDeleteId(null);
      fetchUserListData();
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchUserListData();
  }, [next]);

  return {
    cardData,
    isLoading,
    openDeleteModal,
    handleDeleteModal,
    handleDelete,
    setOpenDeleteModal,
    next,
    setNext,
  };
};

export default UseCard;
