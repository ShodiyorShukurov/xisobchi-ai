import { Button, Form, Input, InputNumber, message, Modal, Select } from 'antd';
import Api from '../../../api';
import React from 'react';
import { data } from '../../../mock/data';
import { useMain } from '../../../hooks/UseMain';
import InputMask from 'react-input-mask';

const CategoryModal = ({
  setEditData,
  isModalVisible,
  selectItem,
  handleCancel,
}) => {
  const { changeValue } = useMain();
  const [form] = Form.useForm();
console.log(selectItem)

  React.useEffect(() => {
    if (isModalVisible && selectItem) {
      form.setFieldsValue({
        name_uz: selectItem.name_uz || '',
        name_ru: selectItem.name_ru || '',
        name_en: selectItem.name_en || '',
        emoji: selectItem.emoji || '',
        primary: selectItem.primary || '',  
      });
    }
  }, [isModalVisible, selectItem, form]);

  const handleEditPratner = async (values) => {
    setEditData(true);
    const data = {
      name_uz: values.name_uz,
      name_ru: values.name_ru,
      name_en: values.name_en,
      emoji: values.emoji,
      primary: values.primary,
    };

    try {
      if (selectItem.id) {
        data.id = selectItem.id;
        await Api.put('/categories', data);
        message.success('done');
      } else {
        await Api.post('/categories', data);
        message.success('done');
      }
      handleCancel();
      form.resetFields();
    } catch (error) {
      console.error(error);
      // message.error(data[changeValue].bot_settings.price_error);
    } finally {
      setEditData(false);
    }
  };

  return (
    <Modal
      title="Add Partner"
      open={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleEditPratner}>
        <Form.Item
          name="name_uz"
          label="Name Uz"
          rules={[
            {
              required: true,
              message: data[changeValue].bot_settings.price_required,
            },
          ]}
        >
          <Input style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="name_ru"
          label="Name Ru"
          // rules={[
          //   {
          //     required: true,
          //     message: data[changeValue].bot_settings.price_required,
          //   },
          // ]}
        >
          <Input style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="name_en"
          label="Name En"
          // rules={[
          //   {
          //     required: true,
          //     message: data[changeValue].bot_settings.price_required,
          //   },
          // ]}
        >
          <Input style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="emoji"
          label="Emoji"
          // rules={[
          //   {
          //     required: true,
          //     message: data[changeValue].bot_settings.price_required,
          //   },
          // ]}
        >
          <Input style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="primary"
          label="Primary"
          rules={[
            {
              required: true,
              message: data[changeValue].bot_settings.price_required,
            },
          ]}
        >
          <Select
            // defaultValue={selectItem?.primary ? true : selectItem?.primary}
            placeholder="Select value"
            style={{ width: '100%' }}
            options={[
              { value: true, label: 'True' },
              { value: false, label: 'False' },
            ]}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add Category
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryModal;
