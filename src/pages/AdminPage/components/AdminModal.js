import { Button, Form, Input, message, Modal } from "antd";
import Api from "../../../api";
import React from "react";
import { data as changeData} from "../../../mock/data";
import { useMain } from "../../../hooks/UseMain";

const AdminModal = ({
  fetchAdminData,
  isModalVisible,
  selectItem,
  handleCancel,
}) => {
  const { changeValue } = useMain();

  const [form] = Form.useForm();

  React.useEffect(() => {
    if (isModalVisible && selectItem) {
      form.setFieldsValue({
        admin_email: selectItem.admin_email || "",
      });
    }
  }, [isModalVisible, selectItem, form]);

  const handleSubmitTrial = async (values) => {
    let data = {
      admin_email: values.admin_email,
      admin_password: values.admin_password,
    };

    try {
      if (selectItem && selectItem.id) {
        data.id = Number(selectItem.id);
        await Api.put("/admin/edit", data);
        message.success(changeData[changeValue].admin.message_edit_success);
      } else {
        await Api.post("/admin/register", data);
        message.success(changeData[changeValue].admin.message_success);
      }
      handleCancel();
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error(changeData[changeValue].admin.error_message);
    } finally {
      fetchAdminData();
    }
  };

  return (
    <Modal
      title={
        selectItem?.id
          ? changeData[changeValue].admin.admin_edit_text
          : changeData[changeValue].admin.admin_add_text
      }
      open={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmitTrial}>
        <Form.Item
          name="admin_email"
          label={changeData[changeValue].admin.label_1}
          rules={[
            {
              required: true,
              message: changeData[changeValue].admin.requred_1,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="admin_password"
          label={changeData[changeValue].admin.label_2}
          rules={[
            {
              required: true,
              message: changeData[changeValue].admin.requred_2,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {changeData[changeValue].admin.button_text}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AdminModal;
