import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AppBar, Toolbar, Typography, IconButton, Card, CardContent,
  Grid, List, ListItem, ListItemText, ListItemIcon, Avatar,
  Chip, LinearProgress, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, TextField, Box, Switch, Select, MenuItem,
  useMediaQuery, Drawer, Fab, Tooltip, ThemeProvider, createTheme, CssBaseline, ListItemButton
} from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { 
  Book, Calendar, CheckCircle, Clock, Download, FileText, Bell, User, LogOut,
  Home, Award, Users, BookOpen, Activity, MessageCircle, Settings,
  Heart, Star, Menu as MenuIcon, ChevronLeft, Zap, Target, Briefcase, DollarSign
} from 'react-feather';

// Custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#b32aa7',
    },
    secondary: {
      main: '#327aa3',
    },
    tertiary: {
      main: '#30958c',
    },
    background: {
      default: '#f0f2f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
  },
});

// Custom hook for animations
const useAnimatedEntry = (delay = 0) => {
  return {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.5, ease: 'easeOut' }
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
      
      // Simulated data
      const simulatedData = {
        overview: {
          gpa: 3.8,
          attendance: 95,
          assignmentsDue: 3,
          upcomingExams: 2,
          courseProgress: 78,
          learningStreak: 15
        },
        grades: [
          { subject: 'Mathematics', grade: 'A', percentage: 92 },
          { subject: 'Science', grade: 'A-', percentage: 88 },
          { subject: 'English', grade: 'B+', percentage: 85 },
          { subject: 'History', grade: 'A', percentage: 95 },
          { subject: 'Computer Science', grade: 'A+', percentage: 98 },
        ],
        skills: [
          { name: 'Problem Solving', level: 85 },
          { name: 'Critical Thinking', level: 78 },
          { name: 'Communication', level: 92 },
          { name: 'Teamwork', level: 88 },
          { name: 'Time Management', level: 75 },
        ],
        learningPath: [
          { milestone: 'Fundamentals', completed: true },
          { milestone: 'Intermediate Concepts', completed: true },
          { milestone: 'Advanced Topics', completed: false },
          { milestone: 'Specialization', completed: false },
          { milestone: 'Capstone Project', completed: false },
        ],
      };

      setData(simulatedData[dataType]);
      setLoading(false);
    };

    fetchData();
  }, [dataType]);

  return { data, loading };
};

const EnhancedStudentDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const sections = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'grades', label: 'Grades', icon: Award },
    { id: 'attendance', label: 'Attendance', icon: CheckCircle },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'resources', label: 'Resources', icon: Download },
    { id: 'activities', label: 'Activities', icon: Activity },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const drawer = (
    <Box sx={{ bgcolor: 'background.default', height: '100%' }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
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
            bgcolor: 'primary.main',
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
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              {sections.find(section => section.id === activeSection)?.label}
            </Typography>
            <IconButton color="inherit">
              <Bell />
            </IconButton>
            <IconButton color="inherit">
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
              keepMounted: true, // Better open performance on mobile.
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
              {activeSection === 'overview' && <OverviewSection />}
              {activeSection === 'grades' && <GradesSection />}
              {activeSection === 'attendance' && <AttendanceSection />}
              {activeSection === 'schedule' && <ScheduleSection />}
              {activeSection === 'assignments' && <AssignmentsSection />}
              {activeSection === 'courses' && <CoursesSection />}
              {activeSection === 'resources' && <ResourcesSection />}
              {activeSection === 'activities' && <ActivitiesSection />}
              {activeSection === 'achievements' && <AchievementsSection />}
              {activeSection === 'messages' && <MessagesSection />}
              {activeSection === 'settings' && <SettingsSection />}
            </motion.div>
          </AnimatePresence>
        </Box>
        <Tooltip title="Quick Actions" placement="left">
          <Fab 
            color="secondary" 
            aria-label="quick actions"
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
          >
            <Zap />
          </Fab>
        </Tooltip>
      </Box>
    </ThemeProvider>
  );
};

