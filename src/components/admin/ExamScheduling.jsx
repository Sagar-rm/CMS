import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Typography, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material'
import { PlusCircle, Edit, Trash2 } from 'lucide-react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

export const ExamScheduling = () => {
  const [exams, setExams] = useState([
    { id: 1, course: 'Mathematics', date: new Date('2023-06-15'), time: '10:00 AM', duration: '3 hours', location: 'Hall A' },
    { id: 2, course: 'Physics', date: new Date('2023-06-17'), time: '2:00 PM', duration: '2 hours', location: 'Hall B' },
  ])
  const [isAddExamModalOpen, setIsAddExamModalOpen] = useState(false)
  const [isEditExamModalOpen, setIsEditExamModalOpen] = useState(false)
  const [newExam, setNewExam] = useState({ course: '', date: null, time: null, duration: '', location: '' })
  const [editingExam, setEditingExam] = useState(null)

  const handleAddExam = () => {
    if (newExam.course && newExam.date && newExam.time && newExam.duration && newExam.location) {
      setExams([...exams, { ...newExam, id: exams.length + 1 }])
      setIsAddExamModalOpen(false)
      setNewExam({ course: '', date: null, time: null, duration: '', location: '' })
    }
  }

  const handleEditExam = (exam) => {
    setEditingExam(exam)
    setIsEditExamModalOpen(true)
  }

  const handleUpdateExam = () => {
    if (editingExam.course && editingExam.date && editingExam.time && editingExam.duration && editingExam.location) {
      setExams(exams.map(e => e.id === editingExam.id ? editingExam : e))
      setIsEditExamModalOpen(false)
      setEditingExam(null)
    }
  }

  const handleDeleteExam = (id) => {
    setExams(exams.filter(e => e.id !== id))
  }

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
                <TableCell>Course</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exams.map((exam) => (
                <TableRow key={exam.id} hover>
                  <TableCell>{exam.course}</TableCell>
                  <TableCell>{exam.date.toLocaleDateString()}</TableCell>
                  <TableCell>{exam.time}</TableCell>
                  <TableCell>{exam.duration}</TableCell>
                  <TableCell>{exam.location}</TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={() => handleEditExam(exam)}><Edit /></IconButton>
                    <IconButton size="small" onClick={() => handleDeleteExam(exam.id)}><Trash2 /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog 
          open={isAddExamModalOpen} 
          onClose={() => setIsAddExamModalOpen(false)}
        >
          <DialogTitle>Schedule New Exam</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Course"
              fullWidth
              value={newExam.course}
              onChange={(e) => setNewExam({ ...newExam, course: e.target.value })}
            />
            <DatePicker
              label="Date"
              value={newExam.date}
              onChange={(newValue) => setNewExam({ ...newExam, date: newValue })}
              renderInput={(params) => <TextField {...params} fullWidth margin="dense" />}
            />
            <TimePicker
              label="Time"
              value={newExam.time}
              onChange={(newValue) => setNewExam({ ...newExam, time: newValue })}
              renderInput={(params) => <TextField {...params} fullWidth margin="dense" />}
            />
            <TextField
              margin="dense"
              label="Duration"
              fullWidth
              value={newExam.duration}
              onChange={(e) => setNewExam({ ...newExam, duration: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Location"
              fullWidth
              value={newExam.location}
              onChange={(e) => setNewExam({ ...newExam, location: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsAddExamModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAddExam} variant="contained">Schedule</Button>
          </DialogActions>
        </Dialog>

        <Dialog 
          open={isEditExamModalOpen} 
          onClose={() => setIsEditExamModalOpen(false)}
        >
          <DialogTitle>Edit Exam Schedule</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Course"
              fullWidth
              value={editingExam?.course || ''}
              onChange={(e) => setEditingExam({ ...editingExam, course: e.target.value })}
            />
            <DatePicker
              label="Date"
              value={editingExam?.date}
              onChange={(newValue) => setEditingExam({ ...editingExam, date: newValue })}
              renderInput={(params) => <TextField {...params} fullWidth margin="dense" />}
            />
            <TimePicker
              label="Time"
              value={editingExam?.time}
              onChange={(newValue) => setEditingExam({ ...editingExam, time: newValue })}
              renderInput={(params) => <TextField {...params} fullWidth margin="dense" />}
            />
            <TextField
              margin="dense"
              label="Duration"
              fullWidth
              value={editingExam?.duration || ''}
              onChange={(e) => setEditingExam({ ...editingExam, duration: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Location"
              fullWidth
              value={editingExam?.location || ''}
              onChange={(e) => setEditingExam({ ...editingExam, location: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsEditExamModalOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateExam} variant="contained">Update</Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </LocalizationProvider>
  )
}

