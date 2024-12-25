import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import Stats from './components/Stats'
import Team from './components/Team'
import Blog from './components/Blog'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Stats />
        <Testimonials />
        <Pricing />
        <Team />
        <Blog />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  )
}

