import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { motion } from 'framer-motion'

// Import student-specific components
import StudentOverview from '../components/student/OverviewSection'
import CourseEnrollment from '../components/student/CourseEnrollment'
import Grades from '../components/student/Grades'
import Attendance from '../components/student/Attendance'

export default function StudentDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <nav className="mt-10">
          <Link to="/student" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Overview</Link>
          <Link to="/student/courses" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Course Enrollment</Link>
          <Link to="/student/grades" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Grades</Link>
          <Link to="/student/attendance" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Attendance</Link>
        </nav>
      </aside>
      <main className="flex-1 p-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Routes>
            <Route path="/" element={<StudentOverview />} />
            <Route path="/courses" element={<CourseEnrollment />} />
            <Route path="/grades" element={<Grades />} />
            <Route path="/attendance" element={<Attendance />} />
          </Routes>
        </motion.div>
      </main>
    </div>
  )
}

