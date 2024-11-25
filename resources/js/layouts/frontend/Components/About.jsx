import React, { useRef, useEffect, useState } from 'react';
import bgImg from '../assets/bgImage.jpg';
import { Target, Eye, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import Load from './Load';

const About = () => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current.play();
          } else {
            videoRef.current.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
    videoRef.current.muted = !videoRef.current.muted;
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gray-900 dark:bg-gray-800">
      {/* Wavy Top SVG */}
      <div className="absolute top-0 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-20 dark:fill-gray-700"
        >
          <path
            fill="#fff"
            fillOpacity="1"
            d="M0,256L48,245.3C96,235,192,213,288,202.7C384,192,480,192,576,181.3C672,171,768,149,864,160C960,171,1056,213,1152,234.7C1248,256,1344,256,1392,256L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>

      {/* Background Image */}
      <img src={bgImg} alt="Background" className="w-full h-full object-cover absolute inset-0 opacity-20 dark:opacity-30" />

      <div className="relative z-10 flex flex-col items-center justify-start p-5 sm:p-8 space-y-8">
        <motion.h1
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="text-center text-white text-2xl sm:text-3xl mb-3 animate__animated animate__fadeIn animate__delay-0.5s"
        >
          About Us
        </motion.h1>

        <motion.p
          initial={{ height: 0, opacity: 0 }}
          whileInView={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-gray-200 text-center max-w-lg sm:max-w-xl mb-6 animate__animated animate__fadeIn animate__delay-0.7s"
        >
          First Digits Communications is a company registered under the Corporate Affairs Commission (CAC) that helps you stay connected and lively in the modern world.
        </motion.p>

        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="w-full px-5 sm:px-0 max-w-3xl relative"
        >
          {isLoading && <Load />} {/* Show spinner while loading */}
          <video
            ref={videoRef}
            className="w-full rounded-lg shadow-lg object-cover"
            muted={isMuted}
            loop
            playsInline
            style={{ boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.5)' }}
            onWaiting={() => setIsLoading(true)}   // Set loading to true when waiting
            onCanPlay={() => setIsLoading(false)}  // Set loading to false when ready to play
          >
            <source src="/uploads/about.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button
            onClick={toggleMute}
            className="absolute top-2 right-2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition duration-300"
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </motion.div>

        {/* Mission and Vision Sections */}
        <div className="relative w-full max-w-5xl flex flex-col items-center space-y-18 py-8">
          <div className="absolute hidden sm:block w-1 bg-gray-400 h-full left-1/2 transform -translate-x-1/2 dark:bg-gray-600"></div>

          <motion.div
            initial={{ translateX: '-100%', opacity: 0 }}
            whileInView={{ translateX: 0, opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className="relative flex flex-col sm:flex-row items-center sm:items-start w-full sm:mb-8 px-4"
          >
            <div className="flex flex-col items-center sm:items-start sm:w-1/2 sm:pr-8 text-center sm:text-left">
              <Target className="text-white mb-2 text-3xl transition duration-300 transform hover:scale-110 hover:text-gray-400" />
              <h1 className="text-gray-200 text-lg sm:text-xl mb-2">Our Mission</h1>
              <p className="text-gray-200 max-w-xs sm:max-w-sm">
                To empower individuals and businesses to enhance their lives and operations through innovative, user-friendly smart home and office solutions.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ translateX: '100%', opacity: 0 }}
            whileInView={{ translateX: 0, opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className="relative flex flex-col sm:flex-row items-center sm:justify-end w-full sm:mb-8 px-4"
          >
            <div className="flex flex-col items-center sm:items-end sm:w-1/2 sm:pl-8 text-center sm:text-right">
              <Eye className="text-white mb-2 text-3xl transition duration-300 transform hover:scale-110 hover:text-gray-400" />
              <h1 className="text-gray-200 text-lg sm:text-xl mb-2">Our Vision</h1>
              <p className="text-gray-200 max-w-xs sm:max-w-sm">
                To be the leading provider of comprehensive and affordable smart home and office automation systems, revolutionizing the way people live and work, creating a more connected, efficient, and sustainable future.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
