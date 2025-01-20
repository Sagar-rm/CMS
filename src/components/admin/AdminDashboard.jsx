'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMediaQuery } from '@mui/material';
import { Book, Calendar, CheckCircle, Clock, Download, FileText, Bell, User, LogOut, Home, Award, Users, BookOpen, Activity, MessageCircle, Settings, Heart, Star, MenuIcon, ChevronLeft, Zap, Target, Briefcase, DollarSign, PlusCircle, Trash2, Edit, Save, Search } from 'lucide-react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { UserPlus } from 'lucide-react';

import { 
  // ... (existing imports)
  Collapse,
  FormControlLabel,
  List,
  CssBaseline,
  Fab,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  Switch,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Card,
  CardContent,
  
} from '@mui/material'
// import { FileText } from 'lucide-react'
// import { motion } from 'framer-motion';
// import { useState } from 'react';

// Importing MUI components
import { 
  AppBar, Toolbar, IconButton, Drawer, Avatar, Snackbar, Alert, LinearProgress, Box, Tab, Tabs, ListItemButton
} from '@mui/material'

// Importing Recharts for data visualization
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'


// Custom theme with a more vibrant color palette
const theme = createTheme({
  palette: {
    primary: {
      main: '#6C63FF', // Vibrant purple
    },
    secondary: {
      main: '#FF6584', // Coral pink
    },
    tertiary: {
      main: '#4ECDC4', // Teal
    },
    background: {
      default: '#F7FAFC',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 30px 0 rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 600,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 10px 0 rgba(0,0,0,0.1)',
          },
        },
      },
    },
  },
});

// Custom hook for animations
const useAnimatedEntry = (delay = 0) => {
  return {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }
  }
};

// Custom hook for fetching data (simulated)
const useDataFetching = (dataType) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulated data (unchanged)
      const simulatedData = {
        // ... (keep the existing simulated data)
      };

      setData(simulatedData[dataType]);
      setLoading(false);
    };

    fetchData();
  }, [dataType]);

  return { data, loading };
};

const EnhancedAdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [mobileOpen, setMobileOpen] = useState(false)
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const sections = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: Home },
    { id: 'student-details', label: 'Student Details', icon: Users },
    { id: 'students', label: 'Student Management', icon: Users },
    { id: 'teachers', label: 'Teacher Management', icon: User },
    { id: 'courses', label: 'Course Management', icon: BookOpen },
    { id: 'branches', label: 'Branch Management', icon: Briefcase },
    { id: 'exams', label: 'Exam Scheduling', icon: Calendar },
    { id: 'reports', label: 'Reports & Analytics', icon: Activity },
    { id: 'finance', label: 'Financial Management', icon: DollarSign },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ]

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId)
    if (isMobile) {
      setMobileOpen(false)
    }
  }

  const drawer = (
    <Box sx={{ bgcolor: 'background.default', height: '100%' }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700, color: 'primary.main' }}>
          EduPulse
        </Typography>
      </Toolbar>
      <List>
        {sections.map((section) => (
          <ListItem 
            key={section.id} 
            disablePadding
            onClick={() => handleSectionChange(section.id)}
          >
            <ListItemButton
              selected={activeSection === section.id}
              sx={{
                borderRadius: '0 25px 25px 0',
                mr: 2,
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  '& .MuiListItemIcon-root': {
                    color: 'primary.contrastText',
                  },
                },
                '&:hover': {
                  bgcolor: 'primary.light',
                },
              }}
            >
              <ListItemIcon>
                <section.icon />
              </ListItemIcon>
              <ListItemText primary={section.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${240}px)` },
            ml: { sm: `${240}px` },
            bgcolor: 'background.default',
            boxShadow: 'none',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, color: 'text.primary' }}>
              {sections.find(section => section.id === activeSection)?.label}
            </Typography>
            <IconButton color="primary">
              <Bell />
            </IconButton>
            <IconButton color="primary">
              <LogOut />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${240}px)` },
            mt: ['48px', '56px', '64px'],
            overflowX: 'hidden',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeSection === 'dashboard' && <DashboardOverview />}
              {activeSection === 'student-details' && <StudentDetails />}
              {activeSection === 'students' && <StudentManagement />}
              {activeSection === 'teachers' && <TeacherManagement />}
              {activeSection === 'courses' && <CourseManagement />}
              {activeSection === 'branches' && <BranchManagement />}
              {activeSection === 'exams' && <ExamScheduling />}
              {activeSection === 'reports' && <ReportsAnalytics />}
              {activeSection === 'finance' && <FinancialManagement />}
              {activeSection === 'settings' && <SystemSettings />}
            </motion.div>
                      </AnimatePresence>
                    </Box>
                    <Tooltip title="Quick Actions" placement="left">
                      <Fab 
                        color="secondary" 
                        aria-label="quick actions"
                        sx={{ 
                          position: 'fixed', 
                          bottom: 16, 
                          right: 16,
                          '&:hover': {
                            transform: 'scale(1.1)',
                          },
                          transition: 'all 0.3s ease-in-out',
                        }}
                      >
                        <Zap />
                      </Fab>
                    </Tooltip>
                  </Box>
                </ThemeProvider>
              );
            };

