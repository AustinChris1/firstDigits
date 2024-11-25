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

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState('');

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`/api/fetchProducts/${categoryLink}/${productLink}`);
                if (response.data.status === 200) {
                    setProduct(response.data.product);
                    fetchReviews(response.data.product.id); // Fetch reviews once the product is fetched
                    // Dynamically set the page title
                    document.title = `${response.data.product.name} - Store`;
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

    // Function to open the modal with the clicked image
    const openModal = (image) => {
        setModalImage(image);
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setModalImage('');
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options); // Formats the date as "Month Day, Year"
      };
    return (
        <div className="w-full p-6 dark:bg-gray-900">
            <div className="mt-24"></div>
            {/* Breadcrumb */}
            <nav className="text-gray-600 text-sm mb-5 dark:text-gray-300">
                <ul className="flex space-x-2">
                    <li>
                        <Link to="/" className="text-blue-900 hover:underline dark:text-blue-400">Home</Link>
                    </li>
                    <li>/</li>
                    <li>
                        <Link to="/store" className="text-blue-900 hover:underline dark:text-blue-400">Store</Link>
                    </li>
                    <li>/</li>
                    <li>
                        <Link to={`/collections/${product.category?.link}`} className="text-blue-900 hover:underline dark:text-blue-400">
                            {product.category?.name || 'Category'}
                        </Link>
                    </li>
                    <li>/</li>
                    <li className="text-gray-900 dark:text-gray-100">{product.name || 'Product'}</li>
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
                                        className="w-full h-auto max-h-[500px] object-contain cursor-pointer"
                                        onClick={() => openModal(image)} // Open modal on click
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <div className="text-center dark:text-gray-400">No product images available.</div>
                    )}
                </div>

                <div className="w-full md:w-1/2">
                    <h1 className="text-3xl font-bold mb-3 text-gray-800 dark:text-gray-100">{product.name || 'Product Name'}</h1>
                    <p className="text-gray-700 mb-2 leading-relaxed dark:text-gray-300">{product.description || 'No description available'}</p>
                    <p className="text-sm text-gray-900 mb-2 dark:text-gray-200">{`Brand: ${product.brand || 'Unknown'}`}</p>
                    <p className={`text-sm ${product.status === 0 ? 'text-green-900' : 'text-red-900'} dark:text-green-400`}>
                        {product.status === 0 ? 'Available' : 'Out of Stock'}
                    </p>

                    <div className="mt-2 text-gray-700 dark:text-gray-300">
                        <StarRating rating={averageRating} />
                        <p className="text-sm dark:text-gray-400">Average Rating</p>
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
                                className="w-full border p-2 dark:bg-gray-700 dark:text-gray-200"
                            ></textarea>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="mt-4 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 dark:bg-blue-500 dark:hover:bg-blue-600"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Review'}
                            </button>
                        </form>
                    ) : (
                        <p className="mt-4 text-sm text-gray-700 dark:text-gray-400">
                            Please <Link to="/login" className="text-blue-600 dark:text-blue-400">login</Link> to leave a review.
                        </p>
                    )}
                </div>
            </div>

            {/* Reviews */}
            <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Customer Reviews</h3>
                {reviews.length > 0 ? (
                    <>
                        <div className="mt-4 space-y-4">
                            {currentReviews.map((review, index) => (
                                <div key={index} className="p-4 rounded-md dark:bg-gray-700">
                                    <StarRating rating={review.rating} />
                                    <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{review.review}</p>
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">By {review.user.name} on {formatDate(review.created_at)}</p>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-4 flex dark:text-gray-200 justify-center space-x-2">
                            <button
                                onClick={() => changePage(currentPage - 1)}
                                className="px-4 py-2 border rounded-md disabled:opacity-50"
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => changePage(currentPage + 1)}
                                className="px-4 py-2 border rounded-md disabled:opacity-50"
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </>
                ) : (
                    <p className="mt-4 text-sm text-gray-700 dark:text-gray-400">No reviews yet.</p>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="relative">
                        <img src={`/${modalImage}`} alt="Product" className="max-w-[90vw] max-h-[80vh] object-contain" />
                        <button
                            onClick={closeModal}
                            className="absolute top-0 right-0 text-white text-3xl p-2"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;
