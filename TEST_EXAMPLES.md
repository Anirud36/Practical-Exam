// Test file for Student Management API
// Run the server first with: npm start
// Then run these tests using: curl or any REST client

// 1. Add a new student
// curl -X POST http://localhost:3000/students \
//   -H "Content-Type: application/json" \
//   -d '{"name": "John Doe", "marks": 85}'

// 2. Add another student
// curl -X POST http://localhost:3000/students \
//   -H "Content-Type: application/json" \
//   -d '{"name": "Jane Smith", "marks": 92}'

// 3. Get all students
// curl http://localhost:3000/students

// 4. Update a student (ID 1)
// curl -X PUT http://localhost:3000/students/1 \
//   -H "Content-Type: application/json" \
//   -d '{"marks": 90}'

// 5. Delete a student (ID 1)
// curl -X DELETE http://localhost:3000/students/1

// Test cases for validation:

// Missing name (should fail)
// curl -X POST http://localhost:3000/students \
//   -H "Content-Type: application/json" \
//   -d '{"marks": 85}'

// Negative marks (should fail)
// curl -X POST http://localhost:3000/students \
//   -H "Content-Type: application/json" \
//   -d '{"name": "Test", "marks": -10}'

// Non-existent student (should return 404)
// curl http://localhost:3000/students/999

// Update non-existent student (should return 404)
// curl -X PUT http://localhost:3000/students/999 \
//   -H "Content-Type: application/json" \
//   -d '{"marks": 50}'
