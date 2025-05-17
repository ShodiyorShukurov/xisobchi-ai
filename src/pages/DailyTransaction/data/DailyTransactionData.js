import React from 'react';
import { Table,  } from 'antd';
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
      title: 'Transaction Count',
      dataIndex: 'count',
      key: 'count',
      align: 'center',
    },
    {
      title: 'Sum (UZS)',
      dataIndex: 'sum',
      key: 'sum',
      align: 'right',
      render: (text) => Number(text).toLocaleString('uz-UZ'),
    },
  ];

  return (
    <>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="date"
        pagination={false}
        bordered
        style={{ marginBottom: '16px' }}
      />
    </>
  );
};

export default DailyTransactionData;
