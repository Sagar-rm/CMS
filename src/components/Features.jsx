'use client'
import { motion } from 'framer-motion'
import { CheckCircleIcon, AcademicCapIcon, ChartBarIcon, ChatBubbleBottomCenterTextIcon, ClockIcon, CogIcon } from '@heroicons/react/24/outline'

const features = [
  {
    icon: AcademicCapIcon,
    title: "Intuitive Student Information System",
    description: "Easily manage student data, academic records, and admissions processes."
  },
  {
    icon: ClockIcon,
    title: "Automated Attendance Tracking",
    description: "Streamline attendance management with digital check-ins and real-time reporting."
  },
  {
    icon: ChartBarIcon,
    title: "Comprehensive Grade Management",
    description: "Simplify grading processes and provide instant access to academic performance data."
  },
  {
    icon: ChatBubbleBottomCenterTextIcon,
    title: "Seamless Communication Tools",
    description: "Foster collaboration with integrated messaging and announcement systems."
  },
  {
    icon: ChartBarIcon,
    title: "Advanced Analytics and Reporting",
    description: "Gain valuable insights with customizable dashboards and data visualization tools."
  },
  {
    icon: CogIcon,
    title: "Customizable Curriculum Planning",
    description: "Design and manage flexible course structures and degree programs with ease."
  }
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center text-gray-800 mb-12"
        >
          Powerful Features for Modern Education
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-purple-50 rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300"
            >
              <feature.icon className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

