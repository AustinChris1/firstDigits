import React from 'react';
import bgImg from '../assets/bgImage.jpg';
import { Target, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <>
      <div className="relative w-full h-screen overflow-hidden"> {/* Changed overflow-x-hidden to overflow-hidden */}
        {/* Wavy Top SVG */}
        <div className="absolute top-0 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full h-20"
          >
            <path
              fill="#fff"
              fillOpacity="1"
              d="M0,256L48,245.3C96,235,192,213,288,202.7C384,192,480,192,576,181.3C672,171,768,149,864,160C960,171,1056,213,1152,234.7C1248,256,1344,256,1392,256L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            ></path>
          </svg>
        </div>

        {/* Background Image */}
        <img src={bgImg} alt="Background" className="w-full h-full object-cover" />

        <div className="absolute inset-0 flex flex-col items-center justify-center p-5 sm:p-10 z-10 bg-black/50">
          {/* About Us Header */}
          <motion.h1
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center text-white text-2xl sm:text-3xl mb-5"
          >
            About Us
          </motion.h1>

          <motion.p
            initial={{ height: 0, opacity: 0 }}
            whileInView={{ height: 'auto', opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-gray-200 mb-10 text-center max-w-lg sm:max-w-xl"
          >
            First Digits Communications is a company registered under the Corporate Affairs Commission (CAC) that helps you stay connected and lively in the modern world.
          </motion.p>

          <div className="relative w-full max-w-5xl flex flex-col items-center space-y-10">
            <div className="absolute hidden sm:block w-1 bg-gray-400 h-full left-1/2 transform -translate-x-1/2"></div>

            {/* Our Mission */}
            <motion.div
              initial={{ translateX: '-100%', opacity: 0 }}
              whileInView={{ translateX: 0, opacity: 1 }}
              transition={{ duration: 1.5 }}
              viewport={{ once: true }}
              className="relative flex flex-col sm:flex-row items-center sm:items-start w-full sm:mb-10"
            >
              <div className="flex flex-col items-center sm:items-start sm:w-1/2 sm:pr-10 text-center sm:text-left">
                <Target className="text-white mb-3" />
                <h1 className="text-gray-200 text-lg sm:text-xl mb-3">Our Mission</h1>
                <p className="text-gray-200 break-words max-w-xs sm:max-w-sm">
                  To empower individuals and businesses to enhance their lives and operations through innovative, user-friendly smart home and office solutions.
                </p>
              </div>
            </motion.div>

            {/* Our Vision */}
            <motion.div
              initial={{ translateX: '100%', opacity: 0 }}
              whileInView={{ translateX: 0, opacity: 1 }}
              transition={{ duration: 1.5 }}
              viewport={{ once: true }}
              className="relative flex flex-col sm:flex-row items-center sm:justify-end w-full sm:mb-10"
            >
              <div className="flex flex-col items-center sm:items-end sm:w-1/2 sm:pl-10 text-center sm:text-right">
                <Eye className="text-white mb-3" />
                <h1 className="text-gray-200 text-lg sm:text-xl mb-3">Our Vision</h1>
                <p className="text-gray-200 break-words max-w-xs sm:max-w-sm">
                  To be the leading provider of comprehensive and affordable smart home and office automation systems, revolutionizing the way people live and work, creating a more connected, efficient, and sustainable future.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
