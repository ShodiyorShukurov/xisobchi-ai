import { Button, Form, Input, InputNumber, message, Modal } from 'antd';
import Api from '../../../api';
import React from 'react';
import { data } from '../../../mock/data';
import { useMain } from '../../../hooks/UseMain';

const PriceModal = ({
  setEditData,
  isModalVisible,
  selectItem,
  handleCancel,
}) => {
  const { changeValue } = useMain();
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (isModalVisible && selectItem) {
      form.setFieldsValue({
        price: selectItem.price || '',
        title_uz: selectItem.title_uz || '',
        title_ru: selectItem.title_ru || '',
        title_en: selectItem.title_eng || '',
        period: selectItem.period || '',
        sort_order: selectItem.sort_order || '',
      });
    }
  }, [isModalVisible, selectItem, form]);

  const handleEditPrice = async (values) => {
    setEditData(true);
    const data = {
      price: Math.round(values.price),
      title_uz: values.title_uz,
      title_ru: values.title_ru,
      title_eng: values.title_en,
      period: values.period,
      sort_order: values.sort_order,
    };

    try {
      if (selectItem.id) {
        data.id = selectItem.id;
        await Api.put('/price', data);
        message.success("done");
      } else {
        await Api.post('/price', data);
        message.success("done");
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
      title={data[changeValue].bot_settings.price_title}
      open={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleEditPrice}>
        <Form.Item
          name="title_uz"
          label="Title Uz"
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
          name="title_ru"
          label="Title Ru"
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
          name="title_en"
          label="Title En"
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
          name="price"
          label={data[changeValue].bot_settings.price_label}
          rules={[
            {
              required: true,
              message: data[changeValue].bot_settings.price_required,
            },
          ]}
        >
          <InputNumber style={{ width: '100%' }} min={0} />
        </Form.Item>

        <Form.Item
          name="period"
          label="Period"
          rules={[
            {
              required: true,
              message: data[changeValue].bot_settings.price_required,
            },
          ]}
        >
          <InputNumber style={{ width: '100%' }} min={1} />
        </Form.Item>

        <Form.Item
          name="sort_order"
          label="sort Order"
          rules={[
            {
              required: true,
              message: data[changeValue].bot_settings.price_required,
            },
          ]}
        >
          <InputNumber style={{ width: '100%' }} min={1} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {data[changeValue].bot_settings.price_button}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PriceModal;
