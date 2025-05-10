import React from 'react';
import Api from '../api';

const useDashboard = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  /*User data start*/
  const [userStatistics, setUserStatistics] = React.useState([]);

  const getUserStatisticsData = async () => {
    setIsLoading(true);

    try {
      const res = await Api.get('/user/statistics/data');
      setUserStatistics(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
      if (error.message === 'Request failed with status code 404') {
        setUserStatistics([]);
      }
    } finally {
      setIsLoading(false);
    }
  };
  /*User data end*/

  /*Total amount start*/
  const [totalAmount, setTotalAmount] = React.useState([]);

  const getTotalAmountData = async () => {
    setIsLoading(true);

    try {
      const res = await Api.get('/transactions/total/amout');
      setTotalAmount(res.data.data);
    } catch (error) {
      console.log(error);
      if (error.message === 'Request failed with status code 404') {
        setTotalAmount([]);
      }
    } finally {
      setIsLoading(false);
    }
  };
  /*Total amount end*/

  /*Transaction Monthly data start*/
  const [monthStatistics, setMonthStatistics] = React.useState([]);

  const getMonthlyTransactionData = async () => {
    setIsLoading(true);

    try {
      const res = await Api.get('/transactions/statistics/increase');
      setMonthStatistics(res.data.data);
    } catch (error) {
      console.log(error);
      if (error.message === 'Request failed with status code 404') {
        setMonthStatistics([]);
      }
    } finally {
      setIsLoading(false);
    }
  };
  /*Transaction Monthly data end*/

  /*User Month Data start*/
  const [userStatisticsMonth, setUserStatisticsMonth] = React.useState([]);

  const getUserStatisticsMonthData = async () => {
    setIsLoading(true);
    try {
      const res = await Api.get('/user/statistics/increase');
      setUserStatisticsMonth(res.data.data);
    } catch (error) {
      console.log(error);
      if (error.message === 'Request failed with status code 404') {
        setUserStatisticsMonth([]);
      }
    } finally {
      setIsLoading(false);
    }
  };
  /*User Month Data end*/

  /*User Source start*/
  const [userStatisticsSource, setUserStatisticsSource] = React.useState([]);

  const getUserStatisticsSouce = async () => {
    setIsLoading(true);
    try {
      const res = await Api.get('/user/statistics/source');
      setUserStatisticsSource(res.data.data);
    } catch (error) {
      console.log(error);
      if (error.message === 'Request failed with status code 404') {
        setUserStatisticsSource([]);
      }
    } finally {
      setIsLoading(false);
    }
  };
  /*User Source end*/

  React.useEffect(() => {
    /*User data*/
    getUserStatisticsData();

    /*Total amount*/
    getTotalAmountData();

    /*Transaction Monthly data */
    getMonthlyTransactionData();

    /* User Month Data */
    getUserStatisticsMonthData();

    /*User Source Data*/
    getUserStatisticsSouce();
  }, []);

  return {
    monthStatistics,
    userStatistics,
    userStatisticsMonth,
    userStatisticsSource,
    totalAmount,
    isLoading,
  };
};

export default useDashboard;
