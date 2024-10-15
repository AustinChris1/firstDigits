import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative">
        {/* Outer Spinner */}
        <div className="w-24 h-24 border-4 border-blue-900 border-dashed rounded-full animate-spin"></div>
        
        {/* Middle Pulsing Ring */}
        <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent rounded-full animate-ping border-blue-400 opacity-75"></div>

        {/* Inner Glow Circle */}
        <div className="absolute top-0 left-0 w-16 h-16 bg-blue-900 opacity-80 rounded-full animate-pulse"></div>

        {/* Central Bouncing Dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 bg-white rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
