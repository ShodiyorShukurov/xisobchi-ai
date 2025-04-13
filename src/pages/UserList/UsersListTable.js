import React from "react";
import { Row, Col, Card, Button, Space, Input, message, Select } from "antd";
import useUserList from "../../hooks/UseUserList";
import Main from "../../components/layout/Main";
import SendMessageUserModal from "./components/SendMessageUserModal";
import UserData from "./data/UserData";
import AddTransactionModal from "./components/AddTransactionModal";
import MoreInfoModal from "./components/MoreInfoModal";
import { data } from "../../mock/data";
import { useMain } from "../../hooks/UseMain";

const { Option } = Select;

function UsersListTable() {
  const {
    userListData,
    next,
    setNext,
    fetchUserPhoneNumberData,
    isModalVisible,
    handleCancel,
    selectedUser,
    setSelectedUser,
    openMessageModal,
    isTransactionModalVisible,
    handleTransactionCancel,
    showTransactionModal,
    showUserInfoModal,
    isModalUserInfo,
    setIsModalUserInfo,
    sourceData,
    isLoading,
    fetchSortData,
  } = useUserList();

  const { changeValue } = useMain();

  const [phoneNumber, setPhoneNumber] = React.useState();

  const onSearch = () => {
    if (!phoneNumber) {
      message.warning(data[changeValue].users_list.must_number);
      return;
    }
    const number = phoneNumber.startsWith("+")
      ? phoneNumber.slice(1)
      : phoneNumber;
    fetchUserPhoneNumberData(number);
  };

  return (
    <Main>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title={data[changeValue].users_list.title}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingRight: "20px",
                }}
              >
                <div>
                  <Input
                    placeholder={data[changeValue].users_list.input_placeholder}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    onPressEnter={onSearch}
                    style={{
                      marginBottom: "16px",
                      width: "300px",
                      marginLeft: "20px",
                      marginTop: "20px",
                    }}
                  />
                  <Button
                    onClick={onSearch}
                    type="primary"
                    style={{ marginLeft: "10px" }}
                  >
                    {data[changeValue].users_list.form_button_text}
                  </Button>
                </div>

                <Select
                  placeholder={data[changeValue].users_list.option_placeholder}
                  style={{ width: "300px" }}
                  onChange={(value) => fetchSortData(value)}
                >
                  <Option key="all" value="all">
                    All
                  </Option>
                  <Option key="subscribe" value="subscribe">
                    {data[changeValue].users_list.option_1}
                  </Option>
                  <Option key="unsubscribe" value="unsubscribe">
                    {data[changeValue].users_list.option_2}
                  </Option>
                  <Option key="duration" value="duration">
                    {data[changeValue].users_list.option_3}
                  </Option>
                  <Option key="unduration" value="unduration">
                    {data[changeValue].users_list.option_4}
                  </Option>
                </Select>

                {/* <Button type="primary" onClick={() => openMessageModal()}>
                  {data[changeValue].users_list.button_text}
                </Button> */}
              </div>

              <div className="table-responsive">
                {isLoading ? (
                  data[changeValue].loading
                ) : (
                  <UserData
                    userListData={userListData}
                    openMessageModal={openMessageModal}
                    showTransactionModal={showTransactionModal}
                    showUserInfoModal={showUserInfoModal}
                  />
                )}
              </div>
              <Space style={{ padding: "10px" }}>
                {next > 1 && (
                  <Button className="me-4" onClick={() => setNext(next - 1)}>
                    {data[changeValue].previous_button}
                  </Button>
                )}

                {userListData?.length >= 50 ? (
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
          isModalUserInfo={isModalUserInfo}
          setIsModalUserInfo={setIsModalUserInfo}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />

        {/* User send message Modal */}
        <SendMessageUserModal
          isModalVisible={isModalVisible}
          handleCancel={handleCancel}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          sourceData={sourceData}
        />

        {/*Transaction modal*/}

        <AddTransactionModal
          isTransactionModalVisible={isTransactionModalVisible}
          handleTransactionCancel={handleTransactionCancel}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      </div>
    </Main>
  );
}

export default UsersListTable;
