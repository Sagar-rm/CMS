import React from 'react'

export default function StudentOverview() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Student Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Enrolled Courses</h2>
          <p className="text-3xl font-bold text-blue-600">4</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Overall GPA</h2>
          <p className="text-3xl font-bold text-green-600">3.8</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Attendance Rate</h2>
          <p className="text-3xl font-bold text-yellow-600">95%</p>
        </div>
      </div>
    </div>
  )
}

