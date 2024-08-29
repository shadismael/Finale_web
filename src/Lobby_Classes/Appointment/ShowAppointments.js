import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, database } from '../../FireBase/Firebase'; // Ensure Firebase is initialized and exported
import { ref, get, remove } from 'firebase/database';
import { FaMoon, FaSun } from 'react-icons/fa'; // Import the icons

const ShowAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem('darkMode')) || false;
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      const user = auth.currentUser;
      if (!user) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      const userId = user.uid;
      const appointmentsRef = ref(database, `appointments/${userId}`);

      try {
        const snapshot = await get(appointmentsRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const appointmentsList = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setAppointments(appointmentsList);
        } else {
          setError('No appointments found');
        }
      } catch (error) {
        setError('Error fetching appointments: ' + error.message);
      }
      setLoading(false);
    };

    fetchAppointments();
  }, []);

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error("Error logging out:", error);
      setError("Error logging out: " + error.message);
    }
  };

  const handleDelete = async (appointmentId) => {
    const user = auth.currentUser;
    if (!user) {
      setError('User not authenticated');
      return;
    }

    const userId = user.uid;
    const appointmentRef = ref(database, `appointments/${userId}/${appointmentId}`);

    try {
      await remove(appointmentRef);
      setAppointments(appointments.filter(appointment => appointment.id !== appointmentId));
      console.log('Appointment deleted successfully!');
    } catch (error) {
      console.error('Error deleting appointment:', error);
      setError('Error deleting appointment: ' + error.message);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <header className={`shadow-md py-4 ${isDarkMode ? 'bg-gray-800' : 'bg-blue-900'}`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Be Healthy</h1>
          <nav>
            <ul className="flex space-x-4 items-center">
              <li><Link to="/lobby" className="text-white hover:text-blue-300">Lobby</Link></li>
              <li>
                {auth.currentUser ? (
                  <button onClick={handleLogout} className="text-white hover:text-blue-300">Logout</button>
                ) : (
                  <Link to="/login" className="text-white hover:text-blue-300">Login</Link>
                )}
              </li>
              <li>
                <button 
                  onClick={toggleDarkMode} 
                  className="p-2 text-white bg-gray-800 rounded-full"
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? '🌙' : '☀️'}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className={`p-8 rounded-lg shadow-md w-full max-w-2xl mx-auto ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
          <h2 className={`text-2xl font-bold mb-6 text-center ${isDarkMode ? 'text-gray-300' : 'text-blue-900'}`}>Your Appointments</h2>
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <ul className="space-y-4">
              {appointments.map((appointment) => (
                <li key={appointment.id} className={`p-4 rounded-md shadow ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <p><strong>Doctor:</strong> {appointment.doctor}</p>
                      <p><strong>Date:</strong> {appointment.date}</p>
                      <p><strong>Reason:</strong> {appointment.reason}</p>
                      <p><strong>Type:</strong> {appointment.appointmentType}</p>
                      <p><strong>Medical Center:</strong> {appointment.medicalCenter}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(appointment.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
};

export default ShowAppointments;