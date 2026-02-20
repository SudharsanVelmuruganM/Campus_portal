📘 Campus Portal – Resource Booking & Management System
🚀 Project Overview

Campus Portal is a full-stack web application designed to manage campus resources efficiently.
It allows students, staff, and administrators to manage and book resources such as classrooms, labs, event halls, library services, and canteen slots.

The system ensures:
Role-based access control
Department-based resource restrictions
Smart booking management
Prevention of double bookings
Approval workflow for administrators

🎯 Objectives

Digitize campus resource management
Prevent resource conflicts
Simplify booking process
Improve transparency between students, staff, and admins
Provide scalable architecture for future enhancements

🧩 Tech Stack
🔹 Frontend

React.js (Vite)
React Router DOM
Axios
Context API (State Management)
Responsive UI (Mobile-style layout)

🔹 Backend

Spring Boot
Spring Data JPA
Spring Security (Authentication)
BCrypt Password Encryption

REST API Architecture

🔹 Database

MySQL
👥 User Roles
🎓 Student

View resources
Book resources
View bookings
Department-based restrictions applied

👨‍🏫 Staff

Manage bookings
Access department resources

🛠 Admin

Approve / Reject bookings
Manage users
Manage resources
System control

📦 Mandatory Modules
1️⃣ User Management (CRUD)
Fields

id (auto-generated)
name
email (unique)
phone
role (STUDENT / STAFF / ADMIN)
status (ACTIVE / INACTIVE)
createdAt
department

APIs

Create User
Get All Users
Get User By ID
Update User
Delete User
Filter By Status

2️⃣ Resource Management (CRUD)
Resource Types

LAB
CLASSROOM
EVENT_HALL
LIBRARY
CANTEEN
COMPUTER
Fields

id
name
type
capacity
status (AVAILABLE / UNAVAILABLE)
department

APIs

Create Resource
Get All Resources
Update Resource
Delete Resource
Filter by Type
Filter by Status

3️⃣ Booking Module
Fields

id
userId
resourceId
bookingDate
timeSlot
status (PENDING / APPROVED / REJECTED / CANCELLED)
rejectionReason
cancellationReason
approvedBy

✔ Approval Workflow

Booking created → PENDING
Admin approves → APPROVED
Admin rejects → REJECTED (reason required)

⭐ Unique Features Added

Library borrowing module
Booking rejection reason tracking
Cancellation reason tracking
Slot conflict detection
Password encryption (BCrypt)

🔐 Authentication & Security

Register API with validation
Login API
Email validation
Name validation (letters only)
Password encryption using BCrypt
Role-based access control

📂 Project Structure
Backend (Spring Boot)
com.campus.campus
│
├── controller
├── service
├── repository
├── entity
├── dto
├── enums
├── exception
└── config

Frontend (React)
src/
│
├── api/
├── context/
├── pages/
├── components/
├── App.jsx
└── main.jsx
