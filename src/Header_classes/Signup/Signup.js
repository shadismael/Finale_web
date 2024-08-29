import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../FireBase/Firebase'; // Ensure this path is correct
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { generateTestResults } from '../../Lobby_Classes/Tests/generateTestResults';
import '../Css_Files/Signup.css'; // Correct relative path
import Header from './Header';
import MobileMenu from './MobileMenu';
import Footer from './Footer';
// sign up that saves the user data 
const Signup = () => {
  // State variables for form data, error messages, dark mode, and mobile menu
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    gender: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem('darkMode')) || false;
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Effect to apply dark mode styles based on state

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', JSON.stringify(true));
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', JSON.stringify(false));
    }
  }, [isDarkMode]);
  // Toggles dark mode on and off

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };
  // Toggles mobile menu visibility

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigate = useNavigate();
  // Updates formData state when form fields change

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // Handles form submission

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      await generateTestResults(user.uid);
      console.log('User signed up and test results generated:', user);
      
      alert('Signup successful!')
      navigate('/login');
    } catch (error) {
      console.error('Error signing up:', error);
      setError(error.message);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} toggleMenu={toggleMenu} />
      <MobileMenu isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

      {/* Main Content */}
      <main className={`flex-grow container mx-auto px-4 py-8 ${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-900'}`}>
        <div className={`max-w-md mx-auto p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <label className="block mb-2" htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'border-gray-300'}`}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'border-gray-300'}`}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'border-gray-300'}`}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Gender</label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleChange}
                    className="form-radio"
                    required
                  />
                  <span className="ml-2">Female</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleChange}
                    className="form-radio"
                    required
                  />
                  <span className="ml-2">Male</span>
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'border-gray-300'}`}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'border-gray-300'}`}
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full p-2 rounded ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-blue-900 text-white'}`}
            >
              Sign Up
            </button>
          </form>
        </div>
      </main>
      {/* Footer */}
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};
export default Signup;
