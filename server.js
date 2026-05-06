const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// In-memory array to store students
let students = [];
let nextId = 1;

// Validation helper
const validateStudent = (name, marks) => {
  const errors = [];
  
  if (!name || typeof name !== 'string' || name.trim() === '') {
    errors.push('Name is required and must be a non-empty string');
  }
  
  if (marks === undefined || marks === null || typeof marks !== 'number' || marks < 0) {
    errors.push('Marks is required, must be a number, and must be >= 0');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// POST /students - Add a new student
app.post('/students', (req, res) => {
  const { name, marks } = req.body;
  
  const validation = validateStudent(name, marks);
  
  if (!validation.isValid) {
    return res.status(400).json({
      success: false,
      errors: validation.errors
    });
  }
  
  const newStudent = {
    id: nextId++,
    name: name.trim(),
    marks
  };
  
  students.push(newStudent);
  
  res.status(201).json({
    success: true,
    message: 'Student added successfully',
    data: newStudent
  });
});

// GET /students - Get all students
app.get('/students', (req, res) => {
  res.status(200).json({
    success: true,
    count: students.length,
    data: students
  });
});

// PUT /students/:id - Update a student
app.put('/students/:id', (req, res) => {
  const { id } = req.params;
  const { name, marks } = req.body;
  
  const studentId = parseInt(id);
  const student = students.find(s => s.id === studentId);
  
  if (!student) {
    return res.status(404).json({
      success: false,
      message: `Student with ID ${id} not found`
    });
  }
  
  // Validate if name or marks are provided
  if (name !== undefined || marks !== undefined) {
    const validation = validateStudent(
      name !== undefined ? name : student.name,
      marks !== undefined ? marks : student.marks
    );
    
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        errors: validation.errors
      });
    }
  }
  
  if (name !== undefined) {
    student.name = name.trim();
  }
  
  if (marks !== undefined) {
    student.marks = marks;
  }
  
  res.status(200).json({
    success: true,
    message: 'Student updated successfully',
    data: student
  });
});

// DELETE /students/:id - Delete a student
app.delete('/students/:id', (req, res) => {
  const { id } = req.params;
  
  const studentId = parseInt(id);
  const studentIndex = students.findIndex(s => s.id === studentId);
  
  if (studentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Student with ID ${id} not found`
    });
  }
  
  const deletedStudent = students.splice(studentIndex, 1);
  
  res.status(200).json({
    success: true,
    message: 'Student deleted successfully',
    data: deletedStudent[0]
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
