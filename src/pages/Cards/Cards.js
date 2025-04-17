import React from 'react';
import { Row, Col, Card, Button, Space } from 'antd';
import Main from '../../components/layout/Main';
import UseCard from '../../hooks/UseCard';
import { useMain } from '../../hooks/UseMain';
import { data as mockData } from '../../mock/data';
import CardData from './data/CardData';
import CardDeleteModal from './components/CardDeleteModal'

const Cards = () => {
  const {
    cardData,
    isLoading,
    openDeleteModal,
    handleDeleteModal,
    handleDelete,
    setOpenDeleteModal,
    setNext,
    next,
  } = UseCard();

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
              title="Card List"
            >
              <div className="table-responsive">
                <CardData
                  cardData={cardData}
                  handleDeleteModal={handleDeleteModal}
                />
                 <Space style={{ padding: "10px" }}>
                    {next > 1 ? (
                      <Button onClick={() => setNext(next - 1)}>
                        {mockData[changeValue].previous_button}
                      </Button>
                    ) : (
                      ""
                    )}
                    {cardData?.length >= 10 ? (
                      <Button onClick={() => setNext(next + 1)}>
                        {mockData[changeValue].next_button}
                      </Button>
                    ) : (
                      <Button disabled>
                        {mockData[changeValue].next_button}
                      </Button>
                    )}
                  </Space>
              </div>
            </Card>
          </Col>
        </Row>
        
        <CardDeleteModal
          openDeleteModal={openDeleteModal}
          handleDelete={handleDelete}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      </div>
    </Main>
  );
};

export default Cards;
