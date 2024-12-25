'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GraduationCap, Users, Calendar, BookOpen, BarChart, Mail } from 'lucide-react'

export default function LandingPage() {
  const [email, setEmail] = useState('')

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GraduationCap className="h-10 w-10 text-blue-600" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex space-x-4"
          >
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
            <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors">Testimonials</a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</a>
          </motion.div>
        </nav>
      </header>

      <main>
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <CtaSection email={email} setEmail={setEmail} />
      </main>

      <footer className="bg-gray-100 py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-gray-600">
          © 2024 College Management System. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-20 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
      >
        Revolutionize Your College Management
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-xl text-gray-600 mb-8"
      >
        Streamline operations, enhance student experiences, and drive success with our comprehensive CMS solution.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300">
          Get Started
        </Button>
      </motion.div>
    </section>
  )
}

function FeaturesSection() {
  const features = [
    { icon: Users, title: "Student Management", description: "Efficiently manage student records, admissions, and academic progress." },
    { icon: Calendar, title: "Scheduling", description: "Easily create and manage class schedules, events, and academic calendars." },
    { icon: BookOpen, title: "Course Management", description: "Organize and track courses, syllabi, and learning materials." },
    { icon: BarChart, title: "Analytics", description: "Gain insights with powerful analytics and reporting tools." },
  ]

  return (
    <section id="features" className="container mx-auto px-4 py-20">
      <h2 className="text-4xl font-bold text-center mb-12">Powerful Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const testimonials = [
    { name: "John Doe", role: "Dean of Students", quote: "This CMS has transformed how we manage our college. It's intuitive and powerful." },
    { name: "Jane Smith", role: "Professor", quote: "The course management features have made my job so much easier. Highly recommended!" },
  ]

  return (
    <section id="testimonials" className="bg-gray-100 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
              <p className="font-semibold">{testimonial.name}</p>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingSection() {
  const plans = [
    { name: "Basic", price: "$99", features: ["Student Management", "Course Management", "Basic Reporting"] },
    { name: "Pro", price: "$199", features: ["Everything in Basic", "Advanced Analytics", "API Access", "Priority Support"] },
  ]

  return (
    <section id="pricing" className="container mx-auto px-4 py-20">
      <h2 className="text-4xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white p-8 rounded-lg shadow-lg border border-gray-200"
          >
            <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
            <p className="text-4xl font-bold mb-6">{plan.price}<span className="text-sm font-normal">/month</span></p>
            <ul className="mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="mb-2 flex items-center">
                  <svg className="h-5 w-5 mr-2 text-green-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 13l4 4L19 7"></path></svg>
                  {feature}
                </li>
              ))}
            </ul>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
              Choose Plan
            </Button>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function CtaSection({ email, setEmail }: { email: string, setEmail: (email: string) => void }) {
  return (
    <section className="bg-blue-600 py-20">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-white mb-6"
        >
          Ready to Transform Your College Management?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-blue-100 mb-8"
        >
          Join thousands of satisfied users and take your institution to the next level.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-64 bg-white text-gray-800"
          />
          <Button size="lg" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-6 rounded-full transition-colors duration-300">
            Get Started
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

