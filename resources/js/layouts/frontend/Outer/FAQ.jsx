import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  document.title = `FAQ - First Digits`;

  const faqs = [
    {
      question: 'What services does First Digits Communications offer?',
      answer: 'We offer a wide range of services including automation solutions, technology consulting, and tailored support for your specific needs.',
    },
    {
      question: 'How can I contact your support team?',
      answer: 'You can reach our support team via our contact form on the website, or directly through our support email at support@firstdigits.com.',
    },
    {
      question: 'Are your solutions customizable?',
      answer: 'Yes, all our solutions are designed to be customizable to meet the unique needs of our clients.',
    },
    {
      question: 'Do you offer educational workshops?',
      answer: 'Absolutely! We host regular workshops aimed at educating the next generation of tech enthusiasts on various topics.',
    },
    {
      question: 'What is your commitment to sustainability?',
      answer: 'We are dedicated to sustainable practices and strive to minimize our environmental impact through eco-friendly product development and operations.',
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="relative w-full min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="p-5 sm:p-10 flex flex-col items-center text-center">
        <div className="mt-20">
          <motion.h2
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-blue-900 dark:text-blue-300 text-4xl sm:text-5xl mb-6 font-bold"
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="max-w-4xl w-full">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4">
                <motion.button
                  className="flex justify-between items-center w-full bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg p-4 text-left border border-gray-300 dark:border-gray-600 transition-transform duration-200 focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300">{faq.question}</h3>
                  <span className={`ml-4 transition-transform duration-200 ${activeIndex === index ? 'transform rotate-180' : ''}`}>
                    <svg className="w-5 h-5 text-blue-900 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15l-3-3h6l-3 3zm0 0l3-3-3 3zm0 0l3 3-3-3z" />
                    </svg>
                  </span>
                </motion.button>
                {activeIndex === index && (
                  <motion.div
                    className="mt-2 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-lg"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
