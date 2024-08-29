import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Path is correct since index.css is in the same folder
import App from './App'; // Path is correct since App.js is in the same folder
//
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
