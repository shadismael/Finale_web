import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import image1 from './Images/Image.png';
import image2 from './Images/Image2.png';
import image3 from './Images/Image3.png';

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem('darkMode')) || false;
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [image1, image2, image3];

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [images.length]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // user reviews data
  const reviews = [
    {
      name: "Alice Johnson",
      review: "Be Healthy has completely transformed the way I manage my health. The personalized metrics are incredibly useful and the graphs make tracking progress easy.",
      rating: 5
    },
    {
      name: "Bob Smith",
      review: "I love the intuitive design and the ability to visualize my health data. It has helped me set and achieve my health goals more effectively.",
      rating: 4
    },
    {
      name: "Charlie Brown",
      review: "The app is good, but there are a few bugs that need fixing. Overall, it's a great tool for anyone serious about their health.",
      rating: 3
    }
  ];

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className="bg-blue-900 p-4 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Be Healthy</h1>
        <nav className="flex space-x-4">
            {/* Navigation items */}
            <Link to="/login" className="text-white hover:text-gray-900">Log In</Link>
            <Link to="/signup" className="text-white hover:text-gray-900">Sign In</Link>
            <Link to="/features" className="text-white hover:text-gray-900">About</Link>
          </nav>
          <button 
              onClick={toggleDarkMode} 
              className="p-2 text-white bg-gray-800 rounded-full"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? '🌙' : '☀️'}
          </button>

          <button 
            onClick={toggleMenu} 
            className="md:hidden p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            {/* Add your menu icon here */}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Column */}
          <div className="relative">
            <img 
              src={images[currentImageIndex]} 
              alt={`Health Metrics ${currentImageIndex + 1}`} 
              className="w-full h-auto rounded-lg shadow-lg mb-4 transition-opacity duration-500" 
            />
            <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2">
              <button onClick={prevImage} className="bg-gray-800 text-white p-2 rounded-full opacity-75 hover:opacity-100 transition">
                &lt;
              </button>
              <button onClick={nextImage} className="bg-gray-800 text-white p-2 rounded-full opacity-75 hover:opacity-100 transition">
                &gt;
              </button>
            </div>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
              {images.map((_, index) => (
                <button 
                  key={index} 
                  className={`h-2 w-2 rounded-full mx-1 ${index === currentImageIndex ? 'bg-white' : 'bg-gray-400'}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
              
            </div>
            <p className="text-sm text-gray-600 mb-2">
              Discover the benefits of personalized health management with Be Healthy. Our tools help you track essential health metrics
            </p>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">
                Welcome To BeHealthy
              </h3>
              <p className="text-gray-600">
                Your personalized health tracking companion. Monitor your health metrics effortlessly and visualize your progress with easy-to-understand graphs. Stay informed, set goals, and take charge of your well-being with tools designed to help you live a healthier life. Start your journey to better health today!
              </p>
            </div>
            <div>
              <h1 className="text-xl font-bold mb-2">Stay Connected</h1>
              <p className="text-gray-600 mb-4">
                Have questions or need support? Our team is here to help.
              </p>
              <Link 
                to="/contact" 
                className="bg-black text-white px-6 py-2 rounded-full inline-block hover:bg-gray-800 transition duration-300"
              >
                CONTACT US
              </Link>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <section className={`mt-12 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
          <h2 className="text-2xl font-bold mb-6">What Our Users Are Saying</h2>
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <div key={index} className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h4 className="text-lg font-semibold mb-2">{review.name}</h4>
                <p className={`text-gray-600 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{review.review}</p>
                <div className="flex items-center">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 15.27l-3.09 1.62.59-3.43L3.5 9.51l3.43-.5L10 3.27l1.07 3.74 3.43.5-2.99 2.89.59 3.43L10 15.27z"/>
                    </svg>
                  ))}
                  {[...Array(5 - review.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 15.27l-3.09 1.62.59-3.43L3.5 9.51l3.43-.5L10 3.27l1.07 3.74 3.43.5-2.99 2.89.59 3.43L10 15.27z"/>
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`bg-blue-900 text-white text-center py-4 text-sm ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-[#20B2AA] text-white'}`}>
        <p>&copy; 2024 Be Healthy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
