import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Button, TextField, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import useAnimatedEntry from './useAnimatedEntry';
import api from '../../api/axios';

const SettingsSection = () => {
  const animatedEntry = useAnimatedEntry();
  const [profileData, setProfileData] = useState({
    avatar: '',
    name: '',
    regNo: '',
    phoneNo: '',
    email: '',
    sem: '',
    branch: '',
  });

  const fetchCurrentUser  = async () => {
    try {
      const response = await api.post("/student/me");
      setProfileData({
        avatar: `http://localhost:8000/${response.data.data.profile}`,
        name: response.data.data.fullName,
        regNo: response.data.data.registerNumber,
        phoneNo: response.data.data.phoneNumber,
        email: response.data.data.email,
        sem: response.data.data.semester,
        branch: response.data.data.branch.name,
      });
    } catch (error) {
      console.error('Error fetching current user data', error);
    }
  };

  useEffect(() => {
    fetchCurrentUser ();
  }, []);

  return (
    <motion.div {...animatedEntry}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <Avatar src={profileData.avatar} sx={{ width: 100, height: 100 }} />
              <TextField label="Name" value={profileData.name} fullWidth />
              <TextField label="Registration Number" value={profileData.regNo} fullWidth disabled />
              <TextField label="Phone Number" value={profileData.phoneNo} fullWidth />
              <TextField label="Email" value={profileData.email} fullWidth />
              <Button variant="contained" color="primary" fullWidth>
                Save Profile
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Settings
              </Typography>
              {/* Add your settings options here */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default SettingsSection;


