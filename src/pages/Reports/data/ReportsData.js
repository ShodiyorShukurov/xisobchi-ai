import React, { useRef, useEffect } from 'react';
import { Button, Table } from 'antd';
import { data } from '../../../mock/data';
import { useMain } from '../../../hooks/UseMain';

const ReportsData = ({ showReprortInfoModal, reportsListData }) => {
  const { changeValue } = useMain();
  const scrollRef = useRef(null); // Table scroll pozitsiyasini saqlash uchun
  const scrollPositionRef = useRef(0); // Table ichki scroll pozitsiyasi

  const dataIndex =
    reportsListData?.length > 0
      ? reportsListData.map((report, index) => ({
          id: index + 1,
          user_id: report?.user_id,
          category_id: report?.category_id,
          category_name: report?.category_name,
          amount: report?.amount,
          currency: report?.currency,
          income: report?.income,
          comment: report?.comment,
          debt: report?.debt,
          date: report?.date,
          reports: report?.id,
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
      title: data[changeValue].users_list.id,
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: 'Id',
      dataIndex: 'reports',
      key: 'reports',
      align: 'center',
    },
    {
      title: 'User ID',
      dataIndex: 'user_id',
      key: 'user_id',
      align: 'center',
    },
    {
      title: 'Category ID',
      dataIndex: 'category_id',
      key: 'category_id',
      align: 'center',
    },
    {
      title: 'Category Name',
      dataIndex: 'category_name',
      key: 'category_name',
      align: 'center',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      align: 'center',
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
      align: 'center',
    },
    {
      title: 'Income',
      dataIndex: 'income',
      key: 'income',
      align: 'center',
      render: (income) => (
        <span>
          {income ? (
            <span style={{ color: 'green' }}>True</span>
          ) : (
            <span style={{ color: 'red' }}>False</span>
          )}
        </span>
      ),
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
      align: 'center',
      render: (comment) => (
        <span>
          {comment?.length > 10 ? (
            <span style={{ textTransform: 'capitalize' }}>
              {comment?.slice(0, 10)}...
            </span>
          ) : (
            <span style={{ textTransform: 'capitalize' }}>{comment}</span>
          )}
        </span>
      ),
    },

    {
      title: 'Debt',
      dataIndex: 'debt',
      key: 'debt',
      align: 'center',
      render: (debt) => (
        <span>
          {debt ? (
            <span style={{ color: 'green' }}>True</span>
          ) : (
            <span style={{ color: 'red' }}>False</span>
          )}
        </span>
      ),
    },

    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      align: 'center',
      render: (date) => <span>{date?.slice(0, 10)}</span>,
    },
    {
      title: data[changeValue].users_list.actions,
      key: 'actions',
      render: (_, record) => (
        <div>
          <Button
            type="link"
            onClick={() => {
              // Table scroll pozitsiyasini saqlash
              const tableBody = scrollRef.current?.querySelector('.ant-table-body');
              if (tableBody) {
                scrollPositionRef.current = tableBody.scrollTop;
              }
              showReprortInfoModal(record.reports);
            }}
            style={{ paddingLeft: '10px', paddingRight: '10px' }}
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
        </div>
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

export default ReportsData;