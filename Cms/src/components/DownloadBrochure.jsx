import { Download } from 'lucide-react'

const DownloadBrochure = () => {
  return (
    <section className="py-20 bg-primary-600 dark:bg-primary-800">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-8" data-aos="fade-up">Want to Learn More?</h2>
        <p className="text-xl text-white mb-8" data-aos="fade-up" data-aos-delay="200">
          Download our comprehensive brochure to explore all the features and benefits of EduManage.
        </p>
        <a
          href="/brochure.pdf"
          download
          className="inline-flex items-center bg-white text-primary-600 font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-100"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <Download className="mr-2" />
          Download Brochure
        </a>
      </div>
    </section>
  )
}

export default DownloadBrochure

