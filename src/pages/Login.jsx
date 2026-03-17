import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";
import { message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    let newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
      message.error("Invalid email format ");
    }

    if (!password) {
      newErrors.password = "Password is required";
      message.error("Password is required ");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const login = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("role", res.data.role);

      message.success("Login successful ");

      const role = res.data.role?.toUpperCase();

      if (role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/events");
      }

    } catch (err) {

      const errorMsg = err.response?.data;

      if (errorMsg?.includes("User not found")) {
        message.error("Invalid email ");
      } else if (errorMsg?.includes("Invalid password")) {
        message.error("Invalid password ");
      } else {
        message.error("Login failed ");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">

      <div className="bg-white p-8 rounded shadow w-96">

        <h2 className="text-xl font-bold mb-4 text-center">
          Login
        </h2>

        <form onSubmit={login}>

         
          <input
            className="border p-2 w-full mb-1"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mb-2">{errors.email}</p>
          )}

      
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="border p-2 w-full mb-1 pr-10"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
            </span>
          </div>

          {errors.password && (
            <p className="text-red-500 text-sm mb-2">{errors.password}</p>
          )}

          <button
            className="bg-blue-500 text-white w-full p-2 rounded mt-2"
            type="submit"
          >
            Login
          </button>

        </form>

        <p className="mt-3 text-center">
          Don't have account?
          <Link className="text-blue-500 ml-1" to="/register">
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;