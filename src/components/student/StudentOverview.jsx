import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../api/axios';
// import {  Box,  TextField } from '@mui/material';
// import useAnimatedEntry from './useAnimatedEntry';

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
    { id: 'exams', label: 'Exams', icon: BookOpen },
    { id: 'resources', label: 'Resources', icon: Download },
    { id: 'activities', label: 'Activities', icon: Activity },
    { id: 'achievements', label: 'Achievements', icon: Award },
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
              {activeSection === 'overview' && <OverviewSection />}
              {activeSection === 'grades' && <GradesSection />}
              {activeSection === 'attendance' && <AttendanceSection />}
              {activeSection === 'schedule' && <ScheduleSection />}
              {activeSection === 'assignments' && <AssignmentsSection />}
              {activeSection === 'exams' && <ExamsSection />}
              {activeSection === 'resources' && <ResourcesSection />}
              {activeSection === 'activities' && <ActivitiesSection />}
              {activeSection === 'achievements' && <AchievementsSection />}
              {activeSection === 'settings' && <SettingsSection />}
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

const OverviewSection = () => {
  const animatedEntry = useAnimatedEntry();
  const { data, loading } = useDataFetching('overview');

  const stats = [
    { label: 'Current GPA', value: data?.gpa.toFixed(1) || '-', icon: Award, color: theme.palette.primary.main },
    { label: 'Attendance', value: `${data?.attendance || '-'}%`, icon: CheckCircle, color: theme.palette.secondary.main },
    { label: 'Assignments Due', value: data?.assignmentsDue || '-', icon: FileText, color: theme.palette.tertiary.main },
    { label: 'Upcoming Exams', value: data?.upcomingExams || '-', icon: Calendar, color: '#FF9800' },
    { label: 'Course Progress', value: `${data?.courseProgress || '-'}%`, icon: Target, color: '#4CAF50' },
    { label: 'Learning Streak', value: `${data?.learningStreak || '-'} days`, icon: Zap, color: '#F44336' },
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
            </CardContent>    </Card>
        </Grid>
      </Grid>
    </motion.div>
  );
};
const GradesSection = () => {
  const animatedEntry = useAnimatedEntry();
  
  // Mock data initialization
  const grades = [
    {
      subject: 'Mathematics',
      cie1: 45,
      cie2: 48,
      cie3: 47,
      assignment: 18,
      total: 158,
      grade: 'A+'
    },
    {
      subject: 'Physics',
      cie1: 42,
      cie2: 44,
      cie3: 45,
      assignment: 17,
      total: 148,
      grade: 'A'
    },
    {
      subject: 'Chemistry',
      cie1: 40,
      cie2: 38,
      cie3: 42,
      assignment: 16,
      total: 136,
      grade: 'B+'
    },
    {
      subject: 'Biology',
      cie1: 43,
      cie2: 41,
      cie3: 44,
      assignment: 18,
      total: 146,
      grade: 'A'
    },
    {
      subject: 'English',
      cie1: 44,
      cie2: 46,
      cie3: 45,
      assignment: 19,
      total: 154,
      grade: 'A+'
    }
  ];

  const loading = false;

  const getGradeColor = (total) => {
    if (total >= 150) return '#4CAF50'; // Green for A+
    if (total >= 140) return '#6C63FF'; // Primary purple for A
    if (total >= 130) return '#FF9800'; // Orange for B+
    if (total >= 120) return '#FFC107'; // Yellow for B
    return '#F44336'; // Red for lower grades
  };

  const getGradientColor = (total) => {
    return {
      stop1: getGradeColor(total),
      stop2: `${getGradeColor(total)}88`
    };
  };

  return (
    <motion.div {...animatedEntry}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card className="overflow-hidden">
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <Typography variant="h6">Grade Summary</Typography>
                <div className="flex gap-2">
                  <Chip 
                    label="Semester 1" 
                    color="primary" 
                    variant="filled"
                    className="font-semibold"
                  />
                  <Chip 
                    label="2023-24" 
                    variant="outlined" 
                    color="primary"
                    className="font-semibold"
                  />
                </div>
              </div>
              {loading ? (
                <div className="space-y-4">
                  <LinearProgress />
                  <Typography variant="body2" className="text-center text-gray-500">
                    Loading grades...
                  </Typography>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table className="min-w-full">
                    <TableHead>
                      <TableRow className="bg-gray-50">
                        <TableCell className="font-semibold">Subject</TableCell>
                        <TableCell align="center" className="font-semibold">CIE 1 (50)</TableCell>
                        <TableCell align="center" className="font-semibold">CIE 2 (50)</TableCell>
                        <TableCell align="center" className="font-semibold">CIE 3 (50)</TableCell>
                        <TableCell align="center" className="font-semibold">Assignment (20)</TableCell>
                        <TableCell align="center" className="font-semibold">Total (170)</TableCell>
                        <TableCell align="center" className="font-semibold">Grade</TableCell>
                        <TableCell align="center" className="font-semibold">Progress</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {grades.map((grade, index) => (
                        <TableRow 
                          key={index}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <TableCell className="font-medium">{grade.subject}</TableCell>
                          <TableCell align="center">{grade.cie1}</TableCell>
                          <TableCell align="center">{grade.cie2}</TableCell>
                          <TableCell align="center">{grade.cie3}</TableCell>
                          <TableCell align="center">{grade.assignment}</TableCell>
                          <TableCell align="center">
                            <Typography 
                              variant="body2" 
                              className="font-bold"
                              style={{ color: getGradeColor(grade.total) }}
                            >
                              {grade.total}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Chip
                              label={grade.grade}
                              size="small"
                              className="font-bold"
                              style={{
                                backgroundColor: getGradeColor(grade.total),
                                color: 'white',
                              }}
                            />
                          </TableCell>
                          <TableCell align="center" className="w-32">
                            <div className="w-full bg-gray-100 rounded-full h-2">
                              <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                  width: `${(grade.total / 170) * 100}%`,
                                  background: `linear-gradient(90deg, ${getGradientColor(grade.total).stop1} 0%, ${getGradientColor(grade.total).stop2} 100%)`,
                                }}
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className="h-full">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Grade Distribution
              </Typography>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={grades}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis domain={[0, 170]} />
                    <RechartsTooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-2 shadow rounded border">
                              <p className="font-semibold">{data.subject}</p>
                              <p>Total: {data.total}/170</p>
                              <p>Grade: {data.grade}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="total" name="Total Score">
                      {grades.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={getGradeColor(entry.total)}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className="h-full">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Performance Overview
              </Typography>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={grades}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 170]} />
                    <Radar
                      name="Total Score"
                      dataKey="total"
                      stroke={theme.palette.primary.main}
                      fill={theme.palette.primary.main}
                      fillOpacity={0.6}
                    />
                    <Legend />
                    <RechartsTooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
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
                            sx={{ 
                              height: 10, 
                              borderRadius: 5,
                              backgroundColor: theme.palette.grey[200],
                              '& .MuiLinearProgress-bar': {
                                borderRadius: 5,
                                backgroundColor: theme.palette.primary.main,
                              },
                            }}
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
                        sx={{
                          fontWeight: 600,
                          borderRadius: '8px',
                          '& .MuiChip-label': {
                            padding: '4px 8px',
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outlined" 
                        size="small"
                        startIcon={<FileText />}
                        sx={{
                          borderRadius: '8px',
                          transition: 'all 0.3s',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                          },
                        }}
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

const ExamsSection = () => {
  const animatedEntry = useAnimatedEntry();
  const exams = [
    { id: 1, subject: 'Mathematics', date: '2023-07-05', time: '09:00 AM - 11:00 AM', room: 'Hall A' },
    { id: 2, subject: 'Science', date: '2023-07-07', time: '10:00 AM - 12:00 PM', room: 'Lab 1' },
    { id: 3, subject: 'English', date: '2023-07-10', time: '09:00 AM - 11:00 AM', room: 'Hall B' },
    { id: 4, subject: 'History', date: '2023-07-12', time: '02:00 PM - 04:00 PM', room: 'Hall C' },
    { id: 5, subject: 'Computer Science', date: '2023-07-15', time: '10:00 AM - 12:00 PM', room: 'Lab 2' },
  ];

  return (
    <motion.div {...animatedEntry}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Upcoming Exams
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Subject</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Room</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {exams.map((exam) => (
                  <TableRow key={exam.id}>
                    <TableCell>{exam.subject}</TableCell>
                    <TableCell>{exam.date}</TableCell>
                    <TableCell>{exam.time}</TableCell>
                    <TableCell>{exam.room}</TableCell>
                    <TableCell>
                      <Button 
                        variant="outlined" 
                        size="small"
                        startIcon={<Calendar />}
                        sx={{
                          borderRadius: '8px',
                          transition: 'all 0.3s',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                          },
                        }}
                      >
                        Add to Calendar
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
                  sx={{
                    borderRadius: '8px',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                    },
                  }}
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
                        sx={{
                          borderRadius: '8px',
                          transition: 'all 0.3s',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                          },
                        }}
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
    { id: 2, title: 'Science Fair Winner', description: 'First place in the annual science fair', date: '2023-04-20', icon: Award },
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
              <Card sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                },
              }}>
                <CardContent>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <achievement.icon className="mr-2" size={24} color={theme.palette.primary.main} />
                    <Typography variant="h6" color="primary">
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
const SettingsSection = () => {
  const animatedEntry = useAnimatedEntry();
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: false,
    darkMode: false,
    language: 'English',
  });
  
  const [profileData, setProfileData] = useState({
    avatar: '',
    name: '',
    regNo: '',
    phoneNo: '',
    email: '',
    sem: '',
    branch: '',
  });

  // Fetch current user data from the backend
  const fetchCurrentUser = async () => {
    try {
      const response = await api.post("/student/me"); // Adjust URL as per your API
      console.log(response.data.data)
      setProfileData({
        avatar: `http://localhost:8000/${response.data.data.profile}` || '', // Construct full URL        name: response.data.data.fullName || '',
        name: response.data.data.fullName || '',
        regNo: response.data.data.registerNumber || '',
        phoneNo: response.data.data.phoneNumber || '',
        email: response.data.data.email || '',
        sem: response.data.data.semester || '',
        branch: response.data.data.branch || '',
      });
    } catch (error) {
      console.error('Error fetching current user data', error);
      alert('Failed to load user data');
    }
  };

  useEffect(() => {
    fetchCurrentUser(); // Fetch user data when the component mounts
  }, []);

  const handleSettingChange = (setting, value) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [setting]: value
    }));
  };

  const handleProfileChange = (field, value) => {
    setProfileData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  const handleSaveProfile = async () => {
    try {
      const formData = new FormData();
      if (profileData.avatar) {
        formData.append('profile', profileData.avatar);
      }
      formData.append('name', profileData.name);
      formData.append('phoneNo', profileData.phoneNo);
      formData.append('email', profileData.email);
      formData.append('sem', profileData.sem);
      formData.append('branch', profileData.branch);

      const response = await axios.put(`/api/students/${profileData.regNo}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      if (response.status === 200) {
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <motion.div {...animatedEntry}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar
                    src={profileData.avatar}
                    sx={{ width: 100, height: 100 }}
                  />
                  <Button
                    variant="outlined"
                    component="label"
                  >
                    Upload Avatar
                    <input
                      type="file"
                      hidden
                      onChange={(e) => handleProfileChange('avatar', URL.createObjectURL(e.target.files[0]))}
                    />
                  </Button>
                </Box>
                <TextField
                  label="Name"
                  value={profileData.name}
                  onChange={(e) => handleProfileChange('name', e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Registration Number"
                  value={profileData.regNo}
                  onChange={(e) => handleProfileChange('regNo', e.target.value)}
                  fullWidth
                  disabled
                />
                <TextField
                  label="Phone Number"
                  value={profileData.phoneNo}
                  onChange={(e) => handleProfileChange('phoneNo', e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Email"
                  value={profileData.email}
                  onChange={(e) => handleProfileChange('email', e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Semester"
                  value={profileData.sem}
                  onChange={(e) => handleProfileChange('sem', e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Branch"
                  value={profileData.branch}
                  onChange={(e) => handleProfileChange('branch', e.target.value)}
                  fullWidth
                />
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth 
                  sx={{ 
                    mt: 2,
                    borderRadius: '8px',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                    },
                  }}
                  onClick={handleSaveProfile} // Trigger the save profile function
                >
                  Save Profile
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Settings
              </Typography>
              {/* Existing settings code */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default EnhancedStudentDashboard;

