import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers';

export const ExamScheduling = () => {
  const [exams, setExams] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [isAddExamModalOpen, setIsAddExamModalOpen] = useState(false);
  const [isEditExamModalOpen, setIsEditExamModalOpen] = useState(false);
  const [newExam, setNewExam] = useState({
    subject: '',
    type: 'CIE',
    date: new Date(),
    duration: '',
    maxMarks: '',
    scheduledBy: '',
  });
  const [editingExam, setEditingExam] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const fetchExams = async () => {
    try {
      const response = await api.get('/exam');
      setExams(response.data.data);
    } catch (error) {
      console.error('Error fetching exams:', error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await api.get('/subject');
      setSubjects(response.data.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const fetchFaculties = async () => {
    try {
      const response = await api.get('/admin');
      setFaculties(response.data.data);
    } catch (error) {
      console.error('Error fetching faculties:', error);
    }
  };

  useEffect(() => {
    fetchExams();
    fetchSubjects();
    fetchFaculties();
  }, []);

  const handleAddExam = async () => {
    try {
      await api.post('/exam', newExam);
      setSnackbarMessage('Exam successfully scheduled!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setIsAddExamModalOpen(false);
      // Reset newExam state
      setNewExam({
        subject: '',
        type: 'CIE',
        date: new Date(),
        duration: '',
        maxMarks: '',
        scheduledBy: '',
      });
      fetchExams();
    } catch (error) {
      console.error('Error scheduling exam:', error);
      setSnackbarMessage('Error scheduling exam!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleEditExam = (exam) => {
    setEditingExam({
      ...exam,
      subject: exam.subject._id, // Ensure subject is set to its ID
      scheduledBy: exam.scheduledBy._id, // Ensure scheduledBy is set to its ID
      date: new Date(exam.date), // Ensure date is a Date object
    });
    setIsEditExamModalOpen(true);
  };

  const handleUpdateExam = async () => {
    try {
      await api.put(`/exam/${editingExam._id}`, editingExam);
      setSnackbarMessage('Exam successfully updated!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setIsEditExamModalOpen(false);
      setEditingExam(null); // Reset editingExam state
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
      await api.delete(`/exam/${id}`);
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
                <TableCell>Subject</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Duration (mins)</TableCell>
                <TableCell>Max Marks</TableCell>
                <TableCell>Scheduled By</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exams.map((exam) => (
                <TableRow key={exam._id} hover>
                  <TableCell>{exam.subject.name}</TableCell>
                  <TableCell>{exam.type}</TableCell>
                  <TableCell>{new Date(exam.date).toLocaleDateString()}</TableCell>
                  <TableCell>{exam.duration}</TableCell>
                  <TableCell>{exam.maxMarks}</TableCell>
                  <TableCell>{exam.scheduledBy.fullName}</TableCell>
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

        {/* Add Exam Dialog */}
        <Dialog open={isAddExamModalOpen} onClose={() => setIsAddExamModalOpen(false)}>
          <DialogTitle>Add New Exam</DialogTitle>
          <Divider style={{ margin: '8px 0' }} />
          <DialogContent>
            <FormControl fullWidth margin="dense">
              <InputLabel>Subject</InputLabel>
              <Select
                value={newExam.subject}
                onChange={(e) => setNewExam({ ...newExam, subject: e.target.value })}
              >
                {subjects.map((subject) => (
                  <MenuItem key={subject._id} value={subject._id}>
                    {subject.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              label="Exam Type"
              fullWidth
              select
              value={newExam.type}
              onChange={(e) => setNewExam({ ...newExam, type: e.target.value })}
            >
              <MenuItem value="CIE">CIE</MenuItem>
              <MenuItem value="SEE">SEE</MenuItem>
            </TextField>
            <DatePicker
              label="Exam Date"
              value={newExam.date}
              onChange={(date) => setNewExam({ ...newExam, date })}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
            <TextField
              margin="dense"
              label="Duration (minutes)"
              fullWidth
              type="number"
              value={newExam.duration}
              onChange={(e) => setNewExam({ ...newExam, duration: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Max Marks"
              fullWidth
              type="number"
              value={newExam.maxMarks}
              onChange={(e) => setNewExam({ ...newExam, maxMarks: e.target.value })}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Scheduled By</InputLabel>
              <Select
                value={newExam.scheduledBy}
                onChange={(e) => setNewExam({ ...newExam, scheduledBy: e.target.value })}
              >
                {faculties.map((faculty) => (
                  <MenuItem key={faculty._id} value={faculty._id}>
                    {faculty.fullName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsAddExamModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAddExam} variant="contained">Add</Button>
          </DialogActions>
        </Dialog>

        {/* Edit Exam Dialog */}
        <Dialog open={isEditExamModalOpen} onClose={() => setIsEditExamModalOpen(false)}>
          <DialogTitle>Edit Exam</DialogTitle>
          <Divider style={{ margin: '8px 0' }} />
          <DialogContent>
            <FormControl fullWidth margin="dense">
              <InputLabel>Subject</InputLabel>
              <Select
                value={editingExam?.subject || ''} // Ensure it defaults to an empty string if undefined
                onChange={(e) => setEditingExam({ ...editingExam, subject: e.target.value })}
              >
                {subjects.map((subject) => (
                  <MenuItem key={subject._id} value={subject._id}>
                    {subject.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              label="Exam Type"
              fullWidth
              select
              value={editingExam?.type || ''} // Ensure it defaults to an empty string if undefined
              onChange={(e) => setEditingExam({ ...editingExam, type: e.target.value })}
            >
              <MenuItem value="CIE">CIE</MenuItem>
              <MenuItem value="SEE">SEE</MenuItem>
            </TextField>
            <DatePicker
              label="Exam Date"
              value={editingExam?.date || null} // Ensure it defaults to null if undefined
              onChange={(date) => setEditingExam({ ...editingExam, date })}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
            <TextField
              margin="dense"
              label="Duration (minutes)"
              fullWidth
              type="number"
              value={editingExam?.duration || ''} // Ensure it defaults to an empty string if undefined
              onChange={(e) => setEditingExam({ ...editingExam, duration: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Max Marks"
              fullWidth
              type="number"
              value={editingExam?.maxMarks || ''} // Ensure it defaults to an empty string if undefined
              onChange={(e) => setEditingExam({ ...editingExam, maxMarks: e.target.value })}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Scheduled By</InputLabel>
              <Select
                value={editingExam?.scheduledBy || ''} // Ensure it defaults to an empty string if undefined
                onChange={(e) => setEditingExam({ ...editingExam, scheduledBy: e.target.value })}
              >
                {faculties.map((faculty) => (
                  <MenuItem key={faculty._id} value={faculty._id}>
                    {faculty.fullName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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