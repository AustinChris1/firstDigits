import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import LoadingSpinner from '../LoadingSpinner';
import { toast } from 'react-toastify';

const ViewCategory = () => {
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [deleteLoading, setDeleteLoading] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;

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
        setDeleteLoading((prev) => ({ ...prev, [id]: true }));

        axios.post(`/api/category/delete/${id}`)
            .then(res => {
                if (res.data.status === 200) {
                    setCategories(prevCategories => prevCategories.filter(item => item.id !== id));
                    toast.success(res.data.message);
                } else if (res.data.status === 404) {
                    toast.error(res.data.message);
                }
            })
            .finally(() => {
                setDeleteLoading((prev) => ({ ...prev, [id]: false }));
            });
    };

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const displayedCategories = categories.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h4>Category</h4>
                    <Link to="/admin/category" className="btn btn-primary btn-sm">Add Category</Link>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead className="table-dark">
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
                                {displayedCategories.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.link}</td>
                                        <td>{item.status === 0 ? "Active" : "Inactive"}</td>
                                        <td>
                                            <Link to={`/admin/category/edit/${item.id}`} className="btn btn-primary btn-sm">Edit</Link>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={(e) => deleteCategory(e, item.id)}
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
                    <ReactPaginate
                        previousLabel={'«'}
                        nextLabel={'»'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={Math.ceil(categories.length / itemsPerPage)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination justify-content-center mt-3'}
                        pageClassName={'page-item'}
                        pageLinkClassName={'page-link'}
                        previousClassName={'page-item'}
                        previousLinkClassName={'page-link'}
                        nextClassName={'page-item'}
                        nextLinkClassName={'page-link'}
                        activeClassName={'active'}
                    />
                </div>
            </div>
        </div>
    );
};

export default ViewCategory;
