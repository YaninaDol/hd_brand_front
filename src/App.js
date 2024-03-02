
import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import AdminPanel from './AdminPanel/AdminPanel';
import CategoryPage from './Pages/CategoryPage';
import CareShoes from './Pages/CareShoes';
import FAQ from './Pages/FAQ';
import ProductDetailsPage from './Pages/ProductDetailsPage';
import ShoeSizeTable from './Components/ShoeSizeTable';
import FilteredProductsPage from './Pages/FilteredProductsPage';
import SubcategoryPage from './Pages/SubcategoryPage';
import DataFromFile from './Pages/DataFromFile';

const App = () => {
  return (
    <BrowserRouter>
      <div>
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/*" element={<AdminPanel />} />
          <Route path="/:categoryName" element={<CategoryPage />} />
          <Route path="/:categoryName/:subcategoryid" element={<SubcategoryPage />} />
          <Route path="/:categoryName/:subcategoryid/:id" element={<ProductDetailsPage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/shoesize" element={<ShoeSizeTable />} />
          <Route path="/search" element={<FilteredProductsPage />} />
          <Route path="/data" element={<DataFromFile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
