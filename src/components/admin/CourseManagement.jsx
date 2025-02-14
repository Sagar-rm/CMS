import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../api/axios.js'; // Adjust the path as necessary
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
  Grid,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

export const CourseManagement = () => {
  const [subjects, setSubjects] = useState([]);
  const [branches, setBranches] = useState([]); // Assuming you have branches to select from
  const [isAddSubjectModalOpen, setIsAddSubjectModalOpen] = useState(false);
  const [isEditSubjectModalOpen, setIsEditSubjectModalOpen] = useState(false);
  const [newSubject, setNewSubject] = useState({
    name: '',
    code: '',
    branch: '',
    semester: '',
    credits: '',
    type: '',
  });
  const [editingSubject, setEditingSubject] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const fetchSubjects = async () => {
    try {
      const response = await api.get('/subject'); // Adjust the endpoint as necessary
      setSubjects(response.data.data);
    } catch (error) {
      console.error('Error fetching subjects:', error.response?.data?.message || error.message);
    }
  };

  const fetchBranches = async () => {
    try {
      const response = await api.get('/branch'); // Adjust the endpoint as necessary
      setBranches(response.data.data);
    } catch (error) {
      console.error('Error fetching branches:', error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchSubjects();
    fetchBranches();
  }, []);

  const handleAddSubject = async () => {
    try {
      await api.post('/subject', newSubject); // Adjust the endpoint as necessary
      setSnackbarMessage('Subject successfully added!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      fetchSubjects();
      setIsAddSubjectModalOpen(false);
      setNewSubject({
        name: '',
        code: '',
        branch: '',
        semester: '',
        credits: '',
        type: '',
      });
    } catch (error) {
      console.error('Error adding subject:', error.response?.data?.message || error.message);
      setSnackbarMessage('Error adding subject!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleEditSubject = (subject) => {
    setEditingSubject(subject);
    setIsEditSubjectModalOpen(true);
  };

  const handleUpdateSubject = async () => {
    try {
      await api.put(`/subject/${editingSubject._id}`, editingSubject); // Adjust the endpoint as necessary
      setSnackbarMessage('Subject successfully updated!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      fetchSubjects();
      setIsEditSubjectModalOpen(false);
      setEditingSubject(null);
    } catch (error) {
      console.error('Error updating subject:', error.response?.data?.message || error.message);
      setSnackbarMessage('Error updating subject!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleDeleteSubject = async (id) => {
    try {
      await api.delete(`/subject/${id}`); // Adjust the endpoint as necessary
      setSnackbarMessage('Subject successfully deleted!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      fetchSubjects();
    } catch (error) {
      console.error('Error deleting subject:', error.response?.data?.message || error.message);
      setSnackbarMessage('Error deleting subject!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  return (
    <motion.div
      className="p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <Typography variant="h5">Subject Management</Typography>
        <Button variant="contained" startIcon={<PlusCircle />} onClick={() => setIsAddSubjectModalOpen(true)}>
          Add Subject
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Branch</TableCell>
              <TableCell>Semester</TableCell>
              <TableCell>Credits</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subjects.map((subject) => (
              <TableRow key={subject._id} hover>
                <TableCell>{subject.name}</TableCell>
                <TableCell>{subject.code}</TableCell>
                <TableCell>{subject.branch?.name}</TableCell>
                <TableCell>{subject.semester}</TableCell>
                <TableCell>{subject.credits}</TableCell>
                <TableCell>{subject.type}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleEditSubject(subject)}>
                    <Edit />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDeleteSubject(subject._id)}>
                    <Trash2 />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Positioning
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Add Subject Dialog */}
      <Dialog open={isAddSubjectModalOpen} onClose={() => setIsAddSubjectModalOpen(false)}>
        <DialogTitle>Add New Subject</DialogTitle>
        <Divider style={{ margin: '8px 0' }} />
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                label="Subject Name"
                fullWidth
                value={newSubject.name}
                onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Subject Code"
                fullWidth
                value={newSubject.code}
                onChange={(e) => setNewSubject({ ...newSubject, code: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Branch</InputLabel>
                <Select
                  value={newSubject.branch}
                  onChange={(e) => setNewSubject({ ...newSubject, branch: e.target.value })}
                >
                  {branches.map((branch) => (
                    <MenuItem key={branch._id} value={branch._id}>
                      {branch.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Semester"
                type="number"
                fullWidth
                value={newSubject.semester}
                onChange={(e) => setNewSubject({ ...newSubject, semester: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Credits"
                type="number"
                fullWidth
                value={newSubject.credits}
                onChange={(e) => setNewSubject({ ...newSubject, credits: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Type</InputLabel>
                <Select
                  value={newSubject.type}
                  onChange={(e) => setNewSubject({ ...newSubject, type: e.target.value })}
                >
                  <MenuItem value="Theory">Theory</MenuItem>
                  <MenuItem value="Practical">Practical</MenuItem>
                  <MenuItem value="Audit">Audit</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddSubjectModalOpen(false)}>Cancel</Button>
          <Button onClick={handleAddSubject} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Subject Dialog */}
      <Dialog open={isEditSubjectModalOpen} onClose={() => setIsEditSubjectModalOpen(false)}>
        <DialogTitle>Edit Subject</DialogTitle>
        <Divider style={{ margin: '8px 0' }} />
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                label="Subject Name"
                fullWidth
                value={editingSubject?.name || ''}
                onChange={(e) => setEditingSubject({ ...editingSubject, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Subject Code"
                fullWidth
                value={editingSubject?.code || ''}
                onChange={(e) => setEditingSubject({ ...editingSubject, code: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Branch</InputLabel>
                <Select
                  value={editingSubject?.branch || ''}
                  onChange={(e) => setEditingSubject({ ...editingSubject, branch: e.target.value })}
                >
                  {branches.map((branch) => (
                    <MenuItem key={branch._id} value={branch._id}>
                      {branch.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Semester"
                type="number"
                fullWidth
                value={editingSubject?.semester || ''}
                onChange={(e) => setEditingSubject({ ...editingSubject, semester: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Credits"
                type="number"
                fullWidth
                value={editingSubject?.credits || ''}
                onChange={(e) => setEditingSubject({ ...editingSubject, credits: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Type</InputLabel>
                <Select
                  value={editingSubject?.type || ''}
                  onChange={(e) => setEditingSubject({ ...editingSubject, type: e.target.value })}
                >
                  <MenuItem value="Theory">Theory</MenuItem>
                  <MenuItem value="Practical">Practical</MenuItem>
                  <MenuItem value="Audit">Audit</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditSubjectModalOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdateSubject} variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};