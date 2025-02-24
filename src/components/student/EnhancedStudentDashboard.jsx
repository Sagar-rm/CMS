import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, Box, CssBaseline, ThemeProvider } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { theme } from './theme'; // Assuming you have a theme file
import OverviewSection from './OverviewSection';
import GradesSection from './GradesSection';
import AttendanceSection from './AttendanceSection';
import ScheduleSection from './ScheduleSection';
import AssignmentsSection from './AssignmentsSection';
import ExamsSection from './ExamsSection';
import ResourcesSection from './ResourcesSection';
import ActivitiesSection from './ActivitiesSection';
import AchievementsSection from './AchievementsSection';
import SettingsSection from './SettingsSection';

const EnhancedStudentDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'grades', label: 'Grades' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'assignments', label: 'Assignments' },
    { id: 'exams', label: 'Exams' },
    { id: 'resources', label: 'Resources' },
    { id: 'activities', label: 'Activities' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'settings', label: 'Settings' },
  ];

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              {sections.find(section => section.id === activeSection)?.label}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent">
          {/* Drawer content with section buttons */}
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <AnimatePresence>
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
      </Box>
    </ThemeProvider>
  );
};

export default EnhancedStudentDashboard;