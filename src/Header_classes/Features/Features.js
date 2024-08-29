import React, { useState, useEffect } from 'react';
import Header from './Header';
import MobileMenu from './MobileMenu';
import FeatureItem from './FeatureItem';
import Footer from './Footer';
import img1 from '../Images/1.png';
import img2 from '../Images/2.png';
import img3 from '../Images/3.png';
import img4 from '../Images/4.png';
import img5 from '../Images/5.png';

const Features = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => JSON.parse(localStorage.getItem('darkMode')) || false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const featureItems = [
    { image: img1, text: 'Track your health metrics with real-time data', tooltip: 'Monitor your health metrics anytime and anywhere.' },
    { image: img2, text: 'Online pharmacy', tooltip: 'Order medicines online and get them delivered to your doorstep.' },
    { image: img3, text: 'Visualize your progress with interactive graphs', tooltip: 'Track your progress with dynamic and interactive charts.' },
    { image: img4, text: 'Receive timely notifications and reminders', tooltip: 'Stay informed with timely reminders and alerts.' },
    { image: img5, text: 'Access a library of health resources and tips', tooltip: 'Find valuable health tips and resources to improve your well-being.' }
  ];

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} toggleMenu={toggleMenu} />
      <MobileMenu isMenuOpen={isMenuOpen} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`}>
          {featureItems.map((item, index) => (
            <FeatureItem key={index} item={item} isDarkMode={isDarkMode} />
          ))}
        </div>
      </main>
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default Features;
