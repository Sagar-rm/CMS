import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiHome, FiUsers, FiBriefcase, FiCalendar, FiSettings, FiPieChart, FiTrendingUp, FiCheckCircle, FiAlertCircle, FiSearch, FiBook, FiClock, FiAward, FiFileText, FiBell, FiMail, FiLogOut, FiPlus, FiEdit, FiTrash2, FiDownload, FiUpload, FiSun, FiMoon, FiUser } from 'react-icons/fi'
import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip as ChartTooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import  Calendar  from "@/components/ui/calendar"
import { AreaChart, Card as TremorCard, Title as TremorTitle, Text } from "@tremor/react"
import  Progress  from "@/components/ui/progress"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ChartTooltip, Legend, ArcElement, PointElement, LineElement)

const AnimatedButton = motion(Button)

const AnimatedCard = ({ icon: Icon, title, value, change }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{change}</p>
      </CardContent>
    </Card>
  </motion.div>
)

const AnimatedChart = ({ title, chart }) => (
  <motion.div
    className="col-span-2"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
  >
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {chart}
      </CardContent>
    </Card>
  </motion.div>
)

const TeacherManagement = () => {
  const teachers = [
    { id: '001', name: 'Dr. Jane Smith', department: 'Computer Science', courses: ['CS101', 'CS202'], status: 'Active' },
    { id: '002', name: 'Prof. Michael Johnson', department: 'Engineering', courses: ['ENG101', 'ENG303'], status: 'On Leave' },
    { id: '003', name: 'Dr. Emily Brown', department: 'Business', courses: ['BUS201', 'BUS405'], status: 'Active' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Teacher Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Input placeholder="Search teachers..." className="max-w-sm" />
            <Button>
              <FiPlus className="mr-2" /> Add New Teacher
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell className="font-medium">{teacher.name}</TableCell>
                  <TableCell>{teacher.id}</TableCell>
                  <TableCell>{teacher.department}</TableCell>
                  <TableCell>{teacher.courses.join(', ')}</TableCell>
                  <TableCell>
                    <Badge variant={teacher.status === 'Active' ? 'success' : 'warning'}>
                      {teacher.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon">
                            <FiEdit className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit teacher</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon">
                            <FiTrash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete teacher</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const AttendanceTracking = () => {
  const attendanceData = [
    { date: '2023-06-01', present: 120, absent: 10, late: 5 },
    { date: '2023-06-02', present: 115, absent: 12, late: 8 },
    { date: '2023-06-03', present: 118, absent: 7, late: 10 },
    { date: '2023-06-04', present: 122, absent: 8, late: 5 },
    { date: '2023-06-05', present: 119, absent: 11, late: 5 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Attendance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cs101">CS101: Intro to Programming</SelectItem>
                <SelectItem value="eng201">ENG201: Advanced Engineering</SelectItem>
                <SelectItem value="bus301">BUS301: Business Ethics</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2">
              <FiCalendar className="text-muted-foreground" />
              <span>June 1-5, 2023</span>
            </div>
          </div>
          <Line
            data={{
              labels: attendanceData.map(d => d.date),
              datasets: [
                {
                  label: 'Present',
                  data: attendanceData.map(d => d.present),
                  borderColor: 'rgba(34, 197, 94, 1)',
                  backgroundColor: 'rgba(34, 197, 94, 0.2)',
                },
                {
                  label: 'Absent',
                  data: attendanceData.map(d => d.absent),
                  borderColor: 'rgba(239, 68, 68, 1)',
                  backgroundColor: 'rgba(239, 68, 68, 0.2)',
                },
                {
                  label: 'Late',
                  data: attendanceData.map(d => d.late),
                  borderColor: 'rgba(234, 179, 8, 1)',
                  backgroundColor: 'rgba(234, 179, 8, 0.2)',
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Daily Attendance',
                },
              },
            }}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Recent Attendance Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { student: 'Alice Johnson', course: 'CS101', date: '2023-06-05', time: '09:05 AM', status: 'Present' },
                { student: 'Bob Smith', course: 'ENG201', date: '2023-06-05', time: '10:15 AM', status: 'Late' },
                { student: 'Charlie Brown', course: 'BUS301', date: '2023-06-05', time: '11:00 AM', status: 'Absent' },
              ].map((record, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{record.student}</TableCell>
                  <TableCell>{record.course}</TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <FiClock className="mr-2 text-muted-foreground" />
                      {record.time}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        record.status === 'Present' ? 'success' :
                        record.status === 'Late' ? 'warning' : 'destructive'
                      }
                    >
                      {record.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const StudentProfile = ({ student }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={`https://avatars.dicebear.com/api/initials/${student.name}.svg`} />
              <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{student.name}</h2>
              <p className="text-muted-foreground">{student.email}</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 flex items-center"><FiBook className="mr-2" /> Course Information</h3>
              <p><span className="font-medium">Current Course:</span> {student.course}</p>
              <p><span className="font-medium">Batch:</span> {student.batch}</p>
              <p><span className="font-medium">Progress:</span></p>
              <Progress value={(student.completedCourses / student.totalCourses) * 100} className="mt-2" />
              <p className="text-sm text-muted-foreground mt-1">
                {student.completedCourses} out of {student.totalCourses} courses completed
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center"><FiCalendar className="mr-2" /> Attendance & Performance</h3>
              <p><span className="font-medium">Attendance Rate:</span> {student.attendance}</p>
              <p>
                <span className="font-medium">Performance:</span>
                <Badge variant={student.performance === 'Excellent' ? 'default' : 'secondary'} className="ml-2">
                  {student.performance}
                </Badge>
              </p>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold mb-2 flex items-center"><FiAward className="mr-2" /> Awards & Achievements</h3>
            <div className="flex flex-wrap gap-2">
              {student.awards.map((award, index) => (
                <Badge key={index} variant="outline">{award}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const renderDashboard = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      <AnimatedCard icon={FiUsers} title="Total Students" value="1,234" change="+10% from last month" />
      <AnimatedCard icon={FiBook} title="Active Courses" value="56" change="+2 new courses this week" />
      <AnimatedCard icon={FiCheckCircle} title="Average Attendance" value="92%" change="+5% from last semester" />
      <AnimatedCard icon={FiCalendar} title="Upcoming Exams" value="8" change="Next exam in 3 days" />
      <AnimatedChart
        title="Student Enrollment"
        chart={
          <Bar
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              datasets: [
                {
                  label: 'New Students',
                  data: [65, 59, 80, 81, 56, 55],
                  backgroundColor: 'rgba(124, 58, 237, 0.5)',
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Monthly Student Enrollment',
                },
              },
            }}
          />
        }
      />
      <AnimatedChart
        title="Course Distribution"
        chart={
          <Pie
            data={{
              labels: ['Computer Science', 'Engineering', 'Business', 'Arts', 'Others'],
              datasets: [
                {
                  data: [30, 25, 20, 15, 10],
                  backgroundColor: [
                    'rgba(124, 58, 237, 0.8)',
                    'rgba(236, 72, 153, 0.8)',
                    'rgba(34, 211, 238, 0.8)',
                    'rgba(251, 191, 36, 0.8)',
                    'rgba(52, 211, 153, 0.8)',
                  ],
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'right',
                },
                title: {
                  display: true,
                  text: 'Course Distribution',
                },
              },
            }}
          />
        }
      />
    </motion.div>
  )

  const renderStudents = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Student Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Input placeholder="Search students..." className="max-w-sm" />
            <Button>
              <FiPlus className="mr-2" /> Add New Student
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { name: 'Alice Johnson', id: '001', course: 'Computer Science', attendance: '95%' },
                { name: 'Bob Smith', id: '002', course: 'Engineering', attendance: '88%' },
                { name: 'Charlie Brown', id: '003', course: 'Business', attendance: '92%' },
              ].map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.course}</TableCell>
                  <TableCell>
                    <Badge variant={student.attendance >= '90%' ? 'success' : 'warning'}>
                      {student.attendance}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon">
                            <FiEdit className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit student</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon">
                            <FiTrash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete student</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  )

  const renderExams = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Upcoming Exams</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { course: 'Computer Science 101', date: '2023-06-15', time: '09:00 AM', location: 'Hall A' },
                { course: 'Engineering Mechanics', date: '2023-06-17', time: '10:30 AM', location: 'Hall B' },
                { course: 'Business Ethics', date: '2023-06-20', time: '02:00 PM', location: 'Hall C' },
              ].map((exam, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{exam.course}</TableCell>
                  <TableCell>{exam.date}</TableCell>
                  <TableCell>{exam.time}</TableCell>
                  <TableCell>{exam.location}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm">
                            <FiEdit className="mr-2 h-4 w-4" /> Edit
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit exam details</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm">
                            <FiTrash2 className="mr-2 h-4 w-4" /> Cancel
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Cancel exam</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  )

  const renderAnalytics = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Advanced Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TremorCard>
              <TremorTitle>Student Enrollment Trend</TremorTitle>
              <AreaChart
                className="h-72 mt-4"
                data={[
                  { date: "Jan 22", "Computer Science": 25, "Data Science": 30, "Web Development": 40 },
                  { date: "Feb 22", "Computer Science": 30, "Data Science": 35, "Web Development": 45 },
                  { date: "Mar 22", "Computer Science": 35, "Data Science": 40, "Web Development": 50 },
                  { date: "Apr 22", "Computer Science": 40, "Data Science": 45, "Web Development": 55 },
                  { date: "May 22", "Computer Science": 45, "Data Science": 50, "Web Development": 60 },
                ]}
                index="date"
                categories={["Computer Science", "Data Science", "Web Development"]}
                colors={["indigo", "cyan", "amber"]}
              />
            </TremorCard>
            <Card>
              <CardHeader>
                <CardTitle>Course Popularity</CardTitle>
              </CardHeader>
              <CardContent>
                <Doughnut
                  data={{
                    labels: ['Web Development', 'Data Science', 'UI/UX Design', 'Machine Learning', 'Mobile App Development'],
                    datasets: [
                      {
                        data: [30, 25, 20, 15, 10],
                        backgroundColor: [
                          'rgba(124, 58, 237, 0.8)',
                          'rgba(236, 72, 153, 0.8)',
                          'rgba(34, 211, 238, 0.8)',
                          'rgba(251, 191, 36, 0.8)',
                          'rgba(52, 211, 153, 0.8)',
                        ],
                      },
                    ],
                  }}
                  options={{ responsive: true }}
                />
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={new Date()}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <AnimatedButton
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(124, 58, 237)" }}
                whileTap={{ scale: 0.95 }}
              >
                <FiDownload className="mr-2" /> Export Report
              </AnimatedButton>
              <AnimatedButton
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(236, 72, 153)" }}
                whileTap={{ scale: 0.95 }}
              >
                <FiUpload className="mr-2" /> Import Data
              </AnimatedButton>
              <AnimatedButton
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(34, 211, 238)" }}
                whileTap={{ scale: 0.95 }}
              >
                <FiMail className="mr-2" /> Send Newsletter
              </AnimatedButton>
              <AnimatedButton
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(251, 191, 36)" }}
                whileTap={{ scale: 0.95 }}
              >
                <FiSettings className="mr-2" /> System Settings
              </AnimatedButton>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )

  const renderStudentProfile = () => {
    const sampleStudent = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      course: 'Computer Science',
      batch: '2023A',
      completedCourses: 8,
      totalCourses: 12,
      attendance: '95%',
      performance: 'Excellent',
      awards: ['Best Project', 'Academic Excellence', 'Leadership Award']
    }

    return <StudentProfile student={sampleStudent} />
  }

  const renderTeacherManagement = () => <TeacherManagement />

  const renderAttendance = () => <AttendanceTracking />

  return (
    <div className={`flex h-screen bg-background transition-colors duration-200 ${isDarkMode ? 'dark' : ''}`}>
      <motion.aside
        className="w-64 bg-card shadow-md"
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">EduPro CMS</h1>
          <nav>
            <ul className="space-y-2">
              <li>
                <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab('dashboard')}>
                  <FiHome className="mr-2" /> Dashboard
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab('students')}>
                  <FiUsers className="mr-2" /> Students
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab('teachers')}>
                  <FiBriefcase className="mr-2" /> Teachers
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab('attendance')}>
                  <FiCheckCircle className="mr-2" /> Attendance
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab('exams')}>
                  <FiFileText className="mr-2" /> Exams
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab('analytics')}>
                  <FiPieChart className="mr-2" /> Analytics
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab('studentProfile')}>
                  <FiUser className="mr-2" /> Student Profile
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </motion.aside>

      <main className="flex-1 p-8 overflow-auto">
        <motion.div
          className="mb-8 flex justify-between items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold">Welcome, Admin</h1>
          <div className="flex items-center space-x-4">
            <Input
              type="text"
              placeholder="Search..."
              className="max-w-xs"
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <AnimatedButton
                  variant="outline"
                  size="icon"
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(124, 58, 237, 0.1)",
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isDarkMode ? <FiSun className="h-4 w-4" /> : <FiMoon className="h-4 w-4" />}
                </AnimatedButton>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle dark mode</p>
              </TooltipContent>
            </Tooltip>
            <AnimatedButton
              variant="outline"
              size="icon"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiBell className="h-4 w-4" />
            </AnimatedButton>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </motion.div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="exams">Exams</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="studentProfile">Student Profile</TabsTrigger>
          </TabsList>
          <AnimatePresence mode="wait">
            <TabsContent value="dashboard">{renderDashboard()}</TabsContent>
            <TabsContent value="students">{renderStudents()}</TabsContent>
            <TabsContent value="teachers">{renderTeacherManagement()}</TabsContent>
            <TabsContent value="attendance">{renderAttendance()}</TabsContent>
            <TabsContent value="exams">{renderExams()}</TabsContent>
            <TabsContent value="analytics">{renderAnalytics()}</TabsContent>
            <TabsContent value="studentProfile">{renderStudentProfile()}</TabsContent>
          </AnimatePresence>
        </Tabs>
      </main>
    </div>
  )
}

export default AdminDashboard;