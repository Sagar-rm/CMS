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
  Snackbar,
  Alert,
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
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // 🔹 Define fetchStudents outside useEffect
  const fetchStudents = async () => {
    try {
      const response = await api.get("/student");
      setStudents(response.data.data); // Ensure data structure matches API response
    } catch (error) {
      console.error("Error fetching students:", error.response?.data?.message || error.message);
    }
  };

  // 🔹 Define fetchBranches outside useEffect
  const fetchBranches = async () => {
    try {
      const response = await api.get("/branch");
      setBranches(response.data.data);
    } catch (error) {
      console.error("Error fetching branches:", error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
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
  
      // Append profile image if selected
      if (newStudent.profile) {
        formData.append("profile", newStudent.profile);
      }
  
      await api.post("/student/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      // Refresh student list after successful creation
      await fetchStudents();
      setSnackbarMessage("Student successfully added!");
      setSnackbarOpen(true);
  
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
        profile: null,
      });
    } catch (error) {
      console.error("Error adding student:", error.response?.data?.message || error.message);
    }
  };
  

  const handleEditStudent = (student) => {
    setEditingStudent(student); // Set the student data into editing state
    setIsEditStudentModalOpen(true); // Open the edit modal
  };
  

  const handleUpdateStudent = async () => {
    try {
      const formData = new FormData();
      
      // Loop through the entries of editingStudent to append all values to formData
      Object.entries(editingStudent).forEach(([key, value]) => {
        if (value && key !== "branch") {
          formData.append(key, value);
        }
      });
  
      // Add branch separately, using the _id if it is selected
      if (editingStudent.branch) {
        formData.append("branch", editingStudent.branch._id);
      }
  
      // If profile image is being updated, append the new profile image
      if (editingStudent.profile) {
        formData.append("profile", editingStudent.profile);
      }
  
      // Send PUT request to update the student
      await api.put(`/student/${editingStudent._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      setSnackbarMessage("Student successfully updated!");
      setSnackbarOpen(true);
      fetchStudents();
      setIsEditStudentModalOpen(false);
    } catch (error) {
      console.error("Error updating student:", error.response?.data?.message || error.message);
    }
  };
    

  const handleDeleteStudent = async (id) => {
    try {
      await api.delete(`/student/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error.response?.data?.message || error.message);
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
                  <IconButton size="small" onClick={() => handleDeleteStudent(student._id)}>
                    <Trash2 />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Snackbar for Success/Error */}
      <div className={`fixed bottom-0 right-0 m-6 p-4 rounded-lg shadow-lg ${snackbarMessage.includes("success") ? "bg-green-500" : "bg-red-500"}`}>
        <div className="text-white font-bold">{snackbarMessage}</div>
      </div>


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
