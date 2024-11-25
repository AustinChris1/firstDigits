import React from 'react';
import { motion } from 'framer-motion';
import { Users, CheckCircle, XCircle } from 'lucide-react';

const Internship = () => {
    document.title = `Internship Opportunities - First Digits`;
    const internshipOpportunities = [
        {
            title: 'Software Development Intern',
            description: 'Join our team to work on exciting software development projects and enhance your coding skills.',
            duration: '3 months',
            location: 'Remote',
            applicationDeadline: 'March 15, 2024',
        },
        {
            title: 'Embedded Systems Intern',
            description: 'Work alongside experienced engineers on projects involving automation devices and IoT solutions.',
            duration: '4 months',
            location: 'On-site',
            applicationDeadline: 'April 20, 2024',
        },
        {
            title: 'Marketing Intern',
            description: 'Assist our marketing team in promoting our innovative products and increasing brand awareness.',
            duration: '2 months',
            location: 'Remote',
            applicationDeadline: 'February 28, 2024',
        },
    ];

    const testimonials = [
        {
            name: 'Austin-Chris',
            feedback: 'The internship at First Digits was an incredible learning experience! I gained hands-on skills that will benefit my career.',
            isApproved: true,
        },
        {
            name: 'Frank',
            feedback: 'I loved being part of a collaborative team. The mentorship I received was invaluable, and I feel more prepared for my future.',
            isApproved: true,
        },
        {
            name: 'Kingsley',
            feedback: 'This internship helped me grow my skills and confidence in the tech field. I highly recommend it to anyone looking to learn!',
            isApproved: true,
        },
        {
            name: 'Abubakar',
            feedback: 'This internship helped me grow my skills and confidence in the tech field. I highly recommend it to anyone looking to learn!',
            isApproved: true,
        },
    ];

    return (
        <div className="relative w-full min-h-screen bg-gray-900 dark:bg-gray-800">
            {/* Background Overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-5 sm:p-10 text-center bg-black/70 dark:bg-black/80">
                {/* Internship Header */}
                <div className="mt-20"></div>
                <motion.h1
                    initial={{ y: -100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-white text-4xl sm:text-5xl mb-6 font-bold"
                >
                    Internship Opportunities at First Digits
                </motion.h1>

                <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    whileInView={{ height: 'auto', opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-gray-300 mb-10 text-lg sm:text-xl max-w-3xl mx-auto"
                >
                    Join us for an internship program designed to equip you with practical experience in the tech industry. Our internships provide hands-on learning and mentorship in a supportive environment.
                </motion.p>

                {/* Internship Opportunities Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-10">
                    {internshipOpportunities.map((internship, index) => (
                        <motion.div
                            key={index}
                            initial={{ scale: 0.5, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-5 text-left"
                        >
                            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">{internship.title}</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">{internship.description}</p>
                            <p className="text-gray-500 dark:text-gray-400">Duration: {internship.duration}</p>
                            <p className="text-gray-500 dark:text-gray-400">Location: {internship.location}</p>
                            <p className="text-gray-500 dark:text-gray-400">Application Deadline: {internship.applicationDeadline}</p>
                            <button className="mt-4 bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 transition duration-300">
                                Apply Now
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Testimonials Section */}
                <h2 className="text-3xl text-white mb-10 font-bold">What Our Interns Say</h2>
                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="bg-gray-800 dark:bg-gray-700 rounded-lg shadow-lg p-5 text-left"
                        >
                            <h3 className="text-lg font-semibold text-white mb-2">{testimonial.name}</h3>
                            <p className="text-gray-300 dark:text-gray-200 mb-4">{testimonial.feedback}</p>
                            {testimonial.isApproved ? (
                                <div className="flex items-center text-green-500 dark:text-green-400">
                                    <CheckCircle className="mr-2" />
                                    <span>Approved</span>
                                </div>
                            ) : (
                                <div className="flex items-center text-red-500 dark:text-red-400">
                                    <XCircle className="mr-2" />
                                    <span>Pending Approval</span>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Conclusion Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-2xl text-center"
                >
                    <h2 className="text-2xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
                    <p className="text-gray-300 dark:text-gray-200 mb-5">
                        Apply for our internships today and take the first step towards an exciting career in technology!
                    </p>
                    <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 shadow-lg">
                        Learn More
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default Internship;
