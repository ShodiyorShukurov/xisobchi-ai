import React from 'react';
import Api from '../api';
import { Form } from 'antd';

const useUserList = () => {
  const [userListData, setUserListData] = React.useState([]);
  const [sourceData, setSourceData] = React.useState([]);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [next, setNext] = React.useState(1);
  const [isTransactionModalVisible, setIsTransactionModalVisible] =
    React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [isModalUserInfo, setIsModalUserInfo] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [resetModalVisible, setResetModalVisible] = React.useState(false);
  const [id, setId] = React.useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);

  const [form] = Form.useForm();

  const openMessageModal = (record) => {
    setSelectedUser(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const showTransactionModal = (record) => {
    setSelectedUser(record);
    setIsTransactionModalVisible(true);
  };

  const handleTransactionCancel = () => {
    setIsTransactionModalVisible(false);
    form.resetFields();
  };

  const showUserInfoModal = (record) => {
    setSelectedUser(record);
    setIsModalUserInfo(true);
  };

  const fetchUserListData = async () => {
    setIsLoading(true);
    try {
      const res = await Api.get(`/users/list?limit=50&page=${next}`);
      setUserListData(res.data.data);
    } catch (error) {
      console.error(error);
      if (error.message === 'Request failed with status code 404') {
        setUserListData([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserPhoneNumberData = async (phoneNumber) => {
    if (!phoneNumber) return;
    setIsLoading(true);
    try {
      const res = await Api.get(
        `/users/list?limit=50&page=${next}&phone=${phoneNumber}`
      );
      setUserListData(res.data.data);
    } catch (error) {
      console.error(error);
      if (error.message === 'Request failed with status code 404') {
        setUserListData([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSourceData = async () => {
    try {
      const res = await Api.get(`/users/source/list`);
      setSourceData(res.data.data);
    } catch (error) {
      console.error(error);
      if (error.message === 'Request failed with status code 404') {
        setSourceData([]);
      }
    }
  };

  const fetchUserId = async (id) => {
    if (!id) return;
    setIsLoading(true);
    try {
      const res = await Api.get(`/user/${id}`);
      setUserListData([res.data.data]);
    } catch (error) {
      console.error(error);
      if (error.message === 'Request failed with status code 404') {
        setUserListData([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserPremium = async (value) => {
    if (!value) return;
    setIsLoading(true);
    try {
      const res = await Api.get(
        `/users/list?limit=100&page=${next}&premium=${value}`
      );
      setUserListData(res.data.data);
    } catch (error) {
      console.error(error);
      if (error.message === 'Request failed with status code 404') {
        setUserListData([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const botLanguage = async (value) => {
    if (!value) return;
    setIsLoading(true);
    try {
      const res = await Api.get(
        `/users/list?limit=100&page=${next}&bot_lang=${value}`
      );
      setUserListData(res.data.data);
    } catch (error) {
      console.error(error);
      if (error.message === 'Request failed with status code 404') {
        setUserListData([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = (id) => {
    setId(id);
    setResetModalVisible(true);
  };

  const userReset = async () => {
    setIsLoading(true);
    try {
      const res = await Api.delete(`/user/reset/${id}`);
      if (res.status === 200) {
        setResetModalVisible(false);
        fetchUserListData();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id) => {
    setId(id);
    setDeleteModalVisible(true);
  };

  const userDelete = async () => {
    setIsLoading(true);
    try {
      const res = await Api.delete(`/user/delete/${id}`);
      if (res.status === 200) {
        setResetModalVisible(false);
        fetchUserListData();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUserListData();
    fetchSourceData();
  }, [next]);

  return {
    userListData,
    next,
    setNext,
    fetchUserPhoneNumberData,
    isModalVisible,
    handleCancel,
    selectedUser,
    setSelectedUser,
    openMessageModal,
    isTransactionModalVisible,
    handleTransactionCancel,
    showTransactionModal,
    showUserInfoModal,
    isModalUserInfo,
    setIsModalUserInfo,
    sourceData,
    isLoading,
    handleReset,
    resetModalVisible,
    setResetModalVisible,
    userReset,
    fetchUserListData,
    fetchUserId,
    fetchUserPremium,
    botLanguage,
    handleDelete,
    deleteModalVisible,
    setDeleteModalVisible,
    userDelete
  };
};

export default useUserList;
