import React, { useState } from 'react';
import {  Route, Link, Routes, BrowserRouter } from 'react-router-dom';
import AdminPanel from './AdminPanel';
import ProductsTable from './ProductTable';
import UsersTable from './UserTable'; 
import {MDBBtn } from 'mdb-react-ui-kit';
const App = () => {
  const [activeTab, setActiveTab] = useState('/');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <BrowserRouter>
      <div>
        <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
          
          <li className="nav-item" role="presentation">
            <Link
              className={`nav-link ${activeTab === '/products' ? 'active' : ''}`}
              to="/products"
              role="tab"
              aria-controls="ex3-pills-2"
              aria-selected={activeTab === '/products'}
              onClick={() => handleTabClick('/products')}
            >
             DASHBOARD OF PRODUCTS
            </Link>
          </li>
          <li className="nav-item" role="presentation">
            <Link
              className={`nav-link ${activeTab === '/category' ? 'active' : ''}`}
              to="/category"
              role="tab"
              aria-controls="ex3-pills-1"
              aria-selected={activeTab === '/category'}
              onClick={() => handleTabClick('/category')}
            >
              CATEGORY & SPECIFICATIONS
            </Link>
          </li>
          <li className="nav-item" role="presentation">
            <Link
              className={`nav-link ${activeTab === '/users' ? 'active' : ''}`}
              to="/users"
              role="tab"
              aria-controls="ex3-pills-3"
              aria-selected={activeTab === '/'}
              onClick={() => handleTabClick('/users')}
            >
              DASHBOARD OF USERS
            </Link>
          </li>
          <li  className="nav-item" role="presentation">
          <Link
              className={`nav-link ${activeTab === '/' ? 'active' : ''}`}
              to="/"
              role="tab"
              aria-controls="ex3-pills-3"
              aria-selected={activeTab === '/'}
              onClick={() => handleTabClick('/')}
            >
              Sign out
            </Link>
          </li>
        </ul>

        <div className="tab-content" id="ex2-content">
          <div className="tab-pane fade show active" id="ex3-pills-1" role="tabpanel" aria-labelledby="ex3-tab-1">
         
          </div>
          <div className="tab-pane fade" id="ex3-pills-2" role="tabpanel" aria-labelledby="ex3-tab-2">
         
          </div>
          <div className="tab-pane fade" id="ex3-pills-3" role="tabpanel" aria-labelledby="ex3-tab-3">
         
          </div>
        </div>
        <Routes>
          <Route path="/category"  element={<AdminPanel />}>
           
          </Route>
          <Route path="/products"  element={<ProductsTable />}>
     
          </Route>
          <Route path="/users"  element={<UsersTable />}>
           
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
