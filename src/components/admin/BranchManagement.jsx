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
} from '@mui/material';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

export const BranchManagement = () => {
  const [branches, setBranches] = useState([]);
  const [isAddBranchModalOpen, setIsAddBranchModalOpen] = useState(false);
  const [isEditBranchModalOpen, setIsEditBranchModalOpen] = useState(false);
  const [newBranch, setNewBranch] = useState({ name: '', code: '' });
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

  useEffect(() => {
    fetchBranches();
  }, []);

  const handleAddBranch = async () => {
    try {
      await api.post('/branch', newBranch);
      fetchBranches();
      setSnackbarMessage("Branch successfully added!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setIsAddBranchModalOpen(false);
      setNewBranch({ name: '', code: '' });
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
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {branches.map((branch) => (
              <TableRow key={branch._id} hover>
                <TableCell>{branch.name}</TableCell>
                <TableCell>{branch.code}</TableCell>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddBranchModalOpen(false)}>Cancel</Button>
          <Button onClick={handleAddBranch} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>

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
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditBranchModalOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdateBranch} variant="contained">Update</Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};