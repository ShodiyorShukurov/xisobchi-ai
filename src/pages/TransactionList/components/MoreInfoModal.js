import React, { useState } from "react";
import { Modal, Button, Row, Col, Card, Table } from "antd";
import Api from "../../../api";
import { data } from "../../../mock/data";
import { useMain } from "../../../hooks/UseMain";

const MoreInfoModal = ({
  isModalUserInfo,
  setIsModalUserInfo,
  selectedUser,
  setSelectedUser,
}) => {

  const {changeValue} = useMain();

  const [transIdData, setTransIdData] = useState();

  const dataIndex =
    transIdData?.length > 0
      ? transIdData?.map((transaction) => ({
          id: transaction.id,
          transaction_id: transaction.transaction_id,
          user_id: transaction.user_id,
          amount: transaction.amount,
          method: transaction.method,
          success_trans_id: transaction.success_trans_id,
          ofd_url: transaction.ofd_url,
          create_at: transaction.create_at.slice(0, 10),
        }))
      : [];

  const columns = [
    {
      title: data[changeValue].transaction_info.id,
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: data[changeValue].transaction_info.transaction_id,
      dataIndex: "transaction_id",
      key: "transaction_id",
      align: "center",
      render: (transaction_id) =>
        transaction_id ? (
          transaction_id
        ) : (
          <span style={{ color: "red" }}>
            {data[changeValue].transaction_info.transaction_id_error}
          </span>
        ),
    },
    {
      title: data[changeValue].transaction_info.user_id,
      dataIndex: "user_id",
      key: "user_id",
      align: "center",
    },
    {
      title: data[changeValue].transaction_info.amount,
      dataIndex: "amount",
      key: "amount",
      align: "center",
      render: (amount) =>
        `${Number(amount / 100).toFixed(2)} ${data[changeValue].sum}`,
    },
    {
      title: data[changeValue].transaction_info.method,
      dataIndex: "method",
      key: "method",
      align: "center",
    },
    {
      title: data[changeValue].transaction_info.success_trans_id,
      dataIndex: "success_trans_id",
      key: "success_trans_id",
      align: "center",
      render: (success_trans_id) =>
        success_trans_id ? (
          success_trans_id
        ) : (
          <span style={{ color: "red" }}>
            {data[changeValue].transaction_info.success_trans_id_error}
          </span>
        ),
    },
    {
      title: data[changeValue].transaction_info.ofd_url,
      dataIndex: "ofd_url",
      key: "ofd_url",
      align: "center",
      render: (_, record) =>
        record?.ofd_url ? (
          <a href={record?.ofd_url} target="_blanck">
            <Button type="link">
              {data[changeValue].transaction_info.ofd_url_success}
            </Button>
          </a>
        ) : (
          <span style={{ color: "red " }}>
            {data[changeValue].transaction_info.ofd_url_error}
          </span>
        ),
    },
    {
      title: data[changeValue].transaction_info.create_at,
      dataIndex: "create_at",
      key: "create_at",
      align: "center",
    },
  ];

  const fetchTransData = async () => {
    if (!selectedUser) return;
    try {
      const res = await Api.get(`/transaction/${selectedUser}`);
      setTransIdData([res.data.data]);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  React.useEffect(() => {
    fetchTransData();
  }, [selectedUser]);

  return (
    <Modal
      title={data[changeValue].transaction_info.title}
      open={isModalUserInfo}
      onCancel={() => {
        setIsModalUserInfo(false);
        setSelectedUser(null);
        setTransIdData([]);
      }}
      footer={null}
      width={1100}
    >
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title={data[changeValue].transaction_info.title}
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={dataIndex}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default MoreInfoModal;
