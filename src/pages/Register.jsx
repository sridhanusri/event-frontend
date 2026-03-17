import { Form, Input, Button, Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function Register() {

  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await API.post("/auth/register", values);

      // ✅ Success toast
      message.success("Registered Successfully");

      navigate("/");
    } catch (err) {

      // ✅ Error toast
      message.error("Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">

      <Card title="Register" style={{ width: 350 }}>

        <Form layout="vertical" onFinish={onFinish}>

          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Enter valid email" }
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please enter phone number" },
              { pattern: /^[0-9]{10}$/, message: "Phone must be 10 digits" }
            ]}
          >
            <Input placeholder="Enter phone" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter password" },
              { min: 6, message: "Minimum 6 characters" }
            ]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Register
          </Button>

        </Form>

      </Card>

    </div>
  );
}

export default Register;