import { Table } from 'antd';
import moment from 'moment';


const UserMonthlyData = ({ monthlyUsersData }) => {


  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => moment(text).format('DD MMMM YYYY'),
    },
    {
      title: 'User Count',
      dataIndex: 'user_count',
      key: 'user_count',
      align: 'center',
      render: (text) => Number(text).toLocaleString('uz-UZ'),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={monthlyUsersData?.data}
      rowKey="date"
      pagination={false}
      bordered
      style={{ marginBottom: '24px' }}
    />
  );
};

export default UserMonthlyData;
