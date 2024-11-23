import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';

const ContactUs = () => {
  document.title = `Contact Us - First Digits`;
  return (
    <div className="relative w-full min-h-screen bg-blue-900">
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-5 sm:p-10 text-center bg-black/70">
      <div className="mt-20">
        <motion.h1
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-white text-4xl sm:text-5xl mb-6 font-bold"
        >
          Contact Us
        </motion.h1>

        <div className="flex flex-col items-center justify-center">
  <motion.p
    initial={{ height: 0, opacity: 0 }}
    whileInView={{ height: 'auto', opacity: 1 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="text-gray-200 mb-10 text-center text-lg sm:text-xl max-w-3xl"
  >
    We would love to hear from you! Whether you have a question about our products, need assistance, or just want to talk about technology, feel free to reach out to us.
  </motion.p>
</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-20 max-w-6xl">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-lg p-5 text-left flex items-start"
          >
            <MapPin className="text-blue-500 w-8 h-8 mr-3" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Our Address</h2>
              <p className="text-gray-700">
                Suite 011, Nimota Plaza, Plot 855, Tafawa Balewa Way, Area 11, Garki Abuja, Nigeria
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-lg p-5 text-left flex items-start"
          >
            <Mail className="text-blue-500 w-8 h-8 mr-3" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Email Us</h2>
              <p className="text-gray-700">
                <a href="mailto:fdcdevs2024@gmail.com" className="text-blue-800">fdcdevs2024@gmail.com</a>
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-lg p-5 text-left flex items-start"
          >
            <Phone className="text-blue-500 w-8 h-8 mr-3" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Call Us</h2>
              <p className="text-gray-700">
                <a href="tel:+2347052500468" className="text-blue-800">0705 250 0468</a>, 
                <a href="tel:+2348163378811" className="text-blue-800"> 0816 337 8811</a>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Contact Form */}
        <form className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-5 text-center">Get in Touch</h2>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
            <textarea
              placeholder="Your Message"
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500 h-32"
              required
            ></textarea>
            <button type="submit" className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300">
              Send Message
            </button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default ContactUs;
