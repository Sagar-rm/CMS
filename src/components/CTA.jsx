'use client'
import { motion } from 'framer-motion'

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-white mb-8"
        >
          Ready to Transform Your College Management?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-blue-100 mb-12"
        >
          Join thousands of institutions already benefiting from EduPro CMS.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#"
            className="bg-white text-blue-600 py-3 px-8 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300"
          >
            Start Your Free Trial
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#"
            className="bg-blue-500 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-blue-400 transition duration-300"
          >
            Schedule a Demo
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

