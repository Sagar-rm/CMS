"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  Avatar,
  Switch,
  Select,
  MenuItem,
} from "@mui/material"
import api from "../../api/axios"

const useAnimatedEntry = (delay = 0) => ({
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] },
})

const SettingsSection = () => {
  const animatedEntry = useAnimatedEntry()
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: false,
    darkMode: false,
    language: "English",
  })

  const [profileData, setProfileData] = useState({
    avatar: "",
    name: "",
    regNo: "",
    phoneNo: "",
    email: "",
    sem: "",
    branch: "",
  })

  // Fetch current user data from the backend
  const fetchCurrentUser = async () => {
    try {
      const response = await api.post("/student/me") // Adjust URL as per your API
      console.log(response.data.data)
      setProfileData({
        avatar: `http://localhost:8000/${response.data.data.profile}` || "",
        name: response.data.data.fullName || "",
        regNo: response.data.data.registerNumber || "",
        phoneNo: response.data.data.phoneNumber || "",
        email: response.data.data.email || "",
        sem: response.data.data.semester || "",
        branch: response.data.data.branch.name || "",
      })
    } catch (error) {
      console.error("Error fetching current user data", error)
      alert("Failed to load user data")
    }
  }

  useEffect(() => {
    fetchCurrentUser() // Fetch user data when the component mounts
  }, [])

  const handleSettingChange = (setting, value) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [setting]: value,
    }))
  }

  const handleProfileChange = (field, value) => {
    setProfileData((prevData) => ({
      ...prevData,
      [field]: value,
    }))
  }

  const handleSaveProfile = async () => {
    try {
      const formData = new FormData()
      if (profileData.avatar) {
        formData.append("profile", profileData.avatar)
      }
      formData.append("name", profileData.name)
      formData.append("phoneNo", profileData.phoneNo)
      formData.append("email", profileData.email)
      formData.append("sem", profileData.sem)
      formData.append("branch", profileData.branch)

      const response = await api.put(`/student/update-profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      if (response.status === 200) {
        alert("Profile updated successfully!")
      }
    } catch (error) {
      console.error("Error updating profile", error)
      alert("Failed to update profile. Please try again.")
    }
  }

  return (
    <motion.div {...animatedEntry}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar src={profileData.avatar} sx={{ width: 100, height: 100 }} />
                  <Button variant="outlined" component="label">
                    Upload Avatar
                    <input
                      type="file"
                      hidden
                      onChange={(e) => handleProfileChange("avatar", URL.createObjectURL(e.target.files[0]))}
                    />
                  </Button>
                </Box>
                <TextField
                  label="Name"
                  value={profileData.name}
                  onChange={(e) => handleProfileChange("name", e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Registration Number"
                  value={profileData.regNo}
                  onChange={(e) => handleProfileChange("regNo", e.target.value)}
                  fullWidth
                  disabled
                />
                <TextField
                  label="Phone Number"
                  value={profileData.phoneNo}
                  onChange={(e) => handleProfileChange("phoneNo", e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Email"
                  value={profileData.email}
                  onChange={(e) => handleProfileChange("email", e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Semester"
                  value={profileData.sem}
                  onChange={(e) => handleProfileChange("sem", e.target.value)}
                  fullWidth
                  disabled
                />
                <TextField
                  label="Branch"
                  value={profileData.branch}
                  onChange={(e) => handleProfileChange("branch", e.target.value)}
                  fullWidth
                  disabled
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    mt: 2,
                    borderRadius: "8px",
                    transition: "all 0.3s",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    },
                  }}
                  onClick={handleSaveProfile}
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
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography>Enable Notifications</Typography>
                  <Switch
                    checked={settings.notifications}
                    onChange={(e) => handleSettingChange("notifications", e.target.checked)}
                  />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography>Email Alerts</Typography>
                  <Switch
                    checked={settings.emailAlerts}
                    onChange={(e) => handleSettingChange("emailAlerts", e.target.checked)}
                  />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography>Dark Mode</Typography>
                  <Switch
                    checked={settings.darkMode}
                    onChange={(e) => handleSettingChange("darkMode", e.target.checked)}
                  />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography>Language</Typography>
                  <Select
                    value={settings.language}
                    onChange={(e) => handleSettingChange("language", e.target.value)}
                    sx={{ minWidth: 120 }}
                  >
                    <MenuItem value="English">English</MenuItem>
                    <MenuItem value="Spanish">Spanish</MenuItem>
                    <MenuItem value="French">French</MenuItem>
                  </Select>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </motion.div>
  )
}

export default SettingsSection

