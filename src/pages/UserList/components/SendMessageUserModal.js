import React, { useState } from "react";
import { Modal, Form, Button, message, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Api from "../../../api";
import { data } from "../../../mock/data";
import { useMain } from "../../../hooks/UseMain";

const { Option } = Select;

const SendMessageUserModal = ({
  isModalVisible,
  handleCancel,
  selectedUser,
  setSelectedUser,
  sourceData,
}) => {
  const { changeValue } = useMain();

  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (values) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("text", values.text);
    formData.append("photo", values?.photo ? values?.photo.file : null);
    formData.append("chat_id", selectedUser.chat_id);

    try {
      await Api.post("/news/single/user", formData);
      message.success(data[changeValue].message_users_modal.message_success);
      setIsLoading(false);
      setSelectedUser(null);
      handleCancel();
      form.resetFields();
    } catch (error) {
      setIsLoading(false);
      setSelectedUser(null);
      console.error(error);
      message.error(data[changeValue].message_users_modal.message_error);
    }
  };

  const handleSendMessageUsers = async (values) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("text", values.text);
    formData.append("photo", values?.photo ? values?.photo.file : null);
    formData.append("user_subcribe", values.user_subcribe);
    formData.append("source", values.source);

    try {
      await Api.post("/news/all/users", formData);
      message.success(data[changeValue].message_users_modal.message_success);
      setIsLoading(false);
      handleCancel();
      form.resetFields();
      setFileList([]);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      message.error(data[changeValue].message_users_modal.message_error);
    }
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length === 0) {
      form.setFieldsValue({ photo: null });
    }
  };

  const beforeUpload = (file) => {
    const isImageOrVideo =
      file.type.startsWith("image/") || file.type.startsWith("video/");
    if (!isImageOrVideo) {
      message.error(data[changeValue].message_users_modal.warning_2);
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  return (
    <Modal
      title={data[changeValue].message_users_modal.title}
      open={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={
          selectedUser?.chat_id ? handleSendMessage : handleSendMessageUsers
        }
      >
        <Form.Item
          name="text"
          label={data[changeValue].message_users_modal.label_1}
          rules={[
            {
              required: true,
              message: data[changeValue].message_users_modal.requred_1,
            },
          ]}
        >
          <CKEditor
            editor={ClassicEditor}
            config={{
              toolbar: ["bold", "italic", "link", "undo", "redo"],
              image: {
                upload: false,
              },
            }}
            data=""
            onChange={(event, editor) => {
              const data = editor.getData();
              form.setFieldsValue({ text: data });
            }}
          />
        </Form.Item>
        <Form.Item
          name="photo"
          label={data[changeValue].message_users_modal.label_2}
        >
          <Upload
            fileList={fileList}
            beforeUpload={beforeUpload}
            onChange={handleUploadChange}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>
              {data[changeValue].message_users_modal.file_text}
            </Button>
          </Upload>
        </Form.Item>

        {selectedUser?.chat_id ? null : (
          <Form.Item
            name="user_subcribe"
            label={data[changeValue].message_users_modal.label_3}
            rules={[
              {
                required: true,
                message: data[changeValue].message_users_modal.requred_3,
              },
            ]}
          >
            <Select
              placeholder={data[changeValue].message_users_modal.placeholder_3}
              style={{ textTransform: "capitalize" }}
            >
              <Option key="all" value="all">
                {data[changeValue].message_users_modal.option_1}
              </Option>
              <Option key="true" value="true">
                {data[changeValue].message_users_modal.option_2}
              </Option>
              <Option key="false" value="false">
                {data[changeValue].message_users_modal.option_3}
              </Option>
            </Select>
          </Form.Item>
        )}

        {selectedUser?.chat_id ? null : (
          <Form.Item
            name="source"
            label={data[changeValue].message_users_modal.label_4}
            rules={[
              {
                required: true,
                message: data[changeValue].message_users_modal.requred_4,
              },
            ]}
          >
            <Select
              placeholder={data[changeValue].message_users_modal.placeholder_4}
              style={{ textTransform: "capitalize" }}
            >
              <Option key="all" value="all">
                {data[changeValue].message_users_modal.option_1}
              </Option>
              {sourceData?.map((item) => (
                <Option
                  key={item.source}
                  value={item.source}
                  style={{ textTransform: "capitalize" }}
                >
                  {item.source}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit" block disabled={isLoading}>
            {data[changeValue].message_users_modal.button_submit}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SendMessageUserModal;
