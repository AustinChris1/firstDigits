import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="mt-28 min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-50 to-blue-100">
      {/* Icon */}
      <div className="text-blue-600 mb-8">
        <svg className="w-24 h-24 md:w-32 md:h-32" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 14l6 6m0-6l-6-6m2-2a9 9 0 100 18 9 9 0 000-18z" />
        </svg>
      </div>
      
      {/* Error Message */}
      <h1 className="text-4xl md:text-6xl font-bold text-blue-900 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-lg md:text-xl text-blue-600 mb-8 text-center">
        Oops! The page you are looking for does not exist or has been moved.
      </p>

      {/* Button */}
      <Link to="/" className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500 transition-all">
        Go Back Home
      </Link>

    </div>
  );
};

export default NotFound;
