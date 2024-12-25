'use client'
import { motion } from 'framer-motion'

const steps = [
  {
    title: "Sign Up",
    description: "Create your account and set up your institution's profile in minutes."
  },
  {
    title: "Customize",
    description: "Tailor the CMS to fit your specific needs and workflows with ease."
  },
  {
    title: "Onboard Users",
    description: "Invite administrators, teachers, and students to join your digital campus."
  },
  {
    title: "Start Managing",
    description: "Begin using the powerful tools to streamline your educational operations."
  }
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-blue-50">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center text-gray-800 mb-12"
        >
          How It Works
        </motion.h2>
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0 md:space-x-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center max-w-xs"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4"
              >
                {index + 1}
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

