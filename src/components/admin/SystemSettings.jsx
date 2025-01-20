import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Typography, Card, CardContent, Grid, TextField, Button, Switch, FormControlLabel, Snackbar } from '@mui/material'
import { Save } from 'lucide-react'

export const SystemSettings = () => {
  const [settings, setSettings] = useState({
    schoolName: 'EduPulse Academy',
    adminEmail: 'admin@edupulse.com',
    maxStudentsPerClass: 30,
    enableOnlineClasses: true,
    enableAutoAttendance: false,
  })

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)

  const handleSettingChange = (setting, value) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [setting]: value
    }))
  }

  const handleSaveSettings = () => {
    // Here you would typically save the settings to your backend
    console.log('Saving settings:', settings)
    setIsSnackbarOpen(true)
  }

  return (
    <motion.div
      className="p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Typography variant="h5" gutterBottom>
        System Settings
      </Typography>

      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="School Name"
                fullWidth
                value={settings.schoolName}
                onChange={(e) => handleSettingChange('schoolName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Admin Email"
                fullWidth
                type="email"
                value={settings.adminEmail}
                onChange={(e) => handleSettingChange('adminEmail', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Max Students per Class"
                fullWidth
                type="number"
                value={settings.maxStudentsPerClass}
                onChange={(e) => handleSettingChange('maxStudentsPerClass', parseInt(e.target.value))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.enableOnlineClasses}
                    onChange={(e) => handleSettingChange('enableOnlineClasses', e.target.checked)}
                    color="primary"
                  />
                }
                label="Enable Online Classes"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.enableAutoAttendance}
                    onChange={(e) => handleSettingChange('enableAutoAttendance', e.target.checked)}
                    color="primary"
                  />
                }
                label="Enable Automatic Attendance"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Save />}
                onClick={handleSaveSettings}
              >
                Save Settings
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setIsSnackbarOpen(false)}
        message="Settings saved successfully"
      />
    </motion.div>
  )
}

