import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { motion } from 'framer-motion'

// Import teacher-specific components
import TeacherOverview from '../components/teacher/TeacherOverview'
import CourseManagement from '../components/teacher/CourseManagement'
import GradeManagement from '../components/teacher/GradeManagement'
import StudentProgress from '../components/teacher/StudentProgress'

export default function TeacherDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <nav className="mt-10">
          <Link to="/teacher" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Overview</Link>
          <Link to="/teacher/courses" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Course Management</Link>
          <Link to="/teacher/grades" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Grade Management</Link>
          <Link to="/teacher/progress" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Student Progress</Link>
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
            <Route path="/" element={<TeacherOverview />} />
            <Route path="/courses" element={<CourseManagement />} />
            <Route path="/grades" element={<GradeManagement />} />
            <Route path="/progress" element={<StudentProgress />} />
          </Routes>
        </motion.div>
      </main>
    </div>
  )
}

