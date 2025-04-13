import React from "react";
import Api from "../api";

const useNews = () => {
  const [newsListData, setNewsListData] = React.useState([]);
  const [next, setNext] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false)
  const [isModalVisible, setIsModalVisible] = React.useState(false)
  const [selectedItem, setSelectedItem] = React.useState('')


  const openMessageModal = (id) => {
    setSelectedItem(id);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const fetchNewsData = async () => {
    setIsLoading(true)
    try {
      const res = await Api.get(`/news/list?limit=50&page=${next}`);
      setNewsListData(res.data.data);
    } catch (error) {
      console.log(error);
      if(error.message === "Request failed with status code 404"){
        setNewsListData([]);
      }
    }finally{
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchNewsData();
  }, [next]);

  return {
    newsListData,
    setNext,
    next,
    isLoading,
    openMessageModal,
    isModalVisible,
    handleCancel,
    selectedItem,
    setSelectedItem,
  };
};

export default useNews;
