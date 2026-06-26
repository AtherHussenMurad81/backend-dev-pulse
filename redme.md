# 🚀 Dev-Pulse API

A RESTful Issue Tracking API built with **Node.js**, **Express.js**, **TypeScript**, and **PostgreSQL**. Dev-Pulse enables users to report, manage, and track software issues with secure JWT authentication and role-based authorization.

---

## ✨ Features

- 🔐 JWT Authentication (Access & Refresh Token)
- 👤 User Registration & Login
- 🛡️ Role-Based Authorization
  - Contributor
  - Maintainer

- 📝 Create Issues
- 📋 Get All Issues (Sorting & Filtering)
- 🔍 Get Single Issue
- ✏️ Update Issue
- 🗑️ Delete Issue (Maintainer Only)
- 🔒 Password Hashing using bcrypt
- ⚡ PostgreSQL Connection Pooling
- 🛠 Global Error Handling
- 📂 Clean Project Architecture

---

## 🛠 Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- pg
- bcrypt
- jsonwebtoken
- dotenv

---

## 📁 Project Structure

```
src
│
├── api
│   ├── controller
│   ├── services
│   ├── routes
│
├── middleware
├── utils
├── config
├── db
├── types
└── server.ts
```

---

## 📦 Installation

Clone the repository

```bash
git clone <repository-url>
```

Move into the project

```bash
cd dev-pulse
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=5000

DATABASE_URL=postgresql://username:password@localhost:5432/dev_pulse

ACCESS_SECRET=your_access_secret

REFRESH_SECRET=your_refresh_secret
```

Run the development server

```bash
npm run dev
```

---

## 📌 API Endpoints

### Authentication

| Method | Endpoint             | Access |
| ------ | -------------------- | ------ |
| POST   | `/api/auth/register` | Public |
| POST   | `/api/auth/login`    | Public |

---

### Issues

| Method | Endpoint          | Access                                    |
| ------ | ----------------- | ----------------------------------------- |
| POST   | `/api/issues`     | Authenticated                             |
| GET    | `/api/issues`     | Public                                    |
| GET    | `/api/issues/:id` | Public                                    |
| PATCH  | `/api/issues/:id` | Contributor (Own Open Issue) / Maintainer |
| DELETE | `/api/issues/:id` | Maintainer                                |

---

## Query Parameters

Retrieve issues with filtering and sorting.

```
GET /api/issues?sort=newest
```

Supported query parameters

| Parameter | Values                      |
| --------- | --------------------------- |
| sort      | newest, oldest              |
| type      | bug, feature_request        |
| status    | open, in_progress, resolved |

Example

```
GET /api/issues?sort=oldest&type=bug&status=open
```

---

## User Roles

### Contributor

- Create Issues
- View Issues
- Update Own Issue (Only if status is **open**)

### Maintainer

- Full access to all issues
- Update any issue
- Delete any issue

---

## Authentication

Include JWT token in protected routes.

```
Authorization: Bearer <your_access_token>
```

---

## Success Response

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {}
}
```

---

## Error Response

```json
{
  "success": false,
  "message": "Something went wrong",
  "errors": {}
}
```

---

## Scripts

```bash
npm run dev
npm run build
npm start
```

---

## Future Improvements

- Pagination
- Search by title
- Issue comments
- File attachments
- Email notifications
- Swagger API Documentation
- Unit & Integration Testing

---

## Author

**Ather Hussen Murad**

### MERN Stack Developer
