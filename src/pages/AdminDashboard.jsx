import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiHome, FiUsers, FiBriefcase, FiCalendar, FiSettings, FiPieChart, FiTrendingUp, FiCheckCircle, FiAlertCircle, FiSearch, FiBook, FiClock, FiAward, FiFileText, FiBell, FiMail, FiLogOut, FiPlus, FiEdit, FiTrash2, FiDownload, FiUpload, FiSun, FiMoon } from 'react-icons/fi'
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
// import { Tooltip } from "@/components/ui/tooltip"
import  Calendar  from "@/components/ui/calendar"
import { AreaChart, Card as TremorCard, Title as TremorTitle, Text } from "@tremor/react"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ChartTooltip, Legend, ArcElement, PointElement, LineElement)

const AnimatedButton = motion(Button)

 function AdminDashboard() {
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <FiUsers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+10% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <FiBook className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">56</div>
            <p className="text-xs text-muted-foreground">+2 new courses this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
            <FiCheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">+5% from last semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
            <FiCalendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Next exam in 3 days</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Student Enrollment</CardTitle>
          </CardHeader>
          <CardContent>
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
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Course Distribution</CardTitle>
          </CardHeader>
          <CardContent>
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
            />
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )

  const renderStudents = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Student Management</CardTitle>
        </CardHeader>
        <CardContent>
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
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.course}</TableCell>
                  <TableCell>{student.attendance}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon"><FiEdit /></Button>
                    <Button variant="ghost" size="icon"><FiTrash2 /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  )

  const renderAttendance = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Attendance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Line
            data={{
              labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
              datasets: [
                {
                  label: 'Computer Science',
                  data: [95, 92, 98, 94, 96],
                  borderColor: 'rgba(124, 58, 237, 1)',
                  tension: 0.1,
                },
                {
                  label: 'Engineering',
                  data: [88, 90, 87, 91, 89],
                  borderColor: 'rgba(236, 72, 153, 1)',
                  tension: 0.1,
                },
              ],
            }}
          />
        </CardContent>
      </Card>
    </motion.div>
  )

  const renderExams = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Exams</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Location</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { course: 'Computer Science 101', date: '2023-06-15', time: '09:00 AM', location: 'Hall A' },
                { course: 'Engineering Mechanics', date: '2023-06-17', time: '10:30 AM', location: 'Hall B' },
                { course: 'Business Ethics', date: '2023-06-20', time: '02:00 PM', location: 'Hall C' },
              ].map((exam, index) => (
                <TableRow key={index}>
                  <TableCell>{exam.course}</TableCell>
                  <TableCell>{exam.date}</TableCell>
                  <TableCell>{exam.time}</TableCell>
                  <TableCell>{exam.location}</TableCell>
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Advanced Analytics</CardTitle>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
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
            <CardTitle>Quick Actions</CardTitle>
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
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="exams">Exams</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <AnimatePresence mode="wait">
            <TabsContent value="dashboard">{renderDashboard()}</TabsContent>
            <TabsContent value="students">{renderStudents()}</TabsContent>
            <TabsContent value="attendance">{renderAttendance()}</TabsContent>
            <TabsContent value="exams">{renderExams()}</TabsContent>
            <TabsContent value="analytics">{renderAnalytics()}</TabsContent>
          </AnimatePresence>
        </Tabs>
      </main>
    </div>
  )
}


export default AdminDashboard;

