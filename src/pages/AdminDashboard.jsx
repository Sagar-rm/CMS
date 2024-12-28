import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { motion } from 'framer-motion'

// Import admin-specific components
import AdminOverview from '../components/admin/AdminOverview'
import UserManagement from '../components/admin/UserManagement'
import CourseManagement from '../components/admin/CourseManagement'
import ReportingAnalytics from '../components/admin/ReportingAnalytics'

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <nav className="mt-10">
          <Link to="/admin" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Overview</Link>
          <Link to="/admin/users" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">User Management</Link>
          <Link to="/admin/courses" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Course Management</Link>
          <Link to="/admin/reports" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Reporting & Analytics</Link>
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
            <Route path="/" element={<AdminOverview />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/courses" element={<CourseManagement />} />
            <Route path="/reports" element={<ReportingAnalytics />} />
          </Routes>
        </motion.div>
      </main>
    </div>
  )
}

