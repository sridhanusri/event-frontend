import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const login = async (e) => {
    e.preventDefault();

    // Validate before API call
    if (!validate()) return;

    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("role", res.data.role);

      const role = res.data.role?.toUpperCase();

      if (role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/events");
      }

    } catch {
      alert("Login failed");
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

          <input
            type="password"
            className="border p-2 w-full mb-1"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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