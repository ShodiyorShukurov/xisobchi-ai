import { Button, Form, Input, message, Modal, Select, Upload } from 'antd';
import Api from '../../../api';
import { data } from '../../../mock/data';
import { useMain } from '../../../hooks/UseMain';
import TextArea from 'antd/lib/input/TextArea';
import { UploadOutlined } from '@ant-design/icons';

const MessageModal = ({ isModalVisible, handleCancel, getMessage }) => {
  const { changeValue } = useMain();
  const [form] = Form.useForm();

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList.slice(-1);
  };

  const handleEditPratner = async (values) => {
    const formData = new FormData();
    formData.append('text', values.text);
    formData.append('premium', values.premium);
    formData.append('bot_lang', values.bot_lang);
    formData.append(
      'file',
      values?.image[0]?.originFileObj ? values?.image[0]?.originFileObj : null
    );

    try {
      await Api.post('/message/send', formData);
      message.success('done');
      getMessage();
      handleCancel();
      form.resetFields();
    } catch (error) {
      console.error(error);
      // message.error(data[changeValue].bot_settings.price_error);
    }
  };

  return (
    <Modal
      title="Send Message"
      open={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleEditPratner}>
        <Form.Item
          name="text"
          label="Text"
          rules={[
            {
              required: true,
              message: data[changeValue].bot_settings.price_required,
            },
          ]}
        >
          <TextArea style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="premium" label="Premium">
          <Select
            placeholder="Select premium"
            style={{ width: '100%' }}
            options={[
              { value: true, label: 'True' },
              { value: false, label: 'False' },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="bot_lang"
          label="Bot lang"
          rules={[
            {
              required: true,
              message: data[changeValue].bot_settings.price_required,
            },
          ]}
        >
          <Input style={{ width: '100%' }} placeholder="Enter bot lang" />
        </Form.Item>

        <Form.Item
          label="Image"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          style={{ width: '100%' }}
        >
          <Upload
            accept="image/png,image/jpeg, image/jpg, image/webp, image/gif"
            beforeUpload={() => false}
            maxCount={1}
            listType="picture"
            className="w-full"
            style={{ width: '100%' }}
          >
            <Button icon={<UploadOutlined />} block>
              Upload Image
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add Partner
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MessageModal;