const OverviewSection = () => {
  const animatedEntry = useAnimatedEntry();
  const { data, loading } = useDataFetching('overview');

  const stats = [
    { label: 'Current GPA', value: data?.gpa.toFixed(1) || '-', icon: Award, color: theme.palette.primary.main },
    { label: 'Attendance', value: `${data?.attendance || '-'}%`, icon: CheckCircle, color: theme.palette.secondary.main },
    { label: 'Assignments Due', value: data?.assignmentsDue || '-', icon: FileText, color: theme.palette.tertiary.main },
    { label: 'Upcoming Exams', value: data?.upcomingExams || '-', icon: Calendar, color: '#f44336' },
    { label: 'Course Progress', value: `${data?.courseProgress || '-'}%`, icon: Target, color: '#4caf50' },
    { label: 'Learning Streak', value: `${data?.learningStreak || '-'} days`, icon: Zap, color: '#ff9800' },
  ];

  const skillData = [
    { subject: 'Problem Solving', A: 120, B: 110, fullMark: 150 },
    { subject: 'Critical Thinking', A: 98, B: 130, fullMark: 150 },
    { subject: 'Communication', A: 86, B: 130, fullMark: 150 },
    { subject: 'Teamwork', A: 99, B: 100, fullMark: 150 },
    { subject: 'Time Management', A: 85, B: 90, fullMark: 150 },
  ];

  return (
    <motion.div {...animatedEntry}>
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1, type: 'spring', stiffness: 260, damping: 20 }}
            >
              <Card 
                sx={{ 
                  bgcolor: stat.color, 
                  color: 'white',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
                  },
                }}
              >
                <CardContent>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">{stat.label}</Typography>
                    <stat.icon size={24} />
                  </div>
                  <Typography variant="h4">{stat.value}</Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Academic Progress
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                  data={[
                    { month: 'Jan', gpa: 3.5 },
                    { month: 'Feb', gpa: 3.6 },
                    { month: 'Mar', gpa: 3.7 },
                    { month: 'Apr', gpa: 3.8 },
                    { month: 'May', gpa: 3.8 },
                  ]}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorGpa" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <RechartsTooltip />
                  <Area type="monotone" dataKey="gpa" stroke={theme.palette.primary.main} fillOpacity={1} fill="url(#colorGpa)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Skill Development
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} />
                  <Radar name="Student" dataKey="A" stroke={theme.palette.primary.main} fill={theme.palette.primary.main} fillOpacity={0.6} />
                  <Legend />
                  <RechartsTooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </motion.div>
  );
};

