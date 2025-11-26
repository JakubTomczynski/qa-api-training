# QA API Training - Project Management System

🧪 A complete REST API for QA Training - Project Management System with Postman Collection

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-blue.svg)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-ISC-yellow.svg)](LICENSE)

## 📋 Overview

This project provides a fully functional REST API application designed for QA testers to practice API testing with Postman/Insomnia. It simulates a Project Management System with complete CRUD operations, JWT authentication, and proper error handling.

## ✨ Features

- **RESTful API** with proper HTTP status codes
- **JWT Authentication** for secure endpoints
- **SQLite Database** for data persistence
- **Comprehensive Validation** on all inputs
- **Rate Limiting** for API abuse testing
- **CORS Support** for browser-based testing
- **Request Logging** for debugging
- **Health Check Endpoint** for monitoring
- **API Versioning** (supports both `/api/` and `/api/v1/`)
- **Complete Postman Collection** with automated tests

## 🛠️ Tech Stack

- **Runtime**: Node.js (18+)
- **Framework**: Express.js 5.x
- **Database**: SQLite (better-sqlite3)
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Security**: helmet, cors
- **Logging**: morgan
- **Rate Limiting**: express-rate-limit

## 📦 Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) (for API testing)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/JakubTomczynski/qa-api-training.git
   cd qa-api-training
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file if needed (defaults work fine for development):
   ```env
   PORT=3000
   NODE_ENV=development
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   JWT_EXPIRES_IN=24h
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

4. **Start the server**
   ```bash
   # Production mode
   npm start
   
   # Development mode (with hot reload)
   npm run dev
   ```

5. **Verify the server is running**
   
   Open your browser or use curl:
   ```bash
   curl http://localhost:3000/api/health
   ```
   
   Expected response:
   ```json
   {
     "status": "OK",
     "timestamp": "2024-01-01T12:00:00.000Z",
     "uptime": 10.5
   }
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login and get JWT token | No |

#### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "role": "user"  // optional: "user" or "admin"
}
```

**Response (201 Created):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "user",
    "createdAt": "2024-01-01 12:00:00"
  }
}
```

#### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "user"
  }
}
```

### Project Endpoints

All project endpoints require JWT authentication via the `Authorization` header:
```
Authorization: Bearer <your-jwt-token>
```

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/projects` | Create a new project | Yes |
| GET | `/api/projects` | Get all projects | Yes |
| GET | `/api/projects/:id` | Get project by ID | Yes |
| PUT | `/api/projects/:id` | Update a project | Yes (owner/admin) |
| DELETE | `/api/projects/:id` | Delete a project | Yes (owner/admin) |

#### Create Project
```bash
POST /api/projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "My Project",
  "description": "Project description",
  "status": "active"  // optional: "active", "completed", or "on-hold"
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "name": "My Project",
  "description": "Project description",
  "status": "active",
  "createdBy": 1,
  "createdAt": "2024-01-01 12:00:00",
  "updatedAt": "2024-01-01 12:00:00",
  "creatorEmail": "user@example.com"
}
```

#### Get All Projects
```bash
GET /api/projects
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "My Project",
    "description": "Project description",
    "status": "active",
    "createdBy": 1,
    "createdAt": "2024-01-01 12:00:00",
    "updatedAt": "2024-01-01 12:00:00",
    "creatorEmail": "user@example.com"
  }
]
```

#### Get Project by ID
```bash
GET /api/projects/1
Authorization: Bearer <token>
```

#### Update Project
```bash
PUT /api/projects/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Project Name",
  "description": "Updated description",
  "status": "completed"
}
```

#### Delete Project
```bash
DELETE /api/projects/1
Authorization: Bearer <token>
```

**Response (204 No Content)**

