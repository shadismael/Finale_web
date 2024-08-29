import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, database } from '../../FireBase/Firebase'; // Ensure Firebase is initialized and exported
import { ref, push, get } from 'firebase/database';
import Header from './Header';
import FormInput from './FormInput';
import ToggleDarkModeButton from './ToggleDarkModeButton';
// Component to handle the appointment booking form

const MakeAppointment = () => {
      // State to manage form data

  const [formData, setFormData] = useState({
    doctor: '',
    date: '',
    reason: '',
    appointmentType: '',
    medicalCenter: '',
  });
// State to manage error messages
  const [error, setError] = useState('');
  // State to manage dark mode
  const [isDarkMode, setIsDarkMode] = useState(() => JSON.parse(localStorage.getItem('darkMode')) || false);
  // Hook to programmatically navigate
  const navigate = useNavigate();
// Effect to toggle dark mode class on document element
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);
// Toggle dark mode and save preference in localStorage
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { doctor, date, reason, appointmentType, medicalCenter } = formData;
    const user = auth.currentUser;

    // Check if user is authenticated

    if (!user) {
      setError('User not authenticated');
      return;
    }

    // Validate that all fields are filled

    if (!doctor || !date || !reason || !appointmentType || !medicalCenter) {
      setError('All fields are required');
      return;
    }

    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setError('Invalid date. Please select a future date.');
      return;
    }
    // Check for existing appointments to avoid conflicts

    const appointmentsRef = ref(database, 'appointments');

    try {
      const snapshot = await get(appointmentsRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const appointmentExists = Object.values(data).some(userAppointments =>
          Object.values(userAppointments).some(appointment =>
            appointment.doctor === doctor &&
            appointment.date === date &&
            appointment.appointmentType === appointmentType &&
            appointment.medicalCenter === medicalCenter
          )
        );

        if (appointmentExists) {
          setError('This appointment slot is already taken. Please choose a different time.');
          return;
        }
      }

      // Save the appointment data

      const userId = user.uid;
      const userAppointmentsRef = ref(database, `appointments/${userId}`);
      await push(userAppointmentsRef, formData);
      console.log('Appointment made successfully!');
      alert('Appointment made successfully!');
      navigate('/lobby');
    } catch (error) {
      console.error('Error making appointment:', error);
      alert('Error making appointment: ' + error.message);
    }
  };
  // Handle user logout

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} handleLogout={handleLogout} />
      <div id="container" className={`flex-grow flex items-center justify-center py-8 px-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className={`bg-white p-8 rounded shadow-md w-full max-w-md mx-auto ${isDarkMode ? 'dark:bg-gray-800 dark:text-white' : ''}`}>
          <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-gray-600' : 'text-blue-900'}`}>Make an Appointment</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <FormInput
              id="doctor"
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              options={[
                { value: '', label: 'Choose a doctor' },
                { value: 'Dr. Smith', label: 'Dr. Smith' },
                { value: 'Dr. Johnson', label: 'Dr. Johnson' },
                { value: 'Dr. Lee', label: 'Dr. Lee' },
                { value: 'Dr. Brown', label: 'Dr. Brown' }
              ]}
              label="Select Doctor"
              type="select"
            />
            <FormInput
              id="appointmentType"
              name="appointmentType"
              value={formData.appointmentType}
              onChange={handleChange}
              options={[
                { value: '', label: 'Select an appointment type' },
                { value: 'Pediatrics', label: 'Pediatrics' },
                { value: 'Dermatology', label: 'Dermatology' },
                { value: 'Pulmonology', label: 'Pulmonology' },
                { value: 'Infectious Diseases', label: 'Infectious Diseases' },
                { value: 'Obstetrics and Gynecology', label: 'Obstetrics and Gynecology' },
                { value: 'Ophthalmology', label: 'Ophthalmology' },
                { value: 'Orthopedics', label: 'Orthopedics' },
                { value: 'Cardiology', label: 'Cardiology' },
                { value: 'Endocrinology', label: 'Endocrinology' },
                { value: 'Gastroenterology', label: 'Gastroenterology' },
                { value: 'Neurology', label: 'Neurology' },
                { value: 'Rheumatology', label: 'Rheumatology' },
                { value: 'Urology', label: 'Urology' },
                { value: 'Nephrology', label: 'Nephrology' },
                { value: 'Hematology', label: 'Hematology' }
              ]}
              label="Appointment Type"
              type="select"
            />
            <FormInput
              id="medicalCenter"
              name="medicalCenter"
              value={formData.medicalCenter}
              onChange={handleChange}
              options={[
                { value: '', label: 'Select a medical center' },
                { value: 'Center A', label: 'Center A' },
                { value: 'Center B', label: 'Center B' },
                { value: 'Center C', label: 'Center C' },
                { value: 'Center D', label: 'Center D' }
              ]}
              label="Medical Center"
              type="select"
            />
            <FormInput
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              label="Select Date"
              type="date"
            />
            <FormInput
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              label="Reason for Visit"
              type="textarea"
              rows="4"
            />
            <button
              type="submit"
              className={`w-full py-2 px-4 rounded ${isDarkMode ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white'} hover:bg-blue-800`}
            >
              Submit Appointment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MakeAppointment;
