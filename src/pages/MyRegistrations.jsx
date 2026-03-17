import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import { message, Popconfirm } from "antd";

function MyEvents(){

  const [registrations,setRegistrations] = useState([]);
  const [events,setEvents] = useState([]);

  const userId = localStorage.getItem("userId");


  useEffect(()=>{

    API.get(`/registrations/user/${userId}`)
    .then(res=>setRegistrations(res.data));

  },[userId]);

  useEffect(()=>{

    API.get("/events")
    .then(res=>setEvents(res.data));

  },[]);


  const cancelRegistration = async(id)=>{

    try{

      await API.delete(`/registrations/${id}`);

      message.success("Registration cancelled successfully ");

      setRegistrations(
        registrations.filter(r => r.registrationId !== id)
      );

    }catch{

      message.error("Cancel failed ");

    }

  };

  // Find event details
  const getEvent = (eventId) => {
    return events.find(e => e.eventId === eventId);
  };

  return(

    <div className="min-h-screen bg-gray-100">

      <Navbar/>

      <div className="max-w-6xl mx-auto p-8">

        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          My Registered Events
        </h2>

        {registrations.length === 0 && (

          <p className="text-gray-500">
            You have not registered for any events.
          </p>

        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {registrations.map(reg => {

            const event = getEvent(reg.eventId);

            if(!event) return null;

            return(

              <div
                key={reg.registrationId}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6"
              >

                <h3 className="text-xl font-semibold text-blue-700">
                  {event.eventName}
                </h3>

                <p className="text-gray-600 mt-2">
                  {event.description}
                </p>

                <div className="mt-3 text-sm text-gray-500 space-y-1">

                  <p>📍 {event.location}</p>

                  {event.eventDate && (
                    <p>📅 {event.eventDate}</p>
                  )}

                  {event.organizer && (
                    <p>👤 {event.organizer}</p>
                  )}

                </div>

               
                <Popconfirm
                  title="Cancel Registration?"
                  description="Are you sure you want to cancel this registration?"
                  onConfirm={()=>cancelRegistration(reg.registrationId)}
                  okText="Yes"
                  cancelText="No"
                >
                  <button
                    className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
                  >
                    Cancel Registration
                  </button>
                </Popconfirm>

              </div>

            );

          })}

        </div>

      </div>

    </div>

  );

}

export default MyEvents;