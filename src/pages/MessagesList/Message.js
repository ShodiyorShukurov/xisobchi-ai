import React from 'react';
import { Row, Col, Card, Button, Space } from 'antd';
import Main from '../../components/layout/Main';
import { data } from '../../mock/data';
import { useMain } from '../../hooks/UseMain';
import UseMessage from '../../hooks/UseMessage';
import MessageData from './data/MessageData';
import MessageModal from './components/MessageModal';
import DeleteModal from './components/DeleteModal';
import MoreInfoModal from './components/MoreInfoModal';

function Message() {
  const {
    message,
    next,
    setNext,
    isLoading,
    isModalVisible,
    showModal,
    handleCancel,
    getMessage,
    openDeleteModal,
    setOpenDeleteModal,
    handleDelete,
    handleDeleteModal,
    showMoreInfoModal,
    moreInfoModal,
     handleMoreInfoCancel,
    moreInfoId,
  } = UseMessage();

  const { changeValue } = useMain();

  return (
    <Main>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs={24} xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Messages List"
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
                onClick={() => showModal(null)}
              >
                Send Message
              </Button>
              <div className="table-responsive">
                {isLoading ? (
                  data[changeValue].loading
                ) : (
                  <MessageData
                    message={message}
                    handleDeleteModal={handleDeleteModal}
                    showMoreInfoModal={showMoreInfoModal}
                  />
                )}
              </div>
              <Space style={{ padding: '10px' }}>
                {next > 1 && (
                  <Button className="me-4" onClick={() => setNext(next - 1)}>
                    {data[changeValue].previous_button}
                  </Button>
                )}

                {message?.length >= 50 ? (
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

          <MessageModal
            isModalVisible={isModalVisible}
            handleCancel={handleCancel}
            getMessage={getMessage}
          />

          <DeleteModal
            openDeleteModal={openDeleteModal}
            setOpenDeleteModal={setOpenDeleteModal}
            handleDelete={handleDelete}
          />

          <MoreInfoModal moreInfoModal={moreInfoModal}
           handleMoreInfoCancel={handleMoreInfoCancel}
    moreInfoId={moreInfoId}
          />
        </Row>
      </div>
    </Main>
  );
}

export default Message;
