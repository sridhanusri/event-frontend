import { BrowserRouter,Routes,Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import MyRegistrations from "./pages/MyRegistrations";
import AdminAddEvent from "./pages/AdminAddEvent";

function App(){

return(

<BrowserRouter>

<Routes>

<Route path="/" element={<Login/>}/>
<Route path="/register" element={<Register/>}/>
<Route path="/events" element={<Events/>}/>
<Route path="/my-events" element={<MyRegistrations/>}/>
<Route path="/admin" element={<AdminAddEvent/>}/>

</Routes>

</BrowserRouter>

);

}

export default App;