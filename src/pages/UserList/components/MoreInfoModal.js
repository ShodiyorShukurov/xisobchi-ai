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

  /*User data start*/
  const [userData, setUserData] = React.useState([]);

  const userIndex = userData?.length
    ? userData?.map((user) => ({
        id: user.id,
        name: user.name,
        user_id: user.chat_id,
        partner_id: user.partner_id,
        phone_number: user.phone_number,
        premium: user.premium,
        telegram_bot: user.telegram_bot,
        bot_step: user.bot_step,
        bot_lang: user.bot_lang,
        duration: user.duration,
        source: user.source,
        expired: user.expired_date,
        source: user.source,
        monthly_amount: user.monthly_amount,
        limit_amount: user.limit_amount,
        user_blocked: user.user_blocked,
        used_free: user.used_free,
        userData: user,
      }))
    : [];

  const userColumns = [
    {
      title: data[changeValue].user_info.id,
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: data[changeValue].user_info.name,
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: data[changeValue].user_info.user_id,
      dataIndex: "user_id",
      key: "user_id",
      align: "center",
    },
    {
      title: "Partner Id",
      dataIndex: "partner_id",
      key: "partner_id",
      align: "center",
    },
    {
      title: data[changeValue].user_info.phone_number,
      dataIndex: "phone_number",
      key: "phone_number",
      align: "center",
      render: (phone_number) =>
        phone_number ? (
          <a href={"tel:" + phone_number}>{phone_number}</a>
        ) : (
          data[changeValue].user_info.phone_number_error
        ),
    },
    {
      title: "Premium",
      dataIndex: "premium",
      key: "premium",
      align: "center",
      render: (subscribe) => (
        <span>
          {subscribe ? (
            <span style={{ color: "green" }}>True</span>
          ) : (
            <span style={{ color: "red" }}>False</span>
          )}
        </span>
      ),
    },
    {
      title: "Telegram Bot",
      dataIndex: "telegram_bot",
      key: "telegram_bot",
      align: "center",
      render: (telegram_bot) => (
        <span>
          {telegram_bot ? (
            <span style={{ color: "green" }}>True</span>
          ) : (
            <span style={{ color: "red" }}>False</span>
          )}
        </span>
      ),
    },
    {
      title: "Bot Step",
      dataIndex: "bot_step",
      key: "bot_step",
      align: "center",
    },
    {
      title: "Bot Lang",
      dataIndex: "bot_lang",
      key: "bot_lang",
      align: "center",
    },

    {
      title: data[changeValue].user_info.duration,
      dataIndex: "duration",
      key: "duration",
      align: "center",
      render: (duration) => (
        <span>
          {duration ? (
            <span style={{ color: "green" }}>True</span>
          ) : (
            <span style={{ color: "red" }}>False</span>
          )}
        </span>
      ),
    },
    {
      title: "Monthly Amount",
      dataIndex: "monthly_amount",
      key: "monthly_amount",
      align: "center",
    },
    {
      title: "Limit Amount",
      dataIndex: "limit_amount",
      key: "limit_amount",
      align: "center",
    },
    {
      title: data[changeValue].user_info.expired,
      dataIndex: "expired",
      key: "expired",
      align: "center",
      render: (expired) => (
        <span>
          {expired !== null ? (
            expired
          ) : (
            <span style={{ color: "red " }}>
              {data[changeValue].user_info.expired_error}
            </span>
          )}
        </span>
      ),
    },

    {
      title: data[changeValue].user_info.source,
      dataIndex: "source",
      key: "source",
      align: "center",
      render: (source) => (
        <span style={{ textTransform: "capitalize" }}>
          {source !== null ? (
            source
          ) : (
            <span style={{ color: "red " }}>
              {data[changeValue].user_info.source_error}
            </span>
          )}
        </span>
      ),
    },

    {
      title: "User Bloced",
      dataIndex: "user_blocked",
      key: "user_blocked",
      align: "center",
      render: (user_blocked) => (
        <span>
          {user_blocked ? (
            <span style={{ color: "green" }}>True</span>
          ) : (
            <span style={{ color: "red" }}>False</span>
          )}
        </span>
      ),
    },
    {
      title: "User Free",
      dataIndex: "used_free",
      key: "used_free",
      align: "center",
      render: (used_free) => (
        <span>
          {used_free ? (
            <span style={{ color: "green" }}>True</span>
          ) : (
            <span style={{ color: "red" }}>False</span>
          )}
        </span>
      ),
    },
  ];

  const fetchUserData = async () => {
    if (!selectedUser?.chat_id) return;
    try {
      const res = await Api.get("/user/" + selectedUser?.chat_id);
      if (res.data) {
        setUserData([res.data.data]);
      } else {
        setUserData([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /*User data end*/

  /*User all transaction data start*/
  const [userTransactionData, setUserTransactionData] = useState([]);
  const dataIndex = userTransactionData?.length
    ? userTransactionData?.map((user) => ({
        id: user.id,
        transaction_id: user.transaction_id,
        user_id: user.user_id,
        amount: user.amount,
        success_trans_id: user.success_trans_id,
        ofd_url: user.ofd_url,
        method: user.method,
        create_at: user.create_at.slice(0, 10),
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

  const fetchUserTransactionData = async () => {
    if (!selectedUser?.chat_id) return;
    try {
      const res = await Api.get(
        `/transactions/user?user_id=${selectedUser?.chat_id}`
      );
      if (res.data.data.length > 0) {
        setUserTransactionData(res.data.data);
      } else {
        setUserTransactionData([]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  /*User all transaction data end*/

  React.useEffect(() => {
    fetchUserData();
    fetchUserTransactionData();
  }, [selectedUser?.chat_id]);

  return (
    <Modal
      title={data[changeValue].user_info.title}
      open={isModalUserInfo}
      onCancel={() => {
        setIsModalUserInfo(false);
        setSelectedUser(null);
        setUserTransactionData([]);
        setUserData([]);
      }}
      footer={null}
      width={1200}
    >
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title={data[changeValue].user_info.title}
            >
              <div className="table-responsive">
                <Table
                  columns={userColumns}
                  dataSource={userIndex}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
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
