import { Button, Table } from 'antd';
import { data } from '../../../mock/data';
import { useMain } from '../../../hooks/UseMain';

const Card = ({ cardData, handleDeleteModal }) => {
  const { changeValue } = useMain();

  const dataIndex =
    cardData?.length > 0
      ? cardData.map((category, index) => ({
          id: index + 1,
          card_holder: category.card_holder,
          phone_number: category.phone_number,
          user_id: category.user_id,
          card_id: category.card_id,
          transaction_id: category.transaction_id,
          main: category.main,
          active: category.active,
          card_data: category.id,
        }))
      : [];

  const columns = [
    {
      title: data[changeValue].bot_settings.id,
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: 'Card holder',
      dataIndex: 'card_holder',
      key: 'card_holder',
      align: 'center',
    },
    {
      title: 'Phone number',
      dataIndex: 'phone_number',
      key: 'phone_number',
      align: 'center',
      render: (phone_number) => (
        <a href={`tel:${phone_number}`}>{phone_number}</a>
      ),
    },
    {
      title: 'Card id',
      dataIndex: 'card_id',
      key: 'card_id',
      align: 'center',
    },
    {
      title: 'User id',
      dataIndex: 'user_id',
      key: 'user_id',
      align: 'center',
    },
    {
      title: 'Transaction id',
      dataIndex: 'transaction_id',
      key: 'transaction_id',
      align: 'center',
    },
    {
      title: 'Main',
      dataIndex: 'main',
      key: 'main',
      align: 'center',
      render: (main) => (
        <span>
          {main ? (
            <span style={{ color: 'green' }}>True</span>
          ) : (
            <span style={{ color: 'red' }}>False</span>
          )}
        </span>
      ),
    },
    {
      title: 'Active',
      dataIndex: 'active',
      key: 'active',
      align: 'center',
      render: (active) => (
        <span>
          {active ? (
            <span style={{ color: 'green' }}>True</span>
          ) : (
            <span style={{ color: 'red' }}>False</span>
          )}
        </span>
      ),
    },
    {
      title: data[changeValue].bot_settings.actions,
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <div>
          <Button
            type="link"
            onClick={() => handleDeleteModal(record.card_data)}
          >
            <svg
              width={16}
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

export default Card;
