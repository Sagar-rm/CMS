"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  Switch,
  Select,
  MenuItem,
  useMediaQuery,
  Drawer,
  Fab,
  Tooltip,
  ThemeProvider,
  createTheme,
  CssBaseline,
  ListItemButton,
} from "@mui/material"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  Book,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  FileText,
  Bell,
  LogOut,
  Home,
  Award,
  Users,
  BookOpen,
  Activity,
  MessageCircle,
  Settings,
  MenuIcon,
  Zap,
} from "lucide-react"

// Custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#6C63FF", // Vibrant purple
    },
    secondary: {
      main: "#FF6584", // Coral pink
    },
    tertiary: {
      main: "#4ECDC4", // Teal
    },
    background: {
      default: "#F7FAFC",
      paper: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          boxShadow: "0 4px 20px 0 rgba(0,0,0,0.1)",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 8px 30px 0 rgba(0,0,0,0.15)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          textTransform: "none",
          fontWeight: 600,
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 4px 10px 0 rgba(0,0,0,0.1)",
          },
        },
      },
    },
  },
})

// Custom hook for animations
const useAnimatedEntry = (delay = 0) => {
  return {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] },
  }
}

const TeacherDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview")
  const [mobileOpen, setMobileOpen] = useState(false)
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const sections = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "classes", label: "Classes", icon: Users },
    { id: "assignments", label: "Assignments", icon: FileText },
    { id: "grades", label: "Grades", icon: Award },
    { id: "attendance", label: "Attendance", icon: CheckCircle },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "resources", label: "Resources", icon: Book },
    { id: "communications", label: "Communications", icon: MessageCircle },
    { id: "reports", label: "Reports", icon: Activity },
    { id: "settings", label: "Settings", icon: Settings },
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
    <Box sx={{ bgcolor: "background.default", height: "100%" }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700, color: "primary.main" }}>
          EduPulse Teacher
        </Typography>
      </Toolbar>
      <List>
        {sections.map((section) => (
          <ListItem key={section.id} disablePadding onClick={() => handleSectionChange(section.id)}>
            <ListItemButton
              selected={activeSection === section.id}
              sx={{
                borderRadius: "0 25px 25px 0",
                mr: 2,
                "&.Mui-selected": {
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  "& .MuiListItemIcon-root": {
                    color: "primary.contrastText",
                  },
                },
                "&:hover": {
                  bgcolor: "primary.light",
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
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${240}px)` },
            ml: { sm: `${240}px` },
            bgcolor: "background.default",
            boxShadow: "none",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, color: "text.primary" }}>
              {sections.find((section) => section.id === activeSection)?.label}
            </Typography>
            <IconButton color="primary">
              <Bell />
            </IconButton>
            <IconButton color="primary">
              <LogOut />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box component="nav" sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
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
            mt: ["48px", "56px", "64px"],
            overflowX: "hidden",
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
              {activeSection === "overview" && <OverviewSection />}
              {activeSection === "classes" && <ClassesSection />}
              {activeSection === "assignments" && <AssignmentsSection />}
              {activeSection === "grades" && <GradesSection />}
              {activeSection === "attendance" && <AttendanceSection />}
              {activeSection === "schedule" && <ScheduleSection />}
              {activeSection === "resources" && <ResourcesSection />}
              {activeSection === "communications" && <CommunicationsSection />}
              {activeSection === "reports" && <ReportsSection />}
              {activeSection === "settings" && <SettingsSection />}
            </motion.div>
          </AnimatePresence>
        </Box>
        <Tooltip title="Quick Actions" placement="left">
          <Fab
            color="secondary"
            aria-label="quick actions"
            sx={{
              position: "fixed",
              bottom: 16,
              right: 16,
              "&:hover": {
                transform: "scale(1.1)",
              },
              transition: "all 0.3s ease-in-out",
            }}
          >
            <Zap />
          </Fab>
        </Tooltip>
      </Box>
    </ThemeProvider>
  )
}

const OverviewSection = () => {
  const animatedEntry = useAnimatedEntry()

  const stats = [
    { label: "Total Students", value: 150, icon: Users, color: theme.palette.primary.main },
    { label: "Classes Today", value: 4, icon: BookOpen, color: theme.palette.secondary.main },
    { label: "Assignments Due", value: 7, icon: FileText, color: theme.palette.tertiary.main },
    { label: "Average Attendance", value: "92%", icon: CheckCircle, color: theme.palette.success.main },
    { label: "Upcoming Events", value: 3, icon: Calendar, color: theme.palette.warning.main },
    { label: "Messages", value: 12, icon: MessageCircle, color: theme.palette.error.main },
  ]

  const performanceData = [
    { subject: "Math", avgScore: 85, classAvg: 78 },
    { subject: "Science", avgScore: 78, classAvg: 75 },
    { subject: "English", avgScore: 82, classAvg: 80 },
    { subject: "History", avgScore: 88, classAvg: 82 },
    { subject: "Computer Science", avgScore: 90, classAvg: 85 },
  ]

  return (
    <motion.div {...animatedEntry}>
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 260, damping: 20 }}
            >
              <Card
                sx={{
                  bgcolor: stat.color,
                  color: "white",
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
                  },
                }}
              >
                <CardContent>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
                Class Performance Overview
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Bar dataKey="avgScore" name="Class Average" fill={theme.palette.primary.main} />
                  <Bar dataKey="classAvg" name="School Average" fill={theme.palette.secondary.main} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upcoming Tasks
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <FileText />
                  </ListItemIcon>
                  <ListItemText primary="Grade Math Assignments" secondary="Due in 2 days" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Calendar />
                  </ListItemIcon>
                  <ListItemText primary="Parent-Teacher Meeting" secondary="Tomorrow, 3 PM" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Book />
                  </ListItemIcon>
                  <ListItemText primary="Prepare Lesson Plan" secondary="Due in 3 days" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </motion.div>
  )
}

const ClassesSection = () => {
  const animatedEntry = useAnimatedEntry()
  const classes = [
    { id: 1, name: "Mathematics 101", students: 30, time: "Mon, Wed, Fri 9:00 AM", room: "Room 201" },
    { id: 2, name: "Physics 202", students: 25, time: "Tue, Thu 11:00 AM", room: "Lab 101" },
    { id: 3, name: "English Literature", students: 28, time: "Mon, Wed 2:00 PM", room: "Room 305" },
    { id: 4, name: "Computer Science", students: 22, time: "Tue, Thu 1:00 PM", room: "Lab 202" },
    { id: 5, name: "World History", students: 27, time: "Fri 10:00 AM", room: "Room 401" },
  ]

  return (
    <motion.div {...animatedEntry}>
      <Typography variant="h4" gutterBottom>
        My Classes
      </Typography>
      <Grid container spacing={3}>
        {classes.map((classItem) => (
          <Grid item xs={12} md={6} key={classItem.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{classItem.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  <Users size={16} style={{ verticalAlign: "middle", marginRight: 5 }} />
                  {classItem.students} students
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <Clock size={16} style={{ verticalAlign: "middle", marginRight: 5 }} />
                  {classItem.time}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <BookOpen size={16} style={{ verticalAlign: "middle", marginRight: 5 }} />
                  {classItem.room}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button variant="contained" color="primary" startIcon={<Users />}>
                    View Students
                  </Button>
                  <Button variant="outlined" color="secondary" startIcon={<FileText />} sx={{ ml: 2 }}>
                    Assignments
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </motion.div>
  )
}

const AssignmentsSection = () => {
  const animatedEntry = useAnimatedEntry()
  const assignments = [
    { id: 1, title: "Math Problem Set", class: "Mathematics 101", dueDate: "2023-06-15", status: "Active" },
    { id: 2, title: "Physics Lab Report", class: "Physics 202", dueDate: "2023-06-18", status: "Grading" },
    { id: 3, title: "Literature Essay", class: "English Literature", dueDate: "2023-06-20", status: "Draft" },
    { id: 4, title: "Coding Project", class: "Computer Science", dueDate: "2023-06-25", status: "Active" },
    { id: 5, title: "History Research Paper", class: "World History", dueDate: "2023-06-30", status: "Draft" },
  ]

  return (
    <motion.div {...animatedEntry}>
      <Typography variant="h4" gutterBottom>
        Assignments
      </Typography>
      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {assignments.map((assignment) => (
                  <TableRow key={assignment.id}>
                    <TableCell>{assignment.title}</TableCell>
                    <TableCell>{assignment.class}</TableCell>
                    <TableCell>{assignment.dueDate}</TableCell>
                    <TableCell>
                      <Chip
                        label={assignment.status}
                        color={
                          assignment.status === "Active"
                            ? "success"
                            : assignment.status === "Grading"
                              ? "warning"
                              : "info"
                        }
                        sx={{ fontWeight: 600 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Button variant="outlined" size="small" startIcon={<FileText />} sx={{ mr: 1 }}>
                        Edit
                      </Button>
                      <Button variant="outlined" size="small" startIcon={<Users />}>
                        View Submissions
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
  )
}

const GradesSection = () => {
  const animatedEntry = useAnimatedEntry()
  const classes = [
    { id: 1, name: "Mathematics 101", avgGrade: 85 },
    { id: 2, name: "Physics 202", avgGrade: 78 },
    { id: 3, name: "English Literature", avgGrade: 82 },
    { id: 4, name: "Computer Science", avgGrade: 90 },
    { id: 5, name: "World History", avgGrade: 88 },
  ]

  return (
    <motion.div {...animatedEntry}>
      <Typography variant="h4" gutterBottom>
        Grades Overview
      </Typography>
      <Grid container spacing={3}>
        {classes.map((classItem) => (
          <Grid item xs={12} md={6} key={classItem.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{classItem.name}</Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Average Grade: {classItem.avgGrade}%
                </Typography>
                <LinearProgress variant="determinate" value={classItem.avgGrade} sx={{ height: 10, borderRadius: 5 }} />
                <Box sx={{ mt: 2 }}>
                  <Button variant="contained" color="primary" startIcon={<FileText />}>
                    View Detailed Grades
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </motion.div>
  )
}

const AttendanceSection = () => {
  const animatedEntry = useAnimatedEntry()
  const attendanceData = [
    { class: "Mathematics 101", present: 28, total: 30 },
    { class: "Physics 202", present: 23, total: 25 },
    { class: "English Literature", present: 26, total: 28 },
    { class: "Computer Science", present: 20, total: 22 },
    { class: "World History", present: 25, total: 27 },
  ]

  return (
    <motion.div {...animatedEntry}>
      <Typography variant="h4" gutterBottom>
        Attendance Overview
      </Typography>
      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Class</TableCell>
                  <TableCell align="right">Present</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell align="right">Percentage</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attendanceData.map((row) => (
                  <TableRow key={row.class}>
                    <TableCell component="th" scope="row">
                      {row.class}
                    </TableCell>
                    <TableCell align="right">{row.present}</TableCell>
                    <TableCell align="right">{row.total}</TableCell>
                    <TableCell align="right">
                      <LinearProgress
                        variant="determinate"
                        value={(row.present / row.total) * 100}
                        sx={{ height: 10, borderRadius: 5 }}
                      />
                      {((row.present / row.total) * 100).toFixed(2)}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const ScheduleSection = () => {
  const animatedEntry = useAnimatedEntry()
  const schedule = [
    { id: 1, class: "Mathematics 101", time: "9:00 AM - 10:30 AM", room: "Room 201", day: "Monday" },
    { id: 2, class: "Physics 202", time: "11:00 AM - 12:30 PM", room: "Lab 101", day: "Tuesday" },
    { id: 3, class: "English Literature", time: "2:00 PM - 3:30 PM", room: "Room 305", day: "Wednesday" },
    { id: 4, class: "Computer Science", time: "1:00 PM - 2:30 PM", room: "Lab 202", day: "Thursday" },
    { id: 5, class: "World History", time: "10:00 AM - 11:30 AM", room: "Room 401", day: "Friday" },
  ]

  return (
    <motion.div {...animatedEntry}>
      <Typography variant="h4" gutterBottom>
        Weekly Schedule
      </Typography>
      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Day</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Room</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {schedule.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.day}</TableCell>
                    <TableCell>{item.class}</TableCell>
                    <TableCell>{item.time}</TableCell>
                    <TableCell>{item.room}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const ResourcesSection = () => {
  const animatedEntry = useAnimatedEntry()
  const resources = [
    { id: 1, title: "Mathematics Textbook", type: "PDF", size: "15 MB", class: "Mathematics 101" },
    { id: 2, title: "Physics Lab Manual", type: "PDF", size: "8 MB", class: "Physics 202" },
    { id: 3, title: "English Literature Anthology", type: "EPUB", size: "12 MB", class: "English Literature" },
    { id: 4, title: "Programming Tutorial Series", type: "ZIP", size: "500 MB", class: "Computer Science" },
    { id: 5, title: "World History Atlas", type: "PDF", size: "20 MB", class: "World History" },
  ]

  return (
    <motion.div {...animatedEntry}>
      <Typography variant="h4" gutterBottom>
        Teaching Resources
      </Typography>
      <Card>
        <CardContent>
          <List>
            {resources.map((resource) => (
              <ListItem key={resource.id}>
                <ListItemIcon>
                  <Book />
                </ListItemIcon>
                <ListItemText
                  primary={resource.title}
                  secondary={`${resource.type} • ${resource.size} • ${resource.class}`}
                />
                <Button variant="contained" size="small" startIcon={<Download />}>
                  Download
                </Button>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const CommunicationsSection = () => {
  const animatedEntry = useAnimatedEntry()
  const messages = [
    { id: 1, from: "John Doe", subject: "Question about homework", date: "2023-06-10", read: false },
    { id: 2, from: "Jane Smith", subject: "Parent-teacher meeting", date: "2023-06-09", read: true },
    { id: 3, from: "Admin Office", subject: "Staff meeting reminder", date: "2023-06-08", read: true },
    { id: 4, from: "Mike Johnson", subject: "Field trip permission", date: "2023-06-07", read: false },
    { id: 5, from: "Sarah Williams", subject: "Student progress report", date: "2023-06-06", read: true },
  ]

  return (
    <motion.div {...animatedEntry}>
      <Typography variant="h4" gutterBottom>
        Communications
      </Typography>
      <Card>
        <CardContent>
          <List>
            {messages.map((message) => (
              <ListItem key={message.id} sx={{ bgcolor: message.read ? "transparent" : "action.hover" }}>
                <ListItemIcon>
                  <MessageCircle />
                </ListItemIcon>
                <ListItemText primary={message.subject} secondary={`From: ${message.from} • ${message.date}`} />
                <Button variant="outlined" size="small">
                  View
                </Button>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const ReportsSection = () => {
  const animatedEntry = useAnimatedEntry()
  const reports = [
    {
      id: 1,
      title: "Class Performance Report",
      description: "Overview of student performance in all classes",
      date: "2023-06-01",
    },
    {
      id: 2,
      title: "Attendance Summary",
      description: "Monthly attendance report for all classes",
      date: "2023-06-05",
    },
    {
      id: 3,
      title: "Grade Distribution Analysis",
      description: "Analysis of grade distribution across subjects",
      date: "2023-06-10",
    },
    { id: 4, title: "Student Progress Report", description: "Individual student progress reports", date: "2023-06-15" },
    {
      id: 5,
      title: "Resource Utilization Report",
      description: "Usage statistics for teaching resources",
      date: "2023-06-20",
    },
  ]

  return (
    <motion.div {...animatedEntry}>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>
      <Grid container spacing={3}>
        {reports.map((report) => (
          <Grid item xs={12} md={6} key={report.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{report.title}</Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {report.description}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Generated on: {report.date}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button variant="contained" color="primary" startIcon={<Download />}>
                    Download Report
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </motion.div>
  )
}

const SettingsSection = () => {
  const animatedEntry = useAnimatedEntry()
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: false,
    darkMode: false,
    language: "English",
  })

  const handleSettingChange = (setting, value) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [setting]: value,
    }))
  }

  return (
    <motion.div {...animatedEntry}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Card>
        <CardContent>
          <List>
            <ListItem>
              <ListItemText primary="Enable Notifications" />
              <Switch
                checked={settings.notifications}
                onChange={(e) => handleSettingChange("notifications", e.target.checked)}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Email Alerts" />
              <Switch
                checked={settings.emailAlerts}
                onChange={(e) => handleSettingChange("emailAlerts", e.target.checked)}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Dark Mode" />
              <Switch checked={settings.darkMode} onChange={(e) => handleSettingChange("darkMode", e.target.checked)} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Language" />
              <Select
                value={settings.language}
                onChange={(e) => handleSettingChange("language", e.target.value)}
                sx={{ minWidth: 120 }}
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

export default TeacherDashboard

