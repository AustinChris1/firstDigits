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
  { value: 'priceAsc', label: 'Price, low to high' },
  { value: 'priceDesc', label: 'Price, high to low' },
  { value: 'dateAsc', label: 'Date, old to new' },
  { value: 'dateDesc', label: 'Date, new to old' }
];

const Store = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 2000]);
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
          min_price: priceRange[0],
          max_price: priceRange[1],
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
  }, [navigate, selectedCategory, priceRange, sortOption, itemsPerPage, currentPage]);

  if (loading) {
    return <LoadingSpinner />;
  }

  const handleCategorySelect = (category) => {
    setSelectedCategory(category.name);
    setCurrentPage(1);
  };

  const handlePriceChange = (event) => {
    setPriceRange([0, event.target.value]);
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
    <div className="flex flex-col md:flex-row px-4 py-6 lg:px-8 w-full relative">
      {/* Sidebar */}
      <div className="mt-24 w-full md:w-1/4 mb-5 md:mr-6">
        <h3 className="text-xl font-semibold mb-3">Categories</h3>
        <ul className="space-y-2 text-sm lg:text-base">
          {categories.map((category) => (
            <li
              key={category.name}
              className={`cursor-pointer px-2 py-1 rounded ${
                selectedCategory === category.name ? 'bg-blue-900 text-white font-semibold' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => handleCategorySelect(category)}
            >
              {category.name}
            </li>
          ))}
        </ul>

      </div>
      {/* Main Content */}
      <div className="mt-24 w-full md:w-3/4">
        <h2 className="text-2xl font-bold mb-4">Products</h2>

        {/* Sorting and Items per Page */}
        <div className="flex justify-between items-center mb-5 space-x-2">
          <div className="flex items-center space-x-2">
            <label htmlFor="sort" className="text-sm font-medium">Sort by:</label>
            <select
              id="sort"
              value={sortOption}
              onChange={handleSortChange}
              className="border rounded px-3 py-1 text-sm"
            >
              {sortingOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <label htmlFor="itemsPerPage" className="text-sm font-medium">Items per page:</label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="border rounded px-3 py-1 text-sm"
            >
              {itemsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <Link
                key={product.id}
                className="border rounded-lg shadow-md flex flex-col p-4 transition-transform transform hover:scale-105"
                to={`/collections/${product.category?.link}/${product.link}`}
              >
                <img
                  src={`/${product.image}`}
                  alt={product.name}
                  className="w-full h-40 sm:h-48 object-cover rounded-md mb-3"
                />
                <h3 className="text-lg font-bold truncate">{product.name}</h3>
                <button className="mt-auto bg-blue-900 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
                  View Details
                </button>
              </Link>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">No products found.</p>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="mt-8 flex justify-between items-center flex-wrap space-y-4 md:space-y-0">
          <button
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition duration-200"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span className="text-sm text-gray-700">
            {currentPage} of {totalPages}
          </span>

          <button
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition duration-200"
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
