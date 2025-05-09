import React, { useRef, useEffect } from 'react';
import { Button, Table } from 'antd';
import { data } from '../../../mock/data';
import { useMain } from '../../../hooks/UseMain';

const TransactionData = ({ transactionListData, showUserInfoModal }) => {
  const { changeValue } = useMain();
  const scrollRef = useRef(null); // Table scroll pozitsiyasini saqlash uchun
  const scrollPositionRef = useRef(0); // Table ichki scroll pozitsiyasi

  const dataIndex =
    transactionListData?.length > 0
      ? transactionListData?.map((transaction, index) => ({
          id: index + 1,
          amount: transaction.amount,
          method: transaction.method,
          create_at: transaction.create_at.slice(0, 10),
          transactionId: transaction.id,
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
      title: data[changeValue].transactions_info.amount,
      dataIndex: 'amount',
      key: 'amount',
      align: 'center',
      render: (amount) => `${Number(amount)} ${data[changeValue].sum}`,
    },
    {
      title: data[changeValue].transactions_info.method,
      dataIndex: 'method',
      key: 'method',
      align: 'center',
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
        <Button
          type="link"
          onClick={() => {
            // Table scroll pozitsiyasini saqlash
            const tableBody = scrollRef.current?.querySelector('.ant-table-body');
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
        scroll={{ y: 600 }} // Jadvalga ichki scroll qo‘shish
      />
    </div>
  );
};

export default TransactionData;