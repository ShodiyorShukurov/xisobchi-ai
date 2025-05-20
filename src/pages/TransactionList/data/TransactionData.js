import React, { useRef, useEffect } from 'react';
import { Button, Space, Table } from 'antd';
import { data } from '../../../mock/data';
import { useMain } from '../../../hooks/UseMain';

const TransactionData = ({
  transactionListData,
  showUserInfoModal,
  showCancelTransactionModal,
}) => {
  const { changeValue } = useMain();
  const scrollRef = useRef(null); // Table scroll pozitsiyasini saqlash uchun
  const scrollPositionRef = useRef(0); // Table ichki scroll pozitsiyasi

  const dataIndex =
    transactionListData?.length > 0
      ? transactionListData?.map((transaction, index) => ({
          id: index + 1,
          name: transaction.name,
          phone_number: transaction.phone_number,
          user_id: transaction.user_id,
          amount: transaction.amount,
          method: transaction.method,
          count: transaction.count,
          paid_msg: transaction.paid_msg,
          recurrent: transaction.recurrent,
          create_at: transaction.create_at.slice(0, 10),
          transactionId: transaction.id,
          success_trans_id: transaction.success_trans_id,
        }))
      : [];

  // Table scroll pozitsiyasini saqlash
  useEffect(() => {
    const tableBody = scrollRef.current?.querySelector('.ant-table-body');
    if (tableBody) {
      const handleScroll = () => {
        scrollPositionRef.current = tableBody.scrollTop;
        console.log('Table scroll position:', scrollPositionRef.current);
      };
      tableBody.addEventListener('scroll', handleScroll);
      return () => tableBody.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const columns = [
    {
      title: data[changeValue].transactions_info.id,
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: (text) => <span style={{ color: 'blue' }}>{text}</span>,
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_number',
      key: 'phone_number',
      align: 'center',
      render: (text) => <a href={`tel:${text}`}>{text}</a>,
    },
    {
      title: 'User ID',
      dataIndex: 'user_id',
      key: 'user_id',
      align: 'center',
    },
    {
      title: data[changeValue].transactions_info.amount,
      dataIndex: 'amount',
      key: 'amount',
      align: 'center',
      render: (amount) => `${Number(amount)} ${data[changeValue].sum}`,
    },
    { title: 'Count', dataIndex: 'count', key: 'count', align: 'center' },
    {
      title: data[changeValue].transactions_info.method,
      dataIndex: 'method',
      key: 'method',
      align: 'center',
    },
    {
      title: 'Paid Message',
      dataIndex: 'paid_msg',
      key: 'paid_msg',
      align: 'center',
      render: (paid_msg) => (
        <span style={{ color: paid_msg ? 'green' : 'red' }}>
          {paid_msg ? paid_msg : 'Not Paid'}
        </span>
      ),
    },
    {
      title: 'Recurrent',
      dataIndex: 'recurrent',
      key: 'recurrent',
      align: 'center',
      render: (recurrent) => (
        <span style={{ color: recurrent ? 'green' : 'red' }}>
          {recurrent ? recurrent : 'Not Recurrent'}
        </span>
      ),
    },
    {
      title: data[changeValue].transactions_info.create_at,
      dataIndex: 'create_at',
      key: 'create_at',
      align: 'center',
    },
    {
      title: data[changeValue].transactions_info.actions,
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={() => {
              // Table scroll pozitsiyasini saqlash
              const tableBody =
                scrollRef.current?.querySelector('.ant-table-body');
              if (tableBody) {
                scrollPositionRef.current = tableBody.scrollTop;
              }
              showUserInfoModal(record.transactionId);
            }}
          >
            <svg
              width={20}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-4"
            >
              <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
              <path
                fillRule="evenodd"
                d="M1.38 8.28a.87.87 0 0 1 0-.566 7.003 7.003 0 0 1 13.238.006.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
          {record.method === 'ATMOS' && (
            <Button
              type="link"
              onClick={() =>
                showCancelTransactionModal(record.success_trans_id)
              }
            >
              <svg
                width={20}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-4"
              >
                <path
                  fillRule="evenodd"
                  d="M12.5 9.75A2.75 2.75 0 0 0 9.75 7H4.56l2.22 2.22a.75.75 0 1 1-1.06 1.06l-3.5-3.5a.75.75 0 0 1 0-1.06l3.5-3.5a.75.75 0 0 1 1.06 1.06L4.56 5.5h5.19a4.25 4.25 0 0 1 0 8.5h-1a.75.75 0 0 1 0-1.5h1a2.75 2.75 0 0 0 2.75-2.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          )}
        </Space>
      ),
      align: 'center',
    },
  ];

  return (
    <div ref={scrollRef}>
      <Table
        columns={columns}
        dataSource={dataIndex}
        pagination={false}
        className="ant-border-space"
        scroll={{ y: 600 }}
      />
    </div>
  );
};

export default TransactionData;
