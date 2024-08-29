import React, { useEffect, useState } from 'react';
import { auth, database } from '../../FireBase/Firebase'; // Adjust path if necessary
import { ref, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Filters from './Filters';
import TestResultsList from './TestResultsList';

/**
 * TestResultsScreen component displays test results and allows filtering.
 */

const TestResults = () => {
  const [results, setResults] = useState([]);
  const [userGender, setUserGender] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem('darkMode')) || false;
  });
  const [dateFilter, setDateFilter] = useState('');
  const [testTypeFilter, setTestTypeFilter] = useState('');
  const [availableTestTypes, setAvailableTestTypes] = useState([]);
  const [testTypeInfo, setTestTypeInfo] = useState({});
  const navigate = useNavigate();

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

            const testTypes = new Set(allResults.flatMap(result => 
              result.results.map(test => test.testName)
            ));
            setAvailableTestTypes(Array.from(testTypes));

            const info = {
              'Prostate-Specific Antigen (PSA)': 'A test used to screen for prostate cancer. Normal range varies based on age and health.',
              'Pregnancy Test': 'A test to determine if a woman is pregnant by detecting the presence of the hormone HCG.',
              'Pap Smear': 'A screening procedure for cervical cancer that involves collecting cells from the cervix.',
            };
            setTestTypeInfo(info);
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

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

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

  const filteredResults = results
    .filter(result => !dateFilter || result.date === dateFilter)
    .map(result => ({
      date: result.date,
      results: result.results.filter(test => isTestApplicable(test.testName) && (!testTypeFilter || test.testName === testTypeFilter)),
    }))
    .filter(result => result.results.length > 0);

  return (
    <div className={isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} handleLogout={handleLogout} />
      <div className="container mx-auto p-4">
        <Filters 
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          testTypeFilter={testTypeFilter}
          setTestTypeFilter={setTestTypeFilter}
          availableTestTypes={availableTestTypes}
          testTypeInfo={testTypeInfo}
          isDarkMode={isDarkMode}
        />
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <TestResultsList filteredResults={filteredResults} isDarkMode={isDarkMode} />
        )}
      </div>
    </div>
  );
};

export default TestResults;
