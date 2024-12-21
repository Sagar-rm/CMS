import './globals.css'
import { Inter } from 'next/font/google'
import Navigation from './components/Navigation'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'EduManage - College Management System',
  description: 'Streamline administration, communication, and student management all in one place.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-gradient-to-br from-indigo-50 to-cyan-100 text-gray-800`}>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}

