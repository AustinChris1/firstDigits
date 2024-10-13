import React, { useState, useRef } from 'react';
import domecam from "../assets/products/2MP-IR-Dome-Camera.jpg";
import netcam from "../assets/products/2MP-IR-Network-Camera-with-In-built-Microphone.jpg";
import dsPS from "../assets/products/DS-Power-Supply.jpg";
import felicityCharge from "../assets/products/Felicity-Charge-controller.jpg";
import monoCrystallinePanel from "../assets/products/Monocrystalline-Solar-Panel-300WTT.jpg";
import thermcam from "../assets/products/Handheld-Thermographic-Camera.jpg";
import inverterMount from "../assets/products/Inverter-Tower-Mount.png";
import ipFinger from "../assets/products/IP-based-Fingerprint-Access-Control-Terminal.png";
import lumBat from "../assets/products/luminous-battery.png";
import solcam from "../assets/products/solar-camera.png";
import wireMonitor from "../assets/products/Wire-indoor-monitor-KIT.png";
import { ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const products = [
    { id: "prod-1", name: "2MP IR Dome Camera", img: domecam, price: 40, category: "Camera" },
    { id: "prod-2", name: "2MP IR Network Camera with In-built Microphone", img: netcam, price: 35, category: "Camera" },
    { id: "prod-3", name: "DS Power Supply", img: dsPS, price: 720, category: "Power" },
    { id: "prod-4", name: "Felicity Charge Controller", img: felicityCharge, price: 400, category: "Power" },
    { id: "prod-5", name: "Monocrystalline Solar Panel 300WTT", img: monoCrystallinePanel, price: 98, category: "Solar" },
    { id: "prod-6", name: "Handheld Thermographic Camera", img: thermcam, price: 124, category: "Camera" },
    { id: "prod-7", name: "Inverter Tower Mount", img: inverterMount, price: 45, category: "Power" },
    { id: "prod-8", name: "IP-based Fingerprint Access Control Terminal", img: ipFinger, price: 85, category: "Security" },
    { id: "prod-9", name: "Luminous Battery", img: lumBat, price: 155, category: "Power" },
    { id: "prod-10", name: "Solar Camera", img: solcam, price: 90, category: "Camera" },
    { id: "prod-11", name: "Wire Indoor Monitor KIT", img: wireMonitor, price: 245, category: "Security" },
];

const Products = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = ["All", "Camera", "Power", "Solar", "Security"];

    const filteredProducts = selectedCategory === "All"
        ? products
        : products.filter(prod => prod.category === selectedCategory);

    // Ref for the product section
    const productRef = useRef(null);

    // Hook to detect when the component is in view
    const isInView = useInView(productRef, { once: true, threshold: 0.1 });

    // Framer Motion animation variants
    const productCardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.2 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.5 } },
    };

    const gridVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 1.5 } }
    };

    return (
        <div className="w-full mt-20">
            <h1 className="text-center text-3xl font-semibold mb-10">Products</h1>
            
            {/* Category buttons */}
            <div className="flex justify-center mb-5">
                {categories.map(category => (
                    <motion.button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`mx-2 p-2 rounded-lg transition duration-300 transform ${
                            selectedCategory === category ? 'bg-blue-900 text-white scale-105' : 'bg-gray-200 text-black'
                        } hover:scale-110`}
                        whileHover={{ scale: 1.1 }}
                    >
                        {category}
                    </motion.button>
                ))}
            </div>

            {/* Products grid */}
            <motion.div
                ref={productRef}
                className="flex flex-wrap justify-center gap-5 px-5"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={gridVariants}
            >
                <AnimatePresence>
                    {filteredProducts.map(prod => (
                        <motion.div
                            key={prod.id}
                            className="w-full sm:w-[40%] md:w-[25%] lg:w-[17%] p-4 bg-white rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out"
                            variants={productCardVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <motion.img
                                src={prod.img}
                                alt={prod.name}
                                className="w-full h-50 object-cover rounded-t-lg"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                            />
                            <div className="flex flex-col justify-center items-center gap-3">
                                <p className="pt-2 text-center font-semibold">{prod.name}</p>
                                <p className="pt-2 text-left font-thin text-red-500">${prod.price}</p>
                                <motion.button 
                                    whileHover={{ scale: 1.05 }} 
                                    className="w-fit p-2 flex items-center justify-center text-gray-200 hover:brightness-110 bg-gradient-to-r from-[#1c4587] to-gray-200 rounded-full transition-transform duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    Add to Cart <ShoppingCart className="ml-1" />
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default Products;
