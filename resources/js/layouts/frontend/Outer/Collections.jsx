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
      } else {
        setFilteredProducts([]); // Clear filtered products if no matching category is found
      }
    }
  }, [categoryLink, products, categories]); // Add categories to the dependency array
  
  if (loading) {
    return <LoadingSpinner />; // Show a loading spinner while data is being fetched
  }

  return (
    <div className="container mx-auto p-6">
      {/* Breadcrumb */}
      <nav className="text-gray-600 text-sm mt-24 mb-6">
        <ul className="flex space-x-2">
        <li>
            <Link to="/" className="text-blue-900 hover:underline">Home</Link>
          </li>
          <li>/</li>
          <li>
            <Link to="/store" className="text-blue-900 hover:underline">Store</Link>
          </li>
          <li>/</li>
          <li className="text-gray-900">{categoryLink || 'Category'}</li>
        </ul>
      </nav>

      <h1 className="text-3xl font-bold text-center mb-8 mt-8 text-blue-700">Collections - {categoryLink}</h1>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-xl text-gray-500">No products found for this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <div key={index} className="group relative border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
              <img src={`/${product.image}`} alt={product.name} className="w-full h-56 object-contain group-hover:scale-110 transition duration-300" />
              <div className="p-4 bg-white">
                <h3 className="text-lg font-semibold text-blue-900">{product.name}</h3>
                <p className="text-sm text-gray-500 mt-2">{product.description}</p>
                <Link to={`/collections/${categoryLink}/${product.link}`} className="mt-4 block px-6 py-3 bg-blue-900 text-white text-center rounded-lg hover:bg-blue-700 transition duration-300">
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
