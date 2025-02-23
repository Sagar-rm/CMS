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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
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
  return (
    <motion.div {...animatedEntry}>
      <Typography variant="h4" gutterBottom>
        Grades
      </Typography>
      {/* Add your Grades section content here */}
      <Typography variant="body1">This is the Grades section.</Typography>
    </motion.div>
  )
}

const AttendanceSection = () => {
  const animatedEntry = useAnimatedEntry()
  return (
    <motion.div {...animatedEntry}>
      <Typography variant="h4" gutterBottom>
        Attendance
      </Typography>
      {/* Add your Attendance section content here */}
      <Typography variant="body1">This is the Attendance section.</Typography>
    </motion.div>
  )
}

const ScheduleSection = () => {
  const animatedEntry = useAnimatedEntry()
  return (
    <motion.div {...animatedEntry}>
      <Typography variant="h4" gutterBottom>
        Schedule
      </Typography>
      {/* Add your Schedule section content here */}
      <Typography variant="body1">This is the Schedule section.</Typography>
    </motion.div>
  )
}

const ResourcesSection = () => {
  const animatedEntry = useAnimatedEntry()
  return (
    <motion.div {...animatedEntry}>
      <Typography variant="h4" gutterBottom>
        Resources
      </Typography>
      {/* Add your Resources section content here */}
      <Typography variant="body1">This is the Resources section.</Typography>
    </motion.div>
  )
}

const CommunicationsSection = () => {
  const animatedEntry = useAnimatedEntry()
  return (
    <motion.div {...animatedEntry}>
      <Typography variant="h4" gutterBottom>
        Communications
      </Typography>
      {/* Add your Communications section content here */}
      <Typography variant="body1">This is the Communications section.</Typography>
    </motion.div>
  )
}

const ReportsSection = () => {
  const animatedEntry = useAnimatedEntry()
  return (
    <motion.div {...animatedEntry}>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>
      {/* Add your Reports section content here */}
      <Typography variant="body1">This is the Reports section.</Typography>
    </motion.div>
  )
}

const SettingsSection = () => {
  const animatedEntry = useAnimatedEntry()
  return (
    <motion.div {...animatedEntry}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      {/* Add your Settings section content here */}
      <Typography variant="body1">This is the Settings section.</Typography>
    </motion.div>
  )
}

export default TeacherDashboard

