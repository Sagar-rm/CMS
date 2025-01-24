import React, { useState } from "react"
import { motion } from "framer-motion"
import api from '../api/axios';
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material"
import { PlusCircle, Edit, Trash2 } from "lucide-react"

export const StudentManagement = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      course: "Computer Science",
      year: "2nd Year",
      registerNumber: "CS001",
      phoneNumber: "1234567890",
      semester: 3,
      branch: "Computer Science",
      gender: "Male",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      course: "Business Administration",
      year: "1st Year",
      registerNumber: "BA001",
      phoneNumber: "9876543210",
      semester: 1,
      branch: "Business",
      gender: "Female",
    },
  ])
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false)
  const [isEditStudentModalOpen, setIsEditStudentModalOpen] = useState(false)
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    course: "",
    year: "",
    registerNumber: "",
    phoneNumber: "",
    semester: "",
    branch: "",
    gender: "",
  })
  const [editingStudent, setEditingStudent] = useState(null)

  const handleAddStudent = () => {
    try {
      console.log('Adding student:', newBook);
      const response =  api.post('/', newBook);
      setBooks([...books, response.data.data]);
      setIsAddingBook(false);
      setSnackbar({ open: true, message: 'Book added successfully', severity: 'success' });
      return response.data;
    } catch (error) {
      console.error('Error adding book:', error);
      setSnackbar({ open: true, message: `Error adding book: ${error.response?.data?.message || error.message}`, severity: 'error' });
      throw error;
    }
  }

  const handleEditStudent = (student) => {
    setEditingStudent(student)
    setIsEditStudentModalOpen(true)
  }

  const handleUpdateStudent = () => {
    if (
      editingStudent.name &&
      editingStudent.email &&
      editingStudent.course &&
      editingStudent.year &&
      editingStudent.registerNumber &&
      editingStudent.phoneNumber &&
      editingStudent.semester &&
      editingStudent.branch &&
      editingStudent.gender
    ) {
      setStudents(students.map((s) => (s.id === editingStudent.id ? editingStudent : s)))
      setIsEditStudentModalOpen(false)
      setEditingStudent(null)
    }
  }

  const handleDeleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id))
  }

  return (
    <motion.div
      className="p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <Typography variant="h5">Student Management</Typography>
        <Button variant="contained" startIcon={<PlusCircle />} onClick={() => setIsAddStudentModalOpen(true)}>
          Add Student
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Register Number</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Semester</TableCell>
              <TableCell>Branch</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id} hover>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.course}</TableCell>
                <TableCell>{student.year}</TableCell>
                <TableCell>{student.registerNumber}</TableCell>
                <TableCell>{student.phoneNumber}</TableCell>
                <TableCell>{student.semester}</TableCell>
                <TableCell>{student.branch}</TableCell>
                <TableCell>{student.gender}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleEditStudent(student)}>
                    <Edit />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDeleteStudent(student.id)}>
                    <Trash2 />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={isAddStudentModalOpen} onClose={() => setIsAddStudentModalOpen(false)}>
        <DialogTitle>Add New Student</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={newStudent.email}
            onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Course"
            fullWidth
            value={newStudent.course}
            onChange={(e) => setNewStudent({ ...newStudent, course: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Year"
            fullWidth
            value={newStudent.year}
            onChange={(e) => setNewStudent({ ...newStudent, year: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Register Number"
            fullWidth
            value={newStudent.registerNumber}
            onChange={(e) => setNewStudent({ ...newStudent, registerNumber: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Phone Number"
            fullWidth
            value={newStudent.phoneNumber}
            onChange={(e) => setNewStudent({ ...newStudent, phoneNumber: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Semester"
            type="number"
            fullWidth
            value={newStudent.semester}
            onChange={(e) => setNewStudent({ ...newStudent, semester: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Branch"
            fullWidth
            value={newStudent.branch}
            onChange={(e) => setNewStudent({ ...newStudent, branch: e.target.value })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Gender</InputLabel>
            <Select
              value={newStudent.gender}
              onChange={(e) => setNewStudent({ ...newStudent, gender: e.target.value })}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddStudentModalOpen(false)}>Cancel</Button>
          <Button onClick={handleAddStudent} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isEditStudentModalOpen} onClose={() => setIsEditStudentModalOpen(false)}>
        <DialogTitle>Edit Student</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={editingStudent?.name || ""}
            onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={editingStudent?.email || ""}
            onChange={(e) => setEditingStudent({ ...editingStudent, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Course"
            fullWidth
            value={editingStudent?.course || ""}
            onChange={(e) => setEditingStudent({ ...editingStudent, course: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Year"
            fullWidth
            value={editingStudent?.year || ""}
            onChange={(e) => setEditingStudent({ ...editingStudent, year: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Register Number"
            fullWidth
            value={editingStudent?.registerNumber || ""}
            onChange={(e) => setEditingStudent({ ...editingStudent, registerNumber: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Phone Number"
            fullWidth
            value={editingStudent?.phoneNumber || ""}
            onChange={(e) => setEditingStudent({ ...editingStudent, phoneNumber: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Semester"
            type="number"
            fullWidth
            value={editingStudent?.semester || ""}
            onChange={(e) => setEditingStudent({ ...editingStudent, semester: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Branch"
            fullWidth
            value={editingStudent?.branch || ""}
            onChange={(e) => setEditingStudent({ ...editingStudent, branch: e.target.value })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Gender</InputLabel>
            <Select
              value={editingStudent?.gender || ""}
              onChange={(e) => setEditingStudent({ ...editingStudent, gender: e.target.value })}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditStudentModalOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdateStudent} variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  )
}

