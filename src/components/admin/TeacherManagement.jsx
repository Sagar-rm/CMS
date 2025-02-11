import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Typography, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox, Snackbar, Alert, Divider } from '@mui/material';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import api from '../../api/axios.js';

export const TeacherManagement = () => {
  const [teachers, setTeachers] = useState([]);
  const [branches, setBranches] = useState([]); // Stores branch options
  const [isAddTeacherModalOpen, setIsAddTeacherModalOpen] = useState(false);
  const [isEditTeacherModalOpen, setIsEditTeacherModalOpen] = useState(false);
  const [newTeacher, setNewTeacher] = useState({
    kgId: '', fullName: '', email: '', department: '', phoneNumber: '', gender: '', experience: '', designation: '', isHod: false, profile: null, password: ''
  });
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Added severity state

  useEffect(() => {
    fetchTeachers();
    fetchBranches(); // Fetch branch options on mount
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await api.get('/admin');
      setTeachers(response.data.data);
    } catch (error) {
      console.error('Error fetching teachers:', error.response?.data?.message || error.message);
    }
  };

  const fetchBranches = async () => {
    try {
      const response = await api.get('/branch');
      setBranches(response.data.data); // Assuming API returns { data: [branch1, branch2, ...] }
    } catch (error) {
      console.error('Error fetching branches:', error.response?.data?.message || error.message);
    }
  };

  const handleAddTeacher = async () => {
    try {
      const formData = new FormData();
      formData.append("kgId", newTeacher.kgId);
      formData.append("fullName", newTeacher.fullName);
      formData.append("email", newTeacher.email);
      formData.append("department", newTeacher.department);
      formData.append("phoneNumber", newTeacher.phoneNumber);
      formData.append("gender", newTeacher.gender);
      formData.append("experience", newTeacher.experience);
      formData.append("designation", newTeacher.designation);
      formData.append("isHod", newTeacher.isHod);
      formData.append("password", newTeacher.password);
      if (newTeacher.profile) {
        formData.append("profile", newTeacher.profile);
      }

      await api.post('/admin/register/', formData);
      fetchTeachers(); // Refresh teacher list
      setSnackbarMessage("Teacher successfully added!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setIsAddTeacherModalOpen(false);
      resetTeacherForm();
    } catch (error) {
      console.error('Error adding teacher:', error.response?.data?.message || error.message);
      setSnackbarMessage("Error adding teacher!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleUpdateTeacher = async () => {
    try {
      const formData = new FormData();
      formData.append("kgId", newTeacher.kgId);
      formData.append("fullName", newTeacher.fullName);
      formData.append("email", newTeacher.email);
      formData.append("department", newTeacher.department);
      formData.append("phoneNumber", newTeacher.phoneNumber);
      formData.append("gender", newTeacher.gender);
      formData.append("experience", newTeacher.experience);
      formData.append("designation", newTeacher.designation);
      formData.append("isHod", newTeacher.isHod);
      if (newTeacher.password) {
        formData.append("password", newTeacher.password);
      }
      if (newTeacher.profile) {
        formData.append("profile", newTeacher.profile);
      }

      // Make sure to use the correct URL format for the PUT request
      await api.put(`/admin/${editingTeacher._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      fetchTeachers(); // Refresh teacher list
      setSnackbarMessage("Teacher successfully updated!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setIsEditTeacherModalOpen(false);
      resetTeacherForm();
    } catch (error) {
      console.error('Error updating teacher:', error.response?.data?.message || error.message);
      setSnackbarMessage("Error updating teacher!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleDeleteTeacher = async (id) => {
    try {
      await api.delete(`/admin/${id}`);
      fetchTeachers(); // Refresh teacher list
      setSnackbarMessage("Teacher successfully deleted!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting teacher:', error.response?.data?.message || error.message);
      setSnackbarMessage("Error deleting teacher!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const resetTeacherForm = () => {
    setNewTeacher({
      kgId: '', fullName: '', email: '', department: '', phoneNumber: '', gender: '', experience: '', designation: '', isHod: false, profile: null, password: ''
    });
    setEditingTeacher(null);
  };

  const handleEditTeacher = (teacher) => {
    setEditingTeacher(teacher);
    setNewTeacher({
      kgId: teacher.kgId,
      fullName: teacher.fullName,
      email: teacher.email,
      department: teacher.department._id,
      phoneNumber: teacher.phoneNumber,
      gender: teacher.gender,
      experience: teacher.experience,
      designation: teacher.designation,
      isHod: teacher.isHod,
      profile: null, // Reset profile for file upload
      password: '' // Do not pre-fill password for security reasons
    });
    setIsEditTeacherModalOpen(true);
  };

  return (
    <motion.div className="p-6 space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="flex justify-between items-center">
        <Typography variant="h5">Teacher Management</Typography>
        <Button variant="contained" startIcon={<PlusCircle />} onClick={() => {
          resetTeacherForm(); // Reset form before opening the add modal
          setIsAddTeacherModalOpen(true);
        }}>
          Add Teacher
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Experience</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(teachers) && teachers.map((teacher) => (
              <TableRow key={teacher._id} hover>
                <TableCell>{teacher.fullName}</TableCell>
                <TableCell>{teacher.email}</TableCell>
                <TableCell>{teacher.department.name}</TableCell>
                <TableCell>{teacher.experience}</TableCell>
                <TableCell>{teacher.designation}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleEditTeacher(teacher)}><Edit /></IconButton>
                  <IconButton size="small" onClick={() => handleDeleteTeacher(teacher._id)}><Trash2 /></IconButton>
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

      {/* Add Teacher Dialog */}
      <Dialog open={isAddTeacherModalOpen} onClose={() => setIsAddTeacherModalOpen(false)}>
        <DialogTitle>Add New Teacher</DialogTitle>
        <Divider style={{ margin: '8px 0' }} />
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField 
                label="Full Name" 
                fullWidth 
                required 
                value={newTeacher.fullName} 
                onChange={(e) => setNewTeacher({ ...newTeacher, fullName: e.target.value })} 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                label="Email" 
                fullWidth 
                required 
                value={newTeacher.email} 
                onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })} 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                label="Phone Number" 
                fullWidth 
                type="number" 
                required 
                value={newTeacher.phoneNumber} 
                onChange={(e) => setNewTeacher({ ...newTeacher, phoneNumber: e.target.value })} 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select 
                  value={newTeacher.gender} 
                  onChange={(e) => setNewTeacher({ ...newTeacher, gender: e.target.value })}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Department</InputLabel>
                <Select
                  value={newTeacher.department}
                  onChange={(e) => setNewTeacher({ ...newTeacher, department: e.target.value })}
                >
                  {branches.map((branch) => (
                    <MenuItem key={branch._id} value={branch._id}>{branch.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                label="Experience (Years)" 
                fullWidth 
                type="number" 
                required 
                value={newTeacher.experience} 
                onChange={(e) => setNewTeacher({ ...newTeacher, experience: e.target.value })} 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                label="kgId" 
                fullWidth 
                type="number" 
                required 
                value={newTeacher.kgId} 
                onChange={(e) => setNewTeacher({ ...newTeacher, kgId: e.target.value })} 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                label="Designation" 
                fullWidth 
                required 
                value={newTeacher.designation} 
                onChange={(e) => setNewTeacher({ ...newTeacher, designation: e.target.value })} 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                label="Password" 
                type='password' 
                fullWidth 
                required 
                value={newTeacher.password} 
                onChange={(e) => setNewTeacher({ ...newTeacher, password: e.target.value })} 
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={newTeacher.isHod} onChange={(e) => setNewTeacher({ ...newTeacher, isHod: e.target.checked })} />}
                label="Is HOD?"
              />
            </Grid>
            <Grid item xs={12}>
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => setNewTeacher({ ...newTeacher, profile: e.target.files[0] })} 
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddTeacherModalOpen(false)}>Cancel</Button>
          <Button onClick={handleAddTeacher} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Teacher Dialog */}
      <Dialog open={isEditTeacherModalOpen} onClose={() => {
        setIsEditTeacherModalOpen(false);
        resetTeacherForm(); // Reset form when closing edit modal
      }}>
        <DialogTitle>Edit Teacher</DialogTitle>
        <Divider style={{ margin: '8px 0' }} />
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField 
                label="Full Name" 
                fullWidth 
                required 
                value={editingTeacher?.fullName || ""} 
                onChange={(e) => setEditingTeacher({ ...editingTeacher, fullName: e.target.value })} 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                label="Email" 
                fullWidth 
                required 
                value={editingTeacher?.email || ""} 
                onChange={(e) => setEditingTeacher({ ...editingTeacher, email: e.target.value })} 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                label="Phone Number" 
                fullWidth 
                required 
                value={editingTeacher?.phoneNumber || ""} 
                onChange={(e) => setEditingTeacher({ ...editingTeacher, phoneNumber: e.target.value })} 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select 
                  value={editingTeacher?.gender || ""} 
                  onChange={(e) => setEditingTeacher({ ...editingTeacher, gender: e.target.value })}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Department</InputLabel>
                <Select
                  value={editingTeacher?.department?._id || ""}
                  onChange={(e) => setEditingTeacher({ ...editingTeacher, department: { _id: e.target.value } })}
                >
                  {branches.map((branch) => (
                    <MenuItem key={branch._id} value={branch._id}>{branch.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                label="Experience (Years)" 
                fullWidth 
                required 
                value={editingTeacher?.experience || ""} 
                onChange={(e) => setEditingTeacher({ ...editingTeacher, experience: e.target.value })} 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                label="kgId" 
                fullWidth 
                required 
                value={editingTeacher?.kgId || ""} 
                onChange={(e) => setEditingTeacher({ ...editingTeacher, kgId: e.target.value })} 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                label="Designation" 
                fullWidth 
                required 
                value={editingTeacher?.designation || ""} 
                onChange={(e) => setEditingTeacher({ ...editingTeacher, designation: e.target.value })} 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                label="Password" 
                type='password' 
                fullWidth 
                value={editingTeacher?.password || ""} 
                onChange={(e) => setEditingTeacher({ ...editingTeacher, password: e.target.value })} 
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={editingTeacher?.isHod || false} onChange={(e) => setEditingTeacher({ ...editingTeacher, isHod: e.target.checked })} />}
                label="Is HOD?"
              />
            </Grid>
            <Grid item xs={12}>
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => setEditingTeacher({ ...editingTeacher, profile: e.target.files[0] })} 
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setIsEditTeacherModalOpen(false);
            resetTeacherForm(); // Reset form when closing edit modal
          }}>Cancel</Button>
          <Button onClick={handleUpdateTeacher} variant="contained">Update</Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};