import React from 'react';
import { Row, Col, Card, Button } from 'antd';
import Main from '../../components/layout/Main';
import PartnersData from './data/PartnersData';
import PartnerModal from './components/PartnerModal';
import { data as mockData } from '../../mock/data';
import { useMain } from '../../hooks/UseMain';
import PriceDeleteModal from './components/PriceDeleteModal';
import usePartner from '../../hooks/UsePartner';
import MoreInfoModal from './components/MoreInfoModal';

function PartnerList() {
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
    setOpenDeleteModal,
    showMoreInfo,
    moreInfoId,
    moreInfoModal,
    setMoreInfoModal,
  } = usePartner();

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
              title="Partners List"
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
                Add partners
              </Button>
              <div className="table-responsive">
                <PartnersData
                  data={data}
                  showModal={showModal}
                  handleDeleteModal={handleDeleteModal}
                  showMoreInfo={showMoreInfo}
                />
              </div>
            </Card>
          </Col>
        </Row>
        {/* Modal for Edit Price */}
        <PartnerModal
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

        <MoreInfoModal
          moreInfoId={moreInfoId}
          moreInfoModal={moreInfoModal}
          setMoreInfoModal={setMoreInfoModal}
        />
      </div>
    </Main>
  );
}

export default PartnerList;
