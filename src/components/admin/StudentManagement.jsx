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
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Added severity state

  const fetchStudents = async () => {
    try {
      const response = await api.get("/student");
      setStudents(response.data.data);
    } catch (error) {
      console.error("Error fetching students:", error.response?.data?.message || error.message);
    }
  };

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
  
      if (newStudent.profile) {
        formData.append("profile", newStudent.profile);
      }
  
      await api.post("/student/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      await fetchStudents();
      setSnackbarMessage("Student successfully added!");
      setSnackbarSeverity("success"); // Set severity to success
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
      setSnackbarMessage("Error adding student!");
      setSnackbarSeverity("error"); // Set severity to error
      setSnackbarOpen(true);
    }
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setIsEditStudentModalOpen(true);
  };

  const handleUpdateStudent = async () => {
    try {
      const formData = new FormData();
      
      formData.append("fullName", editingStudent.fullName);
      formData.append("email", editingStudent.email);
      formData.append("password", editingStudent.password || ""); // Optional field
      formData.append("registerNumber", editingStudent.registerNumber);
      formData.append("phoneNumber", editingStudent.phoneNumber);
      formData.append("semester", editingStudent.semester);
      formData.append("gender", editingStudent.gender);
  
      if (editingStudent.branch) {
        formData.append("branch", editingStudent.branch._id);
      }
  
      if (editingStudent.profile instanceof File) {
        formData.append("profile", editingStudent.profile);
      }
  
      await api.put(`/student/${editingStudent._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      setSnackbarMessage("Student successfully updated!");
      setSnackbarSeverity("success"); // Set severity to success
      setSnackbarOpen(true);
      fetchStudents();
      setIsEditStudentModalOpen(false);
      setEditingStudent(null); // Clear editing state
    } catch (error) {
      console.error("Error updating student:", error.response?.data?.message || error.message);
      setSnackbarMessage("Error updating student!");
      setSnackbarSeverity("error"); // Set severity to error
      setSnackbarOpen(true);
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await api.delete(`/student/${id}`);
      setSnackbarMessage("Student successfully deleted!");
      setSnackbarSeverity("success"); // Set severity to success
      setSnackbarOpen(true);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error.response?.data?.message || error.message);
      setSnackbarMessage("Error deleting student!");
      setSnackbarSeverity("error"); // Set severity to error
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

      {/* Add Student Dialog */}
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

      {/* Edit Student Dialog */}
      <Dialog open={isEditStudentModalOpen} onClose={() => setIsEditStudentModalOpen(false)}>
        <DialogTitle>Edit Student</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Full Name"
            fullWidth
            value={editingStudent?.fullName || ""}
            onChange={(e) => setEditingStudent({ ...editingStudent, fullName: e.target.value })}
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
          <FormControl fullWidth margin="dense">
            <InputLabel>Branch</InputLabel>
            <Select
              value={editingStudent?.branch || ""}
              onChange={(e) => setEditingStudent({ ...editingStudent, branch: e.target.value })}
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
              value={editingStudent?.gender || ""}
              onChange={(e) => setEditingStudent({ ...editingStudent, gender: e.target.value })}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <input type="file" accept="image/*" onChange={(e) => setEditingStudent({ ...editingStudent, profile: e.target.files[0] })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditStudentModalOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdateStudent} variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};