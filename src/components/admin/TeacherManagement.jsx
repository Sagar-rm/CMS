// import React,```tsx file="components/TeacherManagement.tsx"
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Typography, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material'
import { PlusCircle, Edit, Trash2 } from 'lucide-react'

export const TeacherManagement = () => {
  const [teachers, setTeachers] = useState([
    { id: 1, name: 'Dr. Alice Johnson', email: 'alice@example.com', subject: 'Mathematics', experience: '10 years' },
    { id: 2, name: 'Prof. Bob Williams', email: 'bob@example.com', subject: 'Physics', experience: '15 years' },
  ])
  const [isAddTeacherModalOpen, setIsAddTeacherModalOpen] = useState(false)
  const [isEditTeacherModalOpen, setIsEditTeacherModalOpen] = useState(false)
  const [newTeacher, setNewTeacher] = useState({ name: '', email: '', subject: '', experience: '' })
  const [editingTeacher, setEditingTeacher] = useState(null)

  const handleAddTeacher = () => {
    if (newTeacher.name && newTeacher.email && newTeacher.subject && newTeacher.experience) {
      setTeachers([...teachers, { ...newTeacher, id: teachers.length + 1 }])
      setIsAddTeacherModalOpen(false)
      setNewTeacher({ name: '', email: '', subject: '', experience: '' })
    }
  }

  const handleEditTeacher = (teacher) => {
    setEditingTeacher(teacher)
    setIsEditTeacherModalOpen(true)
  }

  const handleUpdateTeacher = () => {
    if (editingTeacher.name && editingTeacher.email && editingTeacher.subject && editingTeacher.experience) {
      setTeachers(teachers.map(t => t.id === editingTeacher.id ? editingTeacher : t))
      setIsEditTeacherModalOpen(false)
      setEditingTeacher(null)
    }
  }

  const handleDeleteTeacher = (id) => {
    setTeachers(teachers.filter(t => t.id !== id))
  }

  return (
    <motion.div 
      className="p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <Typography variant="h5">Teacher Management</Typography>
        <Button 
          variant="contained" 
          startIcon={<PlusCircle />}
          onClick={() => setIsAddTeacherModalOpen(true)}
        >
          Add Teacher
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Experience</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.map((teacher) => (
              <TableRow key={teacher.id} hover>
                <TableCell>{teacher.name}</TableCell>
                <TableCell>{teacher.email}</TableCell>
                <TableCell>{teacher.subject}</TableCell>
                <TableCell>{teacher.experience}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleEditTeacher(teacher)}><Edit /></IconButton>
                  <IconButton size="small" onClick={() => handleDeleteTeacher(teacher.id)}><Trash2 /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog 
        open={isAddTeacherModalOpen} 
        onClose={() => setIsAddTeacherModalOpen(false)}
      >
        <DialogTitle>Add New Teacher</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={newTeacher.name}
            onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={newTeacher.email}
            onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Subject"
            fullWidth
            value={newTeacher.subject}
            onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Experience"
            fullWidth
            value={newTeacher.experience}
            onChange={(e) => setNewTeacher({ ...newTeacher, experience: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddTeacherModalOpen(false)}>Cancel</Button>
          <Button onClick={handleAddTeacher} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>

      <Dialog 
        open={isEditTeacherModalOpen} 
        onClose={() => setIsEditTeacherModalOpen(false)}
      >
        <DialogTitle>Edit Teacher</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={editingTeacher?.name || ''}
            onChange={(e) => setEditingTeacher({ ...editingTeacher, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={editingTeacher?.email || ''}
            onChange={(e) => setEditingTeacher({ ...editingTeacher, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Subject"
            fullWidth
            value={editingTeacher?.subject || ''}
            onChange={(e) => setEditingTeacher({ ...editingTeacher, subject: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Experience"
            fullWidth
            value={editingTeacher?.experience || ''}
            onChange={(e) => setEditingTeacher({ ...editingTeacher, experience: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditTeacherModalOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdateTeacher} variant="contained">Update</Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  )
}

