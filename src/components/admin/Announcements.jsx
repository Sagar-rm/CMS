import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiPlus, FiEdit, FiTrash2, FiBell } from 'react-icons/fi'

const mockAnnouncements = [
  { id: 1, title: 'Campus Closure', content: 'The campus will be closed on May 25th for maintenance.', date: '2023-05-20' },
  { id: 2, title: 'New Course Offerings', content: 'Check out our new AI and Machine Learning courses for the upcoming semester!', date: '2023-05-18' },
  { id: 3, title: 'Library Hours Extended', content: 'The library will now be open until midnight during exam week.', date: '2023-05-15' },
]

export default function Announcements() {
  const [announcements, setAnnouncements] = useState(mockAnnouncements)
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '' })

  const handleInputChange = (e) => {
    setNewAnnouncement({ ...newAnnouncement, [e.target.name]: e.target.value })
  }

  const handleAddAnnouncement = (e) => {
    e.preventDefault()
    const currentDate = new Date().toISOString().split('T')[0]
    setAnnouncements([...announcements, { ...newAnnouncement, id: announcements.length + 1, date: currentDate }])
    setNewAnnouncement({ title: '', content: '' })
  }

  const handleDeleteAnnouncement = (id) => {
    setAnnouncements(announcements.filter(announcement => announcement.id !== id))
  }

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6"
      >
        Announcements
      </motion.h1>
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleAddAnnouncement}
        className="bg-white p-6 rounded-lg shadow-md mb-6"
      >
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="title"
            value={newAnnouncement.title}
            onChange={handleInputChange}
            placeholder="Announcement Title"
            className="border rounded px-3 py-2"
            required
          />
          <textarea
            name="content"
            value={newAnnouncement.content}
            onChange={handleInputChange}
            placeholder="Announcement Content"
            className="border rounded px-3 py-2"
            rows="4"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors duration-200"
        >
          <FiPlus className="inline mr-2" />
          Add Announcement
        </button>
      </motion.form>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        {announcements.map((announcement) => (
          <motion.div
            key={announcement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <FiBell className="mr-2 text-yellow-500" />
                {announcement.title}
              </h2>
              <div>
                <button className="text-blue-600 hover:text-blue-800 mr-2">
                  <FiEdit />
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDeleteAnnouncement(announcement.id)}
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
            <p className="text-gray-600 mb-2">{announcement.content}</p>
            <p className="text-sm text-gray-500">Posted on: {announcement.date}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

