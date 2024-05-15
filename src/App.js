
import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import AdminPanel from './AdminPanel/AdminPanel';
import CategoryPage from './Pages/CategoryPage';
import Account from './Pages/Account';
import FAQ from './Pages/FAQ';
import ProductDetailsPage from './Pages/ProductDetailsPage';
import FilteredProductsPage from './Pages/FilteredProductsPage';
import SubcategoryPage from './Pages/SubcategoryPage';
import CheckoutPage from './Pages/CheckoutPage';
import NotFound from './Pages/NotFound';
import PublicOfert from './Pages/PublicOfert';
import Agreement from './Pages/Agreement';
import StatusPage from './Pages/Status200';
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
          <Route path="/search" element={<FilteredProductsPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route path='/public-agreement' element={<PublicOfert />} />
          <Route path='/agreement' element={<Agreement />} />
          <Route path='/status' element={<StatusPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
