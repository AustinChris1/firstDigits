import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import productImage from '../assets/products/solar-camera.png'; // Replace with your product image

// Breadcrumb Component
const Breadcrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <nav className="flex items-center py-4 px-5 text-gray-600 bg-gray-100 rounded-md w-full mb-5">
            <Link to="/" className="text-blue-600 hover:underline">
                Home
            </Link>
            {pathnames.map((value, index) => {
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                return (
                    <span key={to} className="flex items-center">
                        <span className="mx-2">/</span>
                        {index === pathnames.length - 1 ? (
                            <span className="text-gray-500 capitalize">{value}</span>
                        ) : (
                            <Link to={to} className="text-blue-600 hover:underline capitalize">
                                {value}
                            </Link>
                        )}
                    </span>
                );
            })}
        </nav>
    );
};

// Product Detail Component
const ProductDetail = () => {
    const [quantity, setQuantity] = useState(1);
    const [reviews] = useState([
        { id: 1, text: "Great product! Highly recommend.", rating: 5 },
        { id: 2, text: "Good quality but a bit pricey.", rating: 4 },
        { id: 3, text: "Not what I expected, but it works.", rating: 3 },
    ]);

    const handleAdd = () => setQuantity((prev) => prev + 1);
    const handleSubtract = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

    return (
        <div className="container mx-auto mt-20">
            {/* Breadcrumb Navigation */}
            <Breadcrumb />

            <div className="flex flex-col md:flex-row justify-center items-start p-5 gap-8">
                {/* Product Image */}
                <div className="w-full md:w-1/2">
                    <img src={productImage} alt="Product" className="w-full rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300" />
                </div>

                {/* Product Description */}
                <div className="md:w-1/2">
                    <h1 className="text-3xl font-bold mb-3">Solar Camera</h1>
                    <p className="text-gray-700 mb-5 leading-relaxed">
                        Discover the powerful features of this Solar Camera, perfect for remote security surveillance. 
                        Easy to install, eco-friendly, and packed with the latest security features.
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center mb-5">
                        <button
                            className="px-4 py-2 bg-gray-300 rounded-l-lg text-gray-800 hover:bg-gray-400 transition-all"
                            onClick={handleSubtract}
                            aria-label="Decrease Quantity"
                        >
                            -
                        </button>
                        <span className="px-4 py-2 border-t border-b">{quantity}</span>
                        <button
                            className="px-4 py-2 bg-gray-300 rounded-r-lg text-gray-800 hover:bg-gray-400 transition-all"
                            onClick={handleAdd}
                            aria-label="Increase Quantity"
                        >
                            +
                        </button>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        aria-label="Add to Cart"
                    >
                        Add to Cart
                    </button>

                    {/* Reviews Section */}
                    <div className="mt-10">
                        <h2 className="text-lg font-semibold">Reviews</h2>
                        <p className="text-yellow-500">Average Rating: {averageRating.toFixed(1)} / 5</p>

                        <div className="mt-4 space-y-4">
                            {reviews.map((review) => (
                                <div key={review.id} className="border-b border-gray-300 pb-2">
                                    <p className="font-semibold text-yellow-600">{`Rating: ${review.rating} ★`}</p>
                                    <p className="text-gray-600">{review.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
