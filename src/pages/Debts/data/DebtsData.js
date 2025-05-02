import { Button, Table } from 'antd';
import { data } from '../../../mock/data';
import { useMain } from '../../../hooks/UseMain';

const DebtsData = ({
  showDebtInfoModal,
  debtsListData,
}) => {
  const { changeValue } = useMain();

  const dataIndex =
  debtsListData?.length > 0
      ? debtsListData.map((debt, index) => ({
          id: index + 1,
          user_id: debt?.user_id,
          amount: debt?.amount,
          currency: debt?.currency,
          income: debt?.income,
          deadline: debt?.deadline,
          date: debt?.date,
          debts: debt?.id,
        }))
      : [];

  const columns = [
    {
      title: data[changeValue].users_list.id,
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: "Id",
      dataIndex: 'debts',
      key: 'debts',
      align: 'center',
    },
    {
      title: 'User ID',
      dataIndex: 'user_id',
      key: 'user_id',
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
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
      align: 'center',
      render: (deadline) => <span>{deadline?.slice(0, 10)}</span>,
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
            onClick={() => showDebtInfoModal(record.debts)}
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
    <Table
      columns={columns}
      dataSource={dataIndex}
      pagination={false}
      className="ant-border-space"
    />
  );
};

export default DebtsData;
