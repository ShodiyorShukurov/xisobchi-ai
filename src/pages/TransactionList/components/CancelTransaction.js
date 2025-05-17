import { Modal, Form, Input } from 'antd';
import Api from '../../../api';

const CancelTransactionModal = ({
  isModalVisible,
  setIsModalVisible,
  transactionId,
}) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        await Api.post(`/transactions/cancel-trans`, {
          reason: values.reason,
          success_trans_id: transactionId,
        });
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div>
      <Modal
        title="Cancel Transaction"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" name="cancel_transaction_form">
          <Form.Item
            name="reason"
            label="Reason for Cancellation"
            rules={[
              {
                required: true,
                message: 'Please enter the reason for cancellation',
              },
            ]}
          >
            <Input placeholder="Enter cancellation reason" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CancelTransactionModal;
