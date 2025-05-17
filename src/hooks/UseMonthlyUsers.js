import React from 'react';
import Api from '../api';

const UseMonthlyUsers = () => {
  const [monthlyUsersData, setMonthlyUsersData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const yearNow = new Date().getFullYear();
  const monthNow = new Date().getMonth() + 1;

  const [yearValue, setYearValue] = React.useState(yearNow);
  const [monthValue, setMonthValue] = React.useState(monthNow);

  const fetchMonthlyUsersData = async (year = yearValue, month= monthValue) => {
    if (!year || !month) return;

    setIsLoading(true);
    try {
      const res = await Api.get(
        `/user/monthly/data?year=${year}&month=${month}`
      );
      setMonthlyUsersData(res.data);
    } catch (error) {
      console.log(error);
      if (error.message === 'Request failed with status code 404') {
        setMonthlyUsersData([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchMonthlyUsersData();
  }, [yearValue, monthValue]);

  return {
    monthlyUsersData,
    isLoading,
    setYearValue,
    setMonthValue,
    yearValue,
    monthValue,
    fetchMonthlyUsersData,
  };
};

export default UseMonthlyUsers;
