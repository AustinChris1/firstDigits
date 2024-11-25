import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import swal from 'sweetalert';
import LoadingSpinner from '../Components/Loader';

const Collections = () => {
  const { categoryLink } = useParams(); // Get category link from the URL
  const [categories, setCategories] = useState([]); // Categories data
  const [products, setProducts] = useState([]); // Products data
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      try {
        // Fetch products
        const productsRes = await axios.get(`/api/allProducts`);
        if (productsRes.data.status === 200) {
          setProducts(productsRes.data.products); // Set products
          setCategories(productsRes.data.categories); // Set categories
        } else {
          swal("Error", "Unable to fetch products", "error");
        }
      } catch (error) {
        console.error(error);
        swal("Error", "Something went wrong", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesAndProducts();
  }, []);

  useEffect(() => {
    if (categoryLink && products.length > 0 && categories.length > 0) {
      // Find the category with the matching link
      const selectedCategory = categories.find(category => category.link === categoryLink);

      if (selectedCategory) {
        // Filter products based on the matching category's id
        const filtered = products.filter(product => product.category_id === selectedCategory.id);
        setFilteredProducts(filtered);
        document.title = `${selectedCategory.name} - Store`;
      } else {
        setFilteredProducts([]); // Clear filtered products if no matching category is found
        document.title = 'Category Not Found - Store';
      }
    }
  }, [categoryLink, products, categories]); // Add categories to the dependency array

  if (loading) {
    return <LoadingSpinner />; // Show a loading spinner while data is being fetched
  }

  return (
    <div className="w-full p-6 dark:bg-gray-900">
      <div className="mt-24"></div>
      {/* Breadcrumb */}
      <nav className="text-gray-600 text-sm mb-5 dark:text-gray-300">
        <ul className="flex space-x-2">
          <li>
            <Link to="/" className="text-blue-900 hover:underline dark:text-blue-300">Home</Link>
          </li>
          <li>/</li>
          <li>
            <Link to="/store" className="text-blue-900 hover:underline dark:text-blue-300">Store</Link>
          </li>
          <li>/</li>
          <li className="text-gray-900 dark:text-gray-100">{categoryLink || 'Category'}</li>
        </ul>
      </nav>

      <h1 className="text-3xl font-bold text-center mb-8 mt-8 text-blue-700 dark:text-blue-400">Collections - {categoryLink}</h1>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-xl text-gray-500 dark:text-gray-300">No products found for this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <div key={index} className="group relative border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105 dark:bg-gray-800 dark:border-gray-700">
              <img src={`/${product.image}`} alt={product.name} className="w-full h-56 object-contain group-hover:scale-110 transition duration-300" />
              <div className="p-4 bg-white dark:bg-gray-900">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-400">{product.name}</h3>
                <p className="text-sm text-gray-500 mt-2 dark:text-gray-300">
                  {product.description.length > 100
                    ? `${product.description.slice(0, 100)}...`
                    : product.description}
                </p>
                <Link to={`/collections/${categoryLink}/${product.link}`} className="mt-4 block px-6 py-3 bg-blue-900 text-white text-center rounded-lg hover:bg-blue-700 transition duration-300 dark:bg-blue-700 dark:hover:bg-blue-600">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collections;
