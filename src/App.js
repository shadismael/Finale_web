import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DarkModeProvider } from './Dark_Mode/DarkModeContext'; // Import the provider

// Import components for different routes
import Login from './Header_classes/Login/Login';
import Home from './Home_Page/Home';
import Signup from './Header_classes/Signup/Signup';
import Contact from './Header_classes/Contact/Contact';
import Features from './Header_classes/Features/Features';
import Lobby from './Lobby_Classes/Lobby/Lobby';
import EditDetails from './Lobby_Classes/Profile/EditDetails';
import Graphs from './Lobby_Classes/Graphs/Graphs';
import Tips from './Lobby_Classes/Tips/Tips';
import Clinic from './Lobby_Classes/Clinic/Clinic';

// Import appointment-related components from the appointment folder
import MakeAppointment from './Lobby_Classes/Appointment/MakeAppointment';
import ShowAppointments from './Lobby_Classes/Appointment/ShowAppointments';
import TestResults from './Lobby_Classes/Tests/TestResults';

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/features" element={<Features />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/editdetails" element={<EditDetails />} />
          <Route path="/graphs" element={<Graphs />} />
          <Route path="/makeappointment" element={<MakeAppointment />} />
          <Route path="/showappointments" element={<ShowAppointments />} />
          <Route path="/testresults" element={<TestResults />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/clinic" element={<Clinic />} /> {/* Add the Clinic route here */}
        </Routes>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
