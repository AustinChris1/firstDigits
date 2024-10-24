import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../Components/Loader';
import swal from 'sweetalert';

const itemsPerPageOptions = [4, 8, 12];
const sortingOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'alphaAsc', label: 'Alphabetically, A-Z' },
  { value: 'alphaDesc', label: 'Alphabetically, Z-A' },
  { value: 'dateAsc', label: 'Date, old to new' },
  { value: 'dateDesc', label: 'Date, new to old' }
];

const Store = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [sortOption, setSortOption] = useState('featured');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let isMounted = true;

    // Fetch categories
    axios.get(`/api/getCategory`).then(res => {
      if (isMounted) {
        if (res.data.status === 200) {
          setCategories([{ name: "All" }, ...res.data.category]);
        }
      }
    });

    const fetchProducts = () => {
      setLoading(true);
      axios.get(`/api/getProducts`, {
        params: {
          category: selectedCategory,
          sort: sortOption,
          itemsPerPage: itemsPerPage,
          page: currentPage,
        }
      }).then(res => {
        if (isMounted) {
          if (res.data.status === 200) {
            setProducts(res.data.products.data);
            setTotalPages(res.data.products.last_page);
            setLoading(false);
          } else if (res.data.status === 404) {
            navigate('/');
            swal('Warning', res.data.message, "error");
          }
        }
      }).catch(() => {
        setLoading(false);
        swal('Error', 'Failed to fetch products.', 'error');
      });
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [navigate, selectedCategory, sortOption, itemsPerPage, currentPage]);

  if (loading) {
    return <LoadingSpinner />;
  }

  const handleCategorySelect = (category) => {
    setSelectedCategory(category.name);
    setCurrentPage(1);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col md:flex-row p-5 mt-20">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 mb-5 md:mb-0 md:mr-5">
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li
              key={category.name}
              className={`cursor-pointer ${selectedCategory === category.name ? 'text-blue-900 font-semibold' : 'text-gray-700'}`}
              onClick={() => handleCategorySelect(category)}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-full md:w-3/4">
        <h2 className="text-2xl font-bold mb-5">Products</h2>

        {/* Sorting and Items per Page */}
        <div className="flex justify-between mb-4 flex-wrap">
          <div className="mb-2">
            <label htmlFor="sort" className="mr-2">Sort by:</label>
            <select id="sort" value={sortOption} onChange={handleSortChange} className="border rounded px-2">
              {sortingOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-2">
            <label htmlFor="itemsPerPage" className="mr-2">Items per page:</label>
            <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange} className="border rounded px-2">
              {itemsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products List */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <Link key={product.id} className="border p-4 rounded-lg shadow-md flex flex-col" to={`/collections/${product.category?.link}/${product.link}`}>
                <img
                  src={`/${product.image}`}
                  alt={product.name}
                  className="w-full h-48 object-cover mb-4 rounded-md"
                />
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-gray-700">${product.selling_price}</p>
                <button className="mt-auto bg-blue-800 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200">
                  View Details
                </button>
              </Link>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="mt-8 flex justify-between items-center flex-wrap">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition duration-200"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          
          <span className="mx-2">
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition duration-200"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Store;
