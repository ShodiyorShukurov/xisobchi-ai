import React from "react";
import Main from "../../components/layout/Main";
import { Button, Card, Col, Row, Space } from "antd";
import DeleteModal from "./components/DeleteModal";
import { data } from "../../mock/data";
import { useMain } from "../../hooks/UseMain";
import AdminData from "./data/AdminData";
import AdminModal from "./components/AdminModal";
import useAdmin from "../../hooks/UseAdmin";

const Admin = () => {
  const {
    adminData,
    setNext,
    next,
    isModalVisible,
    selectItem,
    openMessageModal,
    handleCancel,
    isLoading,
    setIsLoading,
    openDeleteModal,
    closeDeleteModal,
    handleDelete,
    isModalDelete,
    fetchAdminData,
  } = useAdmin();

  const { changeValue } = useMain();

  if (isLoading) return <Main>{data[changeValue].loading}</Main>;

  return (
    <Main>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title={data[changeValue].admin.title}
            >
              <Button
                type="primary"
                style={{
                  display: "block",
                  marginLeft: "auto",
                  marginTop: "20px",
                  marginRight: "20px",
                  marginBottom: "20px",
                }}
                onClick={() => openMessageModal()}
              >
                {data[changeValue].admin.add_button}
              </Button>
              <div className="table-responsive">
                <AdminData
                  adminData={adminData}
                  openMessageModal={openMessageModal}
                  openDeleteModal={openDeleteModal}
                />
              </div>

              <Space style={{ padding: "10px" }}>
                {next > 1 && (
                  <Button className="me-4" onClick={() => setNext(next - 1)}>
                    {data[changeValue].previous_button}
                  </Button>
                )}

                {adminData?.length >= 50 ? (
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

        {/*Trail Add and edit modal*/}
        <AdminModal
          isModalVisible={isModalVisible}
          selectItem={selectItem}
          handleCancel={handleCancel}
          setIsLoading={setIsLoading}
          fetchAdminData={fetchAdminData}
        />

        {/*Trail Delete modal*/}

        <DeleteModal
          closeDeleteModal={closeDeleteModal}
          handleDelete={handleDelete}
          isModalDelete={isModalDelete}
        />
      </div>
    </Main>
  );
};

export default Admin;
