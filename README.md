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

## Screenshots

*Add screenshots here if desired*

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

### 1. Clone the Repository

```bash
git clone https://github.com/GungunRaniSahu/Project-Manager.git
cd Project-Manager

2. Backend Setup

cd crud-backend
npm install
node server.js

Make sure MongoDB is running locally, or configure your .env file with your cloud MongoDB URI.

3. Frontend Setup

cd ../crud-frontend   # Or the folder where your React app is located
npm install
npm start

project-manager/
├── crud-backend/
│   ├── models/
│   ├── routes/
│   ├── server.js
├── crud-frontend/
│   ├── src/
│   ├── App.js
│   ├── App.css

