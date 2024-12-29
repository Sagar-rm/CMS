'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, BookOpen, UserPlus, Clipboard, Calendar, Menu, X, Home, BarChart, PieChart, TrendingUp, AlertCircle, Bell, Settings } from 'lucide-react'
import { FiChevronDown } from 'react-icons/fi';

// Importing shadcn/ui components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import  Progress  from "@/components/ui/progress"

const EnhancedAdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [notifications, setNotifications] = useState(3)

  const sidebarItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'students', icon: Users, label: 'Student Details' },
    { id: 'teachers', icon: UserPlus, label: 'Manage Teachers' },
    { id: 'batches', icon: BookOpen, label: 'Manage Batches' },
    { id: 'subjects', icon: Clipboard, label: 'Manage Subjects' },
    { id: 'exams', icon: Calendar, label: 'Schedule Exams' },
    { id: 'reports', icon: BarChart, label: 'Reports' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ]

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
            transition={{ duration: 0.3 }}
            className="w-64 bg-[#2e968b] text-white p-6 fixed h-full z-20"
          >
            <div className="flex justify-between items-center mb-10">
              <motion.h1 
                className="text-2xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                CMS Admin
              </motion.h1>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleSidebar}
                className="lg:hidden text-white hover:text-gray-200"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav>
              {sidebarItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    variant="ghost"
                    className={`w-full justify-start mb-2 ${
                      activeSection === item.id ? 'bg-[#704cd1] text-white' : 'text-white hover:bg-[#704cd1]/50'
                    }`}
                    onClick={() => setActiveSection(item.id)}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                </motion.div>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleSidebar}
              className="mr-2"
            >
              <Menu className="h-6 w-6" />
            </Button>
            <h2 className="text-xl font-semibold text-[#704cd1]">
              {sidebarItems.find(item => item.id === activeSection)?.label}
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-2">
                  {notifications}
                </Badge>
              )}
            </Button>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <AnimatedSection isVisible={activeSection === 'dashboard'}>
            <Dashboard />
          </AnimatedSection>
          <AnimatedSection isVisible={activeSection === 'students'}>
            <StudentDetails />
          </AnimatedSection>
          <AnimatedSection isVisible={activeSection === 'teachers'}>
            <ManageTeachers />
          </AnimatedSection>
          <AnimatedSection isVisible={activeSection === 'batches'}>
            <ManageBatches />
          </AnimatedSection>
          <AnimatedSection isVisible={activeSection === 'subjects'}>
            <ManageSubjects />
          </AnimatedSection>
          <AnimatedSection isVisible={activeSection === 'exams'}>
            <ScheduleExams />
          </AnimatedSection>
          <AnimatedSection isVisible={activeSection === 'reports'}>
            <Reports />
          </AnimatedSection>
          <AnimatedSection isVisible={activeSection === 'settings'}>
            <Settings />
          </AnimatedSection>
        </main>
      </div>
    </div>
  )
}

const AnimatedSection = ({ children, isVisible }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
    transition={{ duration: 0.3 }}
    style={{ display: isVisible ? 'block' : 'none' }}
  >
    {children}
  </motion.div>
)

