import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Users, BookOpen, Code, Globe } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="relative w-full min-h-screen bg-blue-900">
      {/* Background Image */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-5 sm:p-10 text-center bg-black/70">
        {/* About Us Header */}
        <div className="mt-24">
          <motion.h1
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-white text-4xl sm:text-5xl mb-6 font-bold"
          >
            About First Digits Communications
          </motion.h1>

          <motion.p
            initial={{ height: 0, opacity: 0 }}
            whileInView={{ height: 'auto', opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-gray-200 mb-10 text-lg sm:text-xl max-w-3xl mx-auto"
          >
            At First Digits Communications, we are committed to transforming the way individuals and businesses interact with technology. As innovators in the home and office automation sector, we develop cutting-edge devices that simplify everyday tasks and enhance productivity. Our mission is to empower everyone, from students to professionals, with the tools and knowledge they need to thrive in a rapidly evolving digital landscape.
          </motion.p>

          {/* Mission and Vision */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-20 max-w-6xl mx-auto">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-5 text-left"
            >
              <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
                <Lightbulb className="text-yellow-500 mr-2" />
                Our Mission
              </h2>
              <p className="text-gray-700">
                To innovate and provide comprehensive home and office automation solutions that not only make life easier but also enhance learning experiences. We strive to educate the next generation of tech enthusiasts and empower them to create their own smart solutions.
              </p>
            </motion.div>

            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-5 text-left"
            >
              <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
                <Globe className="text-blue-500 mr-2" />
                Our Vision
              </h2>
              <p className="text-gray-700">
                To be the leading provider of innovative automation devices and educational resources, bridging the gap between technology and daily life. We envision a world where smart technology seamlessly integrates into every aspect of living and working.
              </p>
            </motion.div>
          </div>

          {/* Services */}
          <h2 className="text-3xl text-white mb-10 font-bold">What We Do</h2>
          <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20 mx-auto">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-5 text-left"
            >
              <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-2">
                <Users className="text-green-500 mr-2" />
                Community Engagement
              </h3>
              <p className="text-gray-700">
                We actively engage with our community by hosting workshops and events that teach automation concepts and practical applications. Our goal is to inspire and empower individuals to embrace technology.
              </p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-5 text-left"
            >
              <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-2">
                <BookOpen className="text-orange-500 mr-2" />
                Educational Resources
              </h3>
              <p className="text-gray-700">
                Our commitment to education extends to providing resources and tutorials that help students and enthusiasts learn about automation technology, enabling them to build their own projects.
              </p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-5 text-left"
            >
              <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-2">
                <Code className="text-purple-500 mr-2" />
                Custom Solutions
              </h3>
              <p className="text-gray-700">
                We offer custom automation solutions tailored to the specific needs of businesses and individuals, ensuring that our technology fits seamlessly into their workflows and daily lives.
              </p>
            </motion.div>
          </div>

          {/* Conclusion Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl text-center mb-10 mx-auto"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Join Us on Our Journey</h2>
            <p className="text-gray-200 mb-5">
              At First Digits Communications, we believe in creating a community that thrives on innovation and collaboration. We invite you to join us as we pave the way for a smarter, more connected future.
            </p>
            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 shadow-lg">
              Learn More
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
