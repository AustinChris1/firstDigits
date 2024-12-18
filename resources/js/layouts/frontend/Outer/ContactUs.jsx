import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Load from '../Components/Load';

const ContactUs = () => {
  document.title = `Contact Us - First Digits`;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [statusMessage, setStatusMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      // Request a CSRF cookie before making the POST request
      await axios.get("/sanctum/csrf-cookie");
  
      // Make the POST request
      const response = await axios.post("/api/contact-us", formData);
  
      // Handle success response
      if (response.data.status === 200) {
        toast.success(response.data.message);
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send your message. Please try again later.");
      }
    } catch (error) {
      // Handle error responses
      toast.error("Failed to send your message. Please try again later.");
    } finally {
      // Ensure the submitting state is reset
      setIsSubmitting(false);
    }
  };  
    
      return (
        <div className="relative w-full min-h-screen bg-blue-900 dark:bg-blue-800">
          <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-5 sm:p-10 text-center bg-black/70 dark:bg-black/80">
            <div className="mt-20">
              <motion.h1
                initial={{ y: -100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-white text-4xl sm:text-5xl mb-6 font-bold dark:text-gray-200"
              >
                Contact Us
              </motion.h1>

              <div className="flex flex-col items-center justify-center">
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  whileInView={{ height: 'auto', opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-gray-200 mb-10 text-center text-lg sm:text-xl max-w-3xl dark:text-gray-300"
                >
                  We would love to hear from you! Whether you have a question about our products, need assistance, or just want to talk about technology, feel free to reach out to us.
                </motion.p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 mb-20 max-w-6xl">
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-lg p-5 text-left flex items-start dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
                >
                  <MapPin className="text-blue-500 w-8 h-8 mr-3 dark:text-blue-400" />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Our Address</h2>
                    <p className="text-gray-700 dark:text-gray-400">
                      Suite 011, Nimota Plaza, Plot 855, Tafawa Balewa Way, Area 11, Garki Abuja, Nigeria
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-lg p-5 text-left flex items-start dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
                >
                  <Mail className="text-blue-500 w-8 h-8 mr-3 dark:text-blue-400" />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Email Us</h2>
                    <p className="text-gray-700 dark:text-gray-400">
                      <a href="mailto:support@firstdigit.com.ng" className="text-blue-800 dark:text-blue-500">support@firstdigit.com.ng</a>
                    </p>
                  </div>
                </motion.div>

              </div>

              {/* Contact Form */}
              <form
                onSubmit={handleSubmit}
                className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg dark:bg-gray-800 dark:text-gray-300"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-5 text-center dark:text-gray-100">Get in Touch</h2>
                <div className="grid grid-cols-1 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-400 dark:text-gray-300"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-400 dark:text-gray-300"
                    required
                  />
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-400 dark:text-gray-300 h-32"
                    required
                  ></textarea>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`${isSubmitting ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-600'
                      } text-white py-2 rounded transition duration-300 dark:bg-blue-600 dark:hover:bg-blue-500`}
                  >
                    {isSubmitting ? <Load /> : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    };

    export default ContactUs;
