import { Link, useNavigate } from "react-router-dom";

function Navbar() {

const navigate = useNavigate();

const role = localStorage.getItem("role");

const logout = () => {

localStorage.removeItem("userId");
localStorage.removeItem("role");

navigate("/");

};

return(

<div className="bg-blue-600 text-white p-4 flex justify-between">

<h1 className="font-bold text-lg">
Event System
</h1>

<div className="space-x-4">

<Link to="/events">Events</Link>

<Link to="/my-events">My Events</Link>

{role === "ADMIN" && (
<Link to="/admin">Admin</Link>
)}

<button
className="bg-red-500 px-2 py-1 rounded"
onClick={logout}
>
Logout
</button>

</div>

</div>

);

}

export default Navbar;