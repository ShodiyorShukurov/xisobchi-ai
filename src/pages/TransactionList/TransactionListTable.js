import React from 'react';
import { Row, Col, Card, Button, Space, Form, Select } from 'antd';
import useTransactionList from '../../hooks/UseTransactionList';
import Main from '../../components/layout/Main';
import TransactionData from './data/TransactionData';
import MoreInfoModal from './components/MoreInfoModal';
import { data } from '../../mock/data';
import { useMain } from '../../hooks/UseMain';
import CancelTransactionModal from './components/CancelTransaction';

const { Option } = Select;

function TransactionListTable() {
  const {
    transactionListData,
    setNext,
    next,
    fetchTransactionMonthData,
    total,
    showUserInfoModal,
    isModalUserInfo,
    setIsModalUserInfo,
    selectedUser,
    setSelectedUser,
    isLoading,
    setMethod,
    isModalVisible,
    setIsModalVisible,
    showCancelTransactionModal,
    transactionId,
  } = useTransactionList();

  const { changeValue } = useMain();

  const [form] = Form.useForm();

  const handleFetch = (values) => {
    if (values.month && values.year) {
      fetchTransactionMonthData(values.year, values.month);
    }
  };

  return (
    <Main>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs={24} xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title={data[changeValue].transactions_info.title}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '20px',
                }}
              >
                <Form
                  form={form}
                  layout="inline"
                  onValuesChange={(_, values) => handleFetch(values)}
                >
                  <Form.Item
                    label={data[changeValue].transactions_info.label_1}
                    name="month"
                  >
                    <Select
                      placeholder={
                        data[changeValue].transactions_info.placeholder_1
                      }
                    >
                      <Option key="01" value="01">
                        {data[changeValue].transactions_info.january}
                      </Option>
                      <Option key="02" value="02">
                        {data[changeValue].transactions_info.february}
                      </Option>
                      <Option key="03" value="03">
                        {data[changeValue].transactions_info.march}
                      </Option>
                      <Option key="04" value="04">
                        {data[changeValue].transactions_info.april}
                      </Option>
                      <Option key="05" value="05">
                        {data[changeValue].transactions_info.may}
                      </Option>
                      <Option key="06" value="06">
                        {data[changeValue].transactions_info.june}
                      </Option>
                      <Option key="07" value="07">
                        {data[changeValue].transactions_info.july}
                      </Option>
                      <Option key="08" value="08">
                        {data[changeValue].transactions_info.august}
                      </Option>
                      <Option key="09" value="09">
                        {data[changeValue].transactions_info.september}
                      </Option>
                      <Option key="10" value="10">
                        {data[changeValue].transactions_info.october}
                      </Option>
                      <Option key="11" value="11">
                        {data[changeValue].transactions_info.november}
                      </Option>
                      <Option key="12" value="12">
                        {data[changeValue].transactions_info.december}
                      </Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label={data[changeValue].transactions_info.label_2}
                    name="year"
                  >
                    <Select
                      placeholder={
                        data[changeValue].transactions_info.placeholder_2
                      }
                    >
                      <Option key="2020" value="2020">
                        2020
                      </Option>
                      <Option key="2021" value="2021">
                        2021
                      </Option>
                      <Option key="2022" value="2022">
                        2022
                      </Option>
                      <Option key="2023" value="2023">
                        2023
                      </Option>
                      <Option key="2024" value="2024">
                        2024
                      </Option>
                      <Option key="2025" value="2025">
                        2025
                      </Option>
                      <Option key="2026" value="2026">
                        2026
                      </Option>
                      <Option key="2027" value="2027">
                        2027
                      </Option>
                      <Option key="2028" value="2028">
                        2028
                      </Option>
                      <Option key="2029" value="2029">
                        2029
                      </Option>
                      <Option key="2030" value="2030">
                        2030
                      </Option>
                    </Select>
                  </Form.Item>
                </Form>

                <Form.Item
                  label={data[changeValue].transactions_info.label_3}
                  name="method"
                >
                  <Select
                    onChange={(value) => setMethod(value)}
                    placeholder={
                      data[changeValue].transactions_info.placeholder_3
                    }
                  >
                    <Option value="all" key="ALL">
                      ALL
                    </Option>
                    <Option value="CARD" key="CARD">
                      CARD
                    </Option>
                    <Option value="ADMIN" key="ADMIN">
                      ADMIN
                    </Option>
                    <Option value="CASH" key="CASH">
                      CASH
                    </Option>
                  </Select>
                </Form.Item>
              </div>

              {isLoading ? (
                data[changeValue].loading
              ) : (
                <>
                  {total?.sum ? (
                    <div
                      style={{
                        marginBottom: '16px',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: '#14A44D',
                        padding: '0 20px',
                      }}
                    >
                      {data[changeValue].transactions_info.total_amount}:{' '}
                      {Number(total?.sum / 100).toFixed(2)}
                    </div>
                  ) : (
                    ' '
                  )}

                  <div className="table-responsive">
                    <TransactionData
                      transactionListData={transactionListData}
                      showUserInfoModal={showUserInfoModal}
                      showCancelTransactionModal={showCancelTransactionModal}
                    />
                  </div>
                  <Space style={{ padding: '10px' }}>
                    {next > 1 && (
                      <Button onClick={() => setNext(next - 1)}>
                        {data[changeValue].previous_button}
                      </Button>
                    )}
                    {transactionListData?.length >= 50 ? (
                      <Button onClick={() => setNext(next + 1)}>
                        {data[changeValue].next_button}
                      </Button>
                    ) : (
                      <Button disabled>{data[changeValue].next_button}</Button>
                    )}
                  </Space>
                </>
              )}
            </Card>
          </Col>
        </Row>

        <MoreInfoModal
          isModalUserInfo={isModalUserInfo}
          setIsModalUserInfo={setIsModalUserInfo}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />

        <CancelTransactionModal
        transactionId={transactionId}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      </div>
    </Main>
  );
}

export default TransactionListTable;
