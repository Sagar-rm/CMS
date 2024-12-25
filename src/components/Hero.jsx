'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])

  const floatingAnimation = {
    initial: { y: 0 },
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <section className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
      <motion.div 
        className="absolute top-20 left-10 w-72 h-72 bg-teal-400/30 rounded-full mix-blend-multiply filter blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />
      <motion.div 
        className="absolute bottom-10 right-10 w-72 h-72 bg-purple-400/30 rounded-full mix-blend-multiply filter blur-xl"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [90, 0, 90],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />
      <div className="container mx-auto px-6 relative">
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:w-1/2 lg:pr-10"
          >
            <div className="relative">
              <motion.span 
                className="absolute -top-10 -left-10 text-teal-500 text-9xl opacity-10 font-bold"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                ⚡
              </motion.span>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-teal-600 via-purple-600 to-rose-600 text-transparent bg-clip-text leading-tight">
                Transform Your College Management
              </h1>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-xl mb-8 text-gray-600"
            >
              Streamline operations, enhance communication, and boost productivity with our AI-powered CMS solution.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="relative inline-flex items-center justify-center px-8 py-3 font-bold text-white transition-all duration-200 bg-gradient-to-r from-teal-500 via-purple-500 to-rose-500 rounded-full group"
              >
                <span className="absolute inset-0 w-full h-full -mt-1 rounded-full opacity-30 bg-gradient-to-b from-white via-white"></span>
                Get Started Free
                <motion.span 
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="relative inline-flex items-center justify-center px-8 py-3 font-bold text-teal-600 transition-all duration-200 bg-white border-2 border-teal-500 rounded-full hover:shadow-lg hover:shadow-teal-500/30"
              >
                Watch Demo
              </motion.a>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:w-1/2 mt-10 lg:mt-0"
          >
            <div className="relative">
              <motion.div
                style={{ y }}
                className="relative z-10"
              >
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="EduPro CMS Dashboard"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl"
                />
                <motion.div
                  variants={floatingAnimation}
                  initial="initial"
                  animate="animate"
                  className="absolute -top-8 -left-8 bg-white rounded-2xl shadow-xl p-4 flex items-center space-x-4"
                >
                  <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center text-white text-2xl">
                    🎓
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Active Students</div>
                    <div className="text-2xl font-bold text-teal-500">15,000+</div>
                  </div>
                </motion.div>
                <motion.div
                  variants={floatingAnimation}
                  initial="initial"
                  animate="animate"
                  className="absolute -bottom-8 -right-8 bg-white rounded-2xl shadow-xl p-4"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="text-sm font-semibold">System Status: Online</div>
                  </div>
                </motion.div>
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-purple-500/20 rounded-2xl blur-3xl -z-10 transform -rotate-6"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

