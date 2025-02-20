import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import {
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';

export const AddMarks = () => {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState('');
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await api.get('/exam'); // Adjust the endpoint as necessary
      setExams(response.data.data);
    } catch (error) {
      console.error('Error fetching exams:', error);
    }
  };

  const fetchStudents = async (examId) => {
    try {
        const response = await api.get(`/student/exam?examId=${examId}`);
        setStudents(response.data.data);

        // Fetch existing marks for the selected exam
        const marksResponse = await api.get(`/marks?examId=${examId}`); // Updated to use examId
        console.log("Marks response:", marksResponse.data);

        if (Array.isArray(marksResponse.data.data)) {
            const existingMarks = marksResponse.data.data.reduce((acc, mark) => {
                acc[mark.student._id] = {
                    marksObtained: mark.marksObtained || 0,
                    grade: mark.grade || '',
                };
                return acc;
            }, {});

            // Set the marks state with existing marks
            setMarks(existingMarks);
        } else {
            console.error("Expected marksResponse.data.data to be an array, but got:", marksResponse.data);
            setMarks({}); // Reset marks if the response is not as expected
        }
    } catch (error) {
        console.error('Error fetching students:', error);
    }
};

  const handleExamChange = (event) => {
    const examId = event.target.value;
    setSelectedExam(examId);
    console.log("EXAM CHANGED")
    setMarks({}); // Reset marks when changing exams
    fetchStudents(examId); // Fetch students and existing marks when the exam changes
  };

  const handleMarksChange = (studentId, field, value) => {
    setMarks((prevMarks) => ({
      ...prevMarks,
      [studentId]: {
        ...prevMarks[studentId],
        [field]: value,
      },
    }));
  };

  const handleSubmitMarks = async () => {
    try {
      // Iterate over each student and send their marks individually
      for (const studentId of Object.keys(marks)) {
        const { marksObtained, grade } = marks[studentId];
        const payload = {
          student: studentId, // Ensure this is the correct student ID
          exam: selectedExam,
          marksObtained: marksObtained || 0,
          grade: grade || '',
        };

        console.log("Payload being sent:", payload); // Log the payload for debugging

        // Use the new controller logic to create or update marks
        await api.post('/marks', payload); // Adjust the endpoint as necessary
      }

      setSnackbarMessage('Marks successfully updated!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setMarks({});
      setSelectedExam('');
      setStudents([]);
    } catch (error) {
      console.error('Error adding marks:', error);
      setSnackbarMessage('Error adding marks!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <Typography variant="h5">Add Marks to Exams</Typography>

      <FormControl fullWidth margin="dense">
        <InputLabel>Exam</InputLabel>
        <Select value={selectedExam} onChange={handleExamChange}>
          {exams.map((exam) => (
            <MenuItem key={exam._id} value={exam._id}>
              {exam.subject.name} - {exam.type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {students.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student Name</TableCell>
                <TableCell>Marks Obtained</TableCell>
                <TableCell>Grade</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student._id}>
                  <TableCell>{student.fullName}</TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      value={marks[student._id]?.marksObtained || ''} // Controlled input
                      onChange={(e) => handleMarksChange(student._id, 'marksObtained', e.target.value)}
                      placeholder="Enter marks"
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      value={marks[student._id]?.grade || ''} // Controlled input
                      onChange={(e) => handleMarksChange(student._id, 'grade', e.target.value)}
                    >
                      <MenuItem value="A+">A+</MenuItem>
                      <MenuItem value="A">A</MenuItem>
                      <MenuItem value="B+">B+</MenuItem>
                      <MenuItem value="B">B</MenuItem>
                      <MenuItem value="C+">C+</MenuItem>
                      <MenuItem value="C">C</MenuItem>
                      <MenuItem value="D">D</MenuItem>
                      <MenuItem value="F">F</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Button variant="contained" color="primary" onClick={handleSubmitMarks}>
        Submit Marks
      </Button>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};