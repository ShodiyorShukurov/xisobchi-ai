import React from 'react';
import {
  Row,
  Col,
  Card,
  Button,
  Space,
  InputNumber,
} from 'antd';
import Main from '../../components/layout/Main';
import MoreInfoModal from './components/MoreInfoModal';
import { data } from '../../mock/data';
import { useMain } from '../../hooks/UseMain';
import useReports from '../../hooks/UseReports';
import ReportsData from './data/ReportsData';

function ReportsPage() {
  const {
    reportsListData,
    next,
    setNext,
    fetchReportData,
    selectedReport,
    setIsModalReportInfo,
    showReprortInfoModal,
    isModalReportInfo,
    isLoading,
    setSelectedReport,
    fetchReportsListData,
    setId,
    id
  } = useReports();
console.log(id)
  const { changeValue } = useMain();

  return (
    <Main>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Reports"
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingRight: '20px',
                }}
              >
                <div>
                  <InputNumber
                    placeholder="Search by user id"
                    value={id}
                    onChange={(value) => setId(value)}
                    onPressEnter={() => fetchReportData()}
                    style={{
                      marginBottom: '16px',
                      width: '300px',
                      marginLeft: '20px',
                      marginTop: '20px',
                    }}
                  />
                  <Button
                    onClick={() => fetchReportData()}
                    type="primary"
                    disabled={!id}
                    style={{ marginLeft: '10px' }}
                  >
                    {data[changeValue].users_list.form_button_text}
                  </Button>

                  <Button
                    onClick={() => {fetchReportsListData(); setId('');}}
                    type="primary"
                    style={{ marginLeft: '10px' }}
                  >
                    Reset
                  </Button>
                </div>
              </div>

              <div className="table-responsive">
                {isLoading ? (
                  data[changeValue].loading
                ) : (
                  <ReportsData
                    reportsListData={reportsListData}
                    showReprortInfoModal={showReprortInfoModal}
                  />
                )}
              </div>
              <Space style={{ padding: '10px' }}>
                {next > 1 && (
                  <Button className="me-4" onClick={() => setNext(next - 1)}>
                    {data[changeValue].previous_button}
                  </Button>
                )}

                {reportsListData?.length >= 50 ? (
                  <Button color="dark" onClick={() => setNext(next + 1)}>
                    {data[changeValue].next_button}
                  </Button>
                ) : (
                  <Button variant="text" color="dark" disabled>
                    {data[changeValue].next_button}
                  </Button>
                )}
              </Space>
            </Card>
          </Col>
        </Row>

        {/*More Info User*/}
        <MoreInfoModal
          isModalReportInfo={isModalReportInfo}
          setIsModalReportInfo={setIsModalReportInfo}
          selectedReport={selectedReport}
          setSelectedReport={setSelectedReport}
        />
      </div>
    </Main>
  );
}

export default ReportsPage;
