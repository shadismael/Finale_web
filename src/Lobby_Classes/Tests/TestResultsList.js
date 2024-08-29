import React from 'react';
import TestResultItem from './TestResultItem';
/**
 * TestResultsList component displays a list of filtered test results.
 * @param {Object} props - Component properties.
 * @param {Array} props.filteredResults - List of test results filtered by user.
 * @param {boolean} props.isDarkMode - Indicates if dark mode is active.
 */
const TestResultsList = ({ filteredResults, isDarkMode }) => {
  return (
    <>
      {filteredResults.length === 0 ? (
        <p>No results match your filters.</p>
      ) : (
        filteredResults.map((result, index) => (
          <div key={index}>
            <h3 className="text-xl font-semibold mb-2">Test Date: {result.date}</h3>
            {result.results.map((test, testIndex) => (
              <TestResultItem key={testIndex} test={test} isDarkMode={isDarkMode} />
            ))}
          </div>
        ))
      )}
    </>
  );
};

export default TestResultsList;
