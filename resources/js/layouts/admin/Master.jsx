import React, { useEffect } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Dashboard from '../../components/admin/Dashboard';
import Profile from '../../components/admin/Profile';
import Category from '../../components/admin/Category/Category';
import ViewCategory from '../../components/admin/Category/ViewCategory';
import EditCategory from '../../components/admin/Category/EditCategory';
import Products from '../../components/admin/Products/Products';
import ViewProducts from '../../components/admin/Products/ViewProducts';
import EditProducts from '../../components/admin/Products/EditProducts';

// Import admin CSS and JS files
import '../../../sass/scripts';
import '../../../sass/styles.css';

// Import Bootstrap's JavaScript via npm
import "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import EditUser from '../../components/admin/EditUser';

const Master = () => {
  useEffect(() => {
    // Ensure Bootstrap JS components are initialized after render
    const script = document.createElement('script');
    script.src = "https://use.fontawesome.com/releases/v6.3.0/js/all.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Clean up the script when the component unmounts
    };
  }, []);

  return (
    <div className="sb-nav-fixed">
      <Navbar />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <Sidebar />
        </div>
        <div id="layoutSidenav_content">
          <main>
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="category" element={<Category />} />
              <Route path="category/view" element={<ViewCategory />} />
              <Route path="category/edit/:id" element={<EditCategory />} />
              <Route path="products" element={<Products/>} />
              <Route path='products/view' element={<ViewProducts/>} />
              <Route path='products/edit/:id' element={<EditProducts/>} />
              <Route path='user/edit/:id' element={<EditUser/>} />
              
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Master;
