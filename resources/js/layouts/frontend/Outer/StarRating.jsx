import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating, totalStars = 5, onClick = () => {} }) => {
    return (
        <div className="flex items-center space-x-1">
            {[...Array(totalStars)].map((_, index) => {
                const currentStarValue = index + 1;

                // Full star
                if (currentStarValue <= rating) {
                    return (
                        <Star
                            key={index}
                            className="w-5 h-5 text-yellow-500 cursor-pointer"
                            fill="currentColor" // Fully filled star
                            onClick={() => onClick(index + 1)} // Safely handle clicks
                        />
                    );
                }

                // Half star
                if (currentStarValue - rating > 0 && currentStarValue - rating <= 0.5) {
                    return (
                        <Star
                            key={index}
                            className="w-5 h-5 text-yellow-500 cursor-pointer"
                            fill="url(#halfGradient)" // Gradient for half star
                             onClick={() => onClick(index + 1)} // Safely handle clicks
                        >
                            <defs>
                                <linearGradient id="halfGradient" x1="0" x2="1" y1="0" y2="0">
                                    <stop offset="50%" stopColor="currentColor" />
                                    <stop offset="50%" stopColor="transparent" />
                                </linearGradient>
                            </defs>
                        </Star>
                    );
                }

                // Empty star
                return (
                    <Star
                        key={index}
                        className="w-5 h-5 text-gray-300 cursor-pointer"
                        fill="none" // Empty star
                        stroke="currentColor"
                         onClick={() => onClick(index + 1)} // Safely handle clicks
                    />
                );
            })}
        </div>
    );
};

export default StarRating;
