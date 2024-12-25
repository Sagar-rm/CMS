'use client'
import { motion } from 'framer-motion'
import { CheckIcon } from '@heroicons/react/24/solid'

const plans = [
  {
    name: "Basic",
    price: "$99",
    features: [
      "Up to 500 students",
      "Basic reporting",
      "Email support",
      "1 admin user"
    ]
  },
  {
    name: "Pro",
    price: "$299",
    features: [
      "Up to 2000 students",
      "Advanced analytics",
      "24/7 phone support",
      "5 admin users",
      "Custom integrations"
    ]
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "Unlimited students",
      "Full data access",
      "Dedicated account manager",
      "Unlimited admin users",
      "Custom development"
    ]
  }
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center text-gray-800 mb-12"
        >
          Choose Your Plan
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-blue-50 rounded-lg shadow-lg p-8 hover:shadow-xl transition duration-300 transform hover:-translate-y-2"
            >
              <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">{plan.name}</h3>
              <p className="text-4xl font-bold text-center text-blue-600 mb-6">{plan.price}<span className="text-base font-normal text-gray-600">/month</span></p>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300"
              >
                Choose Plan
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

