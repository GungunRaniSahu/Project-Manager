# Project Manager App

A full-stack Project and Task Management application built with React, Node.js, Express, and MongoDB.  
It allows users to create multiple projects, each with its own set of tasks — complete with priorities, status, description, and assignees.

---

## Features

- Create and manage multiple projects
- Inside each project:
  - Add, update, delete tasks
  - Each task includes:
    - Name and description
    - Priority (Low, Medium, High)
    - Status (Pending, In Progress, Done)
    - Assignees
- Built with React and Axios on the frontend
- Backend powered by Express.js
- Data stored in MongoDB with Mongoose

---

## Tech Stack

| Technology | Purpose         |
|------------|-----------------|
| React      | Frontend UI     |
| Axios      | API Requests    |
| Express.js | Backend Server  |
| MongoDB    | Database        |
| Mongoose   | ODM for MongoDB |
| CSS        | Styling         |

---

## Installation & Setup

Follow the steps below to run both the backend and frontend locally.

### Step 1: Clone the Repository

```bash
git clone https://github.com/GungunRaniSahu/Project-Manager.git
cd Project-Manager

```

### Step 2: Install Dependencies 

```bash 
# Backend dependencies
cd crud-backend
npm install

# Frontend dependencies
cd ../crud-frontend
npm install

```
### Step 3: Start the Application
```bash
# Start MongoDB (locally or use a cloud URI in the backend)

# Run backend server
cd ../crud-backend
node server.js

# Run frontend app
cd ../crud-frontend
npm start

```

### Folder Structure

Project-Manager/
├── crud-backend/
│   ├── models/
│   │   └── Project.js
|    |   └── Task.js
│   ├── routes/
│   │   ├── projects.js
│   │   └── tasks.js
│   └── server.js
│
├── proejct-manager/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
│
└── README.md


