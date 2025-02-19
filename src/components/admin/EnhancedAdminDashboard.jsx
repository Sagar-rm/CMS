'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMediaQuery } from '@mui/material'
import { Bell, LogOut, Home, Users, User, BookOpen, Briefcase, Calendar, Activity, DollarSign, Settings, MenuIcon, Zap } from 'lucide-react'
import { ThemeProvider } from '@mui/material/styles'

import { 
  AppBar, Toolbar, IconButton, Drawer, Box, Typography, List, ListItem, 
  ListItemButton, ListItemIcon, ListItemText, CssBaseline, Fab, Tooltip
} from '@mui/material'

import { theme } from './theme'
import { DashboardOverview } from './DashboardOverview'
import { StudentDetails } from './StudentDetails'
import { StudentManagement } from './StudentManagement'
import { TeacherManagement } from './TeacherManagement'
import { CourseManagement } from './CourseManagement'
import { BranchManagement } from './BranchManagement'
import { ExamScheduling } from './ExamScheduling'
import { ReportsAnalytics } from './ReportsAnalytics'
import { FinancialManagement } from './FinancialManagement'
import { SystemSettings } from './SystemSettings'
import { AddMarks } from './MarksManagement'

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
    { id: 'marks', label: 'Marks Assignment', icon: Settings},
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
              {activeSection === 'marks' && <AddMarks />}
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

export default EnhancedAdminDashboard

