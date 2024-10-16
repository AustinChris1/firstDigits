import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import smarthome from "../assets/smarthome.jpg";
import robotics1 from "../assets/robotics1.jpg";
import robotics2 from "../assets/robotics2.jpg";
import robotics3 from "../assets/robotics3.jpg";
import { Hand } from "lucide-react";

const featuredProducts = [smarthome, robotics1, robotics2, robotics3];

let count = 0;
let slideInterval;

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef(null);
  const scrollTargetRef = useRef(null);

  const removeAnimation = () => {
    slideRef.current.classList.remove("fade-anim");
  };

  useEffect(() => {
    slideRef.current.addEventListener("animationend", removeAnimation);
    slideRef.current.addEventListener("mouseenter", pauseSlider);
    slideRef.current.addEventListener("mouseleave", startSlider);

    startSlider();

    return () => {
      pauseSlider();
    };
  }, []);

  const startSlider = () => {
    slideInterval = setInterval(() => {
      handleOnNextClick();
    }, 5000);
  };

  const pauseSlider = () => {
    clearInterval(slideInterval);
  };

  const handleOnNextClick = () => {
    count = (count + 1) % featuredProducts.length;
    setCurrentIndex(count);
    slideRef.current.classList.add("fade-anim");
  };

  const handleOnPrevClick = () => {
    const productsLength = featuredProducts.length;
    count = (currentIndex + productsLength - 1) % productsLength;
    setCurrentIndex(count);
    slideRef.current.classList.add("fade-anim");
  };

  // Scroll to the target section when the icon is clicked
  const handleScrollDown = () => {
    scrollTargetRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Framer Motion animation variants
  const textContainerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.5, // Delays the appearance of each child
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <>
      <div ref={slideRef} className="w-full select-none relative">
        {/* Image Container */}
        <div className="aspect-w-16 aspect-h-9">
          <img
            src={featuredProducts[currentIndex]}
            alt="Featured Product"
            className="brightness-50 object-cover w-full h-[100vh]"
          />
        </div>

        {/* Scroll Overlay Text with Framer Motion */}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center">
          <motion.div
            className="flex flex-col justify-center w-full h-[100vh] p-10"
            variants={textContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              className="text-white text-2xl font-bold"
              variants={textVariants}
            >
              Automate your Home/Office and be smartly connected
            </motion.p>
            <motion.p className="p-6 text-white text-2xl" variants={textVariants}>
              Making home smarter
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll Down Section */}
        <div className="absolute bottom-10 w-full flex justify-center items-center">
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={handleScrollDown}
          >
            <p className="text-white">Scroll Down</p>
            <Hand className="text-white text-3xl animate-bounce" />
          </div>
        </div>
      </div>

      {/* Reference Section for Scroll */}
      <div ref={scrollTargetRef} className="scroll-target-section">
        {/* Add content for the section you want to scroll to */}
      </div>
    </>
  );
}
