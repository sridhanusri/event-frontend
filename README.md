# Event Registration System

## About Project

This is a simple full-stack web application where users can:

* Register and login
* View events
* Register for events
* Cancel registrations

Admin can:

* Add events
* Edit events
* Delete events
* View registered users

---

## Technologies Used

Frontend:

* React (Vite)
* Tailwind CSS
* Ant Design

Backend:

* Spring Boot
* Spring Data JPA

Database:

* MySQL

---

## How to Run Project

### Backend

1. Open project in Eclipse / IntelliJ
2. Configure database in `application.properties`

```
spring.datasource.url=jdbc:mysql://localhost:3306/event_db
spring.datasource.username=root
spring.datasource.password=your_password
```

3. Run Spring Boot application

---

### Frontend

1. Open terminal in frontend folder

```
cd event-frontend
```

2. Install dependencies

```
npm install
```

3. Run project

```
npm run dev
```

4. Open in browser:

```
http://localhost:5173
```

---

## API Endpoints

### Auth

* POST /api/auth/register
* POST /api/auth/login

### Events

* GET /api/events
* POST /api/events
* PUT /api/events/{id}
* DELETE /api/events/{id}

### Registration

* POST /api/registrations
* GET /api/registrations/user/{userId}
* DELETE /api/registrations/{id}

---

## Database Tables

* users
* events
* registrations

---

## Author

Dhanusri
