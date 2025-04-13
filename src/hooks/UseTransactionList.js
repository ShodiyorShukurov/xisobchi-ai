import React from "react";
import Api from "../api";

const useTransactionList = () => {
  const [transactionListData, setTransactionListData] = React.useState([]);
  const [next, setNext] = React.useState(1);
  const [addData, setAddData] = React.useState(false);
  const [total, setTotal] = React.useState();
  const [isModalUserInfo, setIsModalUserInfo] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [method, setMethod] = React.useState(""); // New state for method

  const showUserInfoModal = (record) => {
    setSelectedUser(record);
    setIsModalUserInfo(true);
  };

  const fetchTransactionData = async () => {
    setIsLoading(true);
    try {
      const res = await Api.get(`/transactions/list?limit=50&page=${next}`);
      setTransactionListData(res.data.data);
    } catch (error) {
      console.log(error);
      if (error.message === "Request failed with status code 404") {
        setTransactionListData([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTransactionMonthData = async (year, month) => {
    if (!month) return;

    setIsLoading(true);
    try {
      const res = await Api.get(
        `/transactions/filter?limit=50&page=${next}&month=${month}&year=${year}`
      );
      setTransactionListData(res.data.data);
      setTotal(res.data.total);
    } catch (error) {
      console.log(error);
      if (error.message === "Request failed with status code 404") {
        setTransactionListData([]);
        setTotal([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTransactionSortData = async () => {
    if (!method) return;
    setIsLoading(true);
    try {
      const res = await Api.get(
        `/transactions/list?limit=50&page=${next}&method=${method}`
      );
      setTransactionListData(res.data.data);
      setTotal(res.data.total);
    } catch (error) {
      console.log(error);
      if (error.message === "Request failed with status code 404") {
        setTransactionListData([]);
        setTotal([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchTransactionData();
    fetchTransactionMonthData();
    fetchTransactionSortData();
  }, [next, addData, method]); // Include method in dependencies

  return {
    transactionListData,
    setNext,
    next,
    setAddData,
    total,
    fetchTransactionMonthData,
    showUserInfoModal,
    isModalUserInfo,
    setIsModalUserInfo,
    selectedUser,
    setSelectedUser,
    isLoading,
    setMethod, 
    method
  };
};

export default useTransactionList;
