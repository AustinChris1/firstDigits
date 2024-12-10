import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ig from '../assets/social/instagram.svg';
import x from '../assets/social/x.svg';
import fb from '../assets/social/facebook.svg';
import phone from '../assets/social/phone.svg';
import { toast } from 'react-toastify';
import axios from 'axios';
import Load from './Load';


const iframeSrc =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126091.50068803449!2d7.481260032478743!3d9.030942164225989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0b964ec887e5%3A0x12a34843356767e8!2sNimota%20Plaza!5e0!3m2!1sen!2sng!4v1726406738672!5m2!1sen!2sng';

const Iframe = ({ src }) => (
    <div className="w-5/6 mx-auto pb-6 h-64 sm:h-80">
        <iframe
            src={src}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map Location"
        ></iframe>
    </div>
);

const Footer = () => {
    const [category, setCategory] = useState([]); // State to store categories

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
    const Subscribe = (e) => {
        e.preventDefault();
        toast.info('Coming soon');


    };
    const year = new Date().getFullYear();

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    };

    return (
        <footer className="bg-gray-100 dark:bg-gray-800">
            {/* Newsletter */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className=" py-10 px-6 text-center"
            >
                <h2 className="text-2xl font-semibold mb-4 dark:text-gray-200">Subscribe to Our Newsletter</h2>
                <p className="text-blue-800 dark:text-gray-200 mb-6">
                    Stay updated with the latest news, offers, and insights from First Digits.
                </p>
                <form onSubmit={Subscribe} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full sm:w-auto p-3 rounded-md focus:ring focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="bg-white text-blue-800 px-6 py-3 rounded-md font-semibold hover:bg-gray-200"
                    >
                        Subscribe
                    </button>
                </form>
            </motion.div>

            {/* Main Footer Section */}
            <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {/* Products */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="space-y-4"
                >
                    <h3 className="text-xl font-semibold text-blue-800 dark:text-white">Products</h3>
                    <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                        {category.length > 0 ? (
                            category.map((cat, index) => (
                                <li key={index}>
                                    <Link to={`/collections/${cat.link}`} className="hover:underline">
                                        {cat.name}
                                    </Link>
                                </li>
                            ))
                        ) : (
                            <Load />
                        )}
                    </ul>
                </motion.div>

                {/* Services */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="space-y-4"
                >
                    <h3 className="text-xl font-semibold text-blue-800 dark:text-white">Services</h3>
                    <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                        <li>
                            <Link to="/services/learn" className="hover:underline">
                                Academy
                            </Link>
                        </li>
                        <li>
                            <Link to="/services/internship" className="hover:underline">
                                Internship
                            </Link>
                        </li>
                    </ul>
                </motion.div>

                {/* Company */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="space-y-4"
                >
                    <h3 className="text-xl font-semibold text-blue-800 dark:text-white">Company</h3>
                    <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                        <li>
                            <Link to="/company/about" className="hover:underline">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/company/team" className="hover:underline">
                                Team
                            </Link>
                        </li>
                        <li>
                            <Link to="/company/contact" className="hover:underline">
                                Contact Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/company/why-choose-us" className="hover:underline">
                                Why First Digits?
                            </Link>
                        </li>
                    </ul>
                </motion.div>
                {/* Address and Map */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="space-y-4"
                >
                    <h3 className="text-xl font-semibold text-blue-800 dark:text-white">Address</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                        Suite 011, Nimota Plaza, Plot 855, Tafawa Balewa Way, Area 11, Garki Abuja, Nigeria
                    </p>
                </motion.div>
            </div>

            {/* Social Links */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="text-center py-6"
            >
                <Iframe src={iframeSrc} />

                <div className="flex justify-center gap-6">
                    {[{ icon: x, link: 'https://x.com' }, { icon: ig, link: 'https://instagram.com/firstdigits' }, { icon: fb, link: 'https://facebook.com' }, { icon: phone, link: 'tel:+2347052500468' }].map(
                        ({ icon, link }, index) => (
                            <a
                                key={index}
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-transform transform hover:scale-125"
                            >
                                <img src={icon} alt="Social Icon" className="w-8 h-8" />
                            </a>
                        )
                    )}
                </div>
            </motion.div>

            {/* Footer Bottom */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="bg-gray-200 dark:bg-gray-800 text-center py-5"
            >
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    Copyright &copy; {year} All rights reserved.
                </p>
                <div className="flex flex-col sm:flex-row text-center justify-center gap-4 sm:gap-10 py-5 animate__animated animate__fadeIn animate__delay-7s">                    <Link to="/terms" className="text-blue-800 dark:text-blue-400 hover:underline">
                    Terms of Use
                </Link>
                    <Link to="/privacy-notice" className="text-blue-800 dark:text-blue-400 hover:underline">
                        Privacy Notice
                    </Link>
                </div>
            </motion.div>
        </footer>
    );
};

export default Footer;
