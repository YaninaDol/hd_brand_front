
import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './Home';
import AdminPanel from './AdminPanel';

const App = () => {
  return (
    <BrowserRouter>
      <div>
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/*" element={<AdminPanel />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
