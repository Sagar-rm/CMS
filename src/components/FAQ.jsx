'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    question: "What is EduPro CMS?",
    answer: "EduPro CMS is a comprehensive College Management System designed to streamline administrative tasks, enhance communication, and improve overall efficiency in educational institutions."
  },
  {
    question: "How does EduPro CMS benefit students?",
    answer: "Students can easily access their schedules, grades, and course materials, communicate with professors, and stay updated on campus events and announcements through a single platform."
  },
  {
    question: "Is EduPro CMS suitable for small colleges?",
    answer: "Yes, EduPro CMS is scalable and can be customized to fit the needs of institutions of all sizes, from small colleges to large universities."
  },
  {
    question: "How secure is the data stored in EduPro CMS?",
    answer: "We prioritize data security and use industry-standard encryption and security measures to protect all information stored in EduPro CMS."
  },
  {
    question: "Can EduPro CMS integrate with other software systems?",
    answer: "Yes, EduPro CMS offers integration capabilities with various third-party software systems commonly used in educational institutions."
  }
]

export default function FAQ() {
  return (
    <section id="faq" className="py-20 bg-gradient-to-r from-purple-100 to-pink-100">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center text-gray-800 mb-12"
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border-b border-gray-200 pb-4"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left"
      >
        <span className="text-lg font-semibold text-gray-700">{question}</span>
        <span className="ml-6">
          {isOpen ? (
            <motion.svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" initial={{ rotate: 0 }} animate={{ rotate: 180 }} transition={{ duration: 0.3 }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          ) : (
            <motion.svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" initial={{ rotate: 180 }} animate={{ rotate: 0 }} transition={{ duration: 0.3 }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          )}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <motion.div
              variants={{ collapsed: { scale: 0.8 }, open: { scale: 1 } }}
              transition={{ duration: 0.4 }}
              className="mt-3 text-gray-600"
            >
              {answer}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

