import React from "react";
import Api from "../api";
import { Form } from "antd";

const usePrice = () => {
  const [data, setData] = React.useState([]);
  const [editData, setEditData] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [selectItem, setSelectItem] = React.useState({});
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
      const res = await Api.get("/prices");
      setData([res.data.data]);
    } catch (error) {
      console.log(error);
      if (error.message === "Request failed with status code 404") {
        setData([]);
      }
    } finally {
      setIsLoading(false);
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
    isLoading
  };
};

export default usePrice;
