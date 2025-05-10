import React from 'react';
import Api from '../api';
import { Form } from 'antd';

const UseCategory = () => {
  const [data, setData] = React.useState([]);
  const [editData, setEditData] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [selectItem, setSelectItem] = React.useState({});
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(null);
  const [moreInfoModal, setMoreInfoModal] = React.useState(false);
  const [moreInfoId, setMoreInfoId] = React.useState('');
  const [form] = Form.useForm();

  const showModal = (item) => {
    setSelectItem(item);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const showMoreInfo = (id) => {
    setMoreInfoId(id);
    setMoreInfoModal(true);
  };

  const fetchPartnersData = async () => {
    setIsLoading(true);
    try {
      const res = await Api.get('/categories');
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

    const data = {
      id: deleteId,
    };
    try {
      await Api.delete(`/categories`, { data });
      setOpenDeleteModal(false);
      setDeleteId(null);
      fetchPartnersData();
    } catch (error) {
      console.error(error);
    } finally {
      setEditData(false);
    }
  };

  React.useEffect(() => {
    fetchPartnersData();
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
    showMoreInfo,
    moreInfoId,
    moreInfoModal,
    setMoreInfoModal,
  };
};

export default UseCategory;
