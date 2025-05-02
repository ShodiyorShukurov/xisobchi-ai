import React from 'react';
import Api from '../api';
import { Form } from 'antd';

const useReports = () => {
  const [reportsListData, setReportsListData] = React.useState([]);
  const [next, setNext] = React.useState(1);
  const [selectedReport, setSelectedReport] = React.useState(null);
  const [isModalReportInfo, setIsModalReportInfo] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);


  const showReprortInfoModal = (record) => {
    setSelectedReport(record);
    setIsModalReportInfo(true);
  };

  const fetchReportsListData = async () => {
    setIsLoading(true);
    try {
      const res = await Api.get(`/reports/list?limit=50&page=${next}`);
      setReportsListData(res.data.data);
    } catch (error) {
      console.error(error);
      if (error.message === 'Request failed with status code 404') {
        setReportsListData([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchReportData = async (id) => {
    if (!id) return;
    setIsLoading(true);
    try {
      const res = await Api.get(
        `/report/${id}`
      );
      setReportsListData([res.data.data]);
    } catch (error) {
      console.error(error);
      if (error.message === 'Request failed with status code 404') {
        setReportsListData([]);
      }
    } finally {
      setIsLoading(false);
    }
  };


  React.useEffect(() => {
    fetchReportsListData();
    fetchReportData();
  }, [next]);

  return {
    reportsListData,
    next,
    setNext,
    fetchReportData,
    selectedReport,
    setIsModalReportInfo,
    showReprortInfoModal,
    isModalReportInfo,
    isLoading,
    setSelectedReport,
    fetchReportsListData
  };
};

export default useReports;
