import React, { useState } from 'react';
import productImage from '../assets/products/solar-camera.png'; // Replace with your product image

const ProductDetail = () => {
    const [quantity, setQuantity] = useState(1);
    const [reviews] = useState([
        { id: 1, text: "Great product! Highly recommend.", rating: 5 },
        { id: 2, text: "Good quality but a bit pricey.", rating: 4 },
        { id: 3, text: "Not what I expected, but it works.", rating: 3 },
    ]);

    const handleAdd = () => setQuantity(prev => prev + 1);
    const handleSubtract = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

    return (
        <div className="mt-20 flex flex-col md:flex-row justify-center items-start p-5">
            {/* Product Image */}
            <img src={productImage} alt="Product" className="w-full md:w-1/2 rounded-lg shadow-md" />

            {/* Product Description */}
            <div className="md:w-1/2 md:pl-5 mt-5 md:mt-0">
                <h1 className="text-2xl font-bold mb-3">Solar Camera</h1>
                <p className="text-gray-700 mb-5">
                    This is a detailed description of the product. It highlights the key features and benefits, ensuring the customer understands why they should buy it.
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center mb-5">
                    <button className="px-3 py-1 bg-gray-200 rounded-l" onClick={handleSubtract}>-</button>
                    <span className="px-4 py-1 border-t border-b">{quantity}</span>
                    <button className="px-3 py-1 bg-gray-200 rounded-r" onClick={handleAdd}>+</button>
                </div>

                {/* Add to Cart Button */}
                <button className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                    Add to Cart
                </button>

                {/* Reviews Section */}
                <h2 className="text-lg font-semibold mt-10">Reviews</h2>
                <p className="text-yellow-500">Average Rating: {averageRating.toFixed(1)} / 5</p>
                <div className="mt-2">
                    {reviews.map(review => (
                        <div key={review.id} className="border-b py-2">
                            <p className="font-semibold">{`Rating: ${review.rating} ★`}</p>
                            <p>{review.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
