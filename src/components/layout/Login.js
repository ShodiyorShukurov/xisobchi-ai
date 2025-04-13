import { Form, Input, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Api from "../../api";
import { ADMIN_ROLE, API_TOKEN } from "../../utils/constants";
import { data } from "../../mock/data";
import { useMain } from "../../hooks/UseMain";

const LoginPage = () => {
  const { changeValue } = useMain();

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const res = await Api.post("/admin/login", {
        admin_email: values.admin_email.trim(),
        admin_password: values.admin_password.trim(),
      });

      if (res.data.status === 401 || res.data.status === 404) {
        notification.error({
          message: data[changeValue].login.message_error,
          description: data[changeValue].login.error_text,
        });
      } else if (res.data.token) {
        localStorage.setItem(API_TOKEN, res.data.token);
        localStorage.setItem(ADMIN_ROLE, res.data.data.admin_role);
        navigate("/dashboard");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      notification.error({
        message: data[changeValue].login.message_error,
        description: error.message,
      });
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    try {
      handleSubmit(values);
    } catch (error) {
      notification.error({ message: error.errors.join(", ") });
    }
  };

  return (
    <div
      className="container d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="card shadow p-4"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h2 className="text-center mb-4">{data[changeValue].login.title}</h2>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label={data[changeValue].login.label_1}
            name="admin_email"
            rules={[
              {
                required: true,
                message: data[changeValue].login.input_message_1,
              },
            ]}
          >
            <Input placeholder={data[changeValue].login.input_placeholder_1} />
          </Form.Item>

          <Form.Item
            label={data[changeValue].login.label_2}
            name="admin_password"
            rules={[
              {
                required: true,
                message: data[changeValue].login.input_message_2,
              },
            ]}
          >
            <Input.Password
              placeholder={data[changeValue].login.input_placeholder_2}
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading} block>
            {loading
              ? data[changeValue].login.button_loading_text
              : data[changeValue].login.button_text}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
