import { Button, Table } from 'antd';
import { data } from '../../../mock/data';
import { useMain } from '../../../hooks/UseMain';

const UserData = ({
  // openMessageModal,
  // showTransactionModal,
  showUserInfoModal,
  userListData,
  handleDelete,
}) => {
  const { changeValue } = useMain();

  const dataIndex =
    userListData?.length > 0
      ? userListData.map((user, index) => ({
          id: index + 1,
          name: user.name,
          phone_number: user.phone_number,
          // subscribe: user.subscribe,
          duration: user.duration,
          expired: user.expired_date,
          source: user.source,
          monthly_amount: user.monthly_amount,
          limit_amount: user.limit_amount,
          userData: user,
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
      title: data[changeValue].users_list.name,
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: data[changeValue].users_list.phone_number,
      dataIndex: 'phone_number',
      key: 'phone_number',
      align: 'center',
      render: (phone_number) =>
        phone_number ? (
          <a href={'tel:' + phone_number}>{phone_number}</a>
        ) : (
          'N/A'
        ),
    },
    {
      title: data[changeValue].users_list.duration,
      dataIndex: 'duration',
      key: 'duration',
      align: 'center',
      render: (duration) => (
        <span>
          {duration ? (
            <span style={{ color: 'green' }}>True</span>
          ) : (
            <span style={{ color: 'red' }}>False</span>
          )}
        </span>
      ),
    },

    {
      title: data[changeValue].users_list.expired,
      dataIndex: 'expired',
      key: 'expired',
      align: 'center',
      render: (expired) => (
        <span>
          {expired !== null ? (
            expired
          ) : (
            <span style={{ color: 'red ' }}>Not Found</span>
          )}
        </span>
      ),
    },

    {
      title: data[changeValue].users_list.source,
      dataIndex: 'source',
      key: 'source',
      align: 'center',
      render: (source) => (
        <span>
          {source !== null ? (
            <span style={{ textTransform: 'capitalize' }}>{source}</span>
          ) : (
            <span style={{ color: 'red ' }}>Not Found</span>
          )}
        </span>
      ),
    },
    {
      title: 'Monthly Amount',
      dataIndex: 'monthly_amount',
      key: 'monthly_amount',
      align: 'center',
    },
    {
      title: 'Limit Amount',
      dataIndex: 'limit_amount',
      key: 'limit_amount',
      align: 'center',
    },
    {
      title: data[changeValue].users_list.actions,
      key: 'actions',
      render: (_, record) => (
        <div>
          <Button
            type="link"
            onClick={() => showUserInfoModal(record.userData)}
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

          <Button
            type="link"
            onClick={() => handleDelete(record.userData.id)}
            style={{ paddingLeft: '10px', paddingRight: '10px' }}
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
                d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
          {/* <Button
            type="link"
            onClick={() => showTransactionModal(record.userData)}
            style={{ paddingLeft: "10px", paddingRight: "10px" }}
          >
            <svg
              width={20}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm.75-10.25v2.5h2.5a.75.75 0 0 1 0 1.5h-2.5v2.5a.75.75 0 0 1-1.5 0v-2.5h-2.5a.75.75 0 0 1 0-1.5h2.5v-2.5a.75.75 0 0 1 1.5 0Z"
                clipRule="evenodd"
              />
            </svg>
          </Button> */}
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

export default UserData;
