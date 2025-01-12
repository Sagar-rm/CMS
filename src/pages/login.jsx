import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaUserGraduate, FaUserTie, FaChalkboardTeacher } from 'react-icons/fa';
import { Tab } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";

function LoginForm({ userType, onSubmit }) {
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userType, { credential, password });
  };

  const placeholder =
    userType === 'Student'
      ? 'Register Number'
      : userType === 'Admin'
      ? 'KGID'
      : 'Email Address';

  const inputType =
    userType === 'Student' || userType === 'Admin' ? 'text' : 'email';

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
          <label htmlFor={`${userType}-credential`} className="sr-only">
            {placeholder}
          </label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            id={`${userType}-credential`}
            name="credential"
            type={inputType}
            autoComplete="username"
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-all duration-200"
            placeholder={placeholder}
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor={`${userType}-password`} className="sr-only">
            Password
          </label>
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

function SuccessAnimation() {
  return (
    <motion.svg
      className="w-16 h-16 text-green-500"
      viewBox="0 0 24 24"
      initial={{ scale: 0 }}
      animate={{ scale: 1, rotate: 360 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <motion.path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        d="M3,12 L9,18 L21,6"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
    </motion.svg>
  );
}

function ErrorAnimation() {
  return (
    <motion.svg
      className="w-16 h-16 text-red-500"
      viewBox="0 0 24 24"
      initial={{ scale: 0 }}
      animate={{ scale: 1, rotate: 180 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <motion.path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        d="M18 6L6 18M6 6l12 12"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
    </motion.svg>
  );
}

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState({ success: null, message: '' });

  const handleSubmit = async (userType, { credential, password }) => {
    try {
      const loginData =
        userType === 'Student'
          ? { registerNumber: credential, password }
          : userType === 'Admin'
          ? { kgId: credential, password }
          : { email: credential, password };

      const data = await login(loginData);
      setLoginStatus({ success: true, message: `${userType} logged in successfully` });
      
      // Delay navigation to show success animation
      setTimeout(() => {
        navigate("/student");
      }, 2000);
    } catch (error) {
      console.error('Login failed:', error);
      setLoginStatus({ success: false, message: 'Invalid credentials. Please try again.' });
      
      // Reset login status after showing error animation
      setTimeout(() => {
        setLoginStatus({ success: null, message: '' });
      }, 2000);
    }
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
            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
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

        <AnimatePresence>
          {loginStatus.success !== null && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center"
            >
              {loginStatus.success ? <SuccessAnimation /> : <ErrorAnimation />}
              <p className={`mt-2 text-center ${
                loginStatus.success ? 'text-green-500' : 'text-red-500'
              }`}>
                {loginStatus.message}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <Tab.Group>
          <Tab.List className="flex rounded-xl bg-blue-900/20 p-1">
            {['Student', 'Admin', 'Teacher'].map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ${
                    selected ? 'bg-white shadow' : 'hover:text-white hover:bg-blue-700'
                  }`
                }
              >
                <motion.div className="flex items-center justify-center">
                  {category === 'Student' && <FaUserGraduate className="mr-2" />}
                  {category === 'Admin' && <FaUserTie className="mr-2" />}
                  {category === 'Teacher' && <FaChalkboardTeacher className="mr-2" />}
                  {category}
                </motion.div>
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels className="mt-2">
            <AnimatePresence mode="wait">
              {['Student', 'Admin', 'Teacher'].map((category) => (
                <Tab.Panel key={category}>
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

