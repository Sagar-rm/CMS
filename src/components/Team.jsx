'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

const team = [
  {
    name: "John Doe",
    role: "CEO & Founder",
    image: "/placeholder.svg?height=200&width=200"
  },
  {
    name: "Jane Smith",
    role: "CTO",
    image: "/placeholder.svg?height=200&width=200"
  },
  {
    name: "Mike Johnson",
    role: "Head of Design",
    image: "/placeholder.svg?height=200&width=200"
  },
  {
    name: "Sarah Williams",
    role: "Lead Developer",
    image: "/placeholder.svg?height=200&width=200"
  }
]

export default function Team() {
  return (
    <section id="team" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center text-gray-800 mb-12"
        >
          Meet Our Team
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg p-6 text-center"
            >
              <Image
                src={member.image}
                alt={member.name}
                width={200}
                height={200}
                className="rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

