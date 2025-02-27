"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  useMediaQuery,
  Drawer,
  Fab,
  Tooltip,
  ThemeProvider,
  createTheme,
  CssBaseline,
  ListItemButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import {
  Bell,
  LogOut,
  Home,
  Award,
  CheckCircle,
  Calendar,
  FileText,
  BookOpen,
  Download,
  Activity,
  Settings,
  Zap,
  Menu as MenuIcon,
} from "react-feather"

import OverviewSection from "./OverviewSection"
import GradesSection from "./GradesSection"
import AttendanceSection from "./AttendanceSection"
import ScheduleSection from "./ScheduleSection"
import AssignmentsSection from "./AssignmentsSection"
import ExamsSection from "./ExamsSection"
import ResourcesSection from "./ResourcesSection"
import ActivitiesSection from "./ActivitiesSection"
import AchievementsSection from "./AchievementsSection"
import SettingsSection from "./SettingsSection"

// Custom theme (unchanged)
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

const EnhancedStudentDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview")
  const [mobileOpen, setMobileOpen] = useState(false)
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const sections = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "grades", label: "Grades", icon: Award },
    { id: "attendance", label: "Attendance", icon: CheckCircle },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "assignments", label: "Assignments", icon: FileText },
    { id: "exams", label: "Exams", icon: BookOpen },
    { id: "resources", label: "Resources", icon: Download },
    { id: "activities", label: "Activities", icon: Activity },
    { id: "achievements", label: "Achievements", icon: Award },
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
          EduPulse Student
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
              {activeSection === "grades" && <GradesSection />}
              {activeSection === "attendance" && <AttendanceSection />}
              {activeSection === "schedule" && <ScheduleSection />}
              {activeSection === "assignments" && <AssignmentsSection />}
              {activeSection === "exams" && <ExamsSection />}
              {activeSection === "resources" && <ResourcesSection />}
              {activeSection === "activities" && <ActivitiesSection />}
              {activeSection === "achievements" && <AchievementsSection />}
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

export default EnhancedStudentDashboard

