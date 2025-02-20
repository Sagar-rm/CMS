import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Grid, Card, CardContent, Typography, Avatar } from '@mui/material';
import { Users, BookOpen, Calendar, UserPlus } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import api from '../../api/axios'; // Adjust the import based on your project structure

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
);

export const DashboardOverview = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalExams, setTotalExams] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [upcomingExams, setUpcomingExams] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total students
        const studentsResponse = await api.get('/student');
        setTotalStudents(studentsResponse.data.data.length); // Assuming the response is an array

        // Fetch total exams
        const examsResponse = await api.get('/exam');
        const exams = examsResponse.data.data; // Assuming the response is an array
        setTotalExams(exams.length); // Total exams

        // Filter upcoming exams
        const currentDate = new Date();
        const upcomingExamsCount = exams.filter(exam => new Date(exam.date) > currentDate).length; // Assuming exam.date is a valid date string
        setUpcomingExams(upcomingExamsCount);

        // Fetch total courses
        const coursesResponse = await api.get('/subject'); // Adjust if you have a course endpoint
        setTotalCourses(coursesResponse.data.data.length); // Assuming the response is an array

        // Fetch total teachers
        const teachersResponse = await api.get('/admin'); // Adjust if you have a teachers endpoint
        setTotalTeachers(teachersResponse.data.data.length); // Assuming the response is an array
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Example chart data
  const chartData = [
    { name: 'Jan', students: totalStudents, courses: totalCourses, exams: totalExams },
    { name: 'Feb', students: totalStudents + 100, courses: totalCourses + 10, exams: totalExams + 5 },
    { name: 'Mar', students: totalStudents + 200, courses: totalCourses + 20, exams: totalExams + 10 },
    { name: 'Apr', students: totalStudents + 150, courses: totalCourses + 15, exams: totalExams + 8 },
    { name: 'May', students: totalStudents + 50, courses: totalCourses + 5, exams: totalExams + 2 },
  ];

  const pieData = [
    { name: 'Students', value: totalStudents },
    { name: 'Teachers', value: totalTeachers },
    { name: 'Courses', value: totalCourses },
    { name: 'Exams', value: totalExams },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <motion.div 
      className="p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard title="Total Students" value={totalStudents} icon={<Users />} color="#704cd1" />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard title="Active Courses" value={totalCourses} icon={<BookOpen />} color="#2e968b" />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard title="Upcoming Exams" value={upcomingExams} icon={<Calendar />} color="#d7205d" />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard title="Total Teachers" value={totalTeachers} icon={<UserPlus />} color="#ffa500" />
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
  );
};