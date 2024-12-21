import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center text-center text-white">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/campus.jpg')",
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
      <div className="relative z-20 max-w-4xl mx-auto px-6">
        <h1 
          className="text-5xl md:text-6xl font-bold mb-4"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          Revolutionize Your College Management
        </h1>
        <p 
          className="text-xl md:text-2xl mb-8"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="200"
        >
          Streamline administration, enhance communication, and elevate student experiences with our cutting-edge platform.
        </p>
        <div 
          className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="400"
        >
          <a 
            href="#features"
            className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
          >
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </a>
          <a 
            href="#demo"
            className="bg-secondary-500 hover:bg-secondary-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
          >
            Request Demo <Play className="ml-2 h-5 w-5" />
          </a>
        </div>
        <div
          className="mt-12"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="600"
        >
          <h3 className="text-2xl font-semibold mb-4">See EduManage in Action</h3>
          <div className="aspect-w-16 aspect-h-9">
            <iframe 
              className="w-full h-full rounded-lg shadow-lg"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
              title="EduManage Overview"
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

