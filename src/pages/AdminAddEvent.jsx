import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";

import {
  Table,
  Button,
  Modal,
  Input,
  DatePicker,
  TimePicker,
  InputNumber,
  Select,
  message,
  Space,
  Popconfirm
} from "antd";

import dayjs from "dayjs";

const { Option } = Select;

function AdminAddEvent() {

  const [events,setEvents] = useState([]);
  const [counts,setCounts] = useState({});

  const [open,setOpen] = useState(false);
  const [editing,setEditing] = useState(false);

  const [registrations,setRegistrations] = useState([]);
  const [usersModal,setUsersModal] = useState(false);

  const [event,setEvent] = useState({
    eventId:null,
    eventName:"",
    description:"",
    eventDate:null,
    eventTime:null,
    location:"",
    maxParticipants:null,
    organizer:"",
    status:"OPEN"
  });


  const loadEvents = async () => {
    const res = await API.get("/events");
    setEvents(res.data);
  };

  
  const loadCounts = async (eventList) => {
    let map = {};

    for (let e of eventList) {
      try{
        const res = await API.get(`/registrations/event/${e.eventId}`);
        map[e.eventId] = res.data.length;
      }catch{
        map[e.eventId] = 0;
      }
    }

    setCounts(map);
  };

  useEffect(()=>{
    loadEvents();
  },[]);

  useEffect(()=>{
    if(events.length>0){
      loadCounts(events);
    }
  },[events]);


  const openAdd = ()=>{
    setEditing(false);
    setEvent({
      eventName:"",
      description:"",
      eventDate:null,
      eventTime:null,
      location:"",
      maxParticipants:null,
      organizer:"",
      status:"OPEN"
    });
    setOpen(true);
  };

  
  const openEdit = (record)=>{
    setEditing(true);
    setEvent({
      ...record,
      eventDate:record.eventDate ? dayjs(record.eventDate) : null,
      eventTime:record.eventTime ? dayjs(record.eventTime,"HH:mm:ss") : null
    });
    setOpen(true);
  };

  
  const saveEvent = async ()=>{
    try{

      const payload={
        ...event,
        eventDate:event.eventDate?.format("YYYY-MM-DD"),
        eventTime:event.eventTime?.format("HH:mm:ss")
      };

      if(editing){
        await API.put(`/events/${event.eventId}`,payload);
        message.success("Event Updated ");
      }else{
        await API.post("/events",payload);
        message.success("Event Added ");
      }

      setOpen(false);
      loadEvents();

    }catch{
      message.error("Operation Failed ");
    }
  };

  
  const deleteEvent = async(id)=>{
    try{
      await API.delete(`/events/${id}`);
      message.success("Event Deleted Successfully ");
      loadEvents();
    }catch{
      message.error("Delete Failed ");
    }
  };

 
  const viewRegistrations = async(id)=>{
    try{
      const res = await API.get(`/registrations/event/${id}`);
      setRegistrations(res.data);
      setUsersModal(true);
    }catch{
      message.error("Cannot load users ");
    }
  };

  
  const columns=[

    {
      title:"Event",
      dataIndex:"eventName"
    },

    {
      title:"Description",
      dataIndex:"description"
    },

    {
      title:"Location",
      dataIndex:"location"
    },

    {
      title:"Date",
      dataIndex:"eventDate"
    },

    {
      title:"Time",
      render:(record)=>
        record.eventTime
          ? dayjs(record.eventTime,"HH:mm:ss").format("hh:mm A")
          : "-"
    },

    {
      title:"Organizer",
      dataIndex:"organizer"
    },

    {
      title:"Registered",
      render:(record)=>(
        `${counts[record.eventId] || 0} / ${record.maxParticipants}`
      )
    },

    {
      title:"Actions",
      render:(record)=>(

        <Space>

          <Button
            type="primary"
            onClick={()=>openEdit(record)}
          >
            Edit
          </Button>

          <Popconfirm
            title="Delete Event?"
            description="Are you sure you want to delete this event?"
            onConfirm={() => deleteEvent(record.eventId)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>
              Delete
            </Button>
          </Popconfirm>

          <Button
            onClick={()=>viewRegistrations(record.eventId)}
          >
            View Users
          </Button>

        </Space>
      )
    }
  ];

  return(
    <div>

      <Navbar/>

      <div className="p-6">

        <div className="flex justify-between mb-4">

          <h2 className="text-2xl font-bold">
            Admin Event Management
          </h2>

          <Button type="primary" onClick={openAdd}>
            Add Event
          </Button>

        </div>

        <Table
          columns={columns}
          dataSource={events}
          rowKey="eventId"
        />

        
        <Modal
          title={editing ? "Edit Event" : "Add Event"}
          open={open}
          onOk={saveEvent}
          onCancel={()=>setOpen(false)}
        >

          <Input
            placeholder="Event Name"
            className="mb-3"
            value={event.eventName}
            onChange={(e)=>setEvent({...event,eventName:e.target.value})}
          />

          <Input
            placeholder="Description"
            className="mb-3"
            value={event.description}
            onChange={(e)=>setEvent({...event,description:e.target.value})}
          />

          <DatePicker
            className="mb-3 w-full"
            value={event.eventDate}
            onChange={(v)=>setEvent({...event,eventDate:v})}
          />

          <TimePicker
            className="mb-3 w-full"
            value={event.eventTime}
            onChange={(v)=>setEvent({...event,eventTime:v})}
          />

          <Input
            placeholder="Location"
            className="mb-3"
            value={event.location}
            onChange={(e)=>setEvent({...event,location:e.target.value})}
          />

          <InputNumber
            className="mb-3 w-full"
            placeholder="Max Participants"
            value={event.maxParticipants}
            onChange={(v)=>setEvent({...event,maxParticipants:v})}
          />

          <Input
            placeholder="Organizer"
            className="mb-3"
            value={event.organizer}
            onChange={(e)=>setEvent({...event,organizer:e.target.value})}
          />

          <Select
            className="w-full"
            value={event.status}
            onChange={(v)=>setEvent({...event,status:v})}
          >
            <Option value="OPEN">OPEN</Option>
            <Option value="CLOSED">CLOSED</Option>
          </Select>

        </Modal>

        
        <Modal
          title="Registered Users"
          open={usersModal}
          footer={null}
          onCancel={()=>setUsersModal(false)}
        >

          <Table
            dataSource={registrations}
            rowKey="registrationId"
            columns={[
              { title:"Name", dataIndex:["user","name"] },
              { title:"Email", dataIndex:["user","email"] },
              { title:"Phone", dataIndex:["user","phone"] }
            ]}
          />

        </Modal>

      </div>

    </div>
  );
}

export default AdminAddEvent;