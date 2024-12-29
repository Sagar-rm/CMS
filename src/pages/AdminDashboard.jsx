import React, { useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiUsers, FiBook, FiCalendar, FiClipboard, FiBell, FiSettings, FiLogOut } from 'react-icons/fi'

// Import admin-specific components
import AdminOverview from '../components/admin/AdminOverview'
import UserManagement from '../components/admin/UserManagement'
import CourseManagement from '../components/admin/CourseManagement'
import AttendanceTracking from '../components/admin/AttendanceTracking'
import ExamScheduling from '../components/admin/ExamScheduling'
import ResultManagement from '../components/admin/ResultManagement'
import Announcements from '../components/admin/Announcements'

const menuItems = [
  { icon: FiUsers, text: "User Management", link: "/admin/users" },
  { icon: FiBook, text: "Course Management", link: "/admin/courses" },
  { icon: FiCalendar, text: "Attendance Tracking", link: "/admin/attendance" },
  { icon: FiClipboard, text: "Exam Scheduling", link: "/admin/exams" },
  { icon: FiClipboard, text: "Result Management", link: "/admin/results" },
  { icon: FiBell, text: "Announcements", link: "/admin/announcements" },
]

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const location = useLocation()

  return (
    <div className="flex h-screen bg-gray-100">
      <motion.aside
        initial={{ width: 64 }}
        animate={{ width: isSidebarOpen ? 250 : 64 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-indigo-800 text-white overflow-hidden"
      >
        <div className="p-4">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold mb-4"
          >
            {isSidebarOpen ? "EduPro CMS" : "EP"}
          </motion.h1>
          <nav>
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className={`flex items-center py-2 px-4 rounded transition-colors duration-200 ${
                  location.pathname === item.link
                    ? "bg-indigo-700"
                    : "hover:bg-indigo-700"
                }`}
              >
                <item.icon className="mr-2" />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.text}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            ))}
          </nav>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <Link
            to="/settings"
            className="flex items-center py-2 px-4 hover:bg-indigo-700 rounded transition-colors duration-200"
          >
            <FiSettings className="mr-2" />
            {isSidebarOpen && <span>Settings</span>}
          </Link>
          <Link
            to="/logout"
            className="flex items-center py-2 px-4 hover:bg-indigo-700 rounded transition-colors duration-200"
          >
            <FiLogOut className="mr-2" />
            {isSidebarOpen && <span>Logout</span>}
          </Link>
        </div>
      </motion.aside>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-md">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-500 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center">
              <span className="mr-2">Welcome, Admin</span>
              <img
                className="w-8 h-8 rounded-full"
                src="/placeholder.svg?height=32&width=32"
                alt="Admin avatar"
              />
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <AnimatePresence mode="wait">
              <Routes>
                <Route
                  path="/"
                  element={
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <AdminOverview />
                    </motion.div>
                  }
                />
                <Route
                  path="/users"
                  element={
                    <motion.div
                      key="users"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <UserManagement />
                    </motion.div>
                  }
                />
                <Route
                  path="/courses"
                  element={
                    <motion.div
                      key="courses"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CourseManagement />
                    </motion.div>
                  }
                />
                <Route
                  path="/attendance"
                  element={
                    <motion.div
                      key="attendance"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <AttendanceTracking />
                    </motion.div>
                  }
                />
                <Route
                  path="/exams"
                  element={
                    <motion.div
                      key="exams"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ExamScheduling />
                    </motion.div>
                  }
                />
                <Route
                  path="/results"
                  element={
                    <motion.div
                      key="results"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ResultManagement />
                    </motion.div>
                  }
                />
                <Route
                  path="/announcements"
                  element={
                    <motion.div
                      key="announcements"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Announcements />
                    </motion.div>
                  }
                />
              </Routes>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  )
}

