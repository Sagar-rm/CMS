import React from 'react'
import { motion } from 'framer-motion'
import { FiUsers, FiBook, FiCalendar, FiClipboard, FiBell } from 'react-icons/fi'

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const OverviewCard = ({ icon: Icon, title, value, color }) => (
  <motion.div
    variants={cardVariants}
    className={`bg-white p-6 rounded-lg shadow-md border-l-4 ${color}`}
  >
    <div className="flex items-center">
      <Icon className="text-2xl mr-4" />
      <div>
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </div>
  </motion.div>
)

export default function AdminOverview() {
  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6"
      >
        Admin Overview
      </motion.h1>
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <OverviewCard icon={FiUsers} title="Total Users" value="1,234" color="border-blue-500" />
        <OverviewCard icon={FiBook} title="Active Courses" value="56" color="border-green-500" />
        <OverviewCard icon={FiCalendar} title="Today's Attendance" value="95%" color="border-yellow-500" />
        <OverviewCard icon={FiClipboard} title="Upcoming Exams" value="12" color="border-red-500" />
        <OverviewCard icon={FiBell} title="New Announcements" value="3" color="border-purple-500" />
      </motion.div>
    </div>
  )
}

