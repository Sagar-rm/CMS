import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Stats from './components/Stats';
import Team from './components/Team';
import Blog from './components/Blog';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Login from './pages/login';
import TeacherDashboard from './components/teacher/TeacherOverview';
import EnhancedStudentDashboard from './components/student/EnhancedStudentDashboard';
import AdminDashboard from './components/admin/EnhancedAdminDashboard';



const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <Stats />
      <Testimonials />
      {/* <Pricing /> */}
      <Team />
      <Blog />
      <FAQ />
      <CTA />
      <Footer />

    </>
  );
}

function AppContent() {
  const location = useLocation();

  // Exclude header for admin route
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-indigo-50">
      {!isAdminRoute && <Header />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.main
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <HomePage />
              </motion.main>
            }
          />
          <Route
            path="/features"
            element={
              <motion.main
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Features />
              </motion.main>
            }
          />
          <Route
            path="/blog"
            element={
              <motion.main
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Blog />
              </motion.main>
            }
          />
          <Route
            path="/contact"
            element={
              <motion.main
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Contact />
              </motion.main>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/student" element={<EnhancedStudentDashboard />} />
          <Route path="/teacher" element={<TeacherDashboard />} />


            
        </Routes>

      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
