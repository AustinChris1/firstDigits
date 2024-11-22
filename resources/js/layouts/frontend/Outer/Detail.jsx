import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import LoadingSpinner from '../Components/Loader';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import StarRating from './StarRating'; // Import StarRating component
import './stars.css';

const ProductDetail = () => {
    const navigate = useNavigate();
    const { categoryLink, productLink } = useParams();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]); // Initialize reviews as an empty array
    const [rating, setRating] = useState(0); // State for the rating
    const [reviewText, setReviewText] = useState(''); // State for the review text
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 5; // Set number of reviews per page

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`/api/fetchProducts/${categoryLink}/${productLink}`);
                if (response.data.status === 200) {
                    setProduct(response.data.product);
                    fetchReviews(response.data.product.id); // Fetch reviews once the product is fetched
                } else {
                    swal('Warning', response.data.message, 'error');
                    navigate('/store');
                }
            } catch (error) {
                swal('Error', 'Failed to fetch product.', 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [categoryLink, productLink, navigate]);

    const fetchReviews = async (productId) => {
        try {
            const response = await axios.get(`/api/products/${productId}/reviews`);
            if (response.data.status === 200) {
                setReviews(response.data.reviews);
            } else {
                swal('Error', 'Failed to fetch reviews.', 'error');
            }
        } catch (error) {
            swal('Error', 'Failed to fetch reviews.', 'error');
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        if (!rating || !reviewText) {
            swal('Error', 'Please provide both a rating and a review.', 'error');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await axios.post(`/api/products/${product.id}/reviews`, {
                rating,
                review: reviewText,
            });

            if (response.data.status === 200) {
                swal('Success', 'Your review has been submitted!', 'success');
                setRating(0);
                setReviewText(''); // Reset the review text
                fetchReviews(product.id); // Fetch reviews again to display the new review
            } else {
                swal('Error', response.data.message, 'error');
            }
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || // Check if the server provided a message
                'Failed to submit your review. Please try again later.'; // Default error message
            swal('Error', errorMessage, 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const totalReviews = reviews.length;
    const totalPages = Math.ceil(totalReviews / reviewsPerPage);
    const startIndex = (currentPage - 1) * reviewsPerPage;
    const currentReviews = reviews.slice(startIndex, startIndex + reviewsPerPage);

    const changePage = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!product) {
        return <div>No product found.</div>;
    }

    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length || 0;

    // Ensure both image1 and image2 are available
    const images = [product.image, product.image2].filter(Boolean);

    return (
        <div className="p-6 max-w-screen-xl mx-auto">
            <div className="mt-24"></div>
            {/* Breadcrumb */}
            <nav className="text-gray-600 text-sm mb-5">
                <ul className="flex space-x-2">
                    <li>
                        <Link to="/" className="text-blue-900 hover:underline">Home</Link>
                    </li>
                    <li>/</li>
                    <li>
                        <Link to="/store" className="text-blue-900 hover:underline">Store</Link>
                    </li>
                    <li>/</li>
                    <li>
                        <Link to={`/collections/${product.category?.link}`} className="text-blue-900 hover:underline">
                            {product.category?.name || 'Category'}
                        </Link>
                    </li>
                    <li>/</li>
                    <li className="text-gray-900">{product.name || 'Product'}</li>
                </ul>
            </nav>

            <div className="flex flex-col md:flex-row justify-center items-start gap-8">
                {/* Swiper Image Slider */}
                <div className="w-full md:w-1/2">
                    {images.length > 0 ? (
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            navigation
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 3000, disableOnInteraction: false }} // Optional autoplay feature
                            className="swiper-container"
                        >
                            {images.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        src={`/${image}`}
                                        alt={product.name || 'Product Image'}
                                        className="w-full h-auto max-h-[500px] object-contain"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <div className="text-center">No product images available.</div>
                    )}
                </div>

                <div className="w-full md:w-1/2">
                    <h1 className="text-3xl font-bold mb-3 text-gray-800">{product.name || 'Product Name'}</h1>
                    <p className="text-gray-700 mb-2 leading-relaxed">{product.description || 'No description available'}</p>
                    <p className="text-sm text-gray-900 mb-2">{`Brand: ${product.brand || 'Unknown'}`}</p>
                    <p className={`text-sm ${product.status === 0 ? 'text-green-900' : 'text-red-900'}`}>
                        {product.status === 0 ? 'Available' : 'Out of Stock'}
                    </p>

                    <div className="mt-2 text-gray-700">
                        <StarRating rating={averageRating} />
                        <p className="text-sm">Average Rating</p>
                    </div>

                    {/* Review Form */}
                    {localStorage.getItem('auth_token') ? (
                        <form onSubmit={handleReviewSubmit} className="mt-6">
                            <div className="flex items-center mb-4">
                                <StarRating rating={rating} totalStars={5} onClick={setRating} />
                            </div>
                            <textarea
                                placeholder="Write a review..."
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                rows="4"
                                className="w-full border p-2"
                            ></textarea>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="mt-4 px-6 py-2 bg-blue-900 text-white rounded hover:bg-blue-700"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Review'}
                            </button>
                        </form>
                    ) : ''}

                    {/* Reviews */}
                    <div className="mt-6">
                        <h3 className="text-2xl font-semibold">Reviews</h3>
                        <div className="mt-4">
                            {currentReviews.map((review, index) => (
                                <div key={index} className="border-b py-4">
                                    <StarRating rating={review.rating} totalStars={5} />
                                    <p className="text-gray-700 mt-2">{review.review}</p>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-4 flex justify-center space-x-2">
                            <button
                                onClick={() => changePage(currentPage - 1)}
                                className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700"
                                disabled={currentPage === 1}
                            >
                                Prev
                            </button>
                            <span className="text-lg">{currentPage} / {totalPages}</span>
                            <button
                                onClick={() => changePage(currentPage + 1)}
                                className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700"
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
