'use client'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'

const stats = [
  { 
    number: 500, 
    label: "Institutions",
    icon: "🏫",
    color: "from-teal-500 to-cyan-500"
  },
  { 
    number: 100000, 
    label: "Students",
    icon: "👨‍🎓",
    color: "from-purple-500 to-indigo-500"
  },
  { 
    number: 5000, 
    label: "Courses",
    icon: "📚",
    color: "from-rose-500 to-pink-500"
  },
  { 
    number: 98, 
    label: "Satisfaction Rate",
    suffix: "%",
    icon: "⭐",
    color: "from-amber-500 to-orange-500"
  }
]

export default function Stats() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-purple-500">
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,transparent_25%,white_25%,white_50%,transparent_50%,transparent_75%,white_75%,white)] bg-[length:60px_60px]"
        />
      </div>
      <div className="container mx-auto px-6 relative">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center text-white mb-12"
        >
          EduPro CMS by the Numbers
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-white/10 rounded-2xl backdrop-blur-sm" />
              <div className="relative p-6 text-center">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                  className="text-4xl mb-4"
                >
                  {stat.icon}
                </motion.div>
                <CountUp
                  end={stat.number}
                  duration={2.5}
                  separator=","
                  suffix={stat.suffix}
                >
                  {({ countUpRef }) => (
                    <div className="text-4xl md:text-5xl font-bold mb-2 text-white tracking-tight" ref={countUpRef} />
                  )}
                </CountUp>
                <p className="text-xl text-white/80">{stat.label}</p>
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

