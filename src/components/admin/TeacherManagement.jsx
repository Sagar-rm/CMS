import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Typography, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import api from '../../api/axios.js';

export const TeacherManagement = () => {
  const [teachers, setTeachers] = useState([]);
  const [branches, setBranches] = useState([]); // Stores branch options
  const [isAddTeacherModalOpen, setIsAddTeacherModalOpen] = useState(false);
  const [newTeacher, setNewTeacher] = useState({
    kgId: '', fullName: '', email: '', department: '', phoneNumber: '', gender: '', experience: '', designation: '', isHod: false, profile: '', password: ''
  });
  const [editingTeacher, setEditingTeacher] = useState(null);

  useEffect(() => {
    fetchTeachers();
    fetchBranches(); // Fetch branch options on mount
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await api.get('/admin');
      console.log(response.data)
      setTeachers(response.data.data);
    } catch (error) {
      console.error('Error fetching teachers:', error.response?.data?.message || error.message);
    }
  };

  const fetchBranches = async () => {
    try {
      const response = await api.get('/branch');
      setBranches(response.data); // Assuming API returns { data: [branch1, branch2, ...] }
    } catch (error) {
      console.error('Error fetching branches:', error.response?.data?.message || error.message);
    }
  };

  const handleAddTeacher = async () => {
    try {
      await api.post('/admin/register/', newTeacher);
      fetchTeachers(); // Refresh teacher list
      setIsAddTeacherModalOpen(false);
      setNewTeacher({ kgId: '', fullName: '', email: '', department: '', phoneNumber: '', gender: '', experience: '', designation: '', isHod: false, profile: '', password: '' });
    } catch (error) {
      console.error('Error adding teacher:', error.response?.data?.message || error.message);
    }
  };

  return (
    <motion.div className="p-6 space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="flex justify-between items-center">
        <Typography variant="h5">Teacher Management</Typography>
        <Button variant="contained" startIcon={<PlusCircle />} onClick={() => setIsAddTeacherModalOpen(true)}>
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
                  <IconButton size="small" onClick={() => setEditingTeacher(teacher)}><Edit /></IconButton>
                  <IconButton size="small" onClick={() => handleDeleteTeacher(teacher._id)}><Trash2 /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={isAddTeacherModalOpen} onClose={() => setIsAddTeacherModalOpen(false)}>
        <DialogTitle>{editingTeacher ? "Edit Teacher" : "Add New Teacher"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="Full Name" fullWidth value={newTeacher.fullName} onChange={(e) => setNewTeacher({ ...newTeacher, fullName: e.target.value })} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Email" fullWidth value={newTeacher.email} onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Phone Number" fullWidth type="number" value={newTeacher.phoneNumber} onChange={(e) => setNewTeacher({ ...newTeacher, phoneNumber: e.target.value })} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select value={newTeacher.gender} onChange={(e) => setNewTeacher({ ...newTeacher, gender: e.target.value })}>
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
              <TextField label="Experience (Years)" fullWidth type="number" value={newTeacher.experience} onChange={(e) => setNewTeacher({ ...newTeacher, experience: e.target.value })} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="kgId" fullWidth type="number" value={newTeacher.kgId} onChange={(e) => setNewTeacher({ ...newTeacher, kgId: e.target.value })} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Designation" fullWidth value={newTeacher.designation} onChange={(e) => setNewTeacher({ ...newTeacher, designation: e.target.value })} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Password" type='password' fullWidth value={newTeacher.password} onChange={(e) => setNewTeacher({ ...newTeacher, password: e.target.value })} />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={newTeacher.isHod} onChange={(e) => setNewTeacher({ ...newTeacher, isHod: e.target.checked })} />}
                label="Is HOD?"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Profile URL" fullWidth value={newTeacher.profile} onChange={(e) => setNewTeacher({ ...newTeacher, profile: e.target.value })} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddTeacherModalOpen(false)}>Cancel</Button>
          <Button onClick={handleAddTeacher} variant="contained">{editingTeacher ? "Update" : "Add"}</Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};
