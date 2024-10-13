import React, { useState } from 'react';
import domecam from "../assets/products/2MP-IR-Dome-Camera.jpg";
import netcam from "../assets/products/2MP-IR-Network-Camera-with-In-built-Microphone.jpg";
import dsPS from "../assets/products/DS-Power-Supply.jpg";
import felicityCharge from "../assets/products/Felicity-Charge-controller.jpg";
import monoCrystallinePanel from "../assets/products/Monocrystalline-Solar-Panel-300WTT.jpg";
import thermcam from "../assets/products/Handheld-Thermographic-Camera.jpg";
import inverterMount from "../assets/products/Inverter-Tower-Mount.png";
import ipFinger from "../assets/products/IP-based-Fingerprint-Access-Control-Terminal.png";
import lumBat from "../assets/products/luminous-battery.png";
import solcam from "../assets/products/solar-camera.png";
import wireMonitor from "../assets/products/Wire-indoor-monitor-KIT.png";
import { ShoppingCart } from 'lucide-react';

const productsData = [
  { id: "prod-1", name: "2MP IR Dome Camera", img: domecam, price: 40, category: "Camera", date: new Date(2023, 2, 21) },
  { id: "prod-2", name: "2MP IR Network Camera with In-built Microphone", img: netcam, price: 35, category: "Camera", date: new Date(2023, 1, 15) },
  { id: "prod-3", name: "DS Power Supply", img: dsPS, price: 720, category: "Power", date: new Date(2022, 10, 7) },
  { id: "prod-4", name: "Felicity Charge Controller", img: felicityCharge, price: 400, category: "Power", date: new Date(2023, 6, 5) },
  { id: "prod-5", name: "Monocrystalline Solar Panel 300WTT", img: monoCrystallinePanel, price: 98, category: "Solar", date: new Date(2023, 3, 12) },
  { id: "prod-6", name: "Handheld Thermographic Camera", img: thermcam, price: 124, category: "Camera", date: new Date(2022, 12, 1) },
  { id: "prod-7", name: "Inverter Tower Mount", img: inverterMount, price: 45, category: "Power", date: new Date(2023, 8, 23) },
  { id: "prod-8", name: "IP-based Fingerprint Access Control Terminal", img: ipFinger, price: 85, category: "Security", date: new Date(2023, 9, 1) },
  { id: "prod-9", name: "Luminous Battery", img: lumBat, price: 155, category: "Power", date: new Date(2023, 4, 19) },
  { id: "prod-10", name: "Solar Camera", img: solcam, price: 90, category: "Camera", date: new Date(2023, 7, 11) },
  { id: "prod-11", name: "Wire Indoor Monitor KIT", img: wireMonitor, price: 245, category: "Security", date: new Date(2023, 5, 29) },
];

const categories = ["All", "Camera", "Power", "Solar", "Security"];
const itemsPerPageOptions = [4, 8, 12]; // Option for number of items to display per page
const sortingOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'bestSelling', label: 'Best Selling' },
  { value: 'alphaAsc', label: 'Alphabetically, A-Z' },
  { value: 'alphaDesc', label: 'Alphabetically, Z-A' },
  { value: 'priceAsc', label: 'Price, low to high' },
  { value: 'priceDesc', label: 'Price, high to low' },
  { value: 'dateAsc', label: 'Date, old to new' },
  { value: 'dateDesc', label: 'Date, new to old' }
];

const Store = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [sortOption, setSortOption] = useState('featured');

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to page 1 when category changes
  };

  // Handle price slider change
  const handlePriceChange = (event) => {
    setPriceRange([0, event.target.value]);
  };

  // Handle sorting option change
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1); // Reset to page 1 when items per page changes
  };

  // Sort products based on selected sort option
  const sortedProducts = [...productsData].sort((a, b) => {
    switch (sortOption) {
      case 'alphaAsc': return a.name.localeCompare(b.name);
      case 'alphaDesc': return b.name.localeCompare(a.name);
      case 'priceAsc': return a.price - b.price;
      case 'priceDesc': return b.price - a.price;
      case 'dateAsc': return a.date - b.date;
      case 'dateDesc': return b.date - a.date;
      default: return 0; // 'Featured' and 'Best Selling' would have custom logic
    }
  });

  // Filter products by category and price
  const filteredProducts = sortedProducts.filter((product) => {
    const isWithinPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
    if (selectedCategory === 'All') return isWithinPriceRange;
    return product.category === selectedCategory && isWithinPriceRange;
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="flex p-5 mt-20">
      {/* Sidebar */}
      <div className="w-1/4">
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li
              key={category}
              className={`cursor-pointer ${selectedCategory === category ? 'text-blue-900 font-semibold' : 'text-gray-700'}`}
              onClick={() => handleCategorySelect(category)}
            >
              {category}
            </li>
          ))}
        </ul>

        {/* Price Filter */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-4">Filter by Price</h3>
          <input
            type="range"
            min="0"
            max="2000"
            value={priceRange[1]}
            onChange={handlePriceChange}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-gray-600">
            <span>$0</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-3/4 pl-5">
        <h2 className="text-2xl font-bold mb-5">Products</h2>

        {/* Sorting and Items per Page */}
        <div className="flex justify-between mb-4">
          <div>
            <label htmlFor="sort">Sort by: </label>
            <select id="sort" value={sortOption} onChange={handleSortChange} className="ml-2">
              {sortingOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="itemsPerPage">Items per page: </label>
            <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange} className="ml-2">
              {itemsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Product List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProducts.map((product) => (
            <div key={product.id} className="bg-white p-5 shadow-lg rounded-lg">
              <img src={product.img} alt={product.name} className="w-full h-40 object-cover rounded-lg mb-4" />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-700 mb-2">${product.price}</p>
              <button className="px-4 py-2 bg-blue-800 text-white rounded">Add to Cart</button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <button
            className="px-4 py-2 mx-2 bg-gray-300 rounded"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>{currentPage} of {totalPages}</span>
          <button
            className="px-4 py-2 mx-2 bg-gray-300 rounded"
            onClick={() => setCurrentPage(currentPage + 1)}
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
