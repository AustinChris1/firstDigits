import React, { useState, useRef, useEffect } from 'react';
import fdcLogo from '../assets/fdcLogo.png';
import { User, Earth, X, Menu, ChevronDown, ChevronRight, LogOut, KeySquare } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Load from './Load';
import DropdownMenu from './Dropdown';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [category, setCategory] = useState([]); // State to store categories
  const dropdownRef = useRef(null);
  const navbarRef = useRef(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !navbarRef.current.contains(event.target)) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toggle the dropdown
  const handleDropdownToggle = (section) => {
    setDropdownOpen(prev => (prev === section ? null : section));
  };

  // Fetch categories
  useEffect(() => {
    axios.get('/api/getCategory').then(res => {
      if (res.data.status === 200) {
        setCategory(res.data.category); // Set categories to state
      } else {
        toast.error("Unable to fetch categories");
      }
    });
  }, []);

  // Handle navigation
  const handleNavigation = (path) => {
    setToggle(false); // Close the mobile menu when navigating
    navigate(path); // Navigate to the clicked route
  };

  const logout = (e) => {
    e.preventDefault();
    axios.get('/sanctum/csrf-cookie').then(() => {
    axios.post(`/api/logout`).then(res => {
      if (res.data.status === 200) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_name");
        localStorage.removeItem("auth_email");
        localStorage.removeItem("role");
        toast.success(res.data.message);
        navigate("/"); // Redirect to home after successful logout
      } else {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_name");
        localStorage.removeItem("auth_email");
        localStorage.removeItem("role");
        toast.success("User logout successful");
        navigate("/"); // Redirect to home after successful logout
      }
    }).catch((err) => {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_name");
      localStorage.removeItem("auth_email");
      localStorage.removeItem("role");
      toast.success("Logout successful");
      navigate("/"); // Redirect to home after successful logout
    });
  
  });
  };

  // Scroll effect to make navbar sticky and resize
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = toggle ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [toggle]);

  // Auth buttons for login/logout
  const AuthButtons = localStorage.getItem('auth_token') ? (
    <li className="cursor-pointer text-blue-800 hover:text-blue-600 dark:text-blue-200 dark:hover:text-blue-400" title="Log Out">
      <button onClick={logout} className="flex items-center">
        <LogOut aria-label="LogOut" />
      </button>
    </li>
  ) : (
    <li className="cursor-pointer text-blue-800 hover:text-blue-600 dark:text-blue-200 dark:hover:text-blue-400" title="Log In">
      <Link to="/login" onClick={() => handleNavigation('/login')}><User aria-label="User" /></Link>
    </li>
  );

  // Admin button for admin role
  const AdminBtn = localStorage.getItem('role') === 'admin' ? (
    <li className="cursor-pointer text-blue-800 hover:text-blue-600 dark:text-blue-200 dark:hover:text-blue-400" title="Admin">
      <Link to="/admin/dashboard" className="flex items-center">
        <KeySquare aria-label="Admin" />
      </Link>
    </li>
  ) : null;

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim()) {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/search`, {
          params: { query: term },
          headers: { 'Accept': 'application/json' },
        });

        if (response.data.status === 200 && response.data.products.length > 0) {
          setSearchResults(response.data.products);
        } else {
          setSearchResults([]); // Clear results if no match
        }
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]); // Clear results in case of error
      } finally {
        setIsLoading(false);
      }
    } else {
      setSearchResults([]); // Clear results if input is empty
    }
  };
  return (
<nav
  ref={navbarRef}
  className={`navbar fixed z-50 w-full text-slate-900 dark:text-white flex justify-between items-center px-6 transition-all duration-300 ease-in-out ${
    isScrolled
      ? 'bg-slate-200/95 dark:bg-slate-800/95 py-2 shadow-md'
      : 'bg-slate-200 dark:bg-slate-800 py-4'
  }`}
>
      <Link to='/' onClick={() => handleNavigation('/')}>
        <img src={fdcLogo} alt="First Digit Communications" className="w-40 h-auto" />
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden sm:flex justify-end items-center gap-10 flex-1 mr-10 relative">
        <li className="relative cursor-pointer text-lg text-blue-800 hover:text-blue-600 dark:text-blue-200 dark:hover:text-blue-400 group">
          <Link to="/store">Store</Link>
          <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-blue-800 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
        </li>

        {/* Products Dropdown with Dynamic Categories */}
        <DropdownMenu
          title="Products"
          items={category.map(cat => cat.name)}
          links={category.map(cat => `/collections/${cat.link}`)}
          dropdownOpen={dropdownOpen}
          section="products"
          handleDropdownToggle={handleDropdownToggle}
          dropdownRef={navbarRef}
          handleNavigation={handleNavigation}
        />

        {/* Other Dropdowns */}
        <DropdownMenu
          title="Services"
          items={['Academy', 'Internship']}
          links={['/services/learn', '/services/internship']}
          dropdownOpen={dropdownOpen}
          section="services"
          handleDropdownToggle={handleDropdownToggle}
          dropdownRef={navbarRef}
          handleNavigation={handleNavigation}
        />
        <DropdownMenu
          title="Company"
          items={['About Us', 'Team', 'Contact Us', 'Why Choose First Digits?']}
          links={['/company/about', '/company/team', '/company/contact', '/company/why-choose-us']}
          dropdownOpen={dropdownOpen}
          section="company"
          handleDropdownToggle={handleDropdownToggle}
          dropdownRef={navbarRef}
          handleNavigation={handleNavigation}
        />
        <DropdownMenu
          title="Support"
          items={['FAQ', 'Help Center', 'Community']}
          links={['/support/faq', '/support/help-center', '/support/community']}
          dropdownOpen={dropdownOpen}
          section="support"
          handleDropdownToggle={handleDropdownToggle}
          dropdownRef={navbarRef}
          handleNavigation={handleNavigation}
        />

        {/* Search Bar */}
        <li className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search..."
            className="p-2 pl-6 pr-4 rounded-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white  focus:outline-none focus:ring-2 focus:ring-blue-500 w-52"
          />
          {isLoading && (
            <span className="absolute left-3 top-2.5 text-gray-500">
              <Load />
            </span>
          )}
          {/* Add a dropdown for search results */}
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 text-blue-900 dark:text-white bg-white dark:bg-slate-800 shadow-lg rounded-lg border border-slate-300 dark:border-slate-600">
              <ul className="max-h-60 overflow-auto">
                {searchResults.map((item, index) => (
                  <li key={index} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-600 cursor-pointer">
                    <Link to={`/collections/${item.category.link}/${item.link}`} className="block" onClick={() => { setSearchTerm(''); setSearchResults([]); }}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      </ul>

      {/* Desktop Icons */}
      <ul className="hidden sm:flex justify-end items-center gap-6">
        <li className="cursor-pointer text-blue-800 hover:text-blue-600 dark:text-blue-200 dark:hover:text-blue-400" title="Language"><Earth aria-label="Language" /></li>
        {AuthButtons}
        {AdminBtn}
      </ul>

      {/* Mobile Menu Toggle */}
      <div className="sm:hidden flex items-center">
        <button onClick={() => setToggle(!toggle)} aria-label="Toggle Menu">
          {toggle ? (
            <X className="w-8 h-8 text-slate-900 dark:text-blue-200 dark:hover:text-blue-400 hover:text-gray-500" />
          ) : (
            <Menu className="w-8 h-8 text-slate-900 dark:text-blue-200 dark:hover:text-blue-400 hover:text-gray-500" />
          )}
        </button>

        {/* Mobile Menu */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: toggle ? "100vh" : 0,
            opacity: toggle ? 1 : 0,
            y: toggle ? 0 : -20, // Adds smooth upward motion on closing
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut", // Smooth transition when closing
          }}
          className={`absolute top-20 left-0 w-full bg-slate-200 dark:bg-slate-800 z-30 flex-col items-center gap-6 p-6 md:p-8 ${toggle ? "flex" : "hidden"}`}
          style={{
            maxHeight: 'calc(100vh - 80px)', // Adjust height based on your menu header height
            overflowY: 'scroll', // Enable vertical scrolling within the mobile menu
          }}
        >
          <ul className="space-y-10 mt-10 text-lg font-medium">            {/* Store Menu Item */}
            <li className="cursor-pointer text-lg text-blue-800 hover:text-blue-600 dark:text-blue-200 dark:hover:text-blue-400" title="Store">
              <Link to="/store" onClick={() => handleNavigation('/store')}>Store</Link>
            </li>

            {/* Products Dropdown */}
            <DropdownMenu
              title="Products"
              items={category.map(cat => cat.name)} // Dynamically displaying category names
              links={category.map(cat => `/collections/${cat.link}`)} // Dynamically generating links
              dropdownOpen={dropdownOpen}
              section="products"
              handleDropdownToggle={handleDropdownToggle}
              dropdownRef={dropdownRef}
              handleNavigation={handleNavigation}
            />

            {/* Services Dropdown */}
            <DropdownMenu
              title="Services"
              items={['Academy', 'Internship']}
              links={['/services/learn', '/services/internship']}
              dropdownOpen={dropdownOpen}
              section="services"
              handleDropdownToggle={handleDropdownToggle}
              dropdownRef={dropdownRef}
              handleNavigation={handleNavigation}
            />

            {/* Company Dropdown */}
            <DropdownMenu
              title="Company"
              items={['About Us', 'Team', 'Contact Us', 'Why Choose First Digits?']}
              links={['/company/about', '/company/team', '/company/contact', '/company/why-choose-us']}
              dropdownOpen={dropdownOpen}
              section="company"
              handleDropdownToggle={handleDropdownToggle}
              dropdownRef={dropdownRef}
              handleNavigation={handleNavigation}
            />

            {/* Support Dropdown */}
            <DropdownMenu
              title="Support"
              items={['FAQ', 'Help Center', 'Community']}
              links={['/support/faq', '/support/help-center', '/support/community']}
              dropdownOpen={dropdownOpen}
              section="support"
              handleDropdownToggle={handleDropdownToggle}
              dropdownRef={dropdownRef}
              handleNavigation={handleNavigation}
            />

            {/* Authentication and Admin Buttons with Labels */}
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center">
                <li className="cursor-pointer text-blue-800 hover:text-blue-600 dark:text-blue-200 dark:hover:text-blue-400" title="Language"><Earth aria-label="Language" /></li>
              </div>
              <div className="flex flex-col items-center">
                {AuthButtons}
              </div>

              <div className="flex flex-col items-center">
                {AdminBtn}
              </div>
            </div>
          </ul>

          {/* Mobile Search Bar */}
          <div className="sm:hidden text-base text-blue-900 w-full mt-16 p-4 bg-slate-200 border-t border-gray-300 dark:bg-slate-800 dark:text-blue-200 dark:border-gray-600 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search..."
              className="w-full p-3 border border-gray-300 rounded-md text-lg focus:outline-none dark:bg-slate-700 dark:text-white dark:border-gray-600"
              aria-label="Mobile Search Input"
            />
            {isLoading && (
              <span className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400">
                <Load />
              </span>
            )}
            {/* Display search results */}
            {searchResults.length > 0 && (
              <div className="mt-1 bg-white rounded-md shadow-lg p-1 dark:bg-slate-700">
                {searchResults.map((product) => (
                  <div key={product.id} className="border-b border-gray-200 py-2 dark:border-gray-600">
                    <Link to={`/collections/${product.category?.link || 'default-category'}/${product.link}`} onClick={() => { setToggle(false); setSearchTerm(''); setSearchResults([]); }}>
                      {product.name}
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {/* Show a message if no results are found */}
            {searchTerm && searchResults.length === 0 && (
              <p className="text-center text-gray-500 mt-4 dark:text-gray-400">No products found.</p>
            )}
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
