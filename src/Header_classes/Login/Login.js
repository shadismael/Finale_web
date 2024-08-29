import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../FireBase/Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import '../../Home_Page/Home.css';
/**
 * Login Page Component
 * 
 * This page allows users to log in to the application using their email and password. 
 * It features:
 * - A header with navigation links and a dark mode toggle.
 * - A mobile menu that appears when the screen width is reduced.
 * - A login form where users can enter their email and password.
 * - A footer with copyright information.
 * 
 * The page supports dark mode, which users can toggle using a button. The dark mode 
 * preference is saved to localStorage and applied when the page is reloaded.
 */
const Login = () => {
    // State for form data including email and password
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  // State for managing dark mode, initialized from localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem('darkMode')) || false;
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  // Toggle dark mode and save preference to localStorage

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      console.log("User logged in:", userCredential.user);
      alert("Welcome");
      navigate('/lobby');
    } catch (error) {
      console.error("Error logging in:", error);
      alert(error.message);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className={`bg-blue-900 p-4 shadow-sm ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-[#20B2AA] text-white'} z-50`}>
        <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl">Be Healthy</h1>
          <nav className="hidden md:flex space-x-4">
            <Link to="/" className="text-white hover:text-gray-300">Home</Link>
            <Link to="/features" className="text-white hover:text-gray-300">Features</Link>
            <Link to="/contact" className="text-white hover:text-gray-300">Contact</Link>
            <Link to="/signup" className="text-white hover:text-gray-300">Sign Up</Link>

            <button 
              onClick={toggleDarkMode} 
              className="p-2 text-white bg-gray-800 rounded-full"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? '🌙' : '☀️'}
            </button>
          </nav>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white p-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`md:hidden ${isDarkMode ? 'bg-gray-800' : 'bg-blue-800'} py-2`}>
          <nav className="flex flex-col items-center">
            <Link to="/" className="text-white py-2 hover:bg-blue-700 w-full text-center">Home</Link>
            <Link to="/features" className="text-white py-2 hover:bg-blue-700 w-full text-center">Features</Link>
            <Link to="/contact" className="text-white py-2 hover:bg-blue-700 w-full text-center">Contact</Link>
            <Link to="/signup" className="text-white py-2 hover:bg-blue-700 w-full text-center">Sign Up</Link>

            <button onClick={toggleDarkMode} className="mt-2 p-2 rounded bg-gray-300 dark:bg-gray-600 w-full">
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className={`max-w-md mx-auto p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100'}`}>
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'}`}
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'}`}
              required
            />
            <button
              type="submit"
              className="w-full bg-black text-white px-6 py-2 rounded-full hover:bg-teal-600 transition duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className={`bg-blue-900 text-white text-center py-4 text-sm ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-[#20B2AA] text-white'}`}>
        <p>&copy; 2024 Be Healthy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Login;