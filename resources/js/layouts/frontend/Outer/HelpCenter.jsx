import React, { useState } from 'react';
import { motion } from 'framer-motion';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const articles = [
    { title: 'Getting Started with Our Services', category: 'Onboarding', link: '#' },
    { title: 'Understanding Your Invoice', category: 'Billing', link: '#' },
    { title: 'Troubleshooting Common Issues', category: 'Support', link: '#' },
    { title: 'FAQs about Our Products', category: 'General', link: '#' },
    { title: 'Contacting Customer Support', category: 'Support', link: '#' },
    { title: 'Tips for Maximizing Your Experience', category: 'Onboarding', link: '#' },
  ];

  const categories = [
    'Onboarding',
    'Billing',
    'Support',
    'General',
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

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
          Help Center
        </motion.h2>

        <motion.div
          className="w-full mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full sm:w-1/2 p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </motion.div>

        <div className="flex flex-wrap justify-center mb-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className="m-2 p-3 bg-blue-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h4 className="text-blue-900 font-semibold text-lg">{category}</h4>
            </motion.div>
          ))}
        </div>

        <div className="max-w-4xl w-full">
          <h3 className="text-blue-800 text-2xl mb-4">Articles</h3>
          {articles.filter(article => 
            article.title.toLowerCase().includes(searchQuery.toLowerCase())
          ).map((article, index) => (
            <motion.div
              key={index}
              className="mb-4 p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <a href={article.link} className="text-blue-900 font-bold text-lg hover:underline">
                {article.title}
              </a>
              <p className="text-gray-600">{article.category}</p>
            </motion.div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
