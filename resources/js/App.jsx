import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import axios from 'axios';
import Master from './layouts/admin/Master';
import Register from './layouts/frontend/auth/Register';
import Login from './layouts/frontend/auth/Login';
import AdminPrivateRoute from './AdminPrivateRoute'; // Importing AdminPrivateRoute

// Import components from the initial app
import Navbar from './layouts/frontend/Components/Navbar';
import Slider from './layouts/frontend/Components/Slider';
import About from './layouts/frontend/Components/About';
import Products from './layouts/frontend/Components/Products';
import Partners from './layouts/frontend/Components/Partners';
import Footer from './layouts/frontend/Components/Footer';
import Store from './layouts/frontend/Outer/Store';
import ProductDetail from './layouts/frontend/Outer/Detail';
import NotFound from './layouts/frontend/Components/404';
import Forbidden from './layouts/frontend/Components/403';
import ScrollToTop from './layouts/frontend/Components/ScrollToTop'; // Import ScrollToTop

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
        <Route path="/collections/:categoryLink/:productLink" element={<ProductDetail />} />
        <Route path="/403" element={<Forbidden />} />
        <Route path="/login" element={<ProtectedRoute element={<Login />} />} />
        <Route path="/register" element={<ProtectedRoute element={<Register />} />} />
        
        {/* Fallback route for non-existing pages */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isAdminRoute && <Footer />} {/* Render Footer only if not on admin routes */}
    </>
  );
}

function App() {
  return (
    <div className="App font-raleway">
      <Router>
        <ScrollToTop /> {/* Scroll to the top when navigating */}
        <Layout /> {/* Use Layout to conditionally render components */}
      </Router>
    </div>
  );
}

export default App;
