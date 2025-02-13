import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../api/axios.js'; // Adjust the import based on your project structure
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

export const BranchManagement = () => {
  const [branches, setBranches] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [isAddBranchModalOpen, setIsAddBranchModalOpen] = useState(false);
  const [isEditBranchModalOpen, setIsEditBranchModalOpen] = useState(false);
  const [newBranch, setNewBranch] = useState({ name: '', code: '', subjects: [] });
  const [editingBranch, setEditingBranch] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const fetchBranches = async () => {
    try {
      const response = await api.get('/branch');
      setBranches(response.data.data);
    } catch (error) {
      console.error("Error fetching branches:", error.response?.data?.message || error.message);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await api.get('/subject'); // Adjust the endpoint as necessary
      setSubjects(response.data.data);
    } catch (error) {
      console.error("Error fetching subjects:", error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchBranches();
    fetchSubjects();
  }, []);

  const handleAddBranch = async () => {
    try {
      await api.post('/branch', newBranch);
      fetchBranches();
      setSnackbarMessage("Branch successfully added!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setIsAddBranchModalOpen(false);
      setNewBranch({ name: '', code: '', subjects: [] });
    } catch (error) {
      console.error("Error adding branch:", error.response?.data?.message || error.message);
      setSnackbarMessage("Error adding branch!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleEditBranch = (branch) => {
    setEditingBranch(branch);
    setIsEditBranchModalOpen(true);
  };

  const handleUpdateBranch = async () => {
    try {
      await api.put(`/branch/${editingBranch._id}`, editingBranch);
      fetchBranches();
      setSnackbarMessage("Branch successfully updated!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setIsEditBranchModalOpen(false);
      setEditingBranch(null);
    } catch (error) {
      console.error("Error updating branch:", error.response?.data?.message || error.message);
      setSnackbarMessage("Error updating branch!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleDeleteBranch = async (id) => {
    try {
      await api.delete(`/branch/${id}`);
      fetchBranches();
      setSnackbarMessage("Branch successfully deleted!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error deleting branch:", error.response?.data?.message || error.message);
      setSnackbarMessage("Error deleting branch!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSubjectChange = (event) => {
    const value = event.target.value;
    // Prevent adding the same subject twice
    if (!newBranch.subjects.includes(value)) {
      setNewBranch({ ...newBranch, subjects: [...newBranch.subjects, value] });
    }
  };

  const handleEditingSubjectChange = (event) => {
    const value = event.target.value;
    // Prevent adding the same subject twice
    if (!editingBranch.subjects.includes(value)) {
      setEditingBranch({ ...editingBranch, subjects: [...editingBranch.subjects, value] });
    }
  };

  const handleRemoveSubject = (subjectId) => {
    setEditingBranch((prev) => ({
      ...prev,
      subjects: prev.subjects.filter((id) => id !== subjectId),
    }));
  };

  return (
    <motion.div
      className="p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <Typography variant="h5">Branch Management</Typography>
        <Button variant="contained" startIcon={<PlusCircle />} onClick={() => setIsAddBranchModalOpen(true)}>
          Add Branch
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Subjects</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {branches.map((branch) => (
              <TableRow key={branch._id} hover>
                <TableCell>{branch.name}</TableCell>
                <TableCell>{branch.code}</TableCell>
                <TableCell>{branch.subjects.map(subject => subject.name).join(', ')}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleEditBranch(branch)}>
                    <Edit />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDeleteBranch(branch._id)}>
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

      {/* Add Branch Dialog */}
      <Dialog open={isAddBranchModalOpen} onClose={() => setIsAddBranchModalOpen(false)}>
        <DialogTitle>Add New Branch</DialogTitle>
        <Divider style={{ margin: '8px 0' }} />
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Branch Name"
            fullWidth
            value={newBranch.name}
            onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Branch Code"
            fullWidth
            value={newBranch.code}
            onChange={(e) => setNewBranch({ ...newBranch, code: e.target.value })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Subjects</InputLabel>
            <Select
              multiple
              value={newBranch.subjects}
              onChange={handleSubjectChange}
            >
              {subjects.map((subject) => (
                <MenuItem key={subject._id} value={subject._id}>
                  {subject.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddBranchModalOpen(false)}>Cancel</Button>
          <Button onClick={handleAddBranch} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Branch Dialog */}
      <Dialog open={isEditBranchModalOpen} onClose={() => setIsEditBranchModalOpen(false)}>
        <DialogTitle>Edit Branch</DialogTitle>
        <Divider style={{ margin: '8px 0' }} />
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Branch Name"
            fullWidth
            value={editingBranch?.name || ''}
            onChange={(e) => setEditingBranch({ ...editingBranch, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Branch Code"
            fullWidth
            value={editingBranch?.code || ''}
            onChange={(e) => setEditingBranch({ ...editingBranch, code: e.target.value })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Subjects</InputLabel>
            <Select
              multiple
              value={editingBranch?.subjects || []}
              onChange={handleEditingSubjectChange}
            >
              {subjects.map((subject) => (
                <MenuItem key={subject._id} value={subject._id}>
                  {subject.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div>
            <Typography variant="subtitle1">Selected Subjects:</Typography>
            {editingBranch?.subjects.map((subjectId) => {
              const subject = subjects.find(s => s._id === subjectId);
              return (
                <div key={subjectId} style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2">{subject?.name}</Typography>
                  <Button
                    onClick={() => handleRemoveSubject(subjectId)}
                    variant="outlined"
                    color="secondary"
                    style={{ marginLeft: '8px' }}
                  >
                    Remove
                  </Button>
                </div>
              );
            })}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditBranchModalOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdateBranch} variant="contained">Update</Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};