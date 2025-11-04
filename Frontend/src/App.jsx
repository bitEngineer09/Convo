import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth';
import Onboarding from './pages/Onboarding';

const App = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Home/>} /> */}
      <Route path="/auth" element={<Auth/>} />
      <Route path="/onboarding" element={<Onboarding/>} />
    </Routes>
  )
}

export default App