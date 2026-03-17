import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import { message } from "antd";

function Events() {

const [events,setEvents] = useState([]);
const [registered,setRegistered] = useState([]);
const [search,setSearch] = useState("");

const userId = localStorage.getItem("userId");


useEffect(()=>{

API.get("/events")
.then(res=>setEvents(res.data));

},[]);


useEffect(()=>{

API.get(`/registrations/user/${userId}`)
.then(res=>{

const ids = res.data.map(r => r.eventId);
setRegistered(ids);

});

},[userId]);



const registerEvent = async(eventId)=>{

try{

await API.post("/registrations",{
userId:userId,
eventId:eventId
});

message.success("Registered successfully");


setRegistered([...registered,eventId]);

}catch{

message.error("You already registered for this event");

}

};



const filteredEvents = events.filter(e =>
e.eventName.toLowerCase().includes(search.toLowerCase())
);


return(

<div className="min-h-screen bg-gray-100">

<Navbar/>

<div className="max-w-7xl mx-auto p-8">

<h2 className="text-3xl font-bold text-gray-800 mb-6">
 Explore Events
</h2>




<input
className="border border-gray-300 p-3 rounded-lg w-full max-w-md mb-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
placeholder="Search events..."
onChange={(e)=>setSearch(e.target.value)}
/>



<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

{filteredEvents.map(event=>(

<div
key={event.eventId}
className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6"
>

<h3 className="text-xl font-semibold text-blue-700">
{event.eventName}
</h3>

<p className="text-gray-600 mt-2">
{event.description}
</p>

<div className="mt-4 text-sm text-gray-500 space-y-1">

<p>📍 <span className="font-medium">{event.location}</span></p>

{event.eventDate && (
<p>📅 {event.eventDate}</p>
)}

{event.organizer && (
<p>👤 {event.organizer}</p>
)}

</div>




{registered.includes(event.eventId) ? (

<button
className="mt-5 w-full bg-green-500 text-white py-2 rounded-lg cursor-not-allowed"
disabled
>
✔ Registered
</button>

) : (

<button
className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
onClick={()=>registerEvent(event.eventId)}
>
Register
</button>

)}

</div>

))}

</div>

</div>

</div>

);

}

export default Events;