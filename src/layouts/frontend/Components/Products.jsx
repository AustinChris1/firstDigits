import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import LoadingSpinner from './Loader';
import swal from 'sweetalert'; // Ensure swal is imported
import { Link } from 'react-router-dom';

const Products = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [inView, setInView] = useState(false); // Manual in-view state
    const [currentPage, setCurrentPage] = useState(1); // Pagination state
    const itemsPerPage = 8; // Number of items per page

    // Fetch categories and products from the backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryRes = await axios.get(`/api/getCategory`);
                if (categoryRes.data.status === 200) {
                    setCategories(categoryRes.data.category);
                } else {
                    swal("Error", "Unable to fetch categories", "error");
                }

                const productsRes = await axios.get(`/api/allProducts`);
                if (productsRes.data.status === 200) {
                    setProducts(productsRes.data.products);
                } else {
                    swal("Error", "Unable to fetch products", "error");
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Manually trigger animation on mount
    useEffect(() => {
        setInView(true);
    }, []);

    // Function to filter products based on selected category
    const filteredProducts = selectedCategory === "All"
        ? products
        : products.filter(prod => prod.category_id === selectedCategory);

    // Pagination logic
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    // Framer Motion animation variants
    const productCardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.2 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.5 } },
    };

    const gridVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 1.5 } }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="w-full mt-20 px-4 md:px-0 overflow-hidden"> {/* Prevent overflow */}
            <h1 className="text-center text-3xl font-semibold mb-10">Products</h1>

            {/* Category buttons */}
            <div className="flex flex-wrap justify-center mb-5 gap-2">
                <motion.button
                    key="all"
                    onClick={() => setSelectedCategory("All")}
                    className={`mx-2 p-2 rounded-lg transition duration-300 transform ${selectedCategory === "All" ? 'bg-blue-900 text-white scale-105' : 'bg-gray-200 text-black'} hover:scale-110`}
                >
                    All
                </motion.button>
                {categories.map(category => (
                    <motion.button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`mx-2 p-2 rounded-lg transition duration-300 transform ${selectedCategory === category.id ? 'bg-blue-900 text-white scale-105' : 'bg-gray-200 text-black'} hover:scale-110`}
                    >
                        {category.name}
                    </motion.button>
                ))}
            </div>

            {/* Products grid */}
            <motion.div
                className="flex flex-wrap justify-center gap-4"
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={gridVariants}
            >
                <AnimatePresence>
                    {currentProducts.map(prod => (
                        <motion.div
                            key={prod.id}
                            className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 p-2 bg-white rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out"
                            variants={productCardVariants}
                        >
                            <Link to={`/collections/${prod.category.link}/${prod.link}`}>
                            <motion.img
                                src={`http://localhost:8000/${prod.image}`}  // Ensure image field in response is correct
                                alt={prod.name}
                                className="w-full h-32 object-cover rounded-t-lg" // Adjusted height for a smaller image size
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                            />
                            <div className="flex flex-col justify-center items-center gap-2 p-4">
                                <p className="text-center font-semibold">{prod.name}</p>
                                <p className="text-left font-thin text-red-500">${prod.selling_price}</p>
                                <motion.button 
                                    whileHover={{ scale: 1.05 }} 
                                    className="w-fit p-2 flex items-center justify-center text-gray-200 hover:brightness-110 bg-gradient-to-r from-[#1c4587] to-gray-200 rounded-full transition-transform duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    Add to Cart <ShoppingCart className="ml-1" />
                                </motion.button>
                            </div>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Pagination controls */}
            <div className="flex justify-center mt-8 gap-4">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-lg font-semibold">{currentPage} of {totalPages}</span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Products;
