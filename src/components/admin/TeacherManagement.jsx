import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Typography, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import api from '../../api/axios.js';

export const TeacherManagement = () => {
  const [teachers, setTeachers] = useState([]);
  const [isAddTeacherModalOpen, setIsAddTeacherModalOpen] = useState(false);
  const [isEditTeacherModalOpen, setIsEditTeacherModalOpen] = useState(false);
  const [newTeacher, setNewTeacher] = useState({ fullName: '', email: '', department: '', experience: '', designation: '' });
  const [editingTeacher, setEditingTeacher] = useState(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await api.get('/admin');
      //console.log(response.data.data)
      setTeachers(response.data.data);
    } catch (error) {
      console.error('Error fetching teachers:', error.response?.data?.message || error.message);
    }
  };

  const handleAddTeacher = async () => {
    try {
      const response = await api.post('/admin', newTeacher);
      setTeachers([...teachers, response.data]);
      setIsAddTeacherModalOpen(false);
      setNewTeacher({ fullName: '', email: '', department: '', experience: '', designation: '' });
    } catch (error) {
      console.error('Error adding teacher:', error.response?.data?.message || error.message);
    }
  };

  const handleEditTeacher = (teacher) => {
    setEditingTeacher(teacher);
    setIsEditTeacherModalOpen(true);
  };

  const handleUpdateTeacher = async () => {
    try {
      await api.put(`/admin/${editingTeacher._id}`, editingTeacher);
      setTeachers(teachers.map(t => (t._id === editingTeacher._id ? editingTeacher : t)));
      setIsEditTeacherModalOpen(false);
      setEditingTeacher(null);
    } catch (error) {
      console.error('Error updating teacher:', error.response?.data?.message || error.message);
    }
  };

  const handleDeleteTeacher = async (id) => {
    try {
      await api.delete(`/admin/${id}`);
      setTeachers(teachers.filter(t => t._id !== id));
    } catch (error) {
      console.error('Error deleting teacher:', error.response?.data?.message || error.message);
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
                  <IconButton size="small" onClick={() => handleEditTeacher(teacher)}><Edit /></IconButton>
                  <IconButton size="small" onClick={() => handleDeleteTeacher(teacher._id)}><Trash2 /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={isAddTeacherModalOpen} onClose={() => setIsAddTeacherModalOpen(false)}>
        <DialogTitle>Add New Teacher</DialogTitle>
        <DialogContent>
          <TextField label="Full Name" fullWidth value={newTeacher.fullName} onChange={(e) => setNewTeacher({ ...newTeacher, fullName: e.target.value })} />
          <TextField label="Email" fullWidth value={newTeacher.email} onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })} />
          <TextField label="Department" fullWidth value={newTeacher.department} onChange={(e) => setNewTeacher({ ...newTeacher, department: e.target.value })} />
          <TextField label="Experience" fullWidth value={newTeacher.experience} onChange={(e) => setNewTeacher({ ...newTeacher, experience: e.target.value })} />
          <TextField label="Designation" fullWidth value={newTeacher.designation} onChange={(e) => setNewTeacher({ ...newTeacher, designation: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddTeacherModalOpen(false)}>Cancel</Button>
          <Button onClick={handleAddTeacher} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};
