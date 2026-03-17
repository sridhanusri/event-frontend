# 🎟 Event Registration System

## 📌 Project Overview

The Event Registration System is a full-stack web application that allows users to explore events and register for them. It also provides an admin panel to manage events and monitor registrations.

---

## 🚀 Features

### 👤 User Features

* User Registration & Login
* View available events
* Register for events
* Cancel event registration
* View "My Events"

### 🛠 Admin Features

* Add new events
* Edit existing events
* Delete events
* View registered users for each event
* View total participant count

---

## 🛠 Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Ant Design (UI Components)

### Backend

* Spring Boot
* Spring Data JPA
* REST API

### Database

* MySQL

---

## ⚙️ Setup Instructions

### 🔹 Backend Setup  

1. Open backend project in IDE (IntelliJ / Eclipse)
2. Configure `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/event_db
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

3. Run the Spring Boot application

---

### 🔹 Frontend Setup

1. Navigate to frontend folder:

```bash
cd event-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the application:

```bash
npm run dev
```

4. Open browser:

```
http://localhost:5173
```

---

## 📡 API Endpoints

### 🔐 Authentication

* POST `/api/auth/register` → Register new user
* POST `/api/auth/login` → Login user

### 📅 Events

* GET `/api/events` → Get all events
* POST `/api/events` → Add event (Admin)
* PUT `/api/events/{id}` → Update event
* DELETE `/api/events/{id}` → Delete event

### 📝 Registration

* POST `/api/registrations` → Register for event
* GET `/api/registrations/user/{userId}` → Get user registrations
* GET `/api/registrations/event/{eventId}` → Get users for event
* DELETE `/api/registrations/{id}` → Cancel registration

---

## 🗄 Database Schema

### 👤 Users Table

* user_id (Primary Key)
* name
* email
* phone
* password
* role (USER / ADMIN)

### 📅 Events Table

* event_id (Primary Key)
* event_name
* description
* event_date
* event_time
* location
* max_participants
* organizer
* status (OPEN / CLOSED)

### 📝 Registrations Table

* registration_id (Primary Key)
* user_id (Foreign Key)
* event_id (Foreign Key)
* registration_date
* status

---

## 📸 Screenshots

> Add screenshots of your application here

* Login Page
* Register Page
* Events Page
* My Events Page
* Admin Dashboard
* Add/Edit Event
* View Registered Users

---

## 🧠 Key Concepts Used

* RESTful API design
* CRUD operations
* Authentication (basic)
* Role-based access (Admin/User)
* React Hooks (useState, useEffect)
* Component-based architecture

---

## ⚠️ Future Improvements

* Password encryption (BCrypt)
* JWT Authentication
* Pagination & Search optimization
* Email notifications
* Deployment (AWS / Render)

---

## 👩‍💻 Author

**Dhanusri**

---

## 📌 Note

This project is developed as part of learning full-stack development using Spring Boot and React.
