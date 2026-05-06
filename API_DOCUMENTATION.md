# Student Management REST API

A simple REST API for managing student records built with Express.js using an in-memory array (no database).

## Features

✅ Create students (POST)  
✅ Retrieve all students (GET)  
✅ Update student information (PUT)  
✅ Delete students (DELETE)  
✅ Input validation (name required, marks ≥ 0)  
✅ Proper HTTP status codes  
✅ JSON request/response format  

## Installation

```bash
npm install
```

## Running the Server

```bash
node server.js
```

The server will start on `http://localhost:3000`

## API Endpoints

### 1. Add a Student
**POST** `/students`

**Request Body:**
```json
{
  "name": "John Doe",
  "marks": 85
}
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "message": "Student added successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "marks": 85
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "errors": ["Name is required and must be a non-empty string"]
}
```

---

### 2. Get All Students
**GET** `/students`

**Success Response (200 OK):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "marks": 85
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "marks": 92
    }
  ]
}
```

---

### 3. Update a Student
**PUT** `/students/:id`

**Request Body (partial update allowed):**
```json
{
  "marks": 95
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Student updated successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "marks": 95
  }
}
```

**Error Response - Student Not Found (404):**
```json
{
  "success": false,
  "message": "Student with ID 999 not found"
}
```

---

### 4. Delete a Student
**DELETE** `/students/:id`

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Student deleted successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "marks": 85
  }
}
```

**Error Response - Student Not Found (404):**
```json
{
  "success": false,
  "message": "Student with ID 999 not found"
}
```

---

## Validation Rules

| Field | Rule | Example |
|-------|------|---------|
| name  | Required, non-empty string | "John Doe" ✅, "" ❌, null ❌ |
| marks | Required, number, ≥ 0 | 85 ✅, -10 ❌, "abc" ❌ |

---

## HTTP Status Codes Used

| Code | Meaning | When Used |
|------|---------|-----------|
| 201  | Created | Student successfully added |
| 200  | OK | Successful GET, PUT, DELETE |
| 400  | Bad Request | Invalid input data |
| 404  | Not Found | Student ID doesn't exist |

---

## Testing Examples

### Using cURL

**Add a student:**
```bash
curl -X POST http://localhost:3000/students \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "marks": 85}'
```

**Get all students:**
```bash
curl http://localhost:3000/students
```

**Update student marks:**
```bash
curl -X PUT http://localhost:3000/students/1 \
  -H "Content-Type: application/json" \
  -d '{"marks": 90}'
```

**Delete a student:**
```bash
curl -X DELETE http://localhost:3000/students/1
```

**Test validation (missing name):**
```bash
curl -X POST http://localhost:3000/students \
  -H "Content-Type: application/json" \
  -d '{"marks": 85}'
```

**Test validation (negative marks):**
```bash
curl -X POST http://localhost:3000/students \
  -H "Content-Type: application/json" \
  -d '{"name": "Test", "marks": -10}'
```

---

## Data Structure

Each student object in memory contains:
- **id** (Number): Unique identifier, auto-incremented
- **name** (String): Student's full name
- **marks** (Number): Student's marks (0 or positive)

---

## Technical Details

- **Framework:** Express.js v4.18.2
- **Data Storage:** In-memory array (resets when server restarts)
- **Port:** 3000 (configurable via `PORT` environment variable)
- **Middleware:** JSON request body parser

---

## Notes

- All data is stored in memory and will be lost when the server restarts
- IDs are auto-incremented starting from 1
- Names are automatically trimmed of whitespace
- The API uses JSON for all request and response bodies
