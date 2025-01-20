import React from 'react'
import { motion } from 'framer-motion'
import { Grid, Card, CardContent, Typography, Avatar } from '@mui/material'
import { Users, BookOpen, Calendar, UserPlus } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const StatCard = ({ title, value, icon, color }) => (
  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
    <Card>
      <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <Typography color="textSecondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4">
            {value}
          </Typography>
        </div>
        <Avatar sx={{ bgcolor: color, width: 56, height: 56 }}>
          {icon}
        </Avatar>
      </CardContent>
    </Card>
  </motion.div>
)

export const DashboardOverview = () => {
  const chartData = [
    { name: 'Jan', students: 400, courses: 240, exams: 100 },
    { name: 'Feb', students: 300, courses: 139, exams: 80 },
    { name: 'Mar', students: 200, courses: 980, exams: 200 },
    { name: 'Apr', students: 278, courses: 390, exams: 150 },
    { name: 'May', students: 189, courses: 480, exams: 120 },
  ]

  const pieData = [
    { name: 'Students', value: 400 },
    { name: 'Teachers', value: 300 },
    { name: 'Courses', value: 300 },
    { name: 'Exams', value: 200 },
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  return (
    <motion.div 
      className="p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard title="Total Students" value="1,234" icon={<Users />} color="#704cd1" />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard title="Active Courses" value="56" icon={<BookOpen />} color="#2e968b" />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard title="Upcoming Exams" value="12" icon={<Calendar />} color="#d7205d" />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard title="Total Teachers" value="89" icon={<UserPlus />} color="#ffa500" />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Monthly Overview</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="students" fill="#704cd1" />
                  <Bar dataKey="courses" fill="#2e968b" />
                  <Bar dataKey="exams" fill="#d7205d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Distribution</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
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

