import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiCalendar, FiCheck, FiX } from 'react-icons/fi'

const mockAttendance = [
  { id: 1, date: '2023-05-01', course: 'CS101', present: 25, absent: 5 },
  { id: 2, date: '2023-05-02', course: 'MATH301', present: 30, absent: 2 },
  { id: 3, date: '2023-05-03', course: 'ENG201', present: 22, absent: 8 },
]

export default function AttendanceTracking() {
  const [attendanceRecords, setAttendanceRecords] = useState(mockAttendance)

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6"
      >
        Attendance Tracking
      </motion.h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg shadow-md overflow-hidden"
      >
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Present</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Absent</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {attendanceRecords.map((record) => (
              <motion.tr
                key={record.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <FiCalendar className="inline mr-2" />
                  {record.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{record.course}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <FiCheck className="inline mr-2 text-green-500" />
                  {record.present}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <FiX className="inline mr-2 text-red-500" />
                  {record.absent}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {((record.present / (record.present + record.absent)) * 100).toFixed(2)}%
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  )
}

