# 🧪 QA API Training - Project Management System

A live REST API for practicing API testing skills with Postman or Insomnia.

## 🌐 Live API URL

**Base URL**: `https://qa-api-training.onrender.com`

(No installation needed - the API is already running!)

> **Note**: The free tier on Render may spin down after 15 minutes of inactivity. The first request may take 30-60 seconds while the server wakes up.

---

## 📚 Your Mission

As a QA Tester, your task is to:
1. Set up Postman from scratch
2. Create requests for all endpoints
3. Write test assertions
4. Test both happy paths and edge cases

**This is a hands-on learning experience** - build your own collection step by step!

---

## 🔐 Authentication

This API uses JWT (JSON Web Tokens). Here's how it works:
1. Register a user account
2. Login to get a token
3. Use the token in the `Authorization` header for protected endpoints

The token format is: `Bearer <your-token>`

---

## 📋 API Endpoints

### Authentication Endpoints

#### POST /api/auth/register
Creates a new user account.

**Request:**
- URL: `{{baseUrl}}/api/auth/register`
- Method: `POST`
- Headers: `Content-Type: application/json`
- Body:
```json
{
  "email": "tester@example.com",
  "password": "password123"
}
```

**Optional Fields:**
- `role`: Can be `"user"` (default) or `"admin"`

**Success Response (201 Created):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "tester@example.com",
    "role": "user",
    "createdAt": "2025-01-01 12:00:00"
  }
}
```

**Error Responses:**
- `400 Bad Request` - Invalid email format
- `400 Bad Request` - Password too short (minimum 8 characters)
- `400 Bad Request` - Email already exists

---

#### POST /api/auth/login
Authenticates a user and returns a JWT token.

**Request:**
- URL: `{{baseUrl}}/api/auth/login`
- Method: `POST`
- Headers: `Content-Type: application/json`
- Body:
```json
{
  "email": "tester@example.com",
  "password": "password123"
}
```

**Success Response (200 OK):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "tester@example.com",
    "role": "user"
  }
}
```

**Error Responses:**
- `400 Bad Request` - Missing email or password
- `401 Unauthorized` - Invalid credentials

---

### Project Endpoints (Protected)

All project endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-token>
```

---

#### POST /api/projects
Creates a new project.

**Request:**
- URL: `{{baseUrl}}/api/projects`
- Method: `POST`
- Headers: 
  - `Content-Type: application/json`
  - `Authorization: Bearer {{authToken}}`
- Body:
```json
{
  "name": "My Test Project",
  "description": "A project for testing purposes"
}
```

**Optional Fields:**
- `status`: Can be `"active"` (default), `"completed"`, or `"on-hold"`

**Success Response (201 Created):**
```json
{
  "id": 1,
  "name": "My Test Project",
  "description": "A project for testing purposes",
  "status": "active",
  "createdBy": 1,
  "createdAt": "2025-01-01 12:00:00",
  "updatedAt": "2025-01-01 12:00:00",
  "creatorEmail": "tester@example.com"
}
```

**Error Responses:**
- `400 Bad Request` - Missing name or description
- `400 Bad Request` - Invalid status value
- `401 Unauthorized` - Missing or invalid token

---

#### GET /api/projects
Returns all projects.

**Request:**
- URL: `{{baseUrl}}/api/projects`
- Method: `GET`
- Headers: `Authorization: Bearer {{authToken}}`

**Success Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "My Test Project",
    "description": "A project for testing purposes",
    "status": "active",
    "createdBy": 1,
    "createdAt": "2025-01-01 12:00:00",
    "updatedAt": "2025-01-01 12:00:00",
    "creatorEmail": "tester@example.com"
  }
]
```

**Error Responses:**
- `401 Unauthorized` - Missing or invalid token

---

#### GET /api/projects/:id
Returns a single project by ID.

**Request:**
- URL: `{{baseUrl}}/api/projects/1`
- Method: `GET`
- Headers: `Authorization: Bearer {{authToken}}`

**Success Response (200 OK):**
```json
{
  "id": 1,
  "name": "My Test Project",
  "description": "A project for testing purposes",
  "status": "active",
  "createdBy": 1,
  "createdAt": "2025-01-01 12:00:00",
  "updatedAt": "2025-01-01 12:00:00",
  "creatorEmail": "tester@example.com"
}
```

**Error Responses:**
- `401 Unauthorized` - Missing or invalid token
- `404 Not Found` - Project doesn't exist

---

#### PUT /api/projects/:id
Updates an existing project. Only the owner or admin can update.

**Request:**
- URL: `{{baseUrl}}/api/projects/1`
- Method: `PUT`
- Headers:
  - `Content-Type: application/json`
  - `Authorization: Bearer {{authToken}}`
