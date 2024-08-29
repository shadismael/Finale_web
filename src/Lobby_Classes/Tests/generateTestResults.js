import { ref, set } from 'firebase/database';
import { database } from '../../FireBase/Firebase';
// Unified list of test types for both genders
const testTypes = [
  'Complete Blood Count (CBC)',
  'Cholesterol Panel',
  'Metabolic Panel',
  'Prostate Specific Antigen (PSA)',
  'Cardiac Stress Test',
  'Inflammatory Markers',
  'Diabetes Screening',
  'Breast Imaging',
  'Thyroid Function Test',
  'Pap Smear',
  'Mammogram',
  'Ovarian Reserve Testing',
];

// Function to generate random test results
const randomResult = (type) => {
  switch (type) {
    case 'Complete Blood Count (CBC)':
      return {
        testName: 'Complete Blood Count (CBC)',
        parameters: [
          { name: 'WBC', value: (4 + Math.random() * 7).toFixed(1), unit: 'x10^9/L', range: '4.0-11.0' },
          { name: 'RBC', value: (4.0 + Math.random() * 1.5).toFixed(2), unit: 'x10^12/L', range: '4.0-6.0' },
          { name: 'Hemoglobin', value: (12.0 + Math.random() * 4.0).toFixed(1), unit: 'g/dL', range: '12.0-17.2' },
          { name: 'Hematocrit', value: (36.0 + Math.random() * 10.0).toFixed(1), unit: '%', range: '36.0-50.3' },
          { name: 'Platelets', value: (150 + Math.random() * 300).toFixed(0), unit: 'x10^9/L', range: '150-450' },
        ],
      };
    case 'Cholesterol Panel':
      return {
        testName: 'Cholesterol Panel',
        parameters: [
          { name: 'Total Cholesterol', value: (Math.random() * 200).toFixed(0), unit: 'mg/dL', range: '<200' },
          { name: 'LDL', value: (Math.random() * 100).toFixed(0), unit: 'mg/dL', range: '<100' },
          { name: 'HDL', value: (40 + Math.random() * 60).toFixed(0), unit: 'mg/dL', range: '≥40' },
          { name: 'Triglycerides', value: (Math.random() * 150).toFixed(0), unit: 'mg/dL', range: '<150' },
        ],
      };
    case 'Metabolic Panel':
      return {
        testName: 'Metabolic Panel',
        parameters: [
          { name: 'Fasting Blood Glucose', value: (70 + Math.random() * 30).toFixed(0), unit: 'mg/dL', range: '70-100' },
          { name: 'ALT', value: (7 + Math.random() * 43).toFixed(0), unit: 'U/L', range: '7-50' },
          { name: 'AST', value: (10 + Math.random() * 30).toFixed(0), unit: 'U/L', range: '10-40' },
          { name: 'ALP', value: (30 + Math.random() * 110).toFixed(0), unit: 'U/L', range: '30-140' },
          { name: 'Bilirubin', value: (0.1 + Math.random() * 1.1).toFixed(1), unit: 'mg/dL', range: '0.1-1.2' },
          { name: 'Creatinine', value: (0.6 + Math.random() * 0.7).toFixed(2), unit: 'mg/dL', range: '0.6-1.3' },
          { name: 'BUN', value: (7 + Math.random() * 13).toFixed(0), unit: 'mg/dL', range: '7-20' },
          { name: 'eGFR', value: (60 + Math.random() * 40).toFixed(0), unit: 'mL/min/1.73m^2', range: '≥60' },
        ],
      };
    case 'Prostate Specific Antigen (PSA)':
      return {
        testName: 'Prostate Specific Antigen (PSA)',
        parameters: [
          { name: 'PSA Level', value: (Math.random() * 4).toFixed(1), unit: 'ng/mL', range: '0-4.0' },
        ],
      };
    case 'Cardiac Stress Test':
      return {
        testName: 'Cardiac Stress Test',
        parameters: [
          { name: 'Heart Rate', value: (60 + Math.random() * 40).toFixed(0), unit: 'bpm', range: '60-100' },
          { name: 'QT Interval', value: (360 + Math.random() * 80).toFixed(0), unit: 'ms', range: '360-440' },
          { name: 'Maximum Heart Rate', value: (160 + Math.random() * 40).toFixed(0), unit: 'bpm', range: 'varies' },
          { name: 'Blood Pressure Response', value: (120 + Math.random() * 30).toFixed(0), unit: 'mmHg', range: 'varies' },
        ],
      };
    case 'Inflammatory Markers':
      return {
        testName: 'Inflammatory Markers',
        parameters: [
          { name: 'CRP Level', value: (Math.random() * 3).toFixed(1), unit: 'mg/L', range: '<3.0' },
        ],
      };
    case 'Diabetes Screening':
      return {
        testName: 'Diabetes Screening',
        parameters: [
          { name: 'HbA1c Percentage', value: (Math.random() * 5).toFixed(1), unit: '%', range: '<5.7' },
        ],
      };
    case 'Breast Imaging':
      return {
        testName: 'Breast Imaging',
        parameters: [
          { name: 'BI-RADS Score', value: Math.floor(Math.random() * 5) + 1, unit: '', range: '1-5' },
        ],
      };
    case 'Thyroid Function Test':
      return {
        testName: 'Thyroid Function Test',
        parameters: [
          { name: 'TSH', value: (0.4 + Math.random() * 3.6).toFixed(1), unit: 'mIU/L', range: '0.4-4.0' },
          { name: 'T4', value: (4.5 + Math.random() * 7.5).toFixed(1), unit: 'µg/dL', range: '4.5-12.0' },
          { name: 'T3', value: (80 + Math.random() * 120).toFixed(0), unit: 'ng/dL', range: '80-200' },
        ],
      };
    case 'Pap Smear':
      return {
        testName: 'Pap Smear',
        parameters: [
          { name: 'Pap Score', value: Math.floor(Math.random() * 4) + 1, unit: '', range: '1-4' },
        ],
      };
    case 'Mammogram':
      return {
        testName: 'Mammogram',
        parameters: [
          { name: 'BI-RADS Score', value: Math.floor(Math.random() * 5) + 1, unit: '', range: '1-5' },
        ],
      };
    case 'Ovarian Reserve Testing':
      return {
        testName: 'Ovarian Reserve Testing',
        parameters: [
          { name: 'AMH', value: (Math.random() * 5).toFixed(1), unit: 'ng/mL', range: '0.1-5.0' },
          { name: 'FSH', value: (2 + Math.random() * 13).toFixed(1), unit: 'mIU/mL', range: '2.0-15.0' },
          { name: 'LH', value: (2 + Math.random() * 18).toFixed(1), unit: 'mIU/mL', range: '2.0-20.0' },
        ],
      };
    default:
      return {};
  }
};

// Function to generate a random date within a given range
const getRandomDate = (startYear, endYear) => {
  const start = new Date(startYear, 0, 1);
  const end = new Date(endYear, 0, 1);
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Function to generate test results for a patient
const generateTestResults = (patientId) => {
  // Create 10 queries with random dates
  const testResults = Array.from({ length: 10 }, () => {
    const date = getRandomDate(2023, 2024).toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'

    // For each date, create results for all test types
    return {
      date: date,
      results: testTypes.map(type => ({
        testName: type,
        parameters: randomResult(type).parameters,
      })),
    };
  });

  // Save the test results to the Firebase database
  set(ref(database, `patients/${patientId}/testResults`), testResults);
};
export{generateTestResults}
