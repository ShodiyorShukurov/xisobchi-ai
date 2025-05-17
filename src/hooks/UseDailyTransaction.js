import React from 'react';
import Api from '../api';

const UseDailyTransaction = () => {
  const [dailyTransactionData, setDailyTransactionData] = React.useState([]);
  const [next, setNext] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchDailyTransactionData = async () => {
    setIsLoading(true);
    try {
      const res = await Api.get(
        `/transactions/list/daily?limit=50&page=${next}`
      );
      setDailyTransactionData(res.data);
    } catch (error) {
      console.log(error);
      if (error.message === 'Request failed with status code 404') {
        setDailyTransactionData([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchDailyTransactionData();
  }, [next]);

  // const handleNextPage = () => {
  //     setNext((prev) => prev + 1);
  // };
  // const handlePreviousPage = () => {
  //     setNext((prev) => prev - 1);
  // };
  return {
    dailyTransactionData,
    next,
    isLoading,
    setNext,
  };
};

export default UseDailyTransaction;
