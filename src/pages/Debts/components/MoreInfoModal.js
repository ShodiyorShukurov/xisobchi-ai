import React from 'react';
import { Modal, Row, Col, Card, List } from 'antd';
import Api from '../../../api';

const MoreInfoModal = ({
  selectedDebt,
  isModalDebtInfo,
  setSelectedDebt,
  setIsModalDebtInfo,
}) => {
  /*User data start*/
  const [debtData, setDebtData] = React.useState([]);

  const fetchDebtData = async () => {
    if (!selectedDebt) return;
    try {
      const res = await Api.get('/debt/' + selectedDebt);
      if (res.data) {
        setDebtData([res.data.data]);
      } else {
        setDebtData([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /*User data end*/

  React.useEffect(() => {
    fetchDebtData();
  }, [selectedDebt]);

  return (
    <Modal
      title="Debt Info"
      open={isModalDebtInfo}
      onCancel={() => {
        setIsModalDebtInfo(false);
        setSelectedDebt(null);
        setDebtData([]);
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
              title="Debt Info"
            >
              <div className="table-responsive">
                <List
                  style={{
                    border: 'none',
                  }}
                  size="small"
                  bordered
                  dataSource={debtData}
                  renderItem={(item) => (
                    <>
                      <List.Item>Id: {item.id}</List.Item>
                      <List.Item>User ID: {item.user_id}</List.Item>
                      <List.Item>Amount: {item.amount}</List.Item>
                      <List.Item>Currency: {item.currency}</List.Item>
                      <List.Item>
                        Income:{' '}
                        {item.income ? (
                          <span style={{ color: 'green' }}>True</span>
                        ) : (
                          <span style={{ color: 'red' }}>False</span>
                        )}
                      </List.Item>
                      <List.Item>Deadline: {item?.deadline?.slice(0, 19)}</List.Item>
                      <List.Item>Date: {item.date?.slice(0, 19)}</List.Item>
                    </>
                  )}
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
