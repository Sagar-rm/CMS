import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from '../../api/axios.js';
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
} from "@mui/material";
import { PlusCircle, Edit, Trash2 } from "lucide-react";

export const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [branches, setBranches] = useState([]);
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [isEditStudentModalOpen, setIsEditStudentModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    fullName: "",
    email: "",
    password: "",
    registerNumber: "",
    phoneNumber: "",
    semester: "",
    branch: "",
    gender: "",
    profile: null
  });
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get("/student");
        console.log(response.data.data)
        setStudents(response.data.data); // Assuming the response structure has `data` with students
      } catch (error) {
        console.error("Error fetching students:", error.response?.data?.message || error.message);
      }
    };

    const fetchBranches = async () => {
      try {
        const response = await api.get("/branch");
        setBranches(response.data.data); // Assuming the response structure has `data` with branches
      } catch (error) {
        console.error("Error fetching branches:", error.response?.data?.message || error.message);
      }
    };

    fetchStudents();
    fetchBranches();
  }, []);

  const handleAddStudent = async () => {
    try {
      const formData = new FormData();
      formData.append("fullName", newStudent.fullName);
      formData.append("email", newStudent.email);
      formData.append("password", newStudent.password);
      formData.append("registerNumber", newStudent.registerNumber);
      formData.append("phoneNumber", newStudent.phoneNumber);
      formData.append("semester", newStudent.semester);
      formData.append("branch", newStudent.branch._id);
      formData.append("gender", newStudent.gender);
      
      // Only append profile image if it's selected
      if (newStudent.profile) {
        formData.append("profile", newStudent.profile);
      }
  
      const response = await api.post('/student/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Important for file uploads
        },
      });
  
      setStudents([...students, response.data]);
      setIsAddStudentModalOpen(false);
      setNewStudent({
        fullName: "",
        email: "",
        password: "",
        registerNumber: "",
        phoneNumber: "",
        semester: "",
        branch: "",
        gender: "",
        profile: null
      });
    } catch (error) {
      console.error("Error adding student:", error.response?.data?.message || error.message);
    }
  };
    const handleEditStudent = (student) => {
    setEditingStudent(student);
    setIsEditStudentModalOpen(true);
  };

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
      setStudents(students.map((s) => (s.id === editingStudent.id ? editingStudent : s)));
      setIsEditStudentModalOpen(false);
      setEditingStudent(null);
    }
  };

  const handleDeleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

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
              <TableRow key={student._id} hover>
                <TableCell>{student.fullName}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.registerNumber}</TableCell>
                <TableCell>{student.phoneNumber}</TableCell>
                <TableCell>{student.semester}</TableCell>
                <TableCell>{student.branch?.name}</TableCell>
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
    label="Full Name"
    fullWidth
    value={newStudent.fullName}
    onChange={(e) => setNewStudent({ ...newStudent, fullName: e.target.value })}
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
    label="Password"
    type="password"
    fullWidth
    value={newStudent.password}
    onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
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

  <FormControl fullWidth margin="dense">
    <InputLabel>Branch</InputLabel>
    <Select
      value={newStudent.branch}
      onChange={(e) => setNewStudent({ ...newStudent, branch: e.target.value })}
    >
      {branches.map((branch) => (
        <MenuItem key={branch.id} value={branch}>
          {branch.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>

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


<input type="file" accept="image/*" onChange={(e) => setNewStudent({ ...newStudent, profile: e.target.files[0] })} />
        </DialogContent>


        <DialogActions>
          <Button onClick={() => setIsAddStudentModalOpen(false)}>Cancel</Button>
          <Button onClick={handleAddStudent} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};
