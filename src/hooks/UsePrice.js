import React from 'react';
import Api from '../api';
import { Form } from 'antd';

const usePrice = () => {
  const [data, setData] = React.useState([]);
  const [editData, setEditData] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [selectItem, setSelectItem] = React.useState({});
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(null);
  const [form] = Form.useForm();

  const showModal = (item) => {
    setSelectItem(item);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const fetchPriceData = async () => {
    setIsLoading(true);
    try {
      const res = await Api.get('/price');
      setData(res.data.data);
    } catch (error) {
      console.log(error);
      if (error.message === 'Request failed with status code 404') {
        setData([]);
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
    setEditData(true);
    console.log(deleteId);
    const data = {
      id: deleteId,
    };
    try {
      await Api.delete(`/price`, { data });
      setOpenDeleteModal(false);
      setDeleteId(null);
      fetchPriceData();
    } catch (error) {
      console.error(error);
    } finally {
      setEditData(false);
    }
  };

  React.useEffect(() => {
    fetchPriceData();
  }, [editData]);

  return {
    data,
    setEditData,
    isModalVisible,
    selectItem,
    showModal,
    handleCancel,
    isLoading,
    setIsModalVisible,
    handleDelete,
    openDeleteModal,
    handleDeleteModal,
    setOpenDeleteModal,
  };
};

export default usePrice;
