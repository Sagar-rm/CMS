import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Award, CheckCircle, FileText, Calendar, Target, Zap } from 'react-feather';
import {
     XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend,
    ResponsiveContainer, AreaChart, Area, 
    RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
  } from 'recharts';  
import useAnimatedEntry from './useAnimatedEntry';
import useDataFetching from './useDataFetching';
import { theme } from './theme';

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

export default OverviewSection;