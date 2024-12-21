import { BookOpen, Calendar, FileText, Users, Bell, BarChart } from 'lucide-react'

const features = [
  {
    title: "Student Management",
    description: "Efficiently manage student records, admissions, and academic progress with our intuitive interface.",
    icon: BookOpen,
    details: "Track student performance, manage attendance, and streamline the admissions process all in one place."
  },
  {
    title: "Timetable Scheduling",
    description: "Create and manage complex timetables with ease for all departments, optimizing resource allocation.",
    icon: Calendar,
    details: "Automatically generate conflict-free schedules, manage room allocations, and send notifications for changes."
  },
  {
    title: "Exam and Results Tracking",
    description: "Streamline exam processes and track student performance effortlessly with advanced analytics.",
    icon: FileText,
    details: "Conduct online exams, generate report cards, and analyze performance trends across departments and years."
  },
  {
    title: "Staff Management",
    description: "Simplify HR processes, track staff performance, and manage payroll all in one place.",
    icon: Users,
    details: "Manage staff records, track leaves, automate payroll, and generate performance reports effortlessly."
  },
  {
    title: "Notifications",
    description: "Keep everyone informed with real-time notifications for important updates and deadlines.",
    icon: Bell,
    details: "Send targeted notifications to students, staff, or parents via email, SMS, or push notifications."
  },
  {
    title: "Analytics Dashboard",
    description: "Gain valuable insights into your institution's performance with our comprehensive analytics tools.",
    icon: BarChart,
    details: "Visualize key performance indicators, track trends, and make data-driven decisions to improve your institution."
  },
]

const Features = () => {
  return (
    <section id="features" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12" data-aos="fade-up">Powerful Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg p-6 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl group"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <feature.icon className="h-12 w-12 text-primary-600 dark:text-primary-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{feature.description}</p>
              <div className="hidden group-hover:block">
                <h4 className="font-semibold text-primary-600 dark:text-primary-400 mb-2">Key Benefits:</h4>
                <p className="text-gray-600 dark:text-gray-300">{feature.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features