const DashboardOverview = ({ showSnackbar }) => {
  const chartData = [
    { name: 'Jan', students: 400, courses: 240, exams: 100 },
    { name: 'Feb', students: 300, courses: 139, exams: 80 },
    { name: 'Mar', students: 200, courses: 980, exams: 200 },
    { name: 'Apr', students: 278, courses: 390, exams: 150 },
    { name: 'May', students: 189, courses: 480, exams: 120 },
  ]

  const pieData = [
    { name: 'Students', value: 400 },
    { name: 'Teachers', value: 300 },
    { name: 'Courses', value: 300 },
    { name: 'Exams', value: 200 },
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  return (
    <motion.div 
      className="p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard title="Total Students" value="1,234" icon={<Users />} color="#704cd1" />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard title="Active Courses" value="56" icon={<BookOpen />} color="#2e968b" />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard title="Upcoming Exams" value="12" icon={<Calendar />} color="#d7205d" />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard title="Total Teachers" value="89" icon={<UserPlus />} color="#ffa500" />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Monthly Overview</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="students" fill="#704cd1" />
                  <Bar dataKey="courses" fill="#2e968b" />
                  <Bar dataKey="exams" fill="#d7205d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Distribution</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </motion.div>
  )
}

const StatCard = ({ title, value, icon, color }) => (
  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
    <Card>
      <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <Typography color="textSecondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4">
            {value}
          </Typography>
        </div>
        <Avatar sx={{ bgcolor: color, width: 56, height: 56 }}>
          {icon}
        </Avatar>
      </CardContent>
    </Card>
  </motion.div>
)



const StudentDetails = ({ showSnackbar }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  const students = [
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john@example.com', 
      regNo: 'CS2023001', 
      course: 'Computer Science', 
      semester: '3rd', 
      branch: 'Computer Science', 
      year: '2nd Year',
      academicResults: [
        { subject: 'Data Structures', grade: 'A' },
        { subject: 'Algorithms', grade: 'B+' },
        { subject: 'Database Management', grade: 'A-' },
      ],
      documents: [
        { name: 'Birth Certificate', url: '#' },
        { name: 'High School Diploma', url: '#' },
      ]
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      email: 'jane@example.com', 
      regNo: 'EE2023002', 
      course: 'Electrical Engineering', 
      semester: '2nd', 
      branch: 'Electrical Engineering', 
      year: '1st Year',
      academicResults: [
        { subject: 'Circuit Theory', grade: 'A-' },
        { subject: 'Digital Electronics', grade: 'B' },
        { subject: 'Electromagnetic Fields', grade: 'B+' },
      ],
      documents: [
        { name: 'Birth Certificate', url: '#' },
        { name: 'High School Diploma', url: '#' },
      ]
    },
    { 
      id: 3, 
      name: 'Mike Johnson', 
      email: 'mike@example.com', 
      regNo: 'ME2023003', 
      course: 'Mechanical Engineering', 
      semester: '4th', 
      branch: 'Mechanical Engineering', 
      year: '2nd Year',
      academicResults: [
        { subject: 'Thermodynamics', grade: 'A' },
        { subject: 'Fluid Mechanics', grade: 'A-' },
        { subject: 'Machine Design', grade: 'B+' },
      ],
      documents: [
        { name: 'Birth Certificate', url: '#' },
        { name: 'High School Diploma', url: '#' },
      ]
    },
  ];

  const filteredStudents = students.filter(student =>
    (student.regNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedSemester === '' || student.semester === selectedSemester) &&
    (selectedBranch === '' || student.branch === selectedBranch)
  );

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setIsDetailsVisible(false);
  };

  const handleCloseDetails = () => {
    setSelectedStudent(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <Typography variant="h5" className="mb-6">
        Student Details
      </Typography>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <TextField
          fullWidth
          placeholder="Search by Reg. No. or Name"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <Search className="mr-2 text-gray-400" />
            ),
          }}
        />
        <FormControl fullWidth>
          <InputLabel>Semester</InputLabel>
          <Select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            label="Semester"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="1st">1st</MenuItem>
            <MenuItem value="2nd">2nd</MenuItem>
            <MenuItem value="3rd">3rd</MenuItem>
            <MenuItem value="4th">4th</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Branch</InputLabel>
          <Select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            label="Branch"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Computer Science">Computer Science</MenuItem>
            <MenuItem value="Electrical Engineering">Electrical Engineering</MenuItem>
            <MenuItem value="Mechanical Engineering">Mechanical Engineering</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="cursor-pointer hover:shadow-lg transition-shadow duration-300">
            <CardContent onClick={() => handleStudentClick(student)}>
              <Typography variant="h6">{student.name}</Typography>
              <Typography color="textSecondary">Reg. No: {student.regNo}</Typography>
              <Typography color="textSecondary">{student.course}</Typography>
              <Typography color="textSecondary">{student.semester} Semester</Typography>
              <Typography color="textSecondary">{student.branch}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedStudent && (
        <Dialog
          open={true}
          onClose={handleCloseDetails}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            <div className="flex justify-between items-center">
              <Typography variant="h6">{selectedStudent.name}'s Details</Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={isDetailsVisible}
                    onChange={(e) => setIsDetailsVisible(e.target.checked)}
                    color="primary"
                  />
                }
                label="Show Details"
              />
            </div>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Registration Number:</strong> {selectedStudent.regNo}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Email:</strong> {selectedStudent.email}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Course:</strong> {selectedStudent.course}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Year:</strong> {selectedStudent.year}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Semester:</strong> {selectedStudent.semester}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Branch:</strong> {selectedStudent.branch}</Typography>
              </Grid>
            </Grid>

            <Collapse in={isDetailsVisible}>
              <Typography variant="h6" className="mt-4 mb-2">Academic Results</Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Subject</TableCell>
                      <TableCell>Grade</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedStudent.academicResults.map((result, index) => (
                      <TableRow key={index}>
                        <TableCell>{result.subject}</TableCell>
                        <TableCell>{result.grade}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Typography variant="h6" className="mt-4 mb-2">Documents</Typography>
              <List>
                {selectedStudent.documents.map((doc, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <FileText />
                    </ListItemIcon>
                    <ListItemText primary={doc.name} />
                    <Button variant="outlined" href={doc.url} target="_blank">View</Button>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDetails} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </motion.div>
  );
};

const StudentManagement = ({ showSnackbar }) => {
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', course: 'Computer Science', year: '2nd Year' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', course: 'Business Administration', year: '1st Year' },
  ])
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false)
  const [isEditStudentModalOpen, setIsEditStudentModalOpen] = useState(false)
  const [newStudent, setNewStudent] = useState({ name: '', email: '', course: '', year: '' })
  const [editingStudent, setEditingStudent] = useState(null)

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.email && newStudent.course && newStudent.year && newStudent.registerNumber, newStudent.sem, newStudent.branch) {
      setStudents([...students, { ...newStudent, id: students.length + 1 }])
      setIsAddStudentModalOpen(false)
      setNewStudent({registerNumber: '', name: '', email: '', course: '', year: '', sem: '', branch: '' })
      showSnackbar('Student added successfully', 'success')
    } else {
      showSnackbar('Please fill in all fields', 'error')
    }
  }

  const handleEditStudent = (student) => {
    setEditingStudent(student)
    setIsEditStudentModalOpen(true)
  }

  const handleUpdateStudent = () => {
    if (editingStudent.name && editingStudent.email && editingStudent.course && editingStudent.year) {
      setStudents(students.map(s => s.id === editingStudent.id ? editingStudent : s))
      setIsEditStudentModalOpen(false)
      setEditingStudent(null)
      showSnackbar('Student updated successfully', 'success')
    } else {
      showSnackbar('Please fill in all fields', 'error')
    }
  }

  const handleDeleteStudent = (id) => {
    setStudents(students.filter(s => s.id !== id))
    showSnackbar('Student deleted successfully', 'success')
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
        <Button 
          variant="contained" 
          startIcon={<PlusCircle />}
          onClick={() => setIsAddStudentModalOpen(true)}
        >
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
              <TableCell>Sem</TableCell>
              <TableCell>Branch</TableCell>
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
                <TableCell>
                  <IconButton size="small" onClick={() => handleEditStudent(student)}><Edit /></IconButton>
                  <IconButton size="small" onClick={() => handleDeleteStudent(student.id)}><Trash2 /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog 
        open={isAddStudentModalOpen} 
        onClose={() => setIsAddStudentModalOpen(false)}
      >
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
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddStudentModalOpen(false)}>Cancel</Button>
          <Button onClick={handleAddStudent} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>

      <Dialog 
        open={isEditStudentModalOpen} 
        onClose={() => setIsEditStudentModalOpen(false)}
      >
        <DialogTitle>Edit Student</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={editingStudent?.name || ''}
            onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={editingStudent?.email || ''}
            onChange={(e) => setEditingStudent({ ...editingStudent, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Course"
            fullWidth
            value={editingStudent?.course || ''}
            onChange={(e) => setEditingStudent({ ...editingStudent, course: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Year"
            fullWidth
            value={editingStudent?.year || ''}
            onChange={(e) => setEditingStudent({ ...editingStudent, year: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditStudentModalOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdateStudent} variant="contained">Update</Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  )
}

const TeacherManagement = ({ showSnackbar }) => {
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
      showSnackbar('Teacher added successfully', 'success')
    } else {
      showSnackbar('Please fill in all fields', 'error')
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
      showSnackbar('Teacher updated successfully', 'success')
    } else {
      showSnackbar('Please fill in all fields', 'error')
    }
  }

  const handleDeleteTeacher = (id) => {
    setTeachers(teachers.filter(t => t.id !== id))
    showSnackbar('Teacher deleted successfully', 'success')
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

const CourseManagement = ({ showSnackbar }) => {
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
      showSnackbar('Course added successfully', 'success')
    } else {
      showSnackbar('Please fill in all fields', 'error')
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
      showSnackbar('Course updated successfully', 'success')
    } else {
      showSnackbar('Please fill in all fields', 'error')
    }
  }

  const handleDeleteCourse = (id) => {
    setCourses(courses.filter(c => c.id !== id))
    showSnackbar('Course deleted successfully', 'success')
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

const BranchManagement = ({ showSnackbar }) => {
  const [branches, setBranches] = useState([
    { id: 1, name: 'Computer Science', year: '2023', hod: 'Dr. John Doe' },
    { id: 2, name: 'Electrical Engineering', year: '2023', hod: 'Prof. Jane Smith' },
  ])
  const [isAddBranchModalOpen, setIsAddBranchModalOpen] = useState(false)
  const [isEditBranchModalOpen, setIsEditBranchModalOpen] = useState(false)
  const [newBranch, setNewBranch] = useState({ name: '', year: '', hod: '' })
  const [editingBranch, setEditingBranch] = useState(null)

  const hodOptions = ['Dr. John Doe', 'Prof. Jane Smith', 'Dr. Mike Johnson', 'Prof. Emily Brown']

  const handleAddBranch = () => {
    if (newBranch.name && newBranch.year && newBranch.hod) {
      setBranches([...branches, { ...newBranch, id: branches.length + 1 }])
      setIsAddBranchModalOpen(false)
      setNewBranch({ name: '', year: '', hod: '' })
      showSnackbar('Branch added successfully', 'success')
    } else {
      showSnackbar('Please fill in all fields', 'error')
    }
  }

  const handleEditBranch = (branch) => {
    setEditingBranch(branch)
    setIsEditBranchModalOpen(true)
  }

  const handleUpdateBranch = () => {
    if (editingBranch.name && editingBranch.year && editingBranch.hod) {
      setBranches(branches.map(b => b.id === editingBranch.id ? editingBranch : b))
      setIsEditBranchModalOpen(false)
      setEditingBranch(null)
      showSnackbar('Branch updated successfully', 'success')
    } else {
      showSnackbar('Please fill in all fields', 'error')
    }
  }

  const handleDeleteBranch = (id) => {
    setBranches(branches.filter(b => b.id !== id))
    showSnackbar('Branch deleted successfully', 'success')
  }

  return (
    <motion.div 
      className="p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <Typography variant="h5">Branch Management</Typography>
        <Button 
          variant="contained" 
          startIcon={<PlusCircle />}
          onClick={() => setIsAddBranchModalOpen(true)}
        >
          Add Branch
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>HOD</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {branches.map((branch) => (
              <TableRow key={branch.id} hover>
                <TableCell>{branch.name}</TableCell>
                <TableCell>{branch.year}</TableCell>
                <TableCell>{branch.hod}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleEditBranch(branch)}><Edit /></IconButton>
                  <IconButton size="small" onClick={() => handleDeleteBranch(branch.id)}><Trash2 /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog 
        open={isAddBranchModalOpen} 
        onClose={() => setIsAddBranchModalOpen(false)}
      >
        <DialogTitle>Add New Branch</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Branch Name"
            fullWidth
            value={newBranch.name}
            onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Year"
            fullWidth
            value={newBranch.year}
            onChange={(e) => setNewBranch({ ...newBranch, year: e.target.value })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>HOD</InputLabel>
            <Select
              value={newBranch.hod}
              onChange={(e) => setNewBranch({ ...newBranch, hod: e.target.value })}
            >
              {hodOptions.map((hod) => (
                <MenuItem key={hod} value={hod}>{hod}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddBranchModalOpen(false)}>Cancel</Button>
          <Button onClick={handleAddBranch} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>

      <Dialog 
        open={isEditBranchModalOpen} 
        onClose={() => setIsEditBranchModalOpen(false)}
      >
        <DialogTitle>Edit Branch</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Branch Name"
            fullWidth
            value={editingBranch?.name || ''}
            onChange={(e) => setEditingBranch({ ...editingBranch, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Year"
            fullWidth
            value={editingBranch?.year || ''}
            onChange={(e) => setEditingBranch({ ...editingBranch, year: e.target.value })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>HOD</InputLabel>
            <Select
              value={editingBranch?.hod || ''}
              onChange={(e) => setEditingBranch({ ...editingBranch, hod: e.target.value })}
            >
              {hodOptions.map((hod) => (
                <MenuItem key={hod} value={hod}>{hod}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditBranchModalOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdateBranch} variant="contained">Update</Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  )
}

const ExamScheduling = ({ showSnackbar }) => {
  const [exams, setExams] = useState([
    { id: 1, course: 'CS101', date: '2023-06-15', time: '09:00', duration: '3 hours', location: 'Hall A' },
    { id: 2, course: 'PHY301', date: '2023-06-18', time: '14:00', duration: '2 hours', location: 'Hall B' },
  ])
  const [isAddExamModalOpen, setIsAddExamModalOpen] = useState(false)
  const [isEditExamModalOpen, setIsEditExamModalOpen] = useState(false)
  const [newExam, setNewExam] = useState({ course: '', date: '', time: '', duration: '', location: '' })
  const [editingExam, setEditingExam] = useState(null)

  const handleAddExam = () => {
    if (newExam.course && newExam.date && newExam.time && newExam.duration && newExam.location) {
      setExams([...exams, { ...newExam, id: exams.length + 1 }])
      setIsAddExamModalOpen(false)
      setNewExam({ course: '', date: '', time: '', duration: '', location: '' })
      showSnackbar('Exam scheduled successfully', 'success')
    } else {
      showSnackbar('Please fill in all fields', 'error')
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
      showSnackbar('Exam updated successfully', 'success')
    } else {
      showSnackbar('Please fill in all fields', 'error')
    }
  }

  const handleDeleteExam = (id) => {
    setExams(exams.filter(e => e.id !== id))
    showSnackbar('Exam deleted successfully', 'success')
  }

  return (
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
                <TableCell>{exam.date}</TableCell>
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
          <TextField
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newExam.date}
            onChange={(e) => setNewExam({ ...newExam, date: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Time"
            type="time"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newExam.time}
            onChange={(e) => setNewExam({ ...newExam, time: e.target.value })}
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
        <DialogTitle>Edit Exam</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Course"
            fullWidth
            value={editingExam?.course || ''}
            onChange={(e) => setEditingExam({ ...editingExam, course: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={editingExam?.date || ''}
            onChange={(e) => setEditingExam({ ...editingExam, date: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Time"
            type="time"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={editingExam?.time || ''}
            onChange={(e) => setEditingExam({ ...editingExam, time: e.target.value })}
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
  )
}

const ReportsAnalytics = ({ showSnackbar }) => {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const generateReport = (reportType) => {
    // Simulating report generation
    showSnackbar(`${reportType} report generated successfully`, 'success')
  }

  return (
    <motion.div 
      className="p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Typography variant="h5">Reports & Analytics</Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="report tabs">
          <Tab label="Student Reports" />
          <Tab label="Teacher Reports" />
          <Tab label="Course Reports" />
          <Tab label="Exam Reports" />
        </Tabs>
      </Box>

      <TabPanel value={activeTab} index={0}>
        <Button variant="outlined" onClick={() => generateReport('Student Performance')}>Generate Student Performance Report</Button>
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <Button variant="outlined" onClick={() => generateReport('Teacher Evaluation')}>Generate Teacher Evaluation Report</Button>
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        <Button variant="outlined" onClick={() => generateReport('Course Enrollment')}>Generate Course Enrollment Report</Button>
      </TabPanel>
      <TabPanel value={activeTab} index={3}>
        <Button variant="outlined" onClick={() => generateReport('Exam Results')}>Generate Exam Results Report</Button>
      </TabPanel>
    </motion.div>
  )
}

const TabPanel = (props) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children ? (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      ) : null}
    </div>
  )
}

const FinancialManagement = ({ showSnackbar }) => {
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2023-06-01', description: 'Student Fee', amount: 1000, type: 'Income' },
    { id: 2, date: '2023-06-05', description: 'Equipment Purchase', amount: -500, type: 'Expense' },
  ])
  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] = useState(false)
  const [isEditTransactionModalOpen, setIsEditTransactionModalOpen] = useState(false)
  const [newTransaction, setNewTransaction] = useState({ date: '', description: '', amount: '', type: '' })
  const [editingTransaction, setEditingTransaction] = useState(null)

  const handleAddTransaction = () => {
    if (newTransaction.date && newTransaction.description && newTransaction.amount && newTransaction.type) {
      setTransactions([...transactions, { ...newTransaction, id: transactions.length + 1 }])
      setIsAddTransactionModalOpen(false)
      setNewTransaction({ date: '', description: '', amount: '', type: '' })
      showSnackbar('Transaction added successfully', 'success')
    } else {
      showSnackbar('Please fill in all fields', 'error')
    }
  }

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction)
    setIsEditTransactionModalOpen(true)
  }

  const handleUpdateTransaction = () => {
    if (editingTransaction.date && editingTransaction.description && editingTransaction.amount && editingTransaction.type) {
      setTransactions(transactions.map(t => t.id === editingTransaction.id ? editingTransaction : t))
      setIsEditTransactionModalOpen(false)
      setEditingTransaction(null)
      showSnackbar('Transaction updated successfully', 'success')
    } else {
      showSnackbar('Please fill in all fields', 'error')
    }
  }

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id))
    showSnackbar('Transaction deleted successfully', 'success')
  }

  return (
    <motion.div 
      className="p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <Typography variant="h5">Financial Management</Typography>
        <Button 
          variant="contained" 
          startIcon={<PlusCircle />}
          onClick={() => setIsAddTransactionModalOpen(true)}
        >
          Add Transaction
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id} hover>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleEditTransaction(transaction)}><Edit /></IconButton>
                  <IconButton size="small" onClick={() => handleDeleteTransaction(transaction.id)}><Trash2 /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog 
        open={isAddTransactionModalOpen} 
        onClose={() => setIsAddTransactionModalOpen(false)}
      >
        <DialogTitle>Add New Transaction</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newTransaction.date}
            onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={newTransaction.description}
            onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            value={newTransaction.amount}
            onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Type</InputLabel>
            <Select
              value={newTransaction.type}
              onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
            >
              <MenuItem value="Income">Income</MenuItem>
              <MenuItem value="Expense">Expense</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddTransactionModalOpen(false)}>Cancel</Button>
          <Button onClick={handleAddTransaction} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>

      <Dialog 
        open={isEditTransactionModalOpen} 
        onClose={() => setIsEditTransactionModalOpen(false)}
      >
        <DialogTitle>Edit Transaction</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={editingTransaction?.date || ''}
            onChange={(e) => setEditingTransaction({ ...editingTransaction, date: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={editingTransaction?.description || ''}
            onChange={(e) => setEditingTransaction({ ...editingTransaction, description: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            value={editingTransaction?.amount || ''}
            onChange={(e) => setEditingTransaction({ ...editingTransaction, amount: e.target.value })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Type</InputLabel>
            <Select
              value={editingTransaction?.type || ''}
              onChange={(e) => setEditingTransaction({ ...editingTransaction, type: e.target.value })}
            >
              <MenuItem value="Income">Income</MenuItem>
              <MenuItem value="Expense">Expense</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditTransactionModalOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdateTransaction} variant="contained">Update</Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  )
}

const SystemSettings = ({ showSnackbar }) => {
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    language: 'English',
  })

  const handleSettingChange = (setting, value) => {
    setSettings({ ...settings, [setting]: value })
    showSnackbar('Setting updated successfully', 'success')
  }

  return (
    <motion.div 
      className="p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Typography variant="h5">System Settings</Typography>
      
      <Card>
        <CardContent>
          <List>
            <ListItem>
              <ListItemText primary="Dark Mode" />
              <Switch
                checked={settings.darkMode}
                onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Notifications" />
              <Switch
                checked={settings.notifications}
                onChange={(e) => handleSettingChange('notifications', e.target.checked)}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Language" />
              <Select
                value={settings.language}
                onChange={(e) => handleSettingChange('language', e.target.value)}
              >
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Spanish">Spanish</MenuItem>
                <MenuItem value="French">French</MenuItem>
              </Select>
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default EnhancedAdminDashboard

