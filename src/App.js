
import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import AdminPanel from './AdminPanel/AdminPanel';
import ShoesPage from './Pages/ShoesPage';
import ClothesPage from './Pages/ClothesPage';
import Accessorise from './Pages/Accessorise';
import CareShoes from './Pages/CareShoes';
import FAQ from './Pages/FAQ';
import ProductDetailsPage from './Pages/ProductDetailsPage';

const App = () => {
  return (
    <BrowserRouter>
      <div>
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/*" element={<AdminPanel />} />
          <Route path="/shoes" element={<ShoesPage />} />
          <Route path="/shoes/:subcategoryid/:id" element={<ProductDetailsPage />} />
          <Route path="/clothes" element={<ClothesPage />} />
          <Route path="/clothes/:subcategoryid/:id" element={<ProductDetailsPage />} />
          <Route path="/accessorise" element={<Accessorise />} />
          <Route path="/accessorise/:subcategoryid/:id" element={<ProductDetailsPage />} />
          <Route path="/careshoes" element={<CareShoes />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
