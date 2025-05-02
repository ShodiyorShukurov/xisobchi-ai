import React from 'react';
import { Row, Col, Card, Button, Space, InputNumber } from 'antd';
import Main from '../../components/layout/Main';
import MoreInfoModal from './components/MoreInfoModal';
import { data } from '../../mock/data';
import { useMain } from '../../hooks/UseMain';
import DebtsData from './data/DebtsData';
import UseDebts from '../../hooks/UseDebts';

function DebtsPage() {
  const {
    debtsListData,
    next,
    setNext,
    fetchDebtData,
    showDebtInfoModal,
    isLoading,
    fetchDebtsListData,
    selectedDebt,
    isModalDebtInfo,
    setSelectedDebt,
    setIsModalDebtInfo,
  } = UseDebts();

  const { changeValue } = useMain();

  const [id, setId] = React.useState();

  return (
    <Main>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Debts"
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
                    placeholder="Search by id"
                    value={id}
                    onChange={(value) => setId(value)}
                    onPressEnter={() => fetchDebtData(id)}
                    style={{
                      marginBottom: '16px',
                      width: '300px',
                      marginLeft: '20px',
                      marginTop: '20px',
                    }}
                  />
                  <Button
                    onClick={() => fetchDebtData(id)}
                    type="primary"
                    disabled={!id}
                    style={{ marginLeft: '10px' }}
                  >
                    {data[changeValue].users_list.form_button_text}
                  </Button>

                  <Button
                    onClick={() => {
                        fetchDebtsListData();
                      setId('');
                    }}
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
                  <DebtsData
                    debtsListData={debtsListData}
                    showDebtInfoModal={showDebtInfoModal}
                  />
                )}
              </div>
              <Space style={{ padding: '10px' }}>
                {next > 1 && (
                  <Button className="me-4" onClick={() => setNext(next - 1)}>
                    {data[changeValue].previous_button}
                  </Button>
                )}

                {debtsListData?.length >= 50 ? (
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
          selectedDebt={selectedDebt}
          isModalDebtInfo={isModalDebtInfo}
          setSelectedDebt={setSelectedDebt}
          setIsModalDebtInfo={setIsModalDebtInfo}
        />
      </div>
    </Main>
  );
}

export default DebtsPage;
