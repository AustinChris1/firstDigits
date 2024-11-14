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

const ProductDetail = () => {
    const navigate = useNavigate();
    const { categoryLink, productLink } = useParams();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [reviews, setReviews] = useState([]); // Initialize reviews as an empty array

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`/api/fetchProducts/${categoryLink}/${productLink}`);

                if (response.data.status === 200) {
                    setProduct(response.data.product);
                } else {
                    swal('Warning', response.data.message, "error");
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

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!product) {
        return <div>No product found.</div>;
    }

    const handleAdd = () => setQuantity(prev => prev + 1);
    const handleSubtract = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

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
                                        className="w-full h-auto max-h-[500px] object-contain rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300"
                                        onError={(e) => e.target.src = '/path/to/fallback-image.jpg'}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <p>No images available for this product.</p>
                    )}
                </div>

                {/* Product Description */}
                <div className="md:w-1/2">
                    <h1 className="text-3xl font-bold mb-3 text-gray-800">{product.name || 'Product Name'}</h1>
                    <p className="text-gray-700 mb-2 leading-relaxed">{product.description || 'No description available'}</p>
                    <p className="text-sm text-gray-900 mb-2">{`Brand: ${product.brand || 'Unknown'}`}</p>
                    <p className={`text-sm ${product.status === 0 ? 'text-green-900' : 'text-red-900'}`}>
                        {product.status === 0 ? 'Available' : 'Out of Stock'}
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
                        className="w-full p-3 bg-blue-800 text-white rounded-lg hover:bg-blue-700 active:bg-blue-900 transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Add to Cart"
                    >
                        Add to Cart
                    </button>

                    {/* Reviews Section */}
                    <div className="mt-10">
                        <h2 className="text-lg font-semibold">Reviews</h2>
                        <p className="text-yellow-900">Average Rating: {averageRating.toFixed(1)} / 5</p>

                        <div className="mt-4 space-y-4">
                            {reviews.map(review => (
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
