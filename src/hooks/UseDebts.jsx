import React from 'react';
import Api from '../api';

const UseDebts = () => {
  const [debtsListData, setDebtsListData] = React.useState([]);
  const [next, setNext] = React.useState(1);
  const [selectedDebt, setSelectedDebt] = React.useState(null);
  const [isModalDebtInfo, setIsModalDebtInfo] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [id, setId] = React.useState();

  const showDebtInfoModal = (record) => {
    setSelectedDebt(record);
    setIsModalDebtInfo(true);
  };

  const fetchDebtsListData = async () => {
    setIsLoading(true);
    try {
      const res = await Api.get(`/debts/list?limit=50&page=${next}`);
      setDebtsListData(res.data.data);
    } catch (error) {
      console.error(error);
      if (error.message === 'Request failed with status code 404') {
        setDebtsListData([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDebtData = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const res = await Api.get(`/debts/list?limit=50&page=${next}&user_id=${id}`);
      setDebtsListData(res.data.data);
    } catch (error) {
      console.error(error);
      if (error.message === 'Request failed with status code 404') {
        setDebtsListData([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (id) {
      fetchDebtData();
    } else {
      fetchDebtsListData();
    }
  }, [next]);

  return {
    debtsListData,
    next,
    setNext,
    fetchDebtData,
    showDebtInfoModal,
    isLoading,
    fetchDebtsListData,
    selectedDebt,
    isModalDebtInfo,
    setSelectedDebt,
    setIsModalDebtInfo,
    id,
    setId,
  };
};

export default UseDebts;
