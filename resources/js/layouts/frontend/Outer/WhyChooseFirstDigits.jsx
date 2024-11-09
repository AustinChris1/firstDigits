import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const WhyChooseFirstDigits = () => {
  return (
    <div className="relative w-full min-h-screen bg-gray-100">
      <div className="p-5 sm:p-10 flex flex-col items-center text-center">
      <div className="mt-24">
        <motion.h2
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-blue-900 text-4xl sm:text-5xl mb-6 font-bold"
        >
          Why Choose First Digits Communications?
        </motion.h2>
        <div className="flex flex-col items-center justify-center">
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            whileInView={{ height: 'auto', opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-gray-600 mb-10 text-lg sm:text-xl max-w-3xl"
          >
            At First Digits, we believe in creating a seamless integration of technology into your daily life. Here’s why you should choose us for your automation needs.
          </motion.p>
        </div>

        <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              title: 'Innovative Technology',
              description: 'We leverage the latest technology to design products that are not only advanced but also user-friendly, ensuring a smooth experience for everyone.',
            },
            {
              title: 'Comprehensive Support',
              description: 'Our dedicated support team is available to assist you with any questions or issues you may have, ensuring you get the most out of our products.',
            },
            {
              title: 'Educational Initiatives',
              description: 'We are passionate about educating the next generation of tech enthusiasts through workshops and hands-on training sessions.',
            },
            {
              title: 'Tailored Solutions',
              description: 'We understand that each client has unique needs. Our solutions are customizable to fit your specific requirements.',
            },
            {
              title: 'Community Engagement',
              description: 'We believe in giving back to the community by hosting events that promote learning and engagement with technology.',
            },
            {
              title: 'Sustainable Practices',
              description: 'We are committed to sustainability and strive to implement eco-friendly practices in our product development and operations.',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-5 text-left border border-gray-300"
            >
              <h3 className="text-xl font-semibold text-blue-900 flex items-center mb-4">
                <CheckCircle className="text-green-500 mr-2" />
                {feature.title}
              </h3>
              <p className="text-gray-700">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-10 max-w-2xl text-center"
        >
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Join Us on Our Journey!</h2>
          <p className="text-gray-600 mb-5">
            Choose First Digits Communications for innovative solutions that empower your daily life. Together, we can build a smarter future.
          </p>
          <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300">
            Get Started
          </button>
        </motion.div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default WhyChooseFirstDigits;
