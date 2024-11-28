import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import axios from 'axios';
import { HelmetProvider } from 'react-helmet-async';

import LoadingSpinner from './layouts/frontend/Components/Loader';
import AboutUs from './layouts/frontend/Outer/AboutUs';
import ContactUs from './layouts/frontend/Outer/ContactUs';
import WhyChooseFirstDigits from './layouts/frontend/Outer/WhyChooseFirstDigits';
import FAQ from './layouts/frontend/Outer/FAQ';
import HelpCenter from './layouts/frontend/Outer/HelpCenter';
import Community from './layouts/frontend/Outer/Community';
import Academy from './layouts/frontend/Outer/Academy';
import Internship from './layouts/frontend/Outer/Internship';
import Team from './layouts/frontend/Outer/Team';
import Collections from './layouts/frontend/Outer/Collections';
import ResendEmail from './layouts/frontend/auth/Verification';
import VerifyEmail from './layouts/frontend/auth/Verify';
import Sidebar from './layouts/frontend/Components/Sidebar';

const Master = lazy(() => import('./layouts/admin/Master'));
const Register = lazy(() => import('./layouts/frontend/auth/Register'));
const Login = lazy(() => import('./layouts/frontend/auth/Login'));
const AdminPrivateRoute = lazy(() => import('./AdminPrivateRoute'));
const Navbar = lazy(() => import('./layouts/frontend/Components/Navbar'));
const Slider = lazy(() => import('./layouts/frontend/Components/Slider'));
const About = lazy(() => import('./layouts/frontend/Components/About'));
const Products = lazy(() => import('./layouts/frontend/Components/Products'));
const Partners = lazy(() => import('./layouts/frontend/Components/Partners'));
const Footer = lazy(() => import('./layouts/frontend/Components/Footer'));
const Store = lazy(() => import('./layouts/frontend/Outer/Store'));
const ProductDetail = lazy(() => import('./layouts/frontend/Outer/Detail'));
const NotFound = lazy(() => import('./layouts/frontend/Components/404'));
const Forbidden = lazy(() => import('./layouts/frontend/Components/403'));
const ScrollToTop = lazy(() => import('./layouts/frontend/Components/ScrollToTop'));

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.baseURL = '/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

// Home component from the initial app
function Home() {
  return (
    <>
      <Slider />
      <About />
      <Products />
      <Partners />
    </>
  );
}

function Layout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin'); // Check if the current route is under /admin

  // Create a wrapper component to handle redirection based on authentication
  const ProtectedRoute = ({ element }) => {
    const token = localStorage.getItem('auth_token');

    if (token) {
      return <Navigate to="/" replace />;
    }

    return element;
  };

  return (
    <>
      {!isAdminRoute && <Navbar />} {/* Render Navbar only if not on admin routes */}

      <Routes>
        {/* Admin routes protected with AdminPrivateRoute */}
        <Route
          path="/admin/*"
          element={
            <AdminPrivateRoute>
              <Master />
            </AdminPrivateRoute>
          }
        />

        {/* Frontend routes */}
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/company/about" element={<AboutUs />} />
        <Route path="/company/team" element={<Team />} />
        <Route path="/company/contact" element={<ContactUs />} />
        <Route path="/company/why-choose-us" element={<WhyChooseFirstDigits />} />
        <Route path="/support/faq" element={<FAQ />} />
        <Route path="/support/help-center" element={<HelpCenter />} />
        <Route path="/support/community" element={<Community />} />
        <Route path="/services/learn" element={<Academy />} />
        <Route path="/services/internship" element={<Internship />} />
        <Route path="/collections/:categoryLink" element={<Collections />} />
        <Route path="/collections/:categoryLink/:productLink" element={<ProductDetail />} />
        <Route path="/403" element={<Forbidden />} />
        <Route path="/login" element={<ProtectedRoute element={<Login />} />} />
        <Route path="/register" element={<ProtectedRoute element={<Register />} />} />
        <Route path="/email/resend" element={<ResendEmail />} />
        <Route path="/email/verify" element={<VerifyEmail />} />
        
        
        {/* Fallback route for non-existing pages */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isAdminRoute && <Sidebar />} {/* Render Footer only if not on admin routes */}
      {!isAdminRoute && <Footer />} {/* Render Footer only if not on admin routes */}
    </>
  );
}

function App() {
  return (
    <div className="App font-raleway">
      <HelmetProvider>
      <Router>
        <ScrollToTop /> {/* Scroll to the top when navigating */}
        <Suspense fallback={<LoadingSpinner />}> 
        <Layout /> {/* Use Layout to conditionally render components */}
        </Suspense>
      </Router>
      </HelmetProvider>
    </div>
  );
}

export default App;
