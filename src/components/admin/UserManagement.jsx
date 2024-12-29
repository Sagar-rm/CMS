import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi'

const userTypes = ['Student', 'Teacher', 'Admin']

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', type: 'Student' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', type: 'Teacher' },
  { id: 3, name: 'Admin User', email: 'admin@example.com', type: 'Admin' },
]

export default function UserManagement() {
  const [users, setUsers] = useState(mockUsers)
  const [newUser, setNewUser] = useState({ name: '', email: '', type: 'Student' })

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value })
  }

  const handleAddUser = (e) => {
    e.preventDefault()
    setUsers([...users, { ...newUser, id: users.length + 1 }])
    setNewUser({ name: '', email: '', type: 'Student' })
  }

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id))
  }

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6"
      >
        User Management
      </motion.h1>
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleAddUser}
        className="bg-white p-6 rounded-lg shadow-md mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="name"
            value={newUser.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="border rounded px-3 py-2"
            required
          />
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="border rounded px-3 py-2"
            required
          />
          <select
            name="type"
            value={newUser.type}
            onChange={handleInputChange}
            className="border rounded px-3 py-2"
          >
            {userTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
        >
          <FiPlus className="inline mr-2" />
          Add User
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:text-blue-800 mr-2">
                    <FiEdit />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDeleteUser(user.id)}
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

