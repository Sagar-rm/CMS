'use client'

import { useState, useEffect } from 'react'
import { Users, School, BookOpen } from 'lucide-react'

const stats = [
  { icon: Users, value: 5000, label: "Students Managed", prefix: "+" },
  { icon: School, value: 100, label: "Universities Using Our CMS", prefix: "+" },
  { icon: BookOpen, value: 1000000, label: "Courses Managed", prefix: "+" },
]

const StatCard = ({ icon: Icon, value, label, prefix }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 50
    const increment = value / steps
    const interval = duration / steps

    const timer = setInterval(() => {
      setCount(prevCount => {
        const newCount = prevCount + increment
        return newCount >= value ? value : newCount
      })
    }, interval)

    return () => clearInterval(timer)
  }, [value])

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
      <Icon className="h-12 w-12 text-primary-600 dark:text-primary-400 mx-auto mb-4" />
      <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
        {prefix}{Math.round(count).toLocaleString()}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{label}</p>
    </div>
  )
}

const Statistics = () => {
  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12" data-aos="fade-up">Our Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Statistics

