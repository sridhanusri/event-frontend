import { Link, useNavigate } from "react-router-dom";
import { Modal } from "antd";

function Navbar() {

  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const logout = () => {

    Modal.confirm({
      title: "Are you sure you want to logout?",
      content: "You will be redirected to login page.",
      okText: "Yes",
      cancelText: "No",
      onOk() {
        localStorage.removeItem("userId");
        localStorage.removeItem("role");

        navigate("/");
      }
    });

  };

  return (
    <div className="bg-blue-600 text-white p-4 flex justify-between items-center">

      <h1 className="font-bold text-lg">
        Event System
      </h1>

      <div className="space-x-4 flex items-center">

        <Link to="/events" className="hover:underline">
          Events
        </Link>

        <Link to="/my-events" className="hover:underline">
          My Events
        </Link>

        {role === "ADMIN" && (
          <Link to="/admin" className="hover:underline">
            Admin
          </Link>
        )}

        <button
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </div>
  );

}

export default Navbar;