import React from 'react';
import { Link } from 'react-router-dom';
// Component to render side menu

const SideMenu = ({ isMenuOpen }) => {
  return (
    <div className={`fixed top-0 left-0 h-full w-64 bg-blue-900 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-4 space-y-4">
        <Link to="/editdetails" className="block text-white hover:bg-blue-900 p-2 rounded">Profile</Link>
        <Link to="/makeappointment" className="block text-white hover:bg-blue-900 p-2 rounded">Make an Appointment</Link>
        <Link to="/graphs" className="block text-white hover:bg-blue-900 p-2 rounded">Graphs</Link>
        <Link to="/showappointments" className="block text-white hover:bg-blue-900 p-2 rounded">Show Appointments</Link>
        <Link to="/testresults" className="block text-white hover:bg-blue-900 p-2 rounded">Test Results</Link>
        <Link to="/clinic" className="block text-white hover:bg-blue-900 p-2 rounded">Clinic</Link>
        <Link to="/tips" className="block text-white hover:bg-blue-900 p-2 rounded">Tips</Link>
      </div>
    </div>
  );
};

export default SideMenu;
