
import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './Home';
import AdminPanel from './AdminPanel';
import ShoesPage from './ShoesPage';
import ClothesPage from './ClothesPage';
import Accessorise from './Accessorise';

const App = () => {
  return (
    <BrowserRouter>
      <div>
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/*" element={<AdminPanel />} />
          <Route path="/shoes" element={<ShoesPage />} />
          <Route path="/clothes" element={<ClothesPage />} />
          <Route path="/accessorise" element={<Accessorise />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
