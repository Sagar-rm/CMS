'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

const testimonials = [
  {
    quote: "EduPro CMS has transformed the way we manage our college. It's intuitive, powerful, and has greatly improved our efficiency.",
    author: "Dr. Sarah Johnson",
    role: "Dean of Students, Tech University",
    image: "/placeholder.svg?height=80&width=80"
  },
  {
    quote: "The analytics and reporting features have given us valuable insights into student performance and areas for improvement.",
    author: "Prof. Michael Chen",
    role: "Department Head, Data Science",
    image: "/placeholder.svg?height=80&width=80"
  },
  {
    quote: "As a student, I love how easy it is to access my schedules, grades, and communicate with professors all in one place.",
    author: "Emily Rodriguez",
    role: "Senior, Computer Science",
    image: "/placeholder.svg?height=80&width=80"
  }
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center text-gray-800 mb-12"
        >
          What Our Users Say
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300"
            >
              <div className="flex items-center mb-4">
                <Image src={testimonial.image} alt={testimonial.author} width={80} height={80} className="rounded-full mr-4" />
                <div>
                  <p className="font-semibold text-gray-800">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

