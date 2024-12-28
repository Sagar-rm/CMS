import React from 'react'

export default function TeacherOverview() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Teacher Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">My Courses</h2>
          <p className="text-3xl font-bold text-blue-600">5</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Students</h2>
          <p className="text-3xl font-bold text-green-600">150</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Upcoming Deadlines</h2>
          <p className="text-lg font-medium text-red-600">2 assignments due this week</p>
        </div>
      </div>
    </div>
  )
}

