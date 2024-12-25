'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const blogPosts = [
  {
    title: "10 Ways EduPro CMS Improves Student Engagement",
    excerpt: "Discover how our CMS can help boost student participation and academic performance.",
    image: "/placeholder.svg?height=200&width=300",
    date: "May 15, 2023"
  },
  {
    title: "The Future of Education Technology",
    excerpt: "Explore the latest trends in EdTech and how they're shaping the future of learning.",
    image: "/placeholder.svg?height=200&width=300",
    date: "June 2, 2023"
  },
  {
    title: "Streamlining Administrative Tasks with EduPro CMS",
    excerpt: "Learn how our CMS can help reduce paperwork and increase efficiency in your institution.",
    image: "/placeholder.svg?height=200&width=300",
    date: "June 20, 2023"
  }
]

export default function Blog() {
  return (
    <section id="blog" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center text-gray-800 mb-12"
        >
          Latest from Our Blog
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 rounded-lg shadow-lg overflow-hidden"
            >
              <Image
                src={post.image}
                alt={post.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <Link href="#" className="text-blue-600 hover:underline">Read More</Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

