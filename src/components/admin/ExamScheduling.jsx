import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiPlus, FiEdit, FiTrash2, FiCalendar, FiClock } from 'react-icons/fi'

const mockExams = [
  { id: 1, course: 'CS101', date: '2023-06-15', time: '09:00', duration: '3 hours', location: 'Hall A' },
  { id: 2, course: 'MATH301', date: '2023-06-16', time: '14:00', duration: '2 hours', location: 'Hall B' },
  { id: 3, course: 'ENG201', date: '2023-06-17', time: '10:00', duration: '2.5 hours', location: 'Hall C' },
]

export default function ExamScheduling() {
  const [exams, setExams] = useState(mockExams)
  const [newExam, setNewExam] = useState({ course: '', date: '', time: '', duration: '', location: '' })

  const handleInputChange = (e) => {
    setNewExam({ ...newExam, [e.target.name]: e.target.value })
  }

  const handleAddExam = (e) => {
    e.preventDefault()
    setExams([...exams, { ...newExam, id: exams.length + 1 }])
    setNewExam({ course: '', date: '', time: '', duration: '', location: '' })
  }

  const handleDeleteExam = (id) => {
    setExams(exams.filter(exam => exam.id !== id))
  }

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6"
      >
        Exam Scheduling
      </motion.h1>
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleAddExam}
        className="bg-white p-6 rounded-lg shadow-md mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="course"
            value={newExam.course}
            onChange={handleInputChange}
            placeholder="Course"
            className="border rounded px-3 py-2"
            required
          />
          <input
            type="date"
            name="date"
            value={newExam.date}
            onChange={handleInputChange}
            className="border rounded px-3 py-2"
            required
          />
          <input
            type="time"
            name="time"
            value={newExam.time}
            onChange={handleInputChange}
            className="border rounded px-3 py-2"
            required
          />
          <input
            type="text"
            name="duration"
            value={newExam.duration}
            onChange={handleInputChange}
            placeholder="Duration"
            className="border rounded px-3 py-2"
            required
          />
          <input
            type="text"
            name="location"
            value={newExam.location}
            onChange={handleInputChange}
            placeholder="Location"
            className="border rounded px-3 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors duration-200"
        >
          <FiPlus className="inline mr-2" />
          Add Exam
        </button>
      </motion.form>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg shadow-md overflow-hidden"
      >
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {exams.map((exam) => (
              <motion.tr
                key={exam.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <td className="px-6 py-4 whitespace-nowrap">{exam.course}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <FiCalendar className="inline mr-2" />
                  {exam.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <FiClock className="inline mr-2" />
                  {exam.time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{exam.duration}</td>
                <td className="px-6 py-4 whitespace-nowrap">{exam.location}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:text-blue-800 mr-2">
                    <FiEdit />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDeleteExam(exam.id)}
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  )
}

