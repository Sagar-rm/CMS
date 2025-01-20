import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Typography, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material'
import { PlusCircle, Edit, Trash2 } from 'lucide-react'

export const CourseManagement = () => {
  const [courses, setCourses] = useState([
    { id: 1, name: 'Introduction to Computer Science', code: 'CS101', credits: 3, instructor: 'Dr. Alice Johnson' },
    { id: 2, name: 'Advanced Physics', code: 'PHY301', credits: 4, instructor: 'Prof. Bob Williams' },
  ])
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false)
  const [isEditCourseModalOpen, setIsEditCourseModalOpen] = useState(false)
  const [newCourse, setNewCourse] = useState({ name: '', code: '', credits: '', instructor: '' })
  const [editingCourse, setEditingCourse] = useState(null)

  const handleAddCourse = () => {
    if (newCourse.name && newCourse.code && newCourse.credits && newCourse.instructor) {
      setCourses([...courses, { ...newCourse, id: courses.length + 1 }])
      setIsAddCourseModalOpen(false)
      setNewCourse({ name: '', code: '', credits: '', instructor: '' })
    }
  }

  const handleEditCourse = (course) => {
    setEditingCourse(course)
    setIsEditCourseModalOpen(true)
  }

  const handleUpdateCourse = () => {
    if (editingCourse.name && editingCourse.code && editingCourse.credits && editingCourse.instructor) {
      setCourses(courses.map(c => c.id === editingCourse.id ? editingCourse : c))
      setIsEditCourseModalOpen(false)
      setEditingCourse(null)
    }
  }

  const handleDeleteCourse = (id) => {
    setCourses(courses.filter(c => c.id !== id))
  }

  return (
    <motion.div 
      className="p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <Typography variant="h5">Course Management</Typography>
        <Button 
          variant="contained" 
          startIcon={<PlusCircle />}
          onClick={() => setIsAddCourseModalOpen(true)}
        >
          Add Course
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Credits</TableCell>
              <TableCell>Instructor</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id} hover>
                <TableCell>{course.name}</TableCell>
                <TableCell>{course.code}</TableCell>
                <TableCell>{course.credits}</TableCell>
                <TableCell>{course.instructor}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleEditCourse(course)}><Edit /></IconButton>
                  <IconButton size="small" onClick={() => handleDeleteCourse(course.id)}><Trash2 /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog 
        open={isAddCourseModalOpen} 
        onClose={() => setIsAddCourseModalOpen(false)}
      >
        <DialogTitle>Add New Course</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Course Name"
            fullWidth
            value={newCourse.name}
            onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Course Code"
            fullWidth
            value={newCourse.code}
            onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Credits"
            type="number"
            fullWidth
            value={newCourse.credits}
            onChange={(e) => setNewCourse({ ...newCourse, credits: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Instructor"
            fullWidth
            value={newCourse.instructor}
            onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddCourseModalOpen(false)}>Cancel</Button>
          <Button onClick={handleAddCourse} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>

      <Dialog 
        open={isEditCourseModalOpen} 
        onClose={() => setIsEditCourseModalOpen(false)}
      >
        <DialogTitle>Edit Course</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Course Name"
            fullWidth
            value={editingCourse?.name || ''}
            onChange={(e) => setEditingCourse({ ...editingCourse, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Course Code"
            fullWidth
            value={editingCourse?.code || ''}
            onChange={(e) => setEditingCourse({ ...editingCourse, code: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Credits"
            type="number"
            fullWidth
            value={editingCourse?.credits || ''}
            onChange={(e) => setEditingCourse({ ...editingCourse, credits: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Instructor"
            fullWidth
            value={editingCourse?.instructor || ''}
            onChange={(e) => setEditingCourse({ ...editingCourse, instructor: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditCourseModalOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdateCourse} variant="contained">Update</Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  )
}

