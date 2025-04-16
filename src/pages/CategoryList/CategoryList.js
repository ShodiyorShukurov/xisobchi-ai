import React from 'react';
import { Row, Col, Card, Button } from 'antd';
import Main from '../../components/layout/Main';
import CategoryData from './data/CategoryData';
import CategoryModal from './components/CategoryModal';
import { data as mockData } from '../../mock/data';
import { useMain } from '../../hooks/UseMain';
import PriceDeleteModal from './components/PriceDeleteModal';
import MoreInfoModal from './components/MoreInfoModal';
import UseCategory from '../../hooks/UseCategory';

function CategoryList() {
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
  } = UseCategory();

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
              title="Categories List"
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
                Add Category
              </Button>
              <div className="table-responsive">
                <CategoryData
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
        <CategoryModal
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

export default CategoryList;
