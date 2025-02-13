// /api/index.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

let students = [
  { id: 1, code: 'S001', name: 'Alice', course: 'Math', dob: '2001-05-14' },
  { id: 2, code: 'S002', name: 'Bob', course: 'Science', dob: '2000-11-22' }
];

// Get all students
app.get('/students', (req, res) => {
  res.json(students);
});

// Get a student by ID
app.get('/students/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).send('Student not found');
  res.json(student);
});

// Add a new student
app.post('/students', (req, res) => {
  const newStudent = {
    id: students.length + 1,
    code: req.body.code,
    name: req.body.name,
    course: req.body.course,
    dob: req.body.dob
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// Update a student
app.put('/students/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).send('Student not found');

  student.code = req.body.code;
  student.name = req.body.name;
  student.course = req.body.course;
  student.dob = req.body.dob;

  res.json(student);
});

// Delete a student
app.delete('/students/:id', (req, res) => {
  const index = students.findIndex(s => s.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Student not found');

  students.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
