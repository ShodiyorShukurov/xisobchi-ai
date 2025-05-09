import React from 'react';
import { Row, Col, Card, Button, Space, Input, message, Select } from 'antd';
import useUserList from '../../hooks/UseUserList';
import Main from '../../components/layout/Main';
import UserData from './data/UserData';
import MoreInfoModal from './components/MoreInfoModal';
import { data } from '../../mock/data';
import { useMain } from '../../hooks/UseMain';
import UserDelete from './components/UserDelete';

function UsersListTable() {
  const {
    userListData,
    next,
    setNext,
    fetchUserPhoneNumberData,
    selectedUser,
    setSelectedUser,
    openMessageModal,
    showTransactionModal,
    showUserInfoModal,
    isModalUserInfo,
    setIsModalUserInfo,
    isLoading,
    handleDelete,
    deleteModalVisible,
    setDeleteModalVisible,
    userReset,
    fetchUserListData,
    fetchUserId,
  } = useUserList();

  const { changeValue } = useMain();

  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [userId, setUserId] = React.useState('');

  const onSearch = () => {
    const cleanedPhone = phoneNumber?.replace(/^\+/, '');

    if (!phoneNumber && !userId) {
      message.warning(data[changeValue].users_list.must_number);
      message.warning(data[changeValue].users_list.must_user_id);
      return;
    }

    if (phoneNumber) {
      fetchUserPhoneNumberData(cleanedPhone);
    }

    if (userId) {
      fetchUserId(userId);
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
              title={data[changeValue].users_list.title}
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
                  <Input
                    placeholder={data[changeValue].users_list.input_placeholder}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    onPressEnter={onSearch}
                    style={{
                      marginBottom: '16px',
                      width: '300px',
                      marginLeft: '20px',
                      marginTop: '20px',
                    }}
                  />
                  <Input
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    onPressEnter={onSearch}
                    style={{
                      marginBottom: '16px',
                      width: '300px',
                      marginLeft: '20px',
                      marginTop: '20px',
                    }}
                  />
                  <Button
                    onClick={onSearch}
                    type="primary"
                    style={{ marginLeft: '10px' }}
                  >
                    {data[changeValue].users_list.form_button_text}
                  </Button>
                  <Button
                    style={{ marginLeft: '10px' }}
                    onClick={() => {
                      fetchUserListData();
                      setPhoneNumber('');
                      setUserId('');
                    }}
                  >
                    Reset
                  </Button>
                </div>
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
                    handleDelete={handleDelete}
                  />
                )}
              </div>
              <Space style={{ padding: '10px' }}>
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

        <MoreInfoModal
          isModalUserInfo={isModalUserInfo}
          setIsModalUserInfo={setIsModalUserInfo}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />

        <UserDelete
          deleteModalVisible={deleteModalVisible}
          userReset={userReset}
          setDeleteModalVisible={setDeleteModalVisible}
        />
      </div>
    </Main>
  );
}

export default UsersListTable;