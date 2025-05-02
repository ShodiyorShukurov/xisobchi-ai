import React from 'react';
import { Modal, Row, Col, Card, List } from 'antd';
import Api from '../../../api';

const MoreInfoModal = ({
  isModalReportInfo,
  setIsModalReportInfo,
  selectedReport,
  setSelectedReport,
}) => {
  /*User data start*/
  const [reportData, setReportData] = React.useState([]);

  const fetchReportData = async () => {
    if (!selectedReport) return;
    try {
      const res = await Api.get('/report/' + selectedReport);
      if (res.data) {
        setReportData([res.data.data]);
      } else {
        setReportData([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /*User data end*/

  React.useEffect(() => {
    fetchReportData();
  }, [selectedReport]);

  return (
    <Modal
      title="Report Info"
      open={isModalReportInfo}
      onCancel={() => {
        setIsModalReportInfo(false);
        setSelectedReport(null);
        setReportData([]);
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
              title="Report Info"
            >
              <div className="table-responsive">
                <List
                  style={{
                    border: 'none',
                  }}
                  size="small"
                  // header={<div>Header</div>}
                  // footer={<div>Footer</div>}
                  bordered
                  dataSource={reportData}
                  renderItem={(item) => (
                    <>
                      <List.Item>Id: {item.id}</List.Item>
                      <List.Item>User ID: {item.user_id}</List.Item>
                      <List.Item>Category ID: {item.category_id}</List.Item>
                      <List.Item>Category Name: {item.category_name}</List.Item>
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
                      <List.Item>Comment: {item.comment}</List.Item>
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
