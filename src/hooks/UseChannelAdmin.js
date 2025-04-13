import React from "react";
import Api from "../api";
import { Form } from "antd";

const useChannelAdmin = () => {
  const [channelAdminData, setChannelAdminData] = React.useState([]);
  const [editChannelData, setEditChannelData] = React.useState(false);
  const [isModalChannelVisible, setIsModalChannelVisible] =
    React.useState(false);
  const [selectChannelItem, setSelectChannelItem] = React.useState({});
  const [form] = Form.useForm();

  const showChannelModal = (item) => {
    setSelectChannelItem(item);
    setIsModalChannelVisible(true);
  };

  const handleChannelCancel = () => {
    setIsModalChannelVisible(false);
    form.resetFields();
    setSelectChannelItem({})
  };

  const fetchChannelAdmin = async () => {
    try {
      const res = await Api.get("/channel-admin");
      setEditChannelData(false);
      setChannelAdminData([res.data.data]);
    } catch (error) {
      console.error(error);
      if (error.message === "Request failed with status code 404") {
        setChannelAdminData([]);
      }
    }
  };

  React.useEffect(() => {
    fetchChannelAdmin();
  }, [editChannelData]);

  return {
    channelAdminData,
    setEditChannelData,
    isModalChannelVisible,
    showChannelModal,
    handleChannelCancel,
    selectChannelItem,
    setSelectChannelItem,
  };
};

export default useChannelAdmin;
