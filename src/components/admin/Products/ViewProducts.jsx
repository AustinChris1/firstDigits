import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import LoadingSpinner from '../LoadingSpinner'

const ViewProducts = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState({}); // Manage loading state for delete buttons

  useEffect(() => {

    document.title = "View Products";
    axios.get('/api/products/view').then(res => {
      if (res.data.status === 200) {
        // console.log(res.data.products)
        setProducts(res.data.products)
        setLoading(false);
      }

    })

  }, [])

  const deleteProducts = (e, id) => {
    e.preventDefault();
    setDeleteLoading((prev) => ({ ...prev, [id]: true })); // Set loading for the specific button

    axios.delete(`/api/products/delete/${id}`)
        .then(res => {
            if (res.data.status === 200) {
                setProducts(prevProducts => prevProducts.filter(item => item.id !== id)); // Update the category list
                swal("Success", res.data.message, "success");
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
            }
        })
        .finally(() => {
            setDeleteLoading((prev) => ({ ...prev, [id]: false })); // Reset loading state for the specific button
        });
};

  var displayProductData = "";
  if (loading) {
    return <LoadingSpinner />
  } else {
    displayProductData = products.map((items) => {
      return (
        <tr key={items.id}>
          <td>{items.id}</td>
          <td>{items.category.name}</td>
          <td>{items.name}</td>
          <td><img src={`http://localhost:8000/${items.image}`} width='50' alt={items.name}></img></td>
          <td>{items.selling_price}</td>
          <td>{items.original_price}</td>
          <td>{items.status == 0 ? "Active" : "Hidden"}</td>
          <td><Link to={`/admin/products/edit/${items.id}`} className='btn btn-primary btn-sm'>Edit</Link></td>
          <td>
            <button
              className="btn btn-danger btn-sm"
              onClick={(e) => deleteProducts(e, items.id)}
              disabled={deleteLoading[items.id]} // Disable button when loading
            >
              {deleteLoading[items.id] ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
                'Delete'
              )}
            </button>
          </td>
        </tr>
      )
    })
  }
  return (
    <div className='card px-4 mt-3'>
      <div className="card-header">
        <h4>View Products
          <Link to="/admin/products" className='btn btn-primary btn-sm float-end'>Add Products</Link>
        </h4>
      </div>
      <div className="card-body">
        <div className="table-repsonsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Category name</th>
                <th>Product name</th>
                <th>Image</th>
                <th>Selling Price</th>
                <th>Cost Price</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {displayProductData}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ViewProducts