const GradesSection = () => {
  const animatedEntry = useAnimatedEntry();
  const { data: grades, loading } = useDataFetching('grades');

  const chartData = grades?.map(grade => ({
    subject: grade.subject,
    percentage: grade.percentage,
  })) || [];

  return (
    <motion.div {...animatedEntry}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Grade Summary
              </Typography>
              {loading ? (
                <LinearProgress />
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Subject</TableCell>
                        <TableCell align="right">Grade</TableCell>
                        <TableCell align="right">Percentage</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {grades?.map((grade, index) => (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            {grade.subject}
                          </TableCell>
                          <TableCell align="right">{grade.grade}</TableCell>
                          <TableCell align="right">{grade.percentage}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Grade Distribution
              </Typography>
              {loading ? (
                <LinearProgress />
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="percentage" fill={theme.palette.primary.main} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </motion.div>
  );
};

const AttendanceSection = () => {
  const animatedEntry = useAnimatedEntry();
  const attendanceData = [
    { subject: 'Mathematics', present: 28, total: 30 },
    { subject: 'Science', present: 27, total: 30 },
    { subject: 'English', present: 29, total: 30 },
    { subject: 'History', present: 26, total: 30 },
    { subject: 'Computer Science', present: 30, total: 30 },
  ];

  const pieChartData = [
    { name: 'Present', value: attendanceData.reduce((sum, subject) => sum + subject.present, 0) },
    { name: 'Absent', value: attendanceData.reduce((sum, subject) => sum + (subject.total - subject.present), 0) },
  ];

  const COLORS = [theme.palette.primary.main, theme.palette.secondary.main];

  return (
    <motion.div {...animatedEntry}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Attendance Summary
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Subject</TableCell>
                      <TableCell align="right">Attendance</TableCell>
                      <TableCell align="right">Percentage</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {attendanceData.map((subject, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {subject.subject}
                        </TableCell>
                        <TableCell align="right">{subject.present}/{subject.total}</TableCell>
                        <TableCell align="right">
                          <LinearProgress 
                            variant="determinate" 
                            value={(subject.present / subject.total) * 100} 
                            sx={{ height: 10, borderRadius: 5 }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Overall Attendance
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </motion.div>
  );
};

const ScheduleSection = () => {
  const animatedEntry = useAnimatedEntry();
  const schedule = [
    { day: 'Monday', classes: [
      { time: '09:00 AM - 10:30 AM', subject: 'Mathematics', room: 'Room 101' },
      { time: '11:00 AM - 12:30 PM', subject: 'English', room: 'Room 202' },
      { time: '02:00 PM - 03:30 PM', subject: 'Science', room: 'Lab 1' },
    ]},
    { day: 'Tuesday', classes: [
      { time: '09:00 AM - 10:30 AM', subject: 'History', room: 'Room 303' },
      { time: '11:00 AM - 12:30 PM', subject: 'Computer Science', room: 'Lab 2' },
    ]},
    { day: 'Wednesday', classes: [
      { time: '09:00 AM - 10:30 AM', subject: 'Mathematics', room: 'Room 101' },
      { time: '11:00 AM - 12:30 PM', subject: 'Science', room: 'Lab 1' },
      { time: '02:00 PM - 03:30 PM', subject: 'English', room: 'Room 202' },
    ]},
    { day: 'Thursday', classes: [
      { time: '09:00 AM - 10:30 AM', subject: 'Computer Science', room: 'Lab 2' },
      { time: '11:00 AM - 12:30 PM', subject: 'History', room: 'Room 303' },
    ]},
    { day: 'Friday', classes: [
      { time: '09:00 AM - 10:30 AM', subject: 'English', room: 'Room 202' },
      { time: '11:00 AM - 12:30 PM', subject: 'Mathematics', room: 'Room 101' },
      { time: '02:00 PM - 03:30 PM', subject: 'Science', room: 'Lab 1' },
    ]},
  ];

  return (
    <motion.div {...animatedEntry}>
      <Grid container spacing={3}>
        {schedule.map((day, index) => (
          <Grid item xs={12} md={6} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {day.day}
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Time</TableCell>
                          <TableCell>Subject</TableCell>
                          <TableCell>Room</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {day.classes.map((classInfo, classIndex) => (
                          <TableRow key={classIndex}>
                            <TableCell>{classInfo.time}</TableCell>
                            <TableCell>{classInfo.subject}</TableCell>
                            <TableCell>{classInfo.room}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </motion.div>
  );
};

const AssignmentsSection = () => {
  const animatedEntry = useAnimatedEntry();
  const assignments = [
    { id: 1, subject: 'Mathematics', title: 'Linear Algebra Problem Set', dueDate: '2023-06-15', status: 'Pending' },
    { id: 2, subject: 'Science', title: 'Lab Report: Photosynthesis', dueDate: '2023-06-18', status: 'Submitted' },
    { id: 3, subject: 'English', title: 'Essay on Shakespeare', dueDate: '2023-06-20', status: 'Pending' },
    { id: 4, subject: 'History', title: 'Research Paper: Industrial Revolution', dueDate: '2023-06-25', status: 'In Progress' },
    { id: 5, subject: 'Computer Science', title: 'Programming Project: Todo App', dueDate: '2023-06-30', status: 'Pending' },
  ];

  return (
    <motion.div {...animatedEntry}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Assignments
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Subject</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {assignments.map((assignment) => (
                  <TableRow key={assignment.id}>
                    <TableCell>{assignment.subject}</TableCell>
                    <TableCell>{assignment.title}</TableCell>
                    <TableCell>{assignment.dueDate}</TableCell>
                    <TableCell>
                      <Chip 
                        label={assignment.status} 
                        color={
                          assignment.status === 'Submitted' ? 'success' : 
                          assignment.status === 'Pending' ? 'warning' : 
                          'info'
                        } 
                      />
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outlined" 
                        size="small"
                        startIcon={<FileText />}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const CoursesSection = () => {
  const animatedEntry = useAnimatedEntry();
  const courses = [
    { id: 1, name: 'Advanced Mathematics', instructor: 'Dr. John Smith', progress: 75 },
    { id: 2, name: 'Modern Literature', instructor: 'Prof. Emily Johnson', progress: 60 },
    { id: 3, name: 'Physics 101', instructor: 'Dr. Robert Brown', progress: 80 },
    { id: 4, name: 'Introduction to Psychology', instructor: 'Dr. Sarah Davis', progress: 90 },
    { id: 5, name: 'Web Development Fundamentals', instructor: 'Mr. Michael Lee', progress: 70 },
  ];

  return (
    <motion.div {...animatedEntry}>
      <Grid container spacing={3}>
        {courses.map((course, index) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {course.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Instructor: {course.instructor}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Progress: {course.progress}%
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={course.progress} 
                    sx={{ height: 10, borderRadius: 5, mt: 1 }}
                  />
                  <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    sx={{ mt: 2 }}
                  >
                    View Course
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </motion.div>
  );
};

const ResourcesSection = () => {
  const animatedEntry = useAnimatedEntry();
  const resources = [
    { id: 1, title: 'Mathematics Textbook', type: 'PDF', size: '15 MB' },
    { id: 2, title: 'Science Lab Manual', type: 'PDF', size: '8 MB' },
    { id: 3, title: 'English Literature Anthology', type: 'EPUB', size: '12 MB' },
    { id: 4, title: 'History Documentary', type: 'MP4', size: '1.2 GB' },
    { id: 5, title: 'Programming Tutorial Series', type: 'ZIP', size: '500 MB' },
  ];

  return (
    <motion.div {...animatedEntry}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Learning Resources
          </Typography>
          <List>
            {resources.map((resource) => (
              <ListItem key={resource.id}>
                <ListItemIcon>
                  <Book />
                </ListItemIcon>
                <ListItemText 
                  primary={resource.title}
                  secondary={`${resource.type} • ${resource.size}`}
                />
                <Button 
                  variant="contained" 
                  size="small"
                  startIcon={<Download />}
                >
                  Download
                </Button>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ActivitiesSection = () => {
  const animatedEntry = useAnimatedEntry();
  const activities = [
    { id: 1, name: 'Chess Club', day: 'Monday', time: '4:00 PM - 5:30 PM', location: 'Room 105' },
    { id: 2, name: 'Debate Team', day: 'Tuesday', time: '3:30 PM - 5:00 PM', location: 'Auditorium' },
    { id: 3, name: 'Science Fair Prep', day: 'Wednesday', time: '4:00 PM - 6:00 PM', location: 'Science Lab' },
    { id: 4, name: 'Art Club', day: 'Thursday', time: '3:00 PM - 4:30 PM', location: 'Art Room' },
    { id: 5, name: 'Sports Practice', day: 'Friday', time: '4:00 PM - 6:00 PM', location: 'Gymnasium' },
  ];

  return (
    <motion.div {...animatedEntry}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Extracurricular Activities
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Activity</TableCell>
                  <TableCell>Day</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>{activity.name}</TableCell>
                    <TableCell>{activity.day}</TableCell>
                    <TableCell>{activity.time}</TableCell>
                    <TableCell>{activity.location}</TableCell>
                    <TableCell>
                      <Button 
                        variant="outlined" 
                        size="small"
                      >
                        Join
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const AchievementsSection = () => {
  const animatedEntry = useAnimatedEntry();
  const achievements = [
    { id: 1, title: 'Honor Roll', description: 'Achieved for maintaining a GPA above 3.5', date: '2023-05-15', icon: Award },
    { id: 2, title: 'Science Fair Winner', description: 'First place in the annual science fair', date: '2023-04-20', icon: Trophy },
    { id: 3, title: 'Perfect Attendance', description: 'No absences for the entire semester', date: '2023-06-01', icon: Calendar },
    { id: 4, title: 'Math Olympiad Finalist', description: 'Reached the finals of the state Math Olympiad', date: '2023-03-10', icon: Award },
    { id: 5, title: 'Community Service Award', description: 'Completed 100 hours of community service', date: '2023-05-30', icon: Heart },
  ];

  return (
    <motion.div {...animatedEntry}>
      <Grid container spacing={3}>
        {achievements.map((achievement, index) => (
          <Grid item xs={12} sm={6} md={4} key={achievement.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <achievement.icon className="mr-2" size={24} />
                    <Typography variant="h6">
                      {achievement.title}
                    </Typography>
                  </div>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {achievement.description}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Achieved on: {achievement.date}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </motion.div>
  );
};

const MessagesSection = () => {
  const animatedEntry = useAnimatedEntry();
  const messages = [
    { id: 1, sender: 'John Smith', subject: 'Assignment Feedback', preview: 'Great job on your recent...', date: '2023-06-10' },
    { id: 2, sender: 'Emily Johnson', subject: 'Group Project Update', preview: 'Here\'s the latest on our...', date: '2023-06-09' },
    { id: 3, sender: 'Admin Office', subject: 'Upcoming Event', preview: 'Don\'t forget about the...', date: '2023-06-08' },
    { id: 4, sender: 'Library', subject: 'Book Return Reminder', preview: 'This is a reminder that...', date: '2023-06-07' },
    { id: 5, sender: 'Career Services', subject: 'Internship Opportunity', preview: 'We have an exciting internship...', date: '2023-06-06' },
  ];

  return (
    <motion.div {...animatedEntry}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Messages
          </Typography>
          <List>
            {messages.map((message) => (
              <ListItem key={message.id} divider>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1">
                      {message.subject}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" color="textSecondary">
                        From: {message.sender}
                      </Typography>
                      <Typography variant="body2" noWrap>
                        {message.preview}
                      </Typography>
                    </>
                  }
                />
                <Typography variant="caption" color="textSecondary">
                  {message.date}
                </Typography>
              </ListItem>
            ))}
          </List>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            sx={{ mt: 2 }}
          >
            View All Messages
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const SettingsSection = () => {
  const animatedEntry = useAnimatedEntry();
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: false,
    darkMode: false,
    language: 'English',
  });

  const handleSettingChange = (setting, value) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [setting]: value
    }));
  };

  return (
    <motion.div {...animatedEntry}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Settings
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Enable Notifications" />
              <Switch
                checked={settings.notifications}
                onChange={(e) => handleSettingChange('notifications', e.target.checked)}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Email Alerts" />
              <Switch
                checked={settings.emailAlerts}
                onChange={(e) => handleSettingChange('emailAlerts', e.target.checked)}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Dark Mode" />
              <Switch
                checked={settings.darkMode}
                onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
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
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            sx={{ mt: 2 }}
          >
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EnhancedStudentDashboard;

