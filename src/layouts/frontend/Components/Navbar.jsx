import React, { useState, useRef, useEffect } from 'react';
import fdcLogo from '../assets/fdcLogo.png';
import { User, Earth, X, Menu, ChevronDown, ShoppingCart, LogOut, KeySquare } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';

const DropdownMenu = ({ title, items, links, dropdownOpen, section, handleDropdownToggle, dropdownRef }) => (
  <li
    className="relative cursor-pointer text-blue-800 hover:text-blue-600 group"
    onClick={() => handleDropdownToggle(section)}
    aria-haspopup="true"
    aria-expanded={dropdownOpen === section}
  >
    <div className="flex items-center">
      {title} <ChevronDown className="inline-block w-4 h-4 ml-1" />
    </div>
    <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-blue-800 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

    <AnimatePresence>
      {dropdownOpen === section && (
        <motion.ul
          ref={dropdownRef}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute left-0 top-full mt-2 bg-slate-200 w-auto rounded-md shadow-lg z-10"
          role="menu"
        >
          {items.map((item, index) => (
            <li
              key={index}
              className="p-2 hover:bg-blue-800 hover:text-white transition-colors cursor-pointer"
              role="menuitem"
            >
              <Link to={links[index]}>{item}</Link>
            </li>
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  </li>
);

const Navbar = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

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

  const handleDropdownToggle = (section) => {
    setDropdownOpen(prev => (prev === section ? null : section));
  };

  const logout = (e) => {
    e.preventDefault();
    axios.post(`/api/logout`).then(res => {
      if(res.data.status === 200){
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_name");
        localStorage.removeItem("auth_email");
        localStorage.removeItem("role");
        swal("Success", res.data.message, "success");
        navigate("/"); // Redirect to home after successful logout
      } else {
        swal("Error", res.data.message, "error");
      }
    });
  }

  const AuthButtons = localStorage.getItem('auth_token') ? (
    <li className="cursor-pointer text-blue-800 hover:text-blue-600" title="Log Out">
      <button onClick={logout} className="flex items-center">
        <LogOut aria-label="LogOut" />
      </button>
    </li>
  ) : (
    <li className="cursor-pointer text-blue-800 hover:text-blue-600" title="Log In">
      <Link to="/login"><User aria-label="User" /></Link>
    </li>
  );

  const AdminBtn = localStorage.getItem('role') === 'admin' ? (
    <li className="cursor-pointer text-blue-800 hover:text-blue-600" title="Admin">
      <Link to="/admin/dashboard" className="flex items-center">
        <KeySquare aria-label="Admin" />
      </Link>
    </li>
  ) : null;

  const handleNavigation = () => {
    setToggle(false); // Close mobile menu after navigation
  };

  return (
    <nav ref={navbarRef} className="navbar fixed z-50 bg-slate-200 text-slate-900 dark:text-white w-full flex justify-between items-center px-6 py-4 top-0 mb-20">
      <Link to='/'>
        <img src={fdcLogo} alt="First Digit Communications" className="w-40 h-auto" />
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden sm:flex justify-end items-center gap-10 flex-1 mr-10 relative">
        <li className="relative cursor-pointer text-blue-800 hover:text-blue-600 group">
          <Link to="/store">Store</Link>
          <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-blue-800 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
        </li>

        {/* Reusable Dropdowns */}
        <DropdownMenu
          title="Products"
          items={['Smart Home', 'Robotics', 'Automations']}
          links={['/products/smart-home', '/products/robotics', '/products/automations']}
          dropdownOpen={dropdownOpen}
          section="products"
          handleDropdownToggle={handleDropdownToggle}
          dropdownRef={dropdownRef}
        />
        <DropdownMenu
          title="Services"
          items={['Academy', 'Internship', 'Service 3']}
          links={['/services/learn', '/services/internship', '/services/service3']}
          dropdownOpen={dropdownOpen}
          section="services"
          handleDropdownToggle={handleDropdownToggle}
          dropdownRef={dropdownRef}
        />
        <DropdownMenu
          title="Company"
          items={['About Us', 'Contact Us', 'Why Choose First Digits?']}
          links={['/company/about', '/company/contact', '/company/why-choose-us']}
          dropdownOpen={dropdownOpen}
          section="company"
          handleDropdownToggle={handleDropdownToggle}
          dropdownRef={dropdownRef}
        />
        <DropdownMenu
          title="Support"
          items={['FAQ', 'Help Center', 'Community']}
          links={['/support/faq', '/support/help-center', '/support/community']}
          dropdownOpen={dropdownOpen}
          section="support"
          handleDropdownToggle={handleDropdownToggle}
          dropdownRef={dropdownRef}
        />
      </ul>

      {/* Desktop Icons */}
      <ul className="hidden sm:flex justify-end items-center gap-6">
        <li className="cursor-pointer text-blue-800 hover:text-blue-600" title="Language"><Earth aria-label="Language" /></li>
        {AuthButtons}
        <li className="cursor-pointer text-blue-800 hover:text-blue-600" title="Cart"><ShoppingCart aria-label="ShoppingCart" /></li>
        {AdminBtn}
      </ul>

      {/* Mobile Menu Toggle */}
      <div className="sm:hidden flex items-center">
        <button onClick={() => setToggle(!toggle)} aria-label="Toggle Menu">
          {toggle ? (
            <X className="w-8 h-8 text-slate-900 dark:text-blue-800 hover:text-gray-500" />
          ) : (
            <Menu className="w-8 h-8 text-slate-900 dark:text-blue-800 hover:text-gray-500" />
          )}
        </button>

        {/* Mobile Menu */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: toggle ? "100vh" : 0, opacity: toggle ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className={`${toggle ? "flex" : "hidden"} absolute top-20 left-0 w-full bg-slate-200 flex-col items-center justify-center p-4 min-h-full`}
        >
          <ul className="flex flex-col justify-center items-center gap-6 text-3xl">
            <li className="relative cursor-pointer text-blue-800 hover:text-blue-600 group">
              <Link to="/store" onClick={handleNavigation}>Store</Link>
            </li>

            <DropdownMenu
              title="Products"
              items={['Smart Home', 'Robotics', 'Automations']}
              links={['/products/smart-home', '/products/robotics', '/products/automations']}
              dropdownOpen={dropdownOpen}
              section="products"
              handleDropdownToggle={handleDropdownToggle}
              dropdownRef={dropdownRef}
            />
            <DropdownMenu
              title="Services"
              items={['Academy', 'Internship', 'Service 3']}
              links={['/services/learn', '/services/internship', '/services/service3']}
              dropdownOpen={dropdownOpen}
              section="services"
              handleDropdownToggle={handleDropdownToggle}
              dropdownRef={dropdownRef}
            />
            <DropdownMenu
              title="Company"
              items={['About Us', 'Contact Us', 'Why Choose First Digits?']}
              links={['/company/about', '/company/contact', '/company/why-choose-us']}
              dropdownOpen={dropdownOpen}
              section="company"
              handleDropdownToggle={handleDropdownToggle}
              dropdownRef={dropdownRef}
            />
            <DropdownMenu
              title="Support"
              items={['FAQ', 'Help Center', 'Community']}
              links={['/support/faq', '/support/help-center', '/support/community']}
              dropdownOpen={dropdownOpen}
              section="support"
              handleDropdownToggle={handleDropdownToggle}
              dropdownRef={dropdownRef}
            />
          </ul>

          {/* Mobile Icons */}
          <ul className="flex justify-center items-center gap-6 mt-6">
            <li className="cursor-pointer text-blue-800 hover:text-blue-600" title="Language"><Earth aria-label="Language" /></li>
            {AuthButtons}
            <li className="cursor-pointer text-blue-800 hover:text-blue-600" title="Cart"><ShoppingCart aria-label="ShoppingCart" /></li>
            {AdminBtn}
          </ul>
                       {/* Mobile Search Bar at the Bottom */}
      <div className="sm:hidden text-base text-blue-900 bottom-0 left-0 right-0 p-4 bg-slate-200 border-t border-gray-300">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-3 border border-gray-300 rounded-md"
          aria-label="Mobile Search Input"
        />
      </div>

        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
