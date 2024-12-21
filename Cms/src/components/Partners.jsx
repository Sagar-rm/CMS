// import Image from 'next/image'

const partners = [
  { name: 'University A', logo: '/logos/university-a.png' },
  { name: 'College B', logo: '/logos/college-b.png' },
  { name: 'Institute C', logo: '/logos/institute-c.png' },
  { name: 'Academy D', logo: '/logos/academy-d.png' },
  { name: 'School E', logo: '/logos/school-e.png' },
  { name: 'University F', logo: '/logos/university-f.png' },
]

const Partners = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12" data-aos="fade-up">Trusted by Leading Institutions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map((partner, index) => (
            <div 
              key={index}
              className="flex items-center justify-center"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                width={150}
                height={75}
                className="max-w-full h-auto filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Partners

