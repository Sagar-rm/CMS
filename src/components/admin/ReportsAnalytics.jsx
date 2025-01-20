import React from 'react'
import { motion } from 'framer-motion'
import { Typography, Grid, Card, CardContent } from '@mui/material'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export const ReportsAnalytics = () => {
  const enrollmentData = [
    { name: 'Jan', students: 400 },
    { name: 'Feb', students: 300 },
    { name: 'Mar', students: 500 },
    { name: 'Apr', students: 450 },
    { name: 'May', students: 470 },
    { name: 'Jun', students: 520 },
  ]

  const coursePopularityData = [
    { name: 'Computer Science', value: 400 },
    { name: 'Business', value: 300 },
    { name: 'Engineering', value: 300 },
    { name: 'Arts', value: 200 },
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  return (
    <motion.div
      className="p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Typography variant="h5" gutterBottom>
        Reports & Analytics
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Student Enrollment Trends
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={enrollmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="students" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Course Popularity
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={coursePopularityData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {coursePopularityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </motion.div>
  )
}

