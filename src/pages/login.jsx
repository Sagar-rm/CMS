import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaUserGraduate, FaUserTie, FaChalkboardTeacher } from 'react-icons/fa';
import { Tab } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';

function LoginForm({ userType, onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userType, { email, password });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="mt-8 space-y-6"
      onSubmit={handleSubmit}
    >
      <div className="rounded-md shadow-sm space-y-4">
        <div>
          <label htmlFor={`${userType}-email`} className="sr-only">Email address</label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            id={`${userType}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-all duration-200"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor={`${userType}-password`} className="sr-only">Password</label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            id={`${userType}-password`}
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-all duration-200"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id={`${userType}-remember-me`}
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor={`${userType}-remember-me`} className="ml-2 block text-sm text-gray-900">
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">
            Forgot your password?
          </a>
        </div>
      </div>

      <div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
        >
          Sign in as {userType}
        </motion.button>
      </div>
    </motion.form>
  );
}

function Login() {
  const handleSubmit = (userType, credentials) => {
    // Handle login logic here
    console.log(`${userType} login attempt with:`, credentials);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl"
      >
        <div>
          <Link to="/" className="flex items-center justify-center mb-6">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <FaGraduationCap className="h-12 w-12 text-blue-600" />
            </motion.div>
          </Link>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-6 text-center text-3xl font-extrabold text-gray-900"
          >
            Sign in to your account
          </motion.h2>
          
        </div>

        <Tab.Group>
          <Tab.List className="flex rounded-xl bg-blue-900/20 p-1">
            {['Student', 'Admin', 'Teacher'].map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                    selected
                      ? 'bg-white shadow'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                  }`
                }
              >
                {({ selected }) => (
                  <motion.div
                    initial={false}
                    animate={{ scale: selected ? 1.05 : 1 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center"
                  >
                    {category === 'Student' && <FaUserGraduate className="mr-2" />}
                    {category === 'Admin' && <FaUserTie className="mr-2" />}
                    {category === 'Teacher' && <FaChalkboardTeacher className="mr-2" />}
                    {category}
                  </motion.div>
                )}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            <AnimatePresence mode="wait">
              {['Student', 'Admin', 'Teacher'].map((category) => (
                <Tab.Panel
                  key={category}
                  className={`rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2`}
                >
                  <LoginForm userType={category} onSubmit={handleSubmit} />
                </Tab.Panel>
              ))}
            </AnimatePresence>
          </Tab.Panels>
        </Tab.Group>
      </motion.div>
    </div>
  );
}

export default Login;

