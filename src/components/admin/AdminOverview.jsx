import React from 'react'

export default function AdminOverview() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Users</h2>
          <p className="text-3xl font-bold text-blue-600">1,234</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Active Courses</h2>
          <p className="text-3xl font-bold text-green-600">56</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">System Status</h2>
          <p className="text-lg font-medium text-green-600">All Systems Operational</p>
        </div>
      </div>
    </div>
  )
}

