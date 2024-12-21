'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Hero from './components/Hero'
import Features from './components/Features'
import Statistics from './components/Statistics'
import Partners from './components/Partners'
import AdvancedFeatures from './components/AdvancedFeatures'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import DownloadBrochure from './components/DownloadBrochure'
import SecurityInfo from './components/SecurityInfo'
import Contact from './components/Contact'

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  return (
    <main>
      <Hero />
      <Features />
      <Statistics />
      <Partners />
      <AdvancedFeatures />
      <Testimonials />
      <Pricing />
      <DownloadBrochure />
      <SecurityInfo />
      <Contact />
    </main>
  )
}

