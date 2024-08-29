import React from 'react';
// Component to display test results with status and color

const TestResults = ({ bloodPressureStatus, cholesterolStatus, glucoseStatus, bmiStatus, heartRateStatus, buttonColor, navigateToTestResults }) => {
  return (
    <div className={`p-6 rounded-lg shadow-lg mb-8 w-full max-w-4xl`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Test Results</h2>
        <button 
          className="text-white px-4 py-2 rounded"
          style={{ backgroundColor: buttonColor }}
          onClick={navigateToTestResults}
        >
          Show All Results
        </button>
      </div>
      <ul className="space-y-2">
        <li>
          Blood Pressure Test:{' '}
          <span className={`${bloodPressureStatus.color} font-semibold`}>
            {bloodPressureStatus.status}
          </span>
        </li>
        <li>
          Cholesterol Level Test:{' '}
          <span className={`${cholesterolStatus.color} font-semibold`}>
            {cholesterolStatus.status}
          </span>
        </li>
        <li>
          Glucose Level Test:{' '}
          <span className={`${glucoseStatus.color} font-semibold`}>
            {glucoseStatus.status}
          </span>
        </li>
        <li>
          BMI Calculation:{' '}
          <span className={`${bmiStatus.color} font-semibold`}>
            {bmiStatus.status}
          </span>
        </li>
        <li>
          Heart Rate Variability Test:{' '}
          <span className={`${heartRateStatus.color} font-semibold`}>
            {heartRateStatus.status}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default TestResults;
