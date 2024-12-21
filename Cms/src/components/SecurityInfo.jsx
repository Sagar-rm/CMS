import { Shield, Lock, CheckCircle } from 'lucide-react'

const securityFeatures = [
  { icon: Shield, title: 'GDPR Compliant', description: 'We adhere to strict GDPR guidelines to protect user data.' },
  { icon: Lock, title: 'End-to-End Encryption', description: 'All data is encrypted in transit and at rest for maximum security.' },
  { icon: CheckCircle, title: 'Regular Security Audits', description: 'We conduct regular security audits to ensure the highest level of protection.' },
]

const SecurityInfo = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12" data-aos="fade-up">Your Security is Our Priority</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {securityFeatures.map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <feature.icon className="h-12 w-12 text-primary-600 dark:text-primary-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SecurityInfo

