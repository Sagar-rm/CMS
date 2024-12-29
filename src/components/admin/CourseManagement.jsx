import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi'

const mockCourses = [
  { id: 1, name: 'Introduction to Computer Science', code: 'CS101', instructor: 'Dr. Smith' },
  { id: 2, name: 'Advanced Mathematics', code: 'MATH301', instructor: 'Prof. Johnson' },
  { id: 3, name: 'English Literature', code: 'ENG201', instructor: 'Dr. Williams' },
]

export default function CourseManagement() {
  const [courses, setCourses] = useState(mockCourses)
  const [newCourse, setNewCourse] = useState({ name: '', code: '', instructor: '' })

  const handleInputChange = (e) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value })
  }

  const handleAddCourse = (e) => {
    e.preventDefault()
    setCourses([...courses, { ...newCourse, id: courses.length + 1 }])
    setNewCourse({ name: '', code: '', instructor: '' })
  }

  const handleDeleteCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id))
  }

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6"
      >
        Course Management
      </motion.h1>
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleAddCourse}
        className="bg-white p-6 rounded-lg shadow-md mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="name"
            value={newCourse.name}
            onChange={handleInputChange}
            placeholder="Course Name"
            className="border rounded px-3 py-2"
            required
          />
          <input
            type="text"
            name="code"
            value={newCourse.code}
            onChange={handleInputChange}
            placeholder="Course Code"
            className="border rounded px-3 py-2"
            required
          />
          <input
            type="text"
            name="instructor"
            value={newCourse.instructor}
            onChange={handleInputChange}
            placeholder="Instructor"
            className="border rounded px-3 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-200"
        >
          <FiPlus className="inline mr-2" />
          Add Course
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instructor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {courses.map((course) => (
              <motion.tr
                key={course.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <td className="px-6 py-4 whitespace-nowrap">{course.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{course.code}</td>
                <td className="px-6 py-4 whitespace-nowrap">{course.instructor}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:text-blue-800 mr-2">
                    <FiEdit />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDeleteCourse(course.id)}
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

