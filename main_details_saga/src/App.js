import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import ServiceDetails from './components/ServiceDetails/ServiceDetails';
import ServicesList from './components/Services/ServicesList';

function App() {
  return (
    <Routes>
      <Route path='/services' element={<ServicesList />} />
      <Route path='/:id/details' element={<ServiceDetails />} />
      <Route path='/' element={<Navigate to='/services' replace />} />
    </Routes>
  );
}

export default App;
