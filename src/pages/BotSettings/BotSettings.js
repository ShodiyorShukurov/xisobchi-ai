import React from 'react';
import { Row, Col, Card, Button } from 'antd';
import Main from '../../components/layout/Main';
import usePrice from '../../hooks/UsePrice';
import PriceData from './data/PriceData';
import PriceModal from './components/PriceModal';
import { data as mockData } from '../../mock/data';
import { useMain } from '../../hooks/UseMain';
import PriceDeleteModal from './components/PriceDeleteModal';

function BotSettings() {
  const {
    data,
    setEditData,
    isModalVisible,
    selectItem,
    showModal,
    handleCancel,
    isLoading,
    setIsModalVisible,
    handleDelete,
    openDeleteModal,
    handleDeleteModal,
    setOpenDeleteModal
  } = usePrice();

  const { changeValue } = useMain();

  if (isLoading) {
    return <Main>{mockData[changeValue].loading}</Main>;
  }

  return (
    <Main>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title={mockData[changeValue].bot_settings.price_table}
            >
              <Button
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginTop: '20px',
                  marginRight: '20px',
                  marginBottom: '20px',
                }}
                type="primary"
                className="mx-2"
                onClick={() => setIsModalVisible(true)}
              >
                Price Add
              </Button>
              <div className="table-responsive">
                <PriceData data={data} showModal={showModal} handleDeleteModal={handleDeleteModal} />
              </div>
            </Card>
          </Col>
        </Row>
        {/* Modal for Edit Price */}
        <PriceModal
          setEditData={setEditData}
          isModalVisible={isModalVisible}
          selectItem={selectItem}
          handleCancel={handleCancel}
        />

        <PriceDeleteModal
          openDeleteModal={openDeleteModal}
          handleDelete={handleDelete}
          setOpenDeleteModal={setOpenDeleteModal}
        />

      </div>
    </Main>
  );
}

export default BotSettings;