- Body:
```json
{
  "name": "Updated Project Name",
  "description": "Updated description",
  "status": "completed"
}
```

**Success Response (200 OK):**
```json
{
  "id": 1,
  "name": "Updated Project Name",
  "description": "Updated description",
  "status": "completed",
  "createdBy": 1,
  "createdAt": "2025-01-01 12:00:00",
  "updatedAt": "2025-01-01 12:30:00",
  "creatorEmail": "tester@example.com"
}
```

**Error Responses:**
- `400 Bad Request` - Invalid status value
- `401 Unauthorized` - Missing or invalid token
- `403 Forbidden` - Not the owner and not admin
- `404 Not Found` - Project doesn't exist

---

#### DELETE /api/projects/:id
Deletes a project. Only the owner or admin can delete.

**Request:**
- URL: `{{baseUrl}}/api/projects/1`
- Method: `DELETE`
- Headers: `Authorization: Bearer {{authToken}}`

**Success Response (204 No Content):**
No response body.

**Error Responses:**
- `401 Unauthorized` - Missing or invalid token
- `403 Forbidden` - Not the owner and not admin
- `404 Not Found` - Project doesn't exist

---

### Utility Endpoints

#### GET /api/health
Health check endpoint (no authentication required).

**Request:**
- URL: `{{baseUrl}}/api/health`
- Method: `GET`

**Success Response (200 OK):**
```json
{
  "status": "OK",
  "timestamp": "2025-01-01T12:00:00.000Z",
  "uptime": 1234.567
}
```

---

#### GET /
API info endpoint (no authentication required).

**Request:**
- URL: `{{baseUrl}}/`
- Method: `GET`

**Success Response (200 OK):**
```json
{
  "name": "Project Management API",
  "version": "1.0.0",
  "description": "REST API for QA Training - Project Management System",
  "documentation": "/api/health",
  "endpoints": {
    "auth": {
      "register": "POST /api/auth/register",
      "login": "POST /api/auth/login"
    },
    "projects": {
      "create": "POST /api/projects",
      "getAll": "GET /api/projects",
      "getById": "GET /api/projects/:id",
      "update": "PUT /api/projects/:id",
      "delete": "DELETE /api/projects/:id"
    }
  }
}
```

---

## 🛠️ Postman Setup Guide (Step-by-Step)

### Step 1: Create a New Collection
1. Open Postman
2. Click "Collections" in the sidebar
3. Click "+" to create new collection
4. Name it: "QA API Training"

### Step 2: Set Up Environment Variables
1. Click the ⚙️ gear icon (top right) or go to Environments
2. Click "Add" or "+" to create new environment
3. Name it: "QA API Training - Live"
4. Add these variables:

| Variable | Initial Value | Description |
|----------|---------------|-------------|
| `baseUrl` | `https://qa-api-training.onrender.com` | API base URL |
| `authToken` | (leave empty) | Will store JWT token |
| `projectId` | (leave empty) | Will store created project ID |

5. Click "Save"
6. Select this environment from the dropdown (top right)

### Step 3: Create Your First Request (Register)
1. Right-click your collection → "Add request"
2. Name it: "Register User"
3. Set method to: `POST`
4. Enter URL: `{{baseUrl}}/api/auth/register`
5. Go to "Headers" tab → Add:
   - Key: `Content-Type`
   - Value: `application/json`
6. Go to "Body" tab → select "raw" → select "JSON"
7. Enter:
```json
{
  "email": "tester@example.com",
  "password": "password123"
}
```
8. Click "Send"

### Step 4: Create Login Request with Auto-Token Save
1. Create new request named "Login"
2. Configure as `POST` to `{{baseUrl}}/api/auth/login`
3. Set Headers and Body like the Register request
4. Go to "Tests" tab and add this script:

```javascript
// Auto-save token to environment
if (pm.response.code === 200) {
    const response = pm.response.json();
    pm.environment.set("authToken", response.token);
    console.log("✅ Token saved to authToken variable!");
}
```

5. Click "Send" - the token will be automatically saved!

### Step 5: Create Protected Requests
For all `/api/projects` endpoints:
1. Create new request (e.g., "Create Project")
2. Go to "Authorization" tab
3. Select Type: "Bearer Token"
4. Enter Token: `{{authToken}}`
5. Configure the rest of the request (URL, Body, etc.)

### Step 6: Auto-Save Project ID
For the "Create Project" request, add this to the Tests tab:

```javascript
// Auto-save project ID for later use
if (pm.response.code === 201) {
    const response = pm.response.json();
    pm.environment.set("projectId", response.id);
    console.log("✅ Project ID saved: " + response.id);
}
```

Now you can use `{{projectId}}` in other requests like:
- `{{baseUrl}}/api/projects/{{projectId}}`

---

## ✅ Test Assertions to Implement

