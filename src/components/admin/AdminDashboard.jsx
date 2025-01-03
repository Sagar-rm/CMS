'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, BookOpen, UserPlus, Clipboard, Calendar, ChevronDown, ChevronUp, Menu, X, BarChart2, Settings, Bell, Search, LogOut, PlusCircle, Trash2, Edit, Save, FileText, DollarSign } from 'lucide-react'
import InputAdornment from '@mui/material/InputAdornment';
import Collapse from '@mui/material/Collapse';

// Importing MUI components
import { 
  AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemIcon, 
  ListItemText, TextField, Button, Card, CardContent, CardActions, Grid, Select, 
  MenuItem, FormControl, InputLabel, Switch, Chip, Avatar, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, 
  DialogContent, DialogActions, Snackbar, Alert, LinearProgress, Box, Tab, Tabs, ListItemButton
} from '@mui/material'

// Importing Recharts for data visualization
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const EnhancedAdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
  const [loading, setLoading] = useState(false)

  const sidebarItems = [
    { id: 'dashboard', icon: BarChart2, label: 'Dashboard Overview' },
    { id: 'student-details', icon: Users, label: 'Student Details' },
    { id: 'students', icon: Users, label: 'Student Management' },
    { id: 'teachers', icon: UserPlus, label: 'Teacher Management' },
    { id: 'courses', icon: BookOpen, label: 'Course Management' },
    { id: 'exams', icon: Calendar, label: 'Exam Scheduling' },
    { id: 'reports', icon: FileText, label: 'Reports & Analytics' },
    { id: 'finance', icon: DollarSign, label: 'Financial Management' },
    { id: 'settings', icon: Settings, label: 'System Settings' },
  ]

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const handleSectionChange = (section) => {
    setLoading(true)
    setActiveSection(section)
    setTimeout(() => setLoading(false), 1000) // Simulating data loading
  }

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity })
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return
    setSnackbar({ ...snackbar, open: false })
  }

  return (
    <motion.div 
      className="flex h-screen bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        open={isSidebarOpen}
        sx={{
          width: isSidebarOpen ? 240 : 72,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: isSidebarOpen ? 240 : 72,
            boxSizing: 'border-box',
            backgroundColor: '#2e968b',
            color: 'white',
            transition: 'width 0.3s'
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {isSidebarOpen ? 'CMS Admin' : 'CMS'}
          </Typography>
          <IconButton color="inherit" onClick={toggleSidebar}>
            {isSidebarOpen ? <ChevronUp /> : <ChevronDown />}
          </IconButton>
        </Toolbar>
        <List>
          {sidebarItems.map((item) => (
            <ListItem 
              component={motion.div}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              disablePadding
              key={item.id}
              sx={{
                backgroundColor: activeSection === item.id ? '#704cd1' : 'transparent',
                '&:hover': {
                  backgroundColor: '#704cd1',
                },
              }}
            >
              <ListItemButton
                onClick={() => handleSectionChange(item.id)}
                sx={{
                  color: 'white',
                }}
              >
                <ListItemIcon sx={{ color: 'white' }}>
                  <item.icon />
                </ListItemIcon>
                {isSidebarOpen && <ListItemText primary={item.label} />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppBar position="static" color="default" elevation={0}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleSidebar}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {sidebarItems.find(item => item.id === activeSection)?.label}
            </Typography>
            <IconButton color="inherit">
              <Bell />
            </IconButton>
            <IconButton color="inherit">
              <LogOut />
            </IconButton>
          </Toolbar>
        </AppBar>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          {loading && <LinearProgress />}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeSection === 'dashboard' && <DashboardOverview showSnackbar={showSnackbar} />}
              {activeSection === 'students' && <StudentManagement showSnackbar={showSnackbar} />}
              {activeSection === 'student-details' && <StudentDetails showSnackbar={showSnackbar} />}
              {activeSection === 'teachers' && <TeacherManagement showSnackbar={showSnackbar} />}
              {activeSection === 'courses' && <CourseManagement showSnackbar={showSnackbar} />}
              {activeSection === 'exams' && <ExamScheduling showSnackbar={showSnackbar} />}
              {activeSection === 'reports' && <ReportsAnalytics showSnackbar={showSnackbar} />}
              {activeSection === 'finance' && <FinancialManagement showSnackbar={showSnackbar} />}
              {activeSection === 'settings' && <SystemSettings showSnackbar={showSnackbar} />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        {snackbar.message && (
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity || 'info'} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        )}
      </Snackbar>
    </motion.div>
  )
}

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

const StudentDetails = () => {
  const [expandedDepartment, setExpandedDepartment] = useState(null)
  const [selectedSemester, setSelectedSemester] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterAnchorEl, setFilterAnchorEl] = useState(null)

  const departments = [
    {
      name: 'Computer Science',
      students: [
        { id: 1, name: 'John Doe', semester: 1, department: 'Computer Science' },
        { id: 2, name: 'Jane Smith', semester: 2, department: 'Computer Science' },
      ]
    },
    {
      name: 'Electrical Engineering',
      students: [
        { id: 3, name: 'Mike Johnson', semester: 1, department: 'Electrical Engineering' },
        { id: 4, name: 'Sarah Williams', semester: 2, department: 'Electrical Engineering' },
      ]
    },
    {
      name: 'Mechanical Engineering',
      students: [
        { id: 5, name: 'Tom Brown', semester: 1, department: 'Mechanical Engineering' },
        { id: 6, name: 'Emily Davis', semester: 2, department: 'Mechanical Engineering' },
      ]
    }
  ]

  const handleDepartmentClick = (department) => {
    setExpandedDepartment(expandedDepartment === department ? null : department)
  }

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget)
  }

  const handleFilterClose = () => {
    setFilterAnchorEl(null)
  }

  const handleSemesterChange = (semester) => {
    setSelectedSemester(semester)
    handleFilterClose()
  }

  const filterStudents = (students) => {
    return students.filter(student => 
      student.semester === selectedSemester &&
      student.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <Typography variant="h5" className="mb-6">
        1st Year Students
      </Typography>

      <div className="space-y-6">
        {departments.map((dept) => (
          <Card key={dept.name} className="overflow-hidden">
            <motion.div
              initial={false}
              animate={{ backgroundColor: expandedDepartment === dept.name ? '#f3f4f6' : '#ffffff' }}
            >
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between items-center">
                    <Typography variant="h6">{dept.name}</Typography>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outlined"
                        onClick={handleFilterClick}
                        endIcon={<ChevronDown />}
                      >
                        Filter by semester
                      </Button>
                      <Menu
                        anchorEl={filterAnchorEl}
                        open={Boolean(filterAnchorEl)}
                        onClose={handleFilterClose}
                      >
                        <MenuItem onClick={() => handleSemesterChange(1)}>Semester 1</MenuItem>
                        <MenuItem onClick={() => handleSemesterChange(2)}>Semester 2</MenuItem>
                      </Menu>
                      <Button
                        variant="contained"
                        onClick={() => handleDepartmentClick(dept.name)}
                      >
                        View Students
                      </Button>
                    </div>
                  </div>

                  <TextField
                    fullWidth
                    placeholder="Search students..."
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search className="text-gray-400" />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Collapse in={expandedDepartment === dept.name}>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4"
                    >
                      {filterStudents(dept.students).map((student) => (
                        <motion.div
                          key={student.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                          className="p-4 border rounded-lg mb-2 hover:bg-gray-50"
                        >
                          <Typography>{student.name}</Typography>
                          <Typography variant="body2" color="textSecondary">
                            Semester {student.semester}
                          </Typography>
                        </motion.div>
                      ))}
                    </motion.div>
                  </Collapse>
                </div>
              </CardContent>
            </motion.div>
          </Card>
        ))}
      </div>
    </motion.div>
  )
}

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
    setStudents([...students, { ...newStudent, id: students.length + 1 }])
    setIsAddStudentModalOpen(false)
    setNewStudent({ name: '', email: '', course: '', year: '' })
    showSnackbar('Student added successfully', 'success')
  }

  const handleEditStudent = (student) => {
    setEditingStudent(student)
    setIsEditStudentModalOpen(true)
  }

  const handleUpdateStudent = () => {
    setStudents(students.map(s => s.id === editingStudent.id ? editingStudent : s))
    setIsEditStudentModalOpen(false)
    setEditingStudent(null)
    showSnackbar('Student updated successfully', 'success')
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
        TransitionProps={{
          onEnter: () => {
            // Ensure any necessary state is set before the dialog opens
          }
        }}
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
        TransitionProps={{
          onEnter: () => {
            // Ensure any necessary state is set before the dialog opens
          }
        }}
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
    setTeachers([...teachers, { ...newTeacher, id: teachers.length + 1 }])
    setIsAddTeacherModalOpen(false)
    setNewTeacher({ name: '', email: '', subject: '', experience: '' })
    showSnackbar('Teacher added successfully', 'success')
  }

  const handleEditTeacher = (teacher) => {
    setEditingTeacher(teacher)
    setIsEditTeacherModalOpen(true)
  }

  const handleUpdateTeacher = () => {
    setTeachers(teachers.map(t => t.id === editingTeacher.id ? editingTeacher : t))
    setIsEditTeacherModalOpen(false)
    setEditingTeacher(null)
    showSnackbar('Teacher updated successfully', 'success')
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
        TransitionProps={{
          onEnter: () => {
            // Ensure any necessary state is set before the dialog opens
          }
        }}
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
        TransitionProps={{
          onEnter: () => {
            // Ensure any necessary state is set before the dialog opens
          }
        }}
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
    setCourses([...courses, { ...newCourse, id: courses.length + 1 }])
    setIsAddCourseModalOpen(false)
    setNewCourse({ name: '', code: '', credits: '', instructor: '' })
    showSnackbar('Course added successfully', 'success')
  }

  const handleEditCourse = (course) => {
    setEditingCourse(course)
    setIsEditCourseModalOpen(true)
  }

  const handleUpdateCourse = () => {
    setCourses(courses.map(c => c.id === editingCourse.id ? editingCourse : c))
    setIsEditCourseModalOpen(false)
    setEditingCourse(null)
    showSnackbar('Course updated successfully', 'success')
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
        TransitionProps={{
          onEnter: () => {
            // Ensure any necessary state is set before the dialog opens
          }
        }}
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
        TransitionProps={{
          onEnter: () => {
            // Ensure any necessary state is set before the dialog opens
          }
        }}
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
    setExams([...exams, { ...newExam, id: exams.length + 1 }])
    setIsAddExamModalOpen(false)
    setNewExam({ course: '', date: '', time: '', duration: '', location: '' })
    showSnackbar('Exam scheduled successfully', 'success')
  }

  const handleEditExam = (exam) => {
    setEditingExam(exam)
    setIsEditExamModalOpen(true)
  }

  const handleUpdateExam = () => {
    setExams(exams.map(e => e.id === editingExam.id ? editingExam : e))
    setIsEditExamModalOpen(false)
    setEditingExam(null)
    showSnackbar('Exam updated successfully', 'success')
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
        TransitionProps={{
          onEnter: () => {
            // Ensure any necessary state is set before the dialog opens
          }
        }}
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
        TransitionProps={{
          onEnter: () => {
            // Ensure any necessary state is set before the dialog opens
          }
        }}
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
    setTransactions([...transactions, { ...newTransaction, id: transactions.length + 1 }])
    setIsAddTransactionModalOpen(false)
    setNewTransaction({ date: '', description: '', amount: '', type: '' })
    showSnackbar('Transaction added successfully', 'success')
  }

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction)
    setIsEditTransactionModalOpen(true)
  }

  const handleUpdateTransaction = () => {
    setTransactions(transactions.map(t => t.id === editingTransaction.id ? editingTransaction : t))
    setIsEditTransactionModalOpen(false)
    setEditingTransaction(null)
    showSnackbar('Transaction updated successfully', 'success')
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
        TransitionProps={{
          onEnter: () => {
            // Ensure any necessary state is set before the dialog opens
          }
        }}
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
        TransitionProps={{
          onEnter: () => {
            // Ensure any necessary state is set before the dialog opens
          }
        }}
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

