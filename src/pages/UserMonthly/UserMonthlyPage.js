import React from 'react';
import Main from '../../components/layout/Main';
import UseMonthlyUsers from '../../hooks/UseMonthlyUsers';
import { Button, Card, Col, Input, Row, Typography } from 'antd';
import UserMonthlyData from './data/UserMonthlyData';

const { Title } = Typography;

const UserMonthlyPage = () => {
  const {
    monthlyUsersData,
    isLoading,
   setYearValue,
    setMonthValue,
    yearValue,
    monthValue,
    fetchMonthlyUsersData,
  } = UseMonthlyUsers();

  if (isLoading) {
    return <Main>Loading...</Main>;
  }

  return (
    <Main>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Monthly User Summary"
            >
              <form>
                <div
                  style={{
                    display: 'flex',
                    gap: '20px',
                    alignItems: 'center',
                    margin: '20px',
                  }}
                >
                  <div>
                    <label htmlFor="year">Year:</label>
                    <Input
                      type="number"
                      id="year"
                      value={yearValue}
                        onChange={(e) => setYearValue(e.target.value)}
                      //   style={{ margin: '0 10px' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="month">Month:</label>
                    <Input
                      type="number"
                      id="month"
                      value={monthValue}
                        onChange={(e) => setMonthValue(e.target.value)}
                      //   style={{ margin: '0 10px' }}
                    />
                  </div>
                </div>
              </form>
              <Title level={5} style={{ margin: '20px', color: '#1890ff' }}>
                Total Users:{' '}
                {Number(
                  monthlyUsersData?.data?.total
                    ? monthlyUsersData?.data?.total
                    : 0
                ).toLocaleString('uz-UZ')}
              </Title>
              <div className="table-responsive">
                <UserMonthlyData monthlyUsersData={monthlyUsersData.data} />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </Main>
  );
};

export default UserMonthlyPage;
