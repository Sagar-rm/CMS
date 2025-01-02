'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, BookOpen, UserPlus, Clipboard, Calendar, ChevronDown, ChevronUp, Menu, X } from 'lucide-react'

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

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('students')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const sidebarItems = [
    { id: 'students', icon: Users, label: 'Student Details' },
    { id: 'teachers', icon: UserPlus, label: 'Add Teachers' },
    { id: 'batches', icon: BookOpen, label: 'Add Batch' },
    { id: 'subjects', icon: Clipboard, label: 'Add Subjects' },
    { id: 'exams', icon: Calendar, label: 'Schedule Exams' },
  ]

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: isSidebarOpen ? 0 : -250 }}
        transition={{ duration: 0.3 }}
        className="w-64 bg-[#2e968b] text-white p-6"
      >
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-bold">CMS Admin</h1>
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
          {sidebarItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={`w-full justify-start mb-2 ${
                activeSection === item.id ? 'bg-[#704cd1] text-white' : 'text-white hover:bg-[#704cd1]/50'
              }`}
              onClick={() => setActiveSection(item.id)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </nav>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleSidebar}
            className="lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h2 className="text-xl font-semibold text-[#704cd1]">
            {sidebarItems.find(item => item.id === activeSection)?.label}
          </h2>
          <Button variant="outline">Logout</Button>
        </header>

        <main className="p-6">
          <AnimatedSection isVisible={activeSection === 'students'}>
            <StudentDetails />
          </AnimatedSection>
          <AnimatedSection isVisible={activeSection === 'teachers'}>
            <AddTeachers />
          </AnimatedSection>
          <AnimatedSection isVisible={activeSection === 'batches'}>
            <AddBatch />
          </AnimatedSection>
          <AnimatedSection isVisible={activeSection === 'subjects'}>
            <AddSubjects />
          </AnimatedSection>
          <AnimatedSection isVisible={activeSection === 'exams'}>
            <ScheduleExams />
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

const StudentDetails = () => {
  const [expandedYear, setExpandedYear] = useState(null)

  const years = [
    { year: '1st Year', courses: ['Course A', 'Course B', 'Course C'] },
    { year: '2nd Year', courses: ['Course D', 'Course E', 'Course F'] },
    { year: '3rd Year', courses: ['Course G', 'Course H', 'Course I'] },
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
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CardHeader>
          {expandedYear === index && (
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
          )}
        </Card>
      ))}
    </div>
  )
}

const AddTeachers = () => (
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
)

const AddBatch = () => (
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
              <option value="courseA">Course A</option>
              <option value="courseB">Course B</option>
              <option value="courseC">Course C</option>
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
)

const AddSubjects = () => (
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
)

const ScheduleExams = () => (
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
              <option value="math">Mathematics</option>
              <option value="science">Science</option>
              <option value="english">English</option>
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
)

export default AdminDashboard

