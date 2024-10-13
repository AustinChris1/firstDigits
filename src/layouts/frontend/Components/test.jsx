import React, { useState } from 'react';
import fdcLogo from '../assets/fdcLogo.png';
import { Search, User, Earth, X, Menu } from "lucide-react";
import { motion } from 'framer-motion';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  const item = {
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        ease: "easeInOut",
        duration: 0.3,
        delay: 0.9,
      },
    },
  };

  return (
    <nav className="navbar fixed z-50 bg-slate-200 text-blue-800 dark:text-white w-full flex justify-between items-center px-6 py-4">
      {/* Logo */}
      <img src={fdcLogo} alt="First Digit" className="w-40 h-auto" />

      {/* Desktop Menu */}
      <ul className="hidden sm:flex justify-end items-center gap-10 flex-1 mr-10">
        <li className="cursor-pointer text-blue-800 hover:text-blue-600">Home</li>
        <li className="cursor-pointer text-blue-800 hover:text-blue-600">Products</li>
        <li className="cursor-pointer text-blue-800 hover:text-blue-600">Services</li>
        <li className="cursor-pointer text-blue-800 hover:text-blue-600">About Us</li>
      </ul>

      {/* Desktop Icons */}
      <ul className="hidden sm:flex justify-end items-center gap-6">
        <li className="cursor-pointer text-blue-800 hover:text-blue-600"><Search aria-label="Search" /></li>
        <li className="cursor-pointer text-blue-800 hover:text-blue-600"><Earth aria-label="Language" /></li>
        <li className="cursor-pointer text-blue-800 hover:text-blue-600"><User aria-label="User" /></li>
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
          variants={item}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: toggle ? "100vh" : 0, opacity: toggle ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className={`${
            toggle ? "flex" : "hidden"
          } absolute top-20 left-0 w-full bg-slate-200 flex-col items-center justify-center p-4 min-h-full`}
        >
          <ul className="flex flex-col justify-center items-center gap-6">
            <motion.li
              initial={{ y: 90, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="cursor-pointer text-blue-800 hover:text-blue-600"
            >
              Home
            </motion.li>
            <motion.li
              initial={{ y: 90, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="cursor-pointer text-blue-800 hover:text-blue-600"
            >
              Products
            </motion.li>
            <motion.li
              initial={{ y: 90, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="cursor-pointer text-blue-800 hover:text-blue-600"
            >
              Services
            </motion.li>
            <motion.li
              initial={{ y: 90, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="cursor-pointer text-blue-800 hover:text-blue-600"
            >
              About Us
            </motion.li>
          </ul>
          <ul className="flex justify-center items-center gap-6 mt-6">
            <li className="cursor-pointer text-blue-800 hover:text-blue-600"><Search aria-label="Search" /></li>
            <li className="cursor-pointer text-blue-800 hover:text-blue-600"><Earth aria-label="Language" /></li>
            <li className="cursor-pointer text-blue-800 hover:text-blue-600"><User aria-label="User" /></li>
          </ul>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
