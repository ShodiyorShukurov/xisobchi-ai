import React from 'react';
import { Table } from 'antd';
import moment from 'moment';

const DailyTransactionData = ({ dailyTransactionData }) => {
  const { data } = dailyTransactionData;

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => moment(text).format('DD MMMM YYYY'),
    },
    {
      title: 'Total Checks',
      dataIndex: 'total_checks',
      key: 'total_checks',
      align: 'center',
    },
    {
      title: 'Total Amount (UZS)',
      dataIndex: 'total_amount',
      key: 'total_amount',
      align: 'right',
      render: (text) => Number(text).toLocaleString('uz-UZ'),
    },
    {
      title: 'Recurrent Count',
      dataIndex: 'recurrent_count',
      key: 'recurrent_count',
      align: 'center',
    },
    {
      title: 'Recurrent Amount (UZS)',
      dataIndex: 'recurrent_amount',
      key: 'recurrent_amount',
      align: 'right',
      render: (text) => (text ? Number(text).toLocaleString('uz-UZ') : '-'),
    },
    {
      title: 'Non-Recurrent Count',
      dataIndex: 'non_recurrent_count',
      key: 'non_recurrent_count',
      align: 'center',
    },
    {
      title: 'Non-Recurrent Amount (UZS)',
      dataIndex: 'non_recurrent_amount',
      key: 'non_recurrent_amount',
      align: 'right',
      render: (text) => Number(text).toLocaleString('uz-UZ'),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="date"
      pagination={false}
      bordered
      style={{ marginBottom: '16px' }}
    />
  );
};

export default DailyTransactionData;