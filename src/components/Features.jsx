'use client'
import { motion } from 'framer-motion'
import { AcademicCapIcon, ChartBarIcon, ChatBubbleBottomCenterTextIcon, ClockIcon, CogIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

const features = [
  {
    icon: AcademicCapIcon,
    title: "Intuitive Student Information System",
    description: "Easily manage student data, academic records, and admissions processes.",
    color: "from-teal-500 to-cyan-500"
  },
  {
    icon: ClockIcon,
    title: "Automated Attendance Tracking",
    description: "Streamline attendance management with digital check-ins and real-time reporting.",
    color: "from-purple-500 to-indigo-500"
  },
  {
    icon: ChartBarIcon,
    title: "Comprehensive Grade Management",
    description: "Simplify grading processes and provide instant access to academic performance data.",
    color: "from-rose-500 to-pink-500"
  },
  {
    icon: ChatBubbleBottomCenterTextIcon,
    title: "Seamless Communication Tools",
    description: "Foster collaboration with integrated messaging and announcement systems.",
    color: "from-amber-500 to-orange-500"
  },
  {
    icon: ShieldCheckIcon,
    title: "Advanced Analytics and Reporting",
    description: "Gain valuable insights with customizable dashboards and data visualization tools.",
    color: "from-emerald-500 to-green-500"
  },
  {
    icon: CogIcon,
    title: "Customizable Curriculum Planning",
    description: "Design and manage flexible course structures and degree programs with ease.",
    color: "from-blue-500 to-cyan-500"
  }
]

export default function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <section id="features" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-teal-50/50 to-purple-50/50" />
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 text-transparent bg-clip-text mb-4">
            Powerful Features for Modern Education
          </h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto">
            Discover the tools that will revolutionize your educational institution's management
          </p>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-purple-500/10 rounded-2xl blur-xl transition-all duration-300 group-hover:blur-2xl" />
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-teal-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </motion.svg>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

