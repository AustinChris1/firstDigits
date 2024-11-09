import React from 'react';
import { motion } from 'framer-motion';

const Community = () => {
  const discussions = [
    {
      title: 'Welcome to the First Digits Community!',
      description: 'Join us in introducing yourself and connecting with fellow members.',
      link: '#',
    },
    {
      title: 'Tips for Getting the Most Out of Our Services',
      description: 'Share your tips and tricks for maximizing your experience with First Digits.',
      link: '#',
    },
    {
      title: 'Upcoming Features and Updates',
      description: 'Discuss the latest features and updates we have planned for the platform.',
      link: '#',
    },
    {
      title: 'Support Requests and FAQs',
      description: 'Ask questions and get support from our community members and staff.',
      link: '#',
    },
  ];

  const events = [
    {
      title: 'Monthly Webinar: Leveraging Technology for Business Growth',
      date: 'November 15, 2024',
      link: '#',
    },
    {
      title: 'Community Meet & Greet',
      date: 'December 1, 2024',
      link: '#',
    },
    {
      title: 'Workshop: Mastering Our Tools',
      date: 'December 10, 2024',
      link: '#',
    },
  ];

  const resources = [
    {
      title: 'Community Guidelines',
      link: '#',
    },
    {
      title: 'Support Documentation',
      link: '#',
    },
    {
      title: 'Feedback and Suggestions',
      link: '#',
    },
  ];

  return (
    <div className="relative w-full min-h-screen bg-gray-100">
      <div className="p-5 sm:p-10 flex flex-col items-center text-center">
      <div className="mt-24"></div>

        <motion.h2
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-blue-900 text-4xl sm:text-5xl mb-6 font-bold"
        >
          Community Hub
        </motion.h2>

        <div className="max-w-4xl w-full mb-10">
          <h3 className="text-blue-800 text-2xl mb-4">Discussions</h3>
          {discussions.map((discussion, index) => (
            <motion.div
              key={index}
              className="mb-4 p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <a href={discussion.link} className="text-blue-900 font-bold text-lg hover:underline">
                {discussion.title}
              </a>
              <p className="text-gray-600">{discussion.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="max-w-4xl w-full mb-10">
          <h3 className="text-blue-800 text-2xl mb-4">Upcoming Events</h3>
          {events.map((event, index) => (
            <motion.div
              key={index}
              className="mb-4 p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <a href={event.link} className="text-blue-900 font-bold text-lg hover:underline">
                {event.title}
              </a>
              <p className="text-gray-600">Date: {event.date}</p>
            </motion.div>
          ))}
        </div>

        <div className="max-w-4xl w-full mb-10">
          <h3 className="text-blue-800 text-2xl mb-4">Community Resources</h3>
          {resources.map((resource, index) => (
            <motion.div
              key={index}
              className="mb-4 p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <a href={resource.link} className="text-blue-900 font-bold text-lg hover:underline">
                {resource.title}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
