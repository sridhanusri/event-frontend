import { Form, Input, Button, Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function Register() {

  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await API.post("/auth/register", values);

      message.success("Registered Successfully ");
      navigate("/");

    } catch (err) {

      const errorMsg = err.response?.data?.message;

      if (errorMsg?.includes("User already exists")) {
        message.error("User already registered ❌");
      } else if (errorMsg?.includes("Phone already")) {
        message.error("Phone number already used ❌");
      } else {
        message.error("Registration failed ❌");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">

      <Card title="Register" style={{ width: 350 }}>

        <Form layout="vertical" onFinish={onFinish}>

          {/* Name */}
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>

          {/* Email */}
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

          {/* Phone (ONLY 10 DIGITS) */}
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please enter phone number" },
              {
                pattern: /^[0-9]{10}$/,
                message: "Phone number must be exactly 10 digits"
              }
            ]}
          >
            <Input
              placeholder="Enter phone number"
              maxLength={10}
              onInput={(e) => {
                // allow only numbers
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              }}
            />
          </Form.Item>

          {/* Password */}
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

          {/* Submit */}
          <Button type="primary" htmlType="submit" block>
            Register
          </Button>

        </Form>

      </Card>

    </div>
  );
}

export default Register;