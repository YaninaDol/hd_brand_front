
import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import ProductsTable from './ProductTable';
import UsersTable from './UserTable';
import CategorySpecification from './CategorySpecification';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('"/admin/products');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
        <li className="nav-item" role="presentation">
          <Link
            className={`nav-link ${activeTab === '/admin/products' ? 'active' : ''}`}
            to="/admin/products"
            role="tab"
            aria-controls="ex3-pills-1"
            aria-selected={activeTab === '/admin/products'}
            onClick={() => handleTabClick('/admin/products')}
          >
            DASHBOARD OF PRODUCTS
          </Link>
        </li>
        <li className="nav-item" role="presentation">
          <Link
            className={`nav-link ${activeTab === '/admin/categoryspec' ? 'active' : ''}`}
            to="/admin/categoryspec"
            role="tab"
            aria-controls="ex3-pills-2"
            aria-selected={activeTab === '/admin/categoryspec'}
            onClick={() => handleTabClick('/admin/categoryspec')}
          >
            DASHBOARD OF CATEGORY & SPECIFICATIONS
          </Link>
        </li>
        <li className="nav-item" role="presentation">
          <Link
            className={`nav-link ${activeTab === '/admin/users' ? 'active' : ''}`}
            to="/admin/users"
            role="tab"
            aria-controls="ex3-pills-2"
            aria-selected={activeTab === '/admin/users'}
            onClick={() => handleTabClick('/admin/users')}
          >
            DASHBOARD OF USERS
          </Link>
        </li>
      </ul>

      <div className="tab-content" id="ex2-content">
        <Routes>
          <Route path="/products" element={<ProductsTable />} />
          <Route path="/users" element={<UsersTable />} />
          <Route path="/categoryspec" element={<CategorySpecification />} />
        </Routes>
      </div>
     
    </div>
  );
};

export default AdminPanel;
