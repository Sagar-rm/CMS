import { Bell, BarChart3, Zap } from 'lucide-react'

const features = [
  {
    icon: Bell,
    title: 'Automated Notifications',
    description: 'Keep everyone informed with smart, context-aware notifications for deadlines, events, and important updates.',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Gain deep insights into student performance, resource utilization, and institutional trends with our powerful analytics tools.',
  },
  {
    icon: Zap,
    title: 'Third-party Integrations',
    description: 'Seamlessly connect with popular tools like Google Calendar, Microsoft Teams, and more to enhance productivity.',
  },
]

const AdvancedFeatures = () => {
  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12" data-aos="fade-up">Advanced Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <feature.icon className="h-12 w-12 text-primary-600 dark:text-primary-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AdvancedFeatures

