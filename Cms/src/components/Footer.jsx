// import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin  } from 'lucide-react'


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <a href="/" className="text-2xl font-bold text-primary-400">EduManage</a>
            <p className="mt-2 text-gray-400">Revolutionizing college management for the digital age.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-primary-400 transition-colors">Home</a></li>
              <li><a href="#features" className="hover:text-primary-400 transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-primary-400 transition-colors">Pricing</a></li>
              <li><a href="#testimonials" className="hover:text-primary-400 transition-colors">Testimonials</a></li>
              <li><a href="#contact" className="hover:text-primary-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="/documentation" className="hover:text-primary-400 transition-colors">Documentation</a></li>
              <li><a href="/faq" className="hover:text-primary-400 transition-colors">FAQs</a></li>
              <li><a href="/user-guides" className="hover:text-primary-400 transition-colors">User Guides</a></li>
              <li><a href="/api" className="hover:text-primary-400 transition-colors">API Reference</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="/privacy" className="hover:text-primary-400 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-primary-400 transition-colors">Terms of Service</a></li>
              <li><a href="/gdpr" className="hover:text-primary-400 transition-colors">GDPR Compliance</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} EduManage. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors"><Facebook /></a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors"><Twitter /></a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors"><Instagram /></a>
              {/* <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors"><Aedin /></a> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

