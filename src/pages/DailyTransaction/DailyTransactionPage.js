import React from 'react';
import Main from '../../components/layout/Main';
import UseDailyTransaction from '../../hooks/UseDailyTransaction';
import { Button, Card, Col, Row, Space, Typography } from 'antd';
import DailyTransactionData from './data/DailyTransactionData';

const { Title } = Typography;

const DailyTransactionPage = () => {
  const { dailyTransactionData, next, isLoading, setNext } =
    UseDailyTransaction();

  if (isLoading) {
    return <Main>Loading...</Main>;
  }
  console.log(dailyTransactionData);
  return (
    <Main>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title=" Daily Transaction Summary"
            >
              <Title level={5} style={{ margin: '20px', color: '#1890ff' }}>
                Total Amount:{' '}
                {Number(dailyTransactionData?.total_amout).toLocaleString(
                  'uz-UZ'
                )}{' '}
                UZS
              </Title>
              <div className="table-responsive">
                <DailyTransactionData
                  dailyTransactionData={dailyTransactionData}
                />
              </div>

              <Space style={{ padding: '10px' }}>
                {next > 1 && (
                  <Button onClick={() => setNext(next - 1)}>
                   Previous
                  </Button>
                )}
                {dailyTransactionData?.data?.length >= 50 ? (
                  <Button onClick={() => setNext(next + 1)}>
                   Next
                  </Button>
                ) : (
                  <Button disabled>Next</Button>
                )}
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
    </Main>
  );
};

export default DailyTransactionPage;
