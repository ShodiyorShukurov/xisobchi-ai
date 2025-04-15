import React, { useState } from 'react';
import { Modal, Button, Row, Col, Card, Table } from 'antd';
import Api from '../../../api';
import { data } from '../../../mock/data';
import { useMain } from '../../../hooks/UseMain';

const MoreInfoModal = ({ moreInfoModal, setMoreInfoModal, moreInfoId }) => {
  const { changeValue } = useMain();
  console.log(moreInfoId);
  /*User data start*/
  const [partnerData, setPartnerData] = React.useState([]);

  const userIndex = partnerData?.length
    ? partnerData?.map((partner) => ({
        id: partner.id,
        name: partner.name,
        user_id: partner.chat_id,
        phone_number: partner.phone_number,
        discount: partner.discount,
        additional: partner.additional,
        duration: partner.duration,
        profit: partner.profit,
        balance: partner.balance,
      }))
    : [];

  const partnerColumns = [
    {
      title: data[changeValue].user_info.id,
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: data[changeValue].user_info.name,
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: data[changeValue].user_info.user_id,
      dataIndex: 'user_id',
      key: 'user_id',
      align: 'center',
    },
    {
      title: data[changeValue].user_info.phone_number,
      dataIndex: 'phone_number',
      key: 'phone_number',
      align: 'center',
      render: (phone_number) =>
        phone_number ? (
          <a href={'tel:' + phone_number}>{phone_number}</a>
        ) : (
          data[changeValue].user_info.phone_number_error
        ),
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
      align: 'center',
    },
    {
      title: 'Additional',
      dataIndex: 'additional',
      key: 'additional',
      align: 'center',
    },

    {
      title: data[changeValue].user_info.duration,
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
      title: 'Profit',
      dataIndex: 'profit',
      key: 'profit',
      align: 'center',
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      align: 'center',
    },
  ];

  const fetchUserData = async () => {
    if (!moreInfoId) return;
    try {
      const res = await Api.get('/partners/' + moreInfoId);
      if (res.data) {
        setPartnerData([res.data.data]);
      } else {
        setPartnerData([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /*User all transaction data end*/

  React.useEffect(() => {
    fetchUserData();
  }, [moreInfoId]);

  return (
    <Modal
      title="Partner Information"
      open={moreInfoModal}
      onCancel={() => {
        setMoreInfoModal(false);
        setPartnerData([]);
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
              title="Partner Information"
            >
              <div className="table-responsive">
                <Table
                  columns={partnerColumns}
                  dataSource={userIndex}
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
