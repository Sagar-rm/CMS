'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, BookOpen, UserPlus, Clipboard, Calendar, Menu, X, Home, BarChart, PieChart, TrendingUp, AlertCircle, Bell, Settings, ChevronDown, ChevronUp, Search, ChevronsUpDown, Check, User2 } from 'lucide-react'
import { FiHome, FiUsers, FiBriefcase, FiCalendar, FiSettings, FiPieChart, FiTrendingUp, FiCheckCircle, FiAlertCircle, FiSearch, FiBook, FiClock, FiAward, FiFileText, FiBell, FiMail, FiLogOut, FiPlus, FiEdit, FiTrash2, FiDownload, FiUpload, FiSun, FiMoon, FiUser } from 'react-icons/fi'

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Separator  from "@/components/ui/separator"
import  Switch  from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// 

const EnhancedAdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [notifications, setNotifications] = useState(3)
  const [theme, setTheme] = useState('light')

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
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

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

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  return (
    <div className={`flex h-screen bg-background text-foreground transition-colors duration-300 ${theme}`}>
      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
            transition={{ duration: 0.3 }}
            className="w-64 bg-primary text-primary-foreground p-6 fixed h-full z-20"
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
                className="lg:hidden text-primary-foreground hover:text-primary-foreground/80"
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
                      activeSection === item.id ? 'bg-secondary text-secondary-foreground' : 'text-primary-foreground hover:bg-primary-foreground/10'
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
        <header className="bg-background shadow-sm p-4 flex justify-between items-center">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleSidebar}
              className="mr-2"
            >
              <Menu className="h-6 w-6" />
            </Button>
            <h2 className="text-xl font-semibold text-primary">
              {sidebarItems.find(item => item.id === activeSection)?.label}
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={toggleTheme}>
                    {theme === 'light' ? '🌙' : '☀️'}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle theme</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-2">
                  {notifications}
                </Badge>
              )}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem>
                  <User2 className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FiLogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6">
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
            <motion.div 
              key={index} 
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <activity.icon className="h-5 w-5 mr-2 text-primary" />
              <span>{activity.text}</span>
            </motion.div>
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
                  <ChevronUp className="h-4 w-4" />
                </motion.div>
              ) : (
                <ChevronDown className="h-4 w-4" />
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
                        <h4 className="font-semibold text-sm text-primary mb-2">{course}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Input placeholder="Search students..." />
                          <Select>
                            <option value="">Filter by semester</option>
                            <option value="1">Semester 1</option>
                            <option value="2">Semester 2</option>
                          </Select>
                          <Button className="bg-secondary hover:bg-secondary/90">
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

const ManageTeachers = () => {
  const [teachers, setTeachers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', subject: 'Mathematics' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', subject: 'Physics' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', subject: 'Chemistry' },
  ])

  const [newTeacher, setNewTeacher] = useState({ name: '', email: '', subject: '' })

  const handleInputChange = (e) => {
    setNewTeacher({ ...newTeacher, [e.target.name]: e.target.value })
  }

  const handleAddTeacher = () => {
    if (newTeacher.name && newTeacher.email && newTeacher.subject) {
      setTeachers([...teachers, { ...newTeacher, id: teachers.length + 1 }])
      setNewTeacher({ name: '', email: '', subject: '' })
    }
  }

  return (
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
                <Input id="name" name="name" value={newTeacher.name} onChange={handleInputChange} placeholder="Enter full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={newTeacher.email} onChange={handleInputChange} placeholder="Enter email address" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select id="subject" name="subject" value={newTeacher.subject} onChange={handleInputChange}>
                  <option value="">Select a subject</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-primary hover:bg-primary/90" onClick={handleAddTeacher}>Add Teacher</Button>
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
                  <th className="text-left">Email</th>
                  <th className="text-left">Subject</th>
                  <th className="text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher) => (
                  <motion.tr 
                    key={teacher.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td>{teacher.name}</td>
                    <td>{teacher.email}</td>
                    <td>{teacher.subject}</td>
                    <td>
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const ManageBatches = () => {
  const [batches, setBatches] = useState([
    { id: 1, name: 'CS2023', course: 'Computer Science', year: '1st Year', startDate: '2023-09-01' },
    { id: 2, name: 'EE2022', course: 'Electrical Engineering', year: '2nd Year', startDate: '2022-09-01' },
    { id: 3, name: 'ME2021', course: 'Mechanical Engineering', year: '3rd Year', startDate: '2021-09-01' },
  ])

  const [newBatch, setNewBatch] = useState({ name: '', course: '', year: '', startDate: '' })

  const handleInputChange = (e) => {
    setNewBatch({ ...newBatch, [e.target.name]: e.target.value })
  }

  const handleAddBatch = () => {
    if (newBatch.name && newBatch.course && newBatch.year && newBatch.startDate) {
      setBatches([...batches, { ...newBatch, id: batches.length + 1 }])
      setNewBatch({ name: '', course: '', year: '', startDate: '' })
    }
  }

  return (
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
                <Input id="batchName" name="name" value={newBatch.name} onChange={handleInputChange} placeholder="Enter batch name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="course">Course</Label>
                <Select id="course" name="course" value={newBatch.course} onChange={handleInputChange}>
                  <option value="">Select course</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Electrical Engineering">Electrical Engineering</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Select id="year" name="year" value={newBatch.year} onChange={handleInputChange}>
                  <option value="">Select year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" name="startDate" type="date" value={newBatch.startDate} onChange={handleInputChange} />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-secondary hover:bg-secondary/90" onClick={handleAddBatch}>Create Batch</Button>
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
                  <th className="text-left">Start Date</th>
                  <th className="text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {batches.map((batch) => (
                  <motion.tr 
                    key={batch.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td>{batch.name}</td>
                    <td>{batch.course}</td>
                    <td>{batch.year}</td>
                    <td>{batch.startDate}</td>
                    <td>
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const ManageSubjects = () => {
  const [subjects, setSubjects] = useState([
    { id: 1, name: 'Introduction to Programming', code: 'CS101', year: '1st Year', semester: 'Semester 1' },
    { id: 2, name: 'Digital Logic', code: 'EE102', year: '1st Year', semester: 'Semester 2' },
    { id: 3, name: 'Calculus', code: 'MA103', year: '2nd Year', semester: 'Semester 1' },
  ])

  const [newSubject, setNewSubject] = useState({ name: '', code: '', year: '', semester: '', description: '' })

  const handleInputChange = (e) => {
    setNewSubject({ ...newSubject, [e.target.name]: e.target.value })
  }

  const handleAddSubject = () => {
    if (newSubject.name && newSubject.code && newSubject.year && newSubject.semester) {
      setSubjects([...subjects, { ...newSubject, id: subjects.length + 1 }])
      setNewSubject({ name: '', code: '', year: '', semester: '', description: '' })
    }
  }

  return (
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
                <Input id="subjectName" name="name" value={newSubject.name} onChange={handleInputChange} placeholder="Enter subject name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subjectCode">Subject Code</Label>
                <Input id="subjectCode" name="code" value={newSubject.code} onChange={handleInputChange} placeholder="Enter subject code" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Select id="year" name="year" value={newSubject.year} onChange={handleInputChange}>
                  <option value="">Select year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="semester">Semester</Label>
                <Select id="semester" name="semester" value={newSubject.semester} onChange={handleInputChange}>
                  <option value="">Select semester</option>
                  <option value="Semester 1">Semester 1</option>
                  <option value="Semester 2">Semester 2</option>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                value={newSubject.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                rows={3}
                placeholder="Enter subject description"
              ></textarea>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-primary hover:bg-primary/90" onClick={handleAddSubject}>Add Subject</Button>
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
                  <th className="text-left">Semester</th>
                  <th className="text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject) => (
                  <motion.tr 
                    key={subject.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td>{subject.name}</td>
                    <td>{subject.code}</td>
                    <td>{subject.year}</td>
                    <td>{subject.semester}</td>
                    <td>
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const ScheduleExams = () => {
  const [exams, setExams] = useState([
    { id: 1, name: 'Midterm Exam', type: 'Midterm', subject: 'Introduction to Programming', batch: '2023 Batch A', date: '2023-05-15', time: '09:00' },
    { id: 2, name: 'Quiz 1', type: 'Quiz', subject: 'Digital Logic', batch: '2023 Batch B', date: '2023-05-20', time: '14:00' },
    { id: 3, name: 'Final Exam', type: 'Final', subject: 'Calculus', batch: '2022 Batch A', date: '2023-06-10', time: '10:00' },
  ])

  const [newExam, setNewExam] = useState({ name: '', type: '', subject: '', batch: '', date: '', time: '', instructions: '' })

  const handleInputChange = (e) => {
    setNewExam({ ...newExam, [e.target.name]: e.target.value })
  }

  const handleAddExam = () => {
    if (newExam.name && newExam.type && newExam.subject && newExam.batch && newExam.date && newExam.time) {
      setExams([...exams, { ...newExam, id: exams.length + 1 }])
      setNewExam({ name: '', type: '', subject: '', batch: '', date: '', time: '', instructions: '' })
    }
  }

  return (
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
                <Input id="examName" name="name" value={newExam.name} onChange={handleInputChange} placeholder="Enter exam name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="examType">Type</Label>
                <Select id="examType" name="type" value={newExam.type} onChange={handleInputChange}>
                  <option value="">Select type</option>
                  <option value="Midterm">Midterm Exam</option>
                  <option value="Final">Final Exam</option>
                  <option value="Quiz">Quiz</option>
                  <option value="Assignment">Assignment</option>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select id="subject" name="subject" value={newExam.subject} onChange={handleInputChange}>
                  <option value="">Select subject</option>
                  <option value="Introduction to Programming">Introduction to Programming</option>
                  <option value="Digital Logic">Digital Logic</option>
                  <option value="Calculus">Calculus</option>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="batch">Batch</Label>
                <Select id="batch" name="batch" value={newExam.batch} onChange={handleInputChange}>
                  <option value="">Select batch</option>
                  <option value="2023 Batch A">2023 Batch A</option>
                  <option value="2023 Batch B">2023 Batch B</option>
                  <option value="2022 Batch A">2022 Batch A</option>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="examDate">Date</Label>
                <Input id="examDate" name="date" type="date" value={newExam.date} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="examTime">Time</Label>
                <Input id="examTime" name="time" type="time" value={newExam.time} onChange={handleInputChange} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="examInstructions">Instructions</Label>
              <textarea
                id="examInstructions"
                name="instructions"
                value={newExam.instructions}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                rows={3}
                placeholder="Enter exam instructions"
              ></textarea>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-primary hover:bg-primary/90" onClick={handleAddExam}>Schedule Exam</Button>
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
                  <th className="text-left">Type</th>
                  <th className="text-left">Subject</th>
                  <th className="text-left">Batch</th>
                  <th className="text-left">Date</th>
                  <th className="text-left">Time</th>
                  <th className="text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {exams.map((exam) => (
                  <motion.tr 
                    key={exam.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td>{exam.name}</td>
                    <td>{exam.type}</td>
                    <td>{exam.subject}</td>
                    <td>{exam.batch}</td>
                    <td>{exam.date}</td>
                    <td>{exam.time}</td>
                    <td>
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm" className="text-destructive">Cancel</Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('studentPerformance')
  const [timePeriod, setTimePeriod] = useState('lastMonth')

  const handleGenerateReport = () => {
    // Implement report generation logic here
    console.log(`Generating ${selectedReport} report for ${timePeriod}`)
  }

  return (
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
                <Select id="reportType" value={selectedReport} onChange={(e) => setSelectedReport(e.target.value)}>
                  <option value="studentPerformance">Student Performance</option>
                  <option value="attendanceReport">Attendance Report</option>
                  <option value="examResults">Exam Results</option>
                  <option value="teacherPerformance">Teacher Performance</option>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timePeriod">Time Period</Label>
                <Select id="timePeriod" value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)}>
                  <option value="lastMonth">Last Month</option>
                  <option value="lastSemester">Last Semester</option>
                  <option value="lastYear">Last Year</option>
                </Select>
              </div>
            </div>
            <Button className="w-full bg-secondary hover:bg-secondary/90" onClick={handleGenerateReport}>Generate Report</Button>
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
              <motion.div 
                key={index} 
                className="flex items-center justify-between p-2 bg-muted rounded-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span>{report}</span>
                <Button variant="outline" size="sm">Download</Button>
              </motion.div>
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
            <div className="bg-muted p-4 rounded-md">
              <h4 className="font-semibold mb-2">Student Performance Trend</h4>
              {/* Placeholder for chart */}
              <div className="h-40 bg-background rounded-md flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div className="bg-muted p-4 rounded-md">
              <h4 className="font-semibold mb-2">Attendance Rate</h4>
              {/* Placeholder for chart */}
              <div className="h-40 bg-background rounded-md flex items-center justify-center">
                <PieChart className="h-8 w-8 text-secondary" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const NewSettings = () => {
  const [notifications, setNotifications] = useState(true)

  return (
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
              <Switch
                id="airplane-mode"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
              <Label htmlFor="airplane-mode">Enable Email Notifications</Label>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-primary hover:bg-primary/90">Save Settings</Button>
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
                  <motion.tr 
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <td>{user}</td>
                    <td>{index === 0 ? 'Admin' : 'Staff'}</td>
                    <td>
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm" className="text-destructive">Deactivate</Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-secondary hover:bg-secondary/90">Add New User</Button>
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
              <motion.div 
                key={index} 
                className="flex items-center space-x-2 p-2 bg-muted rounded-md"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <AlertCircle className="h-4 w-4 text-primary" />
                <span>{log}</span>
              </motion.div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">View All Logs</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default EnhancedAdminDashboard

