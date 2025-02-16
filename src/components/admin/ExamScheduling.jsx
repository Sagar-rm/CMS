import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../api/axios'; // Adjust the import based on your project structure
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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  MenuItem,
} from '@mui/material';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export const ExamScheduling = () => {
  const [exams, setExams] = useState([]);
  const [isAddExamModalOpen, setIsAddExamModalOpen] = useState(false);
  const [isEditExamModalOpen, setIsEditExamModalOpen] = useState(false);
  const [newExam, setNewExam] = useState({
    student: '',
    subject: '',
    cieExams: [
      {
        name: '',
        type: 'Internal',
        marks: '',
        maxMarks: '',
        weightage: '',
      },
    ],
    internalMarks: 0,
    externalMarks: 0,
    totalMarks: 0,
    passed: false,
  });
  const [editingExam, setEditingExam] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const fetchExams = async () => {
    try {
      const response = await api.get('/exam'); // Adjust the endpoint as necessary
      setExams(response.data.data);
    } catch (error) {
      console.error('Error fetching exams:', error);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const handleAddExam = async () => {
    try {
      await api.post('/exam', newExam); // Adjust the endpoint as necessary
      setSnackbarMessage('Exam successfully added!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setIsAddExamModalOpen(false);
      setNewExam({
        student: '',
        subject: '',
        cieExams: [
          {
            name: '',
            type: 'Internal',
            marks: '',
            maxMarks: '',
            weightage: '',
          },
        ],
        internalMarks: 0,
        externalMarks: 0,
        totalMarks: 0,
        passed: false,
      });
      fetchExams();
    } catch (error) {
      console.error('Error adding exam:', error);
      setSnackbarMessage('Error adding exam!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleEditExam = (exam) => {
    setEditingExam(exam);
    setIsEditExamModalOpen(true);
  };

  const handleUpdateExam = async () => {
    try {
      await api.put(`/exam/${editingExam._id}`, editingExam); // Adjust the endpoint as necessary
      setSnackbarMessage('Exam successfully updated!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setIsEditExamModalOpen(false);
      setEditingExam(null);
      fetchExams();
    } catch (error) {
      console.error('Error updating exam:', error);
      setSnackbarMessage('Error updating exam!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleDeleteExam = async (id) => {
    try {
      await api.delete(`/exam/${id}`); // Adjust the endpoint as necessary
      setSnackbarMessage('Exam successfully deleted!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      fetchExams();
    } catch (error) {
      console.error('Error deleting exam:', error);
      setSnackbarMessage('Error deleting exam!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleAddCIEExam = () => {
    setNewExam((prev) => ({
      ...prev,
      cieExams: [
        ...prev.cieExams,
        {
          name: '',
          type: 'Internal',
          marks: '',
          maxMarks: '',
          weightage: '',
        },
      ],
    }));
  };

  const handleCIEExamChange = (index, field, value) => {
    const updatedCIEExams = [...newExam.cieExams];
    updatedCIEExams[index][field] = value;
    setNewExam((prev) => ({ ...prev, cieExams: updatedCIEExams }));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <motion.div
        className="p-6 space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center">
          <Typography variant="h5">Exam Scheduling</Typography>
          <Button
            variant="contained"
            startIcon={<PlusCircle />}
            onClick={() => setIsAddExamModalOpen(true)}
          >
            Schedule Exam
          </Button>
        </div>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>CIE Exams</TableCell>
                <TableCell>Internal Marks</TableCell>
                <TableCell>External Marks</TableCell>
                <TableCell>Total Marks</TableCell>
                <TableCell>Passed</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exams.map((exam) => (
                <TableRow key={exam._id} hover>
                  <TableCell>{exam.student.fullName}</TableCell>
                  <TableCell>{exam.subject.name}</TableCell>
                  <TableCell>
                    {exam.cieExams.map((cie) => (
                      <div key={cie._id}>
                        {cie.name} - {cie.marks}/{cie.maxMarks}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>{exam.internalMarks}</TableCell>
                  <TableCell>{exam.externalMarks}</TableCell>
                  <TableCell>{exam.totalMarks}</TableCell>
                  <TableCell>{exam.passed ? 'Yes' : 'No'}</TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={() => handleEditExam(exam)}>
                      <Edit />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDeleteExam(exam._id)}>
                      <Trash2 />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>

        <Dialog open={isAddExamModalOpen} onClose={() => setIsAddExamModalOpen(false)}>
          <DialogTitle>Schedule New Exam</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Student ID"
              fullWidth
              value={newExam.student}
              onChange={(e) => setNewExam({ ...newExam, student: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Subject ID"
              fullWidth
              value={newExam.subject}
              onChange={(e) => setNewExam({ ...newExam, subject: e.target.value })}
            />
            {newExam.cieExams.map((cieExam, index) => (
              <div key={index}>
                <TextField
                  margin="dense"
                  label="CIE Exam Name"
                  fullWidth
                  value={cieExam.name}
                  onChange={(e) => handleCIEExamChange(index, 'name', e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="Type"
                  fullWidth
                  select
                  value={cieExam.type}
                  onChange={(e) => handleCIEExamChange(index, 'type', e.target.value)}
                >
                  <MenuItem value="Internal">Internal</MenuItem>
                  <MenuItem value="Practical">Practical</MenuItem>
                </TextField>
                <TextField
                  margin="dense"
                  label="Marks"
                  fullWidth
                  type="number"
                  value={cieExam.marks}
                  onChange={(e) => handleCIEExamChange(index, 'marks', e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="Max Marks"
                  fullWidth
                  type="number"
                  value={cieExam.maxMarks}
                  onChange={(e) => handleCIEExamChange(index, 'maxMarks', e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="Weightage"
                  fullWidth
                  type="number"
                  value={cieExam.weightage}
                  onChange={(e) => handleCIEExamChange(index, 'weightage', e.target.value)}
                />
              </div>
            ))}
            <Button onClick={handleAddCIEExam} variant="contained" color="primary">
              Add CIE Exam
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsAddExamModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAddExam} variant="contained">Schedule</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={isEditExamModalOpen} onClose={() => setIsEditExamModalOpen(false)}>
          <DialogTitle>Edit Exam Schedule</DialogTitle>
          <DialogContent>
            {/* Similar structure for editing an exam */}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsEditExamModalOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateExam} variant="contained">Update</Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </LocalizationProvider>
  );
};