const Dashboard = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Students</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">1,234</div>
        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
        <Progress value={75} className="mt-2" />
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
        <UserPlus className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">56</div>
        <p className="text-xs text-muted-foreground">+2 new this week</p>
        <Progress value={60} className="mt-2" />
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
        <Calendar className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">8</div>
        <p className="text-xs text-muted-foreground">Next exam in 3 days</p>
        <Progress value={40} className="mt-2" />
      </CardContent>
    </Card>
    <Card className="md:col-span-2 lg:col-span-3">
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            { icon: UserPlus, text: "New teacher John Doe added" },
            { icon: Users, text: "25 new students enrolled in Computer Science" },
            { icon: BookOpen, text: "New batch 'CS2023' created for 1st year" },
            { icon: Clipboard, text: "Subject 'Advanced Algorithms' added to curriculum" },
            { icon: Calendar, text: "Mid-term exams scheduled for next month" },
          ].map((activity, index) => (
            <div key={index} className="flex items-center">
              <activity.icon className="h-5 w-5 mr-2 text-[#704cd1]" />
              <span>{activity.text}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
)

const StudentDetails = () => {
  const [expandedYear, setExpandedYear] = useState(null)

  const years = [
    { year: '1st Year', courses: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering'] },
    { year: '2nd Year', courses: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering'] },
    { year: '3rd Year', courses: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering'] },
  ]

  return (
    <div className="space-y-6">
      {years.map((yearData, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {yearData.year} Students
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpandedYear(expandedYear === index ? null : index)}
            >
              {expandedYear === index ? (
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiChevronUp className="h-4 w-4" />
                </motion.div>
              ) : (
                <FiChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CardHeader>
          <AnimatePresence>
            {expandedYear === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CardContent>
                  <div className="space-y-4">
                    {yearData.courses.map((course, courseIndex) => (
                      <div key={courseIndex}>
                        <h4 className="font-semibold text-sm text-[#704cd1] mb-2">{course}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Input placeholder="Search students..." />
                          <Select>
                            <option value="">Filter by semester</option>
                            <option value="1">Semester 1</option>
                            <option value="2">Semester 2</option>
                          </Select>
                          <Button className="bg-[#2e968b] hover:bg-[#2e968b]/90">
                            View Students
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      ))}
    </div>
  )
}

const ManageTeachers = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>Add New Teacher</CardTitle>
        <CardDescription>Enter the details of the new teacher.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Enter full name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter email address" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="Enter phone number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select id="subject">
                <option value="">Select a subject</option>
                <option value="math">Mathematics</option>
                <option value="science">Science</option>
                <option value="english">English</option>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-[#704cd1] hover:bg-[#704cd1]/90">Add Teacher</Button>
      </CardFooter>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Teacher List</CardTitle>
        <CardDescription>View and manage existing teachers.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input placeholder="Search teachers..." />
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Name</th>
                <th className="text-left">Subject</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {['John Doe', 'Jane Smith', 'Bob Johnson'].map((name, index) => (
                <tr key={index}>
                  <td>{name}</td>
                  <td>Mathematics</td>
                  <td>
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-red-500">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
)

const ManageBatches = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>Create New Batch</CardTitle>
        <CardDescription>Set up a new batch for students.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="batchName">Batch Name</Label>
              <Input id="batchName" placeholder="Enter batch name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Select id="year">
                <option value="">Select year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="course">Course</Label>
              <Select id="course">
                <option value="">Select course</option>
                <option value="cs">Computer Science</option>
                <option value="ee">Electrical Engineering</option>
                <option value="me">Mechanical Engineering</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" type="date" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-[#2e968b] hover:bg-[#2e968b]/90">Create Batch</Button>
      </CardFooter>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Existing Batches</CardTitle>
        <CardDescription>View and manage current batches.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input placeholder="Search batches..." />
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Batch Name</th>
                <th className="text-left">Course</th>
                <th className="text-left">Year</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {['CS2023', 'EE2022', 'ME2021'].map((batch, index) => (
                <tr key={index}>
                  <td>{batch}</td>
                  <td>{['Computer Science', 'Electrical Engineering', 'Mechanical Engineering'][index]}</td>
                  <td>{['1st', '2nd', '3rd'][index]} Year</td>
                  <td>
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-red-500">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
)

const ManageSubjects = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>Add New Subject</CardTitle>
        <CardDescription>Create a new subject for the curriculum.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subjectName">Subject Name</Label>
              <Input id="subjectName" placeholder="Enter subject name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subjectCode">Subject Code</Label>
              <Input id="subjectCode" placeholder="Enter subject code" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Select id="year">
                <option value="">Select year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="semester">Semester</Label>
              <Select id="semester">
                <option value="">Select semester</option>
                <option value="1">Semester 1</option>
                <option value="2">Semester 2</option>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              className="w-full p-2 border rounded-md"
              rows={3}
              placeholder="Enter subject description"
            ></textarea>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-[#d7205d] hover:bg-[#d7205d]/90">Add Subject</Button>
      </CardFooter>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Subject List</CardTitle>
        <CardDescription>View and manage existing subjects.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input placeholder="Search subjects..." />
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Subject Name</th>
                <th className="text-left">Code</th>
                <th className="text-left">Year</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {['Introduction to Programming', 'Digital Logic', 'Calculus'].map((subject, index) => (
                <tr key={index}>
                  <td>{subject}</td>
                  <td>{['CS101', 'EE102', 'MA103'][index]}</td>
                  <td>{['1st', '1st', '2nd'][index]} Year</td>
                  <td>
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-red-500">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
)

const ScheduleExams = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>Schedule Exam or Assessment</CardTitle>
        <CardDescription>Plan upcoming exams or assessments for students.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="examName">Exam/Assessment Name</Label>
              <Input id="examName" placeholder="Enter exam name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="examType">Type</Label>
              <Select id="examType">
                <option value="">Select type</option>
                <option value="midterm">Midterm Exam</option>
                <option value="final">Final Exam</option>
                <option value="quiz">Quiz</option>
                <option value="assignment">Assignment</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select id="subject">
                <option value="">Select subject</option>
                <option value="cs101">CS101 - Introduction to Programming</option>
                <option value="ee102">EE102 - Digital Logic</option>
                <option value="ma103">MA103 - Calculus</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="batch">Batch</Label>
              <Select id="batch">
                <option value="">Select batch</option>
                <option value="2023A">2023 Batch A</option>
                <option value="2023B">2023 Batch B</option>
                <option value="2022A">2022 Batch A</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="examDate">Date</Label>
              <Input id="examDate" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="examTime">Time</Label>
              <Input id="examTime" type="time" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="examInstructions">Instructions</Label>
            <textarea
              id="examInstructions"
              className="w-full p-2 border rounded-md"
              rows={3}
              placeholder="Enter exam instructions"
            ></textarea>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-[#704cd1] hover:bg-[#704cd1]/90">Schedule Exam</Button>
      </CardFooter>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Upcoming Exams</CardTitle>
        <CardDescription>View and manage scheduled exams.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input placeholder="Search exams..." />
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Exam Name</th>
                <th className="text-left">Subject</th>
                <th className="text-left">Date</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {['Midterm Exam', 'Quiz 1', 'Final Exam'].map((exam, index) => (
                <tr key={index}>
                  <td>{exam}</td>
                  <td>{['Introduction to Programming', 'Digital Logic', 'Calculus'][index]}</td>
                  <td>{['2023-05-15', '2023-05-20', '2023-06-10'][index]}</td>
                  <td>
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-red-500">Cancel</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
)

const Reports = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>Generate Reports</CardTitle>
        <CardDescription>Create various reports for analysis and record-keeping.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reportType">Report Type</Label>
              <Select id="reportType">
                <option value="">Select report type</option>
                <option value="studentPerformance">Student Performance</option>
                <option value="attendanceReport">Attendance Report</option>
                <option value="examResults">Exam Results</option>
                <option value="teacherPerformance">Teacher Performance</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timePeriod">Time Period</Label>
              <Select id="timePeriod">
                <option value="">Select time period</option>
                <option value="lastMonth">Last Month</option>
                <option value="lastSemester">Last Semester</option>
                <option value="lastYear">Last Year</option>
              </Select>
            </div>
          </div>
          <Button className="w-full bg-[#2e968b] hover:bg-[#2e968b]/90">Generate Report</Button>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Recent Reports</CardTitle>
        <CardDescription>View and download recently generated reports.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {['Student Performance Report - May 2023', 'Attendance Report - April 2023', 'Exam Results - Spring Semester 2023'].map((report, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-100 rounded-md">
              <span>{report}</span>
              <Button variant="outline" size="sm">Download</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Analytics Dashboard</CardTitle>
        <CardDescription>Key performance indicators and trends.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-100 p-4 rounded-md">
            <h4 className="font-semibold mb-2">Student Performance Trend</h4>
            {/* Placeholder for chart */}
            <div className="h-40 bg-gray-200 rounded-md flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-[#704cd1]" />
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-md">
            <h4 className="font-semibold mb-2">Attendance Rate</h4>
            {/* Placeholder for chart */}
            <div className="h-40 bg-gray-200 rounded-md flex items-center justify-center">
              <PieChart className="h-8 w-8 text-[#2e968b]" /><PieChart className="h-8 w-8 text-[#2e968b]" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
)

const NewSettings = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>System Settings</CardTitle>
        <CardDescription>Configure global settings for the CMS.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="academicYear">Current Academic Year</Label>
            <Input id="academicYear" placeholder="e.g., 2023-2024" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="semesterDates">Semester Dates</Label>
            <div className="grid grid-cols-2 gap-4">
              <Input type="date" placeholder="Start Date" />
              <Input type="date" placeholder="End Date" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="gradeScale">Grading Scale</Label>
            <Select id="gradeScale">
              <option value="percentage">Percentage</option>
              <option value="letterGrade">Letter Grade</option>
              <option value="gpa">GPA</option>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="enableNotifications" />
            <Label htmlFor="enableNotifications">Enable Email Notifications</Label>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-[#704cd1] hover:bg-[#704cd1]/90">Save Settings</Button>
      </CardFooter>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>Manage admin and staff accounts.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input placeholder="Search users..." />
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Name</th>
                <th className="text-left">Role</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {['Admin User', 'Staff Member 1', 'Staff Member 2'].map((user, index) => (
                <tr key={index}>
                  <td>{user}</td>
                  <td>{index === 0 ? 'Admin' : 'Staff'}</td>
                  <td>
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-red-500">Deactivate</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-[#2e968b] hover:bg-[#2e968b]/90">Add New User</Button>
      </CardFooter>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>System Logs</CardTitle>
        <CardDescription>View recent system activities and errors.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {['User login: Admin (2023-05-10 09:15:00)', 'New student added: John Doe (2023-05-09 14:30:00)', 'Exam scheduled: CS101 Midterm (2023-05-08 11:45:00)'].map((log, index) => (
            <div key={index} className="flex items-center space-x-2 p-2 bg-gray-100 rounded-md">
              <AlertCircle className="h-4 w-4 text-[#704cd1]" />
              <span>{log}</span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">View All Logs</Button>
      </CardFooter>
    </Card>
  </div>
)

export default EnhancedAdminDashboard

