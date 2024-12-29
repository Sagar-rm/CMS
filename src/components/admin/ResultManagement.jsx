import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi'

const mockResults = [
  { id: 1, student: 'John Doe', course: 'CS101', grade: 'A', score: 92 },
  { id: 2, student: 'Jane Smith', course: 'MATH301', grade: 'B+', score: 87 },
  { id: 3, student: 'Alice Johnson', course: 'ENG201', grade: 'A-', score: 90 },
]

export default function ResultManagement() {
  const [results, setResults] = useState(mockResults)
  const [newResult, setNewResult] = useState({ student: '', course: '', grade: '', score: '' })

  const handleInputChange = (e) => {
    setNewResult({ ...newResult, [e.target.name]: e.target.value })
  }

  const handleAddResult = (e) => {
    e.preventDefault()
    setResults([...results, { ...newResult, id: results.length + 1 }])
    setNewResult({ student: '', course: '', grade: '', score: '' })
  }

  const handleDeleteResult = (id) => {
    setResults(results.filter(result => result.id !== id))
  }

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6"
      >
        Result Management
      </motion.h1>
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleAddResult}
        className="bg-white p-6 rounded-lg shadow-md mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            name="student"
            value={newResult.student}
            onChange={handleInputChange}
            placeholder="Student Name"
            className="border rounded px-3 py-2"
            required
          />
          <input
            type="text"
            name="course"
            value={newResult.course}
            onChange={handleInputChange}
            placeholder="Course"
            className="border rounded px-3 py-2"
            required
          />
          <input
            type="text"
            name="grade"
            value={newResult.grade}
            onChange={handleInputChange}
            placeholder="Grade"
            className="border rounded px-3 py-2"
            required
          />
          <input
            type="number"
            name="score"
            value={newResult.score}
            onChange={handleInputChange}
            placeholder="Score"
            className="border rounded px-3 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors duration-200"
        >
          <FiPlus className="inline mr-2" />
          Add Result
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {results.map((result) => (
              <motion.tr
                key={result.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <td className="px-6 py-4 whitespace-nowrap">{result.student}</td>
                <td className="px-6 py-4 whitespace-nowrap">{result.course}</td>
                <td className="px-6 py-4 whitespace-nowrap">{result.grade}</td>
                <td className="px-6 py-4 whitespace-nowrap">{result.score}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:text-blue-800 mr-2">
                    <FiEdit />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDeleteResult(result.id)}
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

