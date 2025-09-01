import React, { useState, useEffect } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import ProductsTable from "./ProductTable";
import UsersTable from "./UserTable";
import ArchivedProductsTable from "./ArchivedProductsTable";
import CategorySpecification from "./CategorySpecification";
import Orders from "./Orders";
import AuthModal from "../Components/AuthModal"; 

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("/admin/products");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.sessionStorage.getItem("AccessToken");
    const role = window.sessionStorage.getItem("Role");

    if (token && role === "1") {
      setIsAuthorized(true);
    } else {
      setShowAuth(true);
    }
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleCloseAuth = () => {
    setShowAuth(false);

    
    const token = window.sessionStorage.getItem("AccessToken");
    const role = window.sessionStorage.getItem("Role");
    if (token && role === "1") {
      setIsAuthorized(true);
      navigate("/admin/products");
    }
  };

  if (!isAuthorized) {
    return <AuthModal show={showAuth} handleClose={handleCloseAuth} />;
  }

  return (
    <div>
      <ul className="nav nav-pills nav-justified" id="ex1" role="tablist">
        <li className="nav-item" role="presentation">
          <Link
            className={`nav-link ${
              activeTab === "/admin/products" ? "active" : ""
            }`}
            to="/admin/products"
            onClick={() => handleTabClick("/admin/products")}
          >
            DASHBOARD OF PRODUCTS
          </Link>
        </li>
        <li className="nav-item" role="presentation">
          <Link
            className={`nav-link ${
              activeTab === "/admin/categoryspec" ? "active" : ""
            }`}
            to="/admin/categoryspec"
            onClick={() => handleTabClick("/admin/categoryspec")}
          >
            DASHBOARD OF CATEGORY & SPECIFICATIONS
          </Link>
        </li>
        <li className="nav-item" role="presentation">
          <Link
            className={`nav-link ${
              activeTab === "/admin/users" ? "active" : ""
            }`}
            to="/admin/users"
            onClick={() => handleTabClick("/admin/users")}
          >
            DASHBOARD OF USERS
          </Link>
        </li>
        <li className="nav-item" role="presentation">
          <Link
            className={`nav-link ${
              activeTab === "/admin/orders" ? "active" : ""
            }`}
            to="/admin/orders"
            onClick={() => handleTabClick("/admin/orders")}
          >
            DASHBOARD OF ORDERS
          </Link>
        </li>
        <li className="nav-item" role="presentation">
          <Link
            className={`nav-link ${
              activeTab === "/admin/archive" ? "active" : ""
            }`}
            to="/admin/archive"
            onClick={() => handleTabClick("/admin/archive")}
          >
            Архивовані товари
          </Link>
        </li>
      </ul>

      <div className="tab-content" id="ex2-content">
        <Routes>
          <Route path="/products" element={<ProductsTable />} />
          <Route path="/users" element={<UsersTable />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/categoryspec" element={<CategorySpecification />} />
          <Route path="/archive" element={<ArchivedProductsTable />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPanel;
