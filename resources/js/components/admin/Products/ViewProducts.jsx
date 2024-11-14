import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../LoadingSpinner';

const ViewProducts = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  useEffect(() => {
    document.title = "View Products";
    axios.get('/api/products/view').then(res => {
      if (res.data.status === 200) {
        setProducts(res.data.products);
        setLoading(false);
      }
    });
  }, []);

  const deleteProducts = (e, id) => {
    e.preventDefault();
    setDeleteLoading((prev) => ({ ...prev, [id]: true }));
    axios.post(`/api/products/delete/${id}`).then(res => {
      if (res.data.status === 200) {
        setProducts(prevProducts => prevProducts.filter(item => item.id !== id));
        swal("Success", res.data.message, "success");
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
      }
    }).finally(() => {
      setDeleteLoading((prev) => ({ ...prev, [id]: false }));
    });
  };

  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;
  const currentProducts = products.slice(firstProductIndex, lastProductIndex);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="card px-4 mt-3">
      <div className="card-header">
        <h4>View Products
          <Link to="/admin/products" className="btn btn-primary btn-sm float-end">Add Products</Link>
        </h4>
      </div>
      <div className="card-body">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Category Name</th>
                    <th>Product Name</th>
                    <th>Image</th>
                    <th>Selling Price</th>
                    <th>Cost Price</th>
                    <th>Status</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.category.name}</td>
                      <td>{item.name}</td>
                      <td><img src={`/${item.image}`} width="50" alt={item.name} /></td>
                      <td>{item.selling_price}</td>
                      <td>{item.original_price}</td>
                      <td>{item.status === 0 ? "Active" : "Hidden"}</td>
                      <td>
                        <Link to={`/admin/products/edit/${item.id}`} className="btn btn-primary btn-sm">Edit</Link>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={(e) => deleteProducts(e, item.id)}
                          disabled={deleteLoading[item.id]}
                        >
                          {deleteLoading[item.id] ? (
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          ) : (
                            'Delete'
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="d-flex justify-content-center mt-4">
              <nav>
                <ul className="pagination">
                  {[...Array(totalPages)].map((_, index) => (
                    <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                      <button onClick={() => paginate(index + 1)} className="page-link">
                        {index + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewProducts;
