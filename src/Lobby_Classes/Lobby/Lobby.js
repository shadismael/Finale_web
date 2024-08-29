import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../FireBase/Firebase';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Header from './Header';
import MetricsGraph from './MetricsGraph';
import Notifications from './Notifications';
import SideMenu from './SideMenu';
import TestResults from './TestResults';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Lobby = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => JSON.parse(localStorage.getItem('darkMode')) || false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Test Results Data with status and color for each parameter
  const testResults = {
    bloodPressureStatus: { status: 'Normal', color: 'text-green-500' },
    cholesterolStatus: { status: 'High', color: 'text-red-500' },
    glucoseStatus: { status: 'Normal', color: 'text-green-500' },
    bmiStatus: { status: 'Overweight', color: 'text-yellow-500' },
    heartRateStatus: { status: 'Normal', color: 'text-green-500' }
  };

  useEffect(() => {
        // Toggle dark mode based on state
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

    // Toggle dark mode and save preference in local storage
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  // Handle user logout and navigate to login page
  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

    // Toggle side menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const buttonColor = '#001F3F'; // Define button color
  // Sample data for charts

  const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Blood Pressure Test Results',
        data: generateRandomBloodPressureData(),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.01,
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const barChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Cholesterol Levels',
        data: generateRandomCholesterolData(),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 206, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
          'rgb(255, 159, 64)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : 'bg-light-blue'}`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} handleLogout={handleLogout} />
      <main className="flex-grow flex flex-col items-center py-8 px-4 relative">
        <div className={`p-8 rounded-lg shadow-lg mb-8 w-full max-w-4xl ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
          <h1 className={`text-3xl font-semibold ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>
            Patient Dashboard
          </h1>
        </div>
        <TestResults 
          bloodPressureStatus={testResults.bloodPressureStatus} 
          cholesterolStatus={testResults.cholesterolStatus} 
          glucoseStatus={testResults.glucoseStatus} 
          bmiStatus={testResults.bmiStatus} 
          heartRateStatus={testResults.heartRateStatus}
          buttonColor={buttonColor}
          navigateToTestResults={() => navigate('/testresults')}
        />
        <MetricsGraph lineChartData={lineChartData} barChartData={barChartData} buttonColor={buttonColor} navigate={navigate} />
        <Notifications />
        <SideMenu isMenuOpen={isMenuOpen} />
        <button 
          onClick={toggleMenu} 
          className={`fixed top-1/2 transform -translate-y-1/2 bg-blue-900 text-white p-2 rounded-r-lg transition-all duration-300 ${isMenuOpen ? 'left-64' : 'left-0'}`}
        >
          {isMenuOpen ? 'Close' : 'Menu'}
        </button>
      </main>
    </div>
  );
};
// Utility functions to generate random data for charts
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateRandomBloodPressureData = () => Array.from({ length: 6 }, () => getRandomInt(110, 140));

const generateRandomCholesterolData = () => Array.from({ length: 6 }, () => getRandomInt(150, 200));

export default Lobby;
