# 🧾 IssueFlow – Issue Tracking & Team Coordination System

IssueFlow is a full-stack issue tracking and team management system built for efficient collaboration, task tracking, and structured team workflows. It supports role-based access control, invite-only user registration, and centralized issue management.

---

## 🚀 Features

### 👤 Authentication & User Management
- 🔐 JWT-based authentication
- 🧑 First registered user becomes **Admin automatically**
- 👨‍💼 Admin can invite users by adding their email addresses
- 📩 Only invited users can register into the system
- 🚫 Non-invited users cannot register
- 🔑 Secure password hashing using bcrypt

---

### 🛠️ Issue Management
- 📝 Create new issues
- 📌 View all issues
- 🔄 Update issue status (Open, In Progress, Resolved)
- 📊 Track issue priority (Low, Medium, High, Urgent)
- 👀 View detailed issue page with activity logs

---

### 👥 Role-Based Access Control
- **Admin**
  - Invite new users
  - Manage all issues
  - Assign roles

- **User**
  - View assigned tasks
  - Update task status
  - Track progress

---

### 📊 Dashboard
- Overview of issues
- Status breakdown
- Quick navigation to tasks and issue details

---

## 🔐 Authentication Flow

### 1. First User Registration
- The **very first user** who registers in the system is automatically assigned the role of **Admin**
- This ensures initial system setup without external configuration

### 2. Admin User Creation Flow
- Admin can invite new users by entering their email addresses
- These users are stored in the system with `isRegistered = false`

### 3. User Registration Flow
- Only invited users can register
- If an email is not found in the system → registration is blocked
- Once registered, `isRegistered = true` and user can log in

---

## 🧠 System Rules

- Only invited users can access registration
- JWT token is required for protected routes
- Token expires after 1 hour
- Unauthorized access redirects to login page
- Role-based UI rendering (Admin vs User)

---

## 🏗️ Tech Stack

### Frontend
- React.js
- Material UI (MUI)
- React Router DOM
- React Query (TanStack Query)
- Redux Toolkit
- Axios
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Bcrypt for password hashing

---



## ⚙️ Environment Variables

### Frontend.


```env
REACT_APP_BASE_URL=
```

#### Backend
```env

PORT=
MONGO_URI=
JWT_SECRET=