### Health Check Endpoint

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/health` | Health check | No |

### HTTP Status Codes

| Code | Status | Description |
|------|--------|-------------|
| 200 | OK | Successful GET/PUT request |
| 201 | Created | Successful POST request |
| 204 | No Content | Successful DELETE request |
| 400 | Bad Request | Validation errors |
| 401 | Unauthorized | Missing/invalid token |
| 403 | Forbidden | User not authorized for action |
| 404 | Not Found | Resource not found |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error |

## 📮 Importing Postman Collection

### Step 1: Open Postman
Launch the Postman application on your computer.

### Step 2: Import the Collection
1. Click the **Import** button in the top-left corner
2. Select the **File** tab
3. Navigate to `postman/ProjectManagementAPI.postman_collection.json`
4. Click **Import**

### Step 3: Collection Structure
After importing, you'll see the following structure:

```
📁 Project Management API
├── 📁 1. Authentication
│   ├── Register User
│   ├── Register User (Duplicate Email - 400)
│   ├── Register User (Invalid Email - 400)
│   ├── Register User (Short Password - 400)
│   ├── Login
│   ├── Login (Invalid Credentials - 401)
│   └── Login (Non-existent User - 401)
├── 📁 2. Projects CRUD
│   ├── Create Project
│   ├── Create Project (Missing Fields - 400)
│   ├── Create Project (No Auth - 401)
│   ├── Create Project (Invalid Status - 400)
│   ├── Get All Projects
│   ├── Get Project by ID
│   ├── Get Project (Not Found - 404)
│   ├── Update Project
│   ├── Update Project (Not Found - 404)
│   ├── Delete Project
│   └── Delete Project (Not Found - 404)
├── 📁 3. Health & Info
│   ├── Health Check
│   └── API Info
└── 📁 4. Authorization Tests
    ├── Register Admin User
    ├── Register Second User
    ├── Login Second User
    ├── Create Project (First User)
    ├── Update Project (Forbidden - 403)
    └── Delete Project (Forbidden - 403)
```

### Step 4: Configure Collection Variables
The collection uses variables for dynamic values. Default values are pre-configured:

| Variable | Default Value | Description |
|----------|---------------|-------------|
| `baseUrl` | `http://localhost:3000` | API base URL |
| `authToken` | (auto-populated) | JWT token saved after login |
| `testEmail` | (auto-generated) | Test user email |
| `testPassword` | `password123` | Test user password |
| `projectId` | (auto-populated) | Created project ID |

To modify these:
1. Click on the collection name
2. Go to the **Variables** tab
3. Update the values as needed

### Step 5: Run the Collection
1. Make sure the API server is running (`npm start`)
2. Click **Run** on the collection
3. Select the requests you want to run
4. Click **Run Project Management API**

## 🧪 Running Tests

### Using Postman Collection Runner
1. Open Postman
2. Click on the collection
3. Click **Run** to open the Collection Runner
4. Select requests to run
5. Click **Run** to execute

### Using Newman (CLI)
```bash
# Install Newman globally
npm install -g newman

# Run the collection
newman run postman/ProjectManagementAPI.postman_collection.json
```

### Manual Testing with curl

**Register a user:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Create a project (use the token from login):**
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"name":"Test Project","description":"A test project"}'
```

## 📁 Project Structure

```
qa-api-training/
├── src/
│   ├── index.js              # Entry point
│   ├── config/
│   │   └── database.js       # SQLite configuration
│   ├── middleware/
│   │   ├── auth.js           # JWT verification middleware
│   │   └── validation.js     # Request validation middleware
│   ├── routes/
│   │   ├── auth.routes.js    # Auth endpoints
│   │   └── project.routes.js # Project CRUD endpoints
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── project.controller.js
│   └── models/
│       ├── user.model.js
│       └── project.model.js
├── postman/
│   └── ProjectManagementAPI.postman_collection.json
├── .env.example              # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## 🔒 Data Models

### User Model
```javascript
{
  id: number,           // Auto-generated primary key
  email: string,        // Unique, valid email format
  password: string,     // Hashed, min 8 characters
  role: string,         // 'user' or 'admin'
  createdAt: timestamp  // Auto-generated
}
```

### Project Model
```javascript
{
  id: number,           // Auto-generated primary key
  name: string,         // Required, min 1 character
  description: string,  // Required
  status: string,       // 'active', 'completed', or 'on-hold'
  createdBy: number,    // User ID (foreign key)
  createdAt: timestamp, // Auto-generated
  updatedAt: timestamp  // Auto-updated
}
```

## 🔧 Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Server port |
| `NODE_ENV` | `development` | Environment (development/production) |
| `JWT_SECRET` | (required) | Secret key for JWT signing |
| `JWT_EXPIRES_IN` | `24h` | JWT expiration time |
| `RATE_LIMIT_WINDOW_MS` | `900000` | Rate limit window (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | `100` | Max requests per window |

## 🛡️ Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcryptjs with salt rounds
- **Helmet** - HTTP headers security
- **Rate Limiting** - Prevent API abuse
- **Input Validation** - express-validator for request validation
- **CORS** - Configurable cross-origin resource sharing

## 📝 License

This project is licensed under the ISC License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help, please open an issue in the repository.
