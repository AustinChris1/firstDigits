import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const teamMembers = [
    {
        name: 'Alice Smith',
        role: 'Software Engineer',
        image: 'https://via.placeholder.com/150', // Replace with actual image URLs
    },
    {
        name: 'Bob Johnson',
        role: 'Embedded Systems Engineer',
        image: 'https://via.placeholder.com/150',
    },
    {
        name: 'Charlie Brown',
        role: 'Product Manager',
        image: 'https://via.placeholder.com/150',
    },
    {
        name: 'David Wilson',
        role: 'Marketing Specialist',
        image: 'https://via.placeholder.com/150',
    },
];

const groupPhotos = [
    {
        id: 1,
        image: 'https://via.placeholder.com/600x400', // Replace with actual image URLs
        caption: 'Team Building Event',
    },
    {
        id: 2,
        image: 'https://via.placeholder.com/600x400',
        caption: 'Our Successful Project Launch',
    },
];

const Team = () => {
    return (
        <div className="relative w-full min-h-screen bg-gray-900 text-white">
            {/* Header Section */}
            <div className="flex flex-col items-center justify-center min-h-screen p-5 sm:p-10 bg-black/70">
            <div className="mt-24"></div>
                <motion.h1
                    initial={{ y: -100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-4xl sm:text-5xl mb-6 font-bold text-center"
                >
                    Meet Our Team
                </motion.h1>

                <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    whileInView={{ height: 'auto', opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-lg sm:text-xl text-gray-300 mb-10 max-w-3xl text-center"
                >
                    At First Digits, we have a diverse team of passionate professionals dedicated to driving innovation in technology. Meet the people behind our success!
                </motion.p>

                {/* Team Members Section */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-10">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg flex flex-col items-center text-center"
                        >
                            <img src={member.image} alt={member.name} className="w-full h-40 object-cover" />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{member.name}</h3>
                                <p className="text-gray-400">{member.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Group Photos Section */}
                <h2 className="text-3xl font-bold mb-6">Our Team in Action</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-6xl mx-auto mb-10">
                    {groupPhotos.map((photo) => (
                        <motion.div
                            key={photo.id}
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
                        >
                            <img src={photo.image} alt={photo.caption} className="w-full h-48 object-cover" />
                            <div className="p-4 text-center">
                                <p className="text-gray-300 italic">{photo.caption}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Conclusion Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-xl mx-auto text-center mb-10"
                >
                    <h2 className="text-2xl font-bold mb-4">Join Our Team!</h2>
                    <p className="text-gray-300 mb-5">
                        We’re always looking for talented individuals to join our growing team. If you’re passionate about technology and innovation, explore our career opportunities today!
                    </p>
                    <Link to='/services/internship' className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 shadow-lg">
                        Explore Careers
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default Team;
