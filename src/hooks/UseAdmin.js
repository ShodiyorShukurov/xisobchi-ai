import { Form, message } from "antd";
import React from "react";
import Api from "../api";

const useAdmin = () => {
  const [adminData, setAdminData] = React.useState([]);
  const [next, setNext] = React.useState(1);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isModalDelete, setIsModalDelete] = React.useState(false);
  const [id, setId] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectItem, setSelectItem] = React.useState({});
  const [form] = Form.useForm();

  const openMessageModal = (id) => {
    setSelectItem(id);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const fetchAdminData = async () => {
    setIsLoading(true);
    try {
      const res = await Api.get(`/admin/list?limit=50&page=${next}`);
      setAdminData(res.data.data);
    } catch (error) {
      console.log(error);
      if (error.message === "Request failed with status code 404") {
        setAdminData([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const openDeleteModal = (id) => {
    setId(id);
    setIsModalDelete(true);
  };

  const closeDeleteModal = () => {
    setIsModalDelete(false);
    setId(null);
  };

  const handleDelete = async () => {
    const data = {
      id: id,
    };

    try {
      const res = await Api.delete(`/admin/delete`, { data });
      if (res) {
        message.success("Successfully deleted");
      }
      closeDeleteModal();
    } catch (error) {
      closeDeleteModal();
      message.error(error);
      console.log(error);
    } finally {
      fetchAdminData();
    }
  };

  React.useEffect(() => {
    fetchAdminData();
  }, []);

  return {
    adminData,
    setNext,
    next,
    isModalVisible,
    selectItem,
    openMessageModal,
    handleCancel,
    isLoading,
    setIsLoading,
    openDeleteModal,
    closeDeleteModal,
    handleDelete,
    isModalDelete,
    fetchAdminData,
  };
};

export default useAdmin;
