import React from 'react';
/**
 * TestResultItem component displays individual test results with parameters.
 * @param {Object} props - Component properties
 * @param {Object} props.result - Test result data
 * @param {boolean} props.isDarkMode - Indicates if dark mode is enabled
 */
const TestResultItem = ({ test, isDarkMode }) => {
  return (
    <div className={`mb-6 p-4 border rounded shadow ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}>
      <h4 className="text-lg font-medium mb-2">{test.testName}</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {test.parameters && test.parameters.map((param, paramIndex) => (
          <div key={paramIndex} className={`p-2 rounded ${isDarkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
            <p><strong>{param.name}:</strong> {param.value} {param.unit}</p>
            {param.range && (
              <p className="text-sm text-gray-500">Normal Range: {param.range}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestResultItem;
