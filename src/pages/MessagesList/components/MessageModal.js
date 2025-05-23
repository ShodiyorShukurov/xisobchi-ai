import { Button, Form, Input, message, Modal, Select, Upload } from 'antd';
import Api from '../../../api';
import { data } from '../../../mock/data';
import { useMain } from '../../../hooks/UseMain';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';

const MessageModal = ({ isModalVisible, handleCancel, getMessage }) => {
  const { changeValue } = useMain();
  const [form] = Form.useForm();
  const [textValue, setTextValue] = useState('<p></p>');

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
      values?.image[0]?.originFileObj ? values?.image[0]?.originFileObj : ''
    );

    console.log('formData', ...formData);

    try {
      await Api.post('/message/send', formData);
      message.success('done');
      getMessage();
      handleCancel();
      form.resetFields();
      setTextValue('<p></p>');
    } catch (error) {
      console.error(error);
      // message.error(data[changeValue].bot_settings.price_error);
    }
  };

  return (
    <Modal
      title="Send Message"
      open={isModalVisible}
      onCancel={() => {
        handleCancel();
        setTextValue('<p></p>');
        form.resetFields();
      }}
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
          <CKEditor
            editor={ClassicEditor}
            config={{
              toolbar: [
                'heading',
                '|',
                'bold',
                'italic',
                'underline',
                'strikethrough',
                'code',
                'subscript',
                'superscript',
                '|',
                'link',
                'bulletedList',
                'numberedList',
                'blockQuote',
                'codeBlock',
                '|',
                'outdent',
                'indent',
                'alignment',
                '|',
                'undo',
                'redo',
                'removeFormat',
                '|',
                'fontSize',
                'fontColor',
                'fontBackgroundColor',
              ],
            }}
            data={textValue}
            onReady={(editor) => {
              console.log('Editor is ready to use!', editor);
            }}
            onChange={(_, editor) => {
              const data = editor.getData();
              setTextValue(data);
              form.setFieldsValue({ text: data });
            }}
          />
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
          <Select
            placeholder="Select language"
            style={{ width: '100%' }}
            options={[
              { value: 'eng', label: 'English' },
              { value: 'ru', label: 'Russian' },
              { value: 'uz', label: 'Uzbek' },
            ]}
          />
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
