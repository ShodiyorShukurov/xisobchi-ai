import { Button, Form, Input, InputNumber, message, Modal, Select } from 'antd';
import Api from '../../../api';
import React from 'react';
import { data } from '../../../mock/data';
import { useMain } from '../../../hooks/UseMain';
import InputMask from 'react-input-mask';

const PartnerModal = ({
  setEditData,
  isModalVisible,
  selectItem,
  handleCancel,
}) => {
  const { changeValue } = useMain();
  const [form] = Form.useForm();
  const [value, setValue] = React.useState('');

  React.useEffect(() => {
    if (isModalVisible && selectItem) {
      form.setFieldsValue({
        name: selectItem.name || '',
        phone_number: selectItem.phone_number || '',
        discount: selectItem.discount || '',
        additional: selectItem.additional || '',
        profit: selectItem.profit || '',
      });
    }
  }, [isModalVisible, selectItem, form]);

  const handleEditPratner = async (values) => {
    setEditData(true);
    const data = {
      name: values.name,
      phone_number: values.phone_number,
      discount: values.discount,
      additional: values.additional,
      profit: values.profit,
      duration: values.duration,
    };

    try {
      if (selectItem.id) {
        data.id = selectItem.id;
        await Api.put('/partners', data);
        message.success('done');
      } else {
        await Api.post('/partners', data);
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
          name="name"
          label="Name"
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
          name="phone_number"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: data[changeValue].bot_settings.price_required,
            },
          ]}
        >
          <InputMask
            mask="+998 99 999 99 99"
            maskChar={null}
            value={value?.startsWith('+998') ? value : '+998 '}
            onChange={(e) => {
              let newValue = e.target.value;
              if (!newValue.startsWith('+998')) {
                newValue = '+998 ';
              }
              setValue(newValue);
            }}
          >
            {(inputProps) => <Input {...inputProps} />}
          </InputMask>
        </Form.Item>

        <Form.Item
          name="duration"
          label="Duration"
          rules={[
            {
              required: true,
              message: data[changeValue].bot_settings.price_required,
            },
          ]}
        >
          <Select
            defaultValue={selectItem?.duration ? true : selectItem?.duration}
            style={{ width: '100%' }}
            options={[
              { value: true, label: 'True' },
              { value: false, label: 'False' },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="discount"
          label="Discount"
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
          name="additional"
          label="Additional"
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
          name="profit"
          label="Profit"
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
            Add Partner
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PartnerModal;
