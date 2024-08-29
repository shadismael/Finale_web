import React, { useEffect, useState } from 'react';
import { auth, database } from '../../FireBase/Firebase'; // Adjust path if necessary
import { ref, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa'; // Import the icons
import { Chart, registerables } from 'chart.js';
import { Line, Bar, Pie, Radar } from 'react-chartjs-2';

// Register the chart components
Chart.register(...registerables);

const GraphPage = () => {
  const [results, setResults] = useState([]);// State to hold test results
  const [userGender, setUserGender] = useState('');// State to store user's gender
  const [loading, setLoading] = useState(true);// State to manage loading state
  const [error, setError] = useState('');// State to manage errors
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem('darkMode')) || false;
  });
  const [selectedTestType, setSelectedTestType] = useState('');
  const [availableTestTypes, setAvailableTestTypes] = useState([]);
  const navigate = useNavigate();
  // Fetch user data and test results when component mounts

  useEffect(() => {
    const fetchUserDataAndResults = async () => {
      const user = auth.currentUser;
      if (!user) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      const userId = user.uid;
      const userRef = ref(database, `patients/${userId}`);

      try {
        const userSnapshot = await get(userRef);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.val();
          setUserGender(userData.gender || '');

          const resultsRef = ref(database, `patients/${userId}/testResults`);
          const resultsSnapshot = await get(resultsRef);
          
          if (resultsSnapshot.exists()) {
            const data = resultsSnapshot.val();
            console.log('Fetched test results:', data);

            const allResults = data.flatMap(result => ({
              date: result.date,
              results: result.results,
            }));

            setResults(allResults);

            // Extract unique test types
            const testTypes = new Set(allResults.flatMap(result => 
              result.results.map(test => test.testName)
            ));
            setAvailableTestTypes(Array.from(testTypes));
          } else {
            setError('No test results found');
          }
        } else {
          setError('User data not found');
        }
      } catch (error) {
        setError('Error fetching data: ' + error.message);
      }
      setLoading(false);
    };

    fetchUserDataAndResults();
  }, []);
  // Handle user logout

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      setError('Error logging out: ' + error.message);
    }
  };
  // Toggle dark mode and save preference in localStorage

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };
  // Check if a test is applicable based on user gender

  const isTestApplicable = (testName) => {
    const maleOnlyTests = ['Prostate-Specific Antigen (PSA)'];
    const femaleOnlyTests = ['Pregnancy Test', 'Pap Smear'];

    if (userGender === 'male' && femaleOnlyTests.includes(testName)) {
      return false;
    }
    if (userGender === 'female' && maleOnlyTests.includes(testName)) {
      return false;
    }
    return true;
  };
  // Filter test results based on selected test type

  const filterResultsByTestType = (testType) => {
    if (!testType) {
      return results.flatMap(result => 
        result.results
          .filter(test => isTestApplicable(test.testName))
          .map(test => ({
            date: result.date,
            parameters: test.parameters,
          }))
      );
    }

    return results.flatMap(result => 
      result.results
        .filter(test => test.testName === testType && isTestApplicable(test.testName))
        .map(test => ({
          date: result.date,
          parameters: test.parameters,
        }))
    );
  };
  // Create chart data for a given parameter

  const createChartData = (parameterName, unit) => {
    const filteredResults = filterResultsByTestType(selectedTestType)
      .flatMap(result => 
        result.parameters
          .filter(param => param.name === parameterName)
          .map(param => ({
            date: result.date,
            value: parseFloat(param.value),
          }))
      );

    if (filteredResults.length === 0) {
      return {
        labels: [],
        datasets: [],
      };
    }

    const labels = filteredResults.map(result => result.date);
    const data = filteredResults.map(result => result.value);

    return {
      labels,
      datasets: [{
        label: `${parameterName} (${unit})`,
        data,
        borderColor: `hsl(${Math.random() * 360}, 100%, 70%)`,
        backgroundColor: `hsla(${Math.random() * 360}, 100%, 80%, 0.2)`,
        borderWidth: 2,
        fill: false,
      }],
    };
  };
  // Get unique parameters from filtered results

  const getUniqueParameters = (testType) => {
    const parameters = filterResultsByTestType(testType).flatMap(result => 
      result.parameters.map(param => ({
        name: param.name,
        unit: param.unit || '', // Ensure unit is available
      }))
    );
    return [...new Set(parameters.map(param => param.name))].map(paramName => 
      parameters.find(param => param.name === paramName)
    );
  };
  // Return a random chart type

  const randomChartType = () => {
    const chartTypes = ['line', 'bar', 'pie', 'radar'];
    return chartTypes[Math.floor(Math.random() * chartTypes.length)];
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} flex flex-col`}>
      {/* Header */}
      <header className={`shadow-md py-4 ${isDarkMode ? 'bg-gray-800' : 'bg-blue-900'}`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Graphs of Test Results</h1>
          <nav>
            <ul className="flex space-x-4 items-center">
              <li>
                <a href="/" onClick={handleLogout} className={`text-white-700 hover:text-blue-900 ${isDarkMode ? 'text-gray-300' : 'text-white'}`}>
                  Logout
                </a>
              </li>
              <li>
              <button 
                onClick={toggleDarkMode} 
                className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-800 text-white'}`}
                aria-label="Toggle dark mode"
                >
                {isDarkMode ? '🌙' : '☀️'}
              </button>
              </li>
              <li>
                <button onClick={() => navigate('/lobby')} className={`p-2 rounded ${isDarkMode ? 'bg-gray-600' : 'bg-blue-900'}`}>
                     Lobby
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main id="container" className="flex-grow py-8 px-4">
        <div className={`p-8 rounded shadow-md w-full max-w-4xl mx-auto ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
          <h2 className={`text-2xl font-bold mb-6 text-center ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>
            Test Results Graphs
          </h2>
          
          {/* Filters */}
          <div className="mb-4 flex flex-wrap gap-4">
            <select
              value={selectedTestType}
              onChange={(e) => setSelectedTestType(e.target.value)}
              className={`p-2 rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}
            >
              <option value="">All Test Types</option>
              {availableTestTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            getUniqueParameters(selectedTestType).map(param => {
              const chartType = randomChartType();
              return (
                <div key={param.name} className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">{param.name}</h3>
                  {chartType === 'line' && (
                    <Line 
                      data={createChartData(param.name, param.unit)} 
                      options={{
                        scales: {
                          y: {
                            title: {
                              display: true,
                              text: `Units (${param.unit})`,
                            },
                          },
                        },
                      }} 
                    />
                  )}
                  {chartType === 'bar' && (
                    <Bar
                      data={createChartData(param.name, param.unit)}
                      options={{
                        scales: {
                          y: {
                            title: {
                              display: true,
                              text: `Units (${param.unit})`,
                            },
                          },
                        },
                      }} 
                    />
                  )}
                  {chartType === 'pie' && (
                    <Pie 
                      data={createChartData(param.name, param.unit)}
                    />
                  )}
                  {chartType === 'radar' && (
                    <Radar 
                      data={createChartData(param.name, param.unit)}
                    />
                  )}
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
};

export default GraphPage;
