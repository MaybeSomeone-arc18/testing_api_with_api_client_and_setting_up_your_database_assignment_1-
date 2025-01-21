// API: Retrieve Students Above Threshold
// ---------------------------------------
// Task:
// Implement an API to fetch students whose total marks exceed a given threshold.
//
// Endpoint:
// POST /students/above-threshold
//
// Request Body:
// {
//   "threshold": <number>
// }
//
// Response:
// Success: List of students with their names and total marks who meet the criteria.
// Example:
// {
//   "count": 2,
//   "students": [
//     { "name": "Alice Johnson", "total": 433 },
//     { "name": "Bob Smith", "total": 410 }
//   ]
// }
//
// No Matches:
// {
//   "count": 0,
//   "students": []
// }
//
// Purpose:
// Help teachers retrieve and analyze student performance efficiently.


const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

// Middleware to parse JSON request bodies
app.use(express.json()); 

// Example student data
const students = [
  {
    "student_id": "1",
    "name": "Alice Johnson",
    "marks": {
      "math": 85,
      "science": 90,
      "english": 78,
      "history": 88,
      "geography": 92
    },
    "total": 433
  },
  {
    "student_id": "2",
    "name": "Bob Smith",
    "marks": {
      "math": 80,
      "science": 88,
      "english": 72,
      "history": 95,
      "geography": 75
    },
    "total": 410
  },
  {
    "student_id": "3",
    "name": "Charlie Davis",
    "marks": {
      "math": 90,
      "science": 85,
      "english": 80,
      "history": 88,
      "geography": 95
    },
    "total": 438
  }
];

// Root endpoint to serve the HTML page
app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

// POST route to handle the threshold filter
app.post('/students/above-threshold', (req, res) => {
  const threshold = req.body.threshold;

  // Validate the threshold input
  if (typeof threshold !== 'number' || isNaN(threshold)) {
    return res.status(400).json({
      error: 'Invalid threshold. Please provide a valid number.'
    });
  }

  // Filter students whose total marks exceed the threshold
  const filteredStudents = students.filter(student => student.total > threshold);

  // Respond with the filtered students
  res.json({
    count: filteredStudents.length,
    students: filteredStudents.map(student => ({
      name: student.name,
      total: student.total
    }))
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