Add these to the "Tests" tab in your Postman requests.

### Basic Assertions

**Check Status Code:**
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});
```

**Check Response Structure:**
```javascript
pm.test("Response has required fields", function () {
    const json = pm.response.json();
    pm.expect(json).to.have.property('id');
    pm.expect(json).to.have.property('name');
});
```

**Check Response Time:**
```javascript
pm.test("Response time is under 500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});
```

### Intermediate Assertions

**Check Data Types:**
```javascript
pm.test("ID is a number", function () {
    const json = pm.response.json();
    pm.expect(json.id).to.be.a('number');
});
```

**Check Array Length:**
```javascript
pm.test("Response is an array with items", function () {
    const json = pm.response.json();
    pm.expect(json).to.be.an('array');
    pm.expect(json.length).to.be.greaterThan(0);
});
```

**Check Specific Value:**
```javascript
pm.test("Status is active", function () {
    const json = pm.response.json();
    pm.expect(json.status).to.equal('active');
});
```

### Error Response Assertions

**Check Error Message:**
```javascript
pm.test("Error message is present", function () {
    const json = pm.response.json();
    pm.expect(json).to.have.property('error');
});
```

**Check 401 Unauthorized:**
```javascript
pm.test("Returns 401 for missing token", function () {
    pm.response.to.have.status(401);
});
```

---

## 🎯 Testing Challenges

### Challenge 1: Happy Path Testing
Create requests and tests for the complete flow:
- [ ] Register a new user
- [ ] Login and capture token automatically
- [ ] Create a project
- [ ] Get all projects
- [ ] Get single project by ID
- [ ] Update the project
- [ ] Delete the project

### Challenge 2: Negative Testing
Test these error scenarios:
- [ ] Register with invalid email format (expect 400)
- [ ] Register with password less than 8 characters (expect 400)
- [ ] Register with already existing email (expect 400)
- [ ] Login with wrong password (expect 401)
- [ ] Login with non-existent email (expect 401)
- [ ] Access `/api/projects` without token (expect 401)
- [ ] Access `/api/projects` with invalid token (expect 401)
- [ ] Get project that doesn't exist (expect 404)
- [ ] Update project you don't own (expect 403)
- [ ] Delete project you don't own (expect 403)

### Challenge 3: Data Validation Testing
Test input validation:
- [ ] Create project without name (expect 400)
- [ ] Create project without description (expect 400)
- [ ] Create project with invalid status value (expect 400)
- [ ] Update project with empty name (expect 400)

### Challenge 4: Advanced Testing
- [ ] Test rate limiting (send 100+ requests quickly - expect 429)
- [ ] Test authorization with admin role
- [ ] Run full collection with Postman Collection Runner
- [ ] Export and run with Newman (CLI tool)

---

## 📊 Expected Status Codes Reference

| Scenario | Expected Code |
|----------|---------------|
| Successful GET | 200 OK |
| Successful POST (create) | 201 Created |
| Successful PUT (update) | 200 OK |
| Successful DELETE | 204 No Content |
| Validation error | 400 Bad Request |
| Missing/invalid token | 401 Unauthorized |
| Not allowed (not owner) | 403 Forbidden |
| Resource not found | 404 Not Found |
| Too many requests | 429 Too Many Requests |

---

## 💡 Tips for Testers

1. **Always check the response body** - even error responses contain useful information
2. **Use Postman Console** (View → Show Postman Console) to debug
3. **Save your work** - Export collection regularly as backup
4. **Use variables** - Don't hardcode IDs, save them to environment variables
5. **Test edge cases** - Empty strings, special characters, very long inputs
6. **Organize your collection** - Create folders for different test scenarios
7. **Use unique emails** - Each registration needs a unique email address
8. **Check the token expiration** - Tokens expire after 24 hours

---

## 🏆 Completion Checklist

When you're done, you should have:
- [ ] Postman collection with all endpoints organized in folders
- [ ] Environment with `baseUrl`, `authToken`, and `projectId` variables
- [ ] Auto-save scripts for token and project ID
- [ ] Tests for all happy path scenarios
- [ ] Tests for all error scenarios
- [ ] All tests passing in Collection Runner

---

## 📖 Solution Reference

After completing the challenges, you can check your work against the provided solution:
- `postman/SOLUTION_ProjectManagementAPI.postman_collection.json`

**⚠️ Important:** Try to complete all challenges yourself first before checking the solution!

---

## 🔧 Local Development (Optional)

If you want to run the API locally for development:

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/)

### Installation
```bash
git clone https://github.com/JakubTomczynski/qa-api-training.git
cd qa-api-training
npm install
cp .env.example .env
npm start
```

The API will be available at `http://localhost:3000`

---

## 📝 License

This project is licensed under the ISC License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help, please open an issue in the repository.
