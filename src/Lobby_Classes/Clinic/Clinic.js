// Clinic.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../FireBase/Firebase';
import Header from './Header';
import Section from './Section';
// Import images for medications, vitamins, and natural medicines

import AspirinImage from '../Med_PNG/aspirin.png';
import IbuprofenImage from '../Med_PNG/ibuprofen.png';
import ParacetamolImage from '../Med_PNG/paracetamol.png';
import VitaminCImage from '../Med_PNG/vitamin_c.png';
import VitaminDImage from '../Med_PNG/vitamin_d.png';
import Omega3Image from '../Med_PNG/omega_3.png';
import ZincImage from '../Med_PNG/zinc.png';
import IronImage from '../Med_PNG/iron.png';
import EchinaceaImage from '../Med_PNG/echinacea.png';
import GinsengImage from '../Med_PNG/ginseng.png';
import GingerImage from '../Med_PNG/ginger.png';
import TurmericImage from '../Med_PNG/turmeric.png';

const Clinic = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem('darkMode')) || false;
  });
  const [medications, setMedications] = useState([]);
  const [vitamins, setVitamins] = useState([]);
  const [naturalMedicines, setNaturalMedicines] = useState([]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  // Effect to fetch and set medication data

  useEffect(() => {
    const fetchMedications = async () => {
      setMedications([
        { name: 'Aspirin', price: '$10', image: AspirinImage },
        { name: 'Ibuprofen', price: '$15', image: IbuprofenImage },
        { name: 'Paracetamol', price: '$8', image: ParacetamolImage },
        { name: 'Vitamin C', price: '$12', image: VitaminCImage },
      ]);
      setVitamins([
        { name: 'Vitamin D', price: '$20', image: VitaminDImage },
        { name: 'Omega-3', price: '$25', image: Omega3Image },
        { name: 'Zinc', price: '$18', image: ZincImage },
        { name: 'Iron', price: '$15', image: IronImage },
      ]);
      setNaturalMedicines([
        { name: 'Echinacea', price: '$12', image: EchinaceaImage },
        { name: 'Ginseng', price: '$22', image: GinsengImage },
        { name: 'Ginger', price: '$10', image: GingerImage },
        { name: 'Turmeric', price: '$14', image: TurmericImage },
      ]);
    };

    fetchMedications();
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleBackToLobby = () => {
    navigate('/lobby');
  };
  // Button color for section items

  const buttonColor = '#003366';

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : 'bg-light-turquoise'}`}>
      <Header 
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        handleLogout={handleLogout}
        handleBackToLobby={handleBackToLobby}
      />

      <main className="flex-grow flex flex-col items-center py-8 px-4 relative">
        <div className={`p-8 rounded-lg shadow-lg mb-8 w-full max-w-4xl ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
          <h1 className={`text-3xl font-semibold ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>
            Welcome to Our Online Pharmacy
          </h1>
          <p className="mt-2">Explore our wide range of medications, vitamins, nutritional supplements, and natural medicines.</p>
        </div>

        <Section title="Last Bought Medications" items={medications} buttonColor={buttonColor} navigate={navigate} />
        <Section title="Vitamins and Nutritional Supplements" items={vitamins} buttonColor={buttonColor} navigate={navigate} />
        <Section title="Natural Medicines" items={naturalMedicines} buttonColor={buttonColor} navigate={navigate} />
      </main>
    </div>
  );
};

export default Clinic;
