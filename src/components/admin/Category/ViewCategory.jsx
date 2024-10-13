import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../LoadingSpinner';
const ViewCategory = () => {
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [deleteLoading, setDeleteLoading] = useState({}); // Manage loading state for delete buttons

    useEffect(() => {
        axios.get('/api/viewCategory')
            .then(res => {
                if (res.status === 200) {
                    setCategories(res.data.category);
                }
                setLoading(false);
            });
    }, []);

    const deleteCategory = (e, id) => {
        e.preventDefault();
        setDeleteLoading((prev) => ({ ...prev, [id]: true })); // Set loading for the specific button

        axios.delete(`/api/category/delete/${id}`)
            .then(res => {
                if (res.data.status === 200) {
                    setCategories(prevCategories => prevCategories.filter(item => item.id !== id)); // Update the category list
                    swal("Success", res.data.message, "success");
                } else if (res.data.status === 404) {
                    swal("Error", res.data.message, "error");
                }
            })
            .finally(() => {
                setDeleteLoading((prev) => ({ ...prev, [id]: false })); // Reset loading state for the specific button
            });
    };

    var viewCategory_HTMLTABLE = '';
    if (loading) {
        return <LoadingSpinner />;
    } else {
        viewCategory_HTMLTABLE = categories.map((item) => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.link}</td>
                    <td>{item.status}</td>
                    <td>
                        <Link to={`/admin/category/edit/${item.id}`} className="btn btn-primary btn-sm">Edit</Link>
                    </td>
                    <td>
                        <button 
                            className="btn btn-danger btn-sm" 
                            onClick={(e) => deleteCategory(e, item.id)} 
                            disabled={deleteLoading[item.id]} // Disable button when loading
                        >
                            {deleteLoading[item.id] ? (
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            ) : (
                                'Delete'
                            )}
                        </button>
                    </td>
                </tr>
            );
        });
    }

    return (
        <div className="container px-4">
            <div className='card'>
                <div className="card-header">
                    <h4>Category
                        <Link to="/admin/category" className="btn btn-primary btn-sm float-end">Add Category</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <table className='table table-bordered table-striped'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Link</th>
                                <th>Status</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {viewCategory_HTMLTABLE}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ViewCategory;
