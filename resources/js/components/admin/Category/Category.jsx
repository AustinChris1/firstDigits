import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import LoadingSpinner from '../LoadingSpinner';  // Assuming you have a component for center loading spinner

const Category = () => {
    const [categoryInput, setCategoryInput] = useState({
        name: '',
        link: '',
        description: '',
        status: false,
        meta_title: '',
        meta_keywords: '',
        meta_description: '',
    });
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);  // Manage loading state for fetching details
    const [updateLoading, setUpdateLoading] = useState(false);  // Manage loading state for the submit button

    
        const handleInput = (e) => {
        const { name, type, checked, value } = e.target;
        setCategoryInput({
            ...categoryInput,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const submitCategory = (e) => {
        e.preventDefault();
        setUpdateLoading(true);  // Set small spinner for the submit button

        const data = {
            name: categoryInput.name,
            link: categoryInput.link,
            description: categoryInput.description,
            status: categoryInput.status,
            meta_title: categoryInput.meta_title,
            meta_keywords: categoryInput.meta_keywords,
            meta_description: categoryInput.meta_description
        };
        setLoading(false)
        axios.post('/api/category/store', data)
            .then(res => {
                if (res.data.status === 200) {
                    setError({});
                    toast.success(res.data.message);
                    // Reset the form after successful submission
                    setCategoryInput({
                        name: '',
                        link: '',
                        description: '',
                        status: false,
                        meta_title: '',
                        meta_keywords: '',
                        meta_description: '',
                    });
                    document.getElementById('categoryForm').reset();
                } else if (res.data.status === 400) {
                    // Collect and display errors from the response
                    setError(res.data.errors);
                }
            })
            .catch(err => {
                if (err.response && err.response.status === 400) {
                    setError(err.response.data.errors);
                    toast.error('Please check the input fields.');
                } else {
                    toast.error('Something went wrong. Please try again later.');
                }
            })
            .finally(() => {
                setUpdateLoading(false);  // Stop loading spinner for submit button
            });
    };

    // Show large loading spinner for page load
    if (loading) {
        return <LoadingSpinner />;  // Render a central loading spinner while fetching details
    }

    return (
        <div className='container-fluid px-4'>
            <h4 className="mt-4">Add Category
                <Link to="/admin/category/view" className="btn btn-primary btn-sm float-end">View Category</Link>
            </h4>
            <form onSubmit={submitCategory} id='categoryForm' className='mt-3'>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button 
                            className="nav-link active" 
                            id="home-tab" 
                            data-bs-toggle="tab" 
                            data-bs-target="#home" 
                            type="button" 
                            role="tab" 
                            aria-controls="home" 
                            aria-selected="true"
                        >
                            Home
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button 
                            className="nav-link" 
                            id="seo-tags-tab" 
                            data-bs-toggle="tab" 
                            data-bs-target="#seo-tags" 
                            type="button" 
                            role="tab" 
                            aria-controls="seo-tags" 
                            aria-selected="false"
                        >
                            SEO Tags
                        </button>
                    </li>
                </ul>

                <div className="tab-content" id="myTabContent">
                    {/* Home Tab */}
                    <div className="tab-pane card-body border p-6 fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <div className="form-group mb-3">
                            <label htmlFor="name">Name</label>
                            <input onChange={handleInput} value={categoryInput.name} type="text" id="name" name="name" className="form-control" />
                            <small className="text-danger">{error.name}</small>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="link">Link</label>
                            <input onChange={handleInput} value={categoryInput.link} type="text" id="link" name="link" className="form-control" />
                            <small className="text-danger">{error.link}</small>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="description">Description</label>
                            <textarea id="description" name="description" onChange={handleInput} value={categoryInput.description} className="form-control" />
                        </div>
                        <div className="form-check form-switch mb-3">
                        <label className="form-check-label" htmlFor="status">Status</label>
                            <input onChange={handleInput} checked={categoryInput.status} type='checkbox' id="status" name="status" className="form-check-input" />
                        </div>
                    </div>

                    {/* SEO Tags Tab */}
                    <div className="tab-pane card-body border p-6 fade" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab">
                        <div className="form-group mb-3">
                            <label htmlFor="meta-title">Meta Title</label>
                            <input onChange={handleInput} value={categoryInput.meta_title} type="text" id="meta_title" name="meta_title" className="form-control" />
                            <small className="text-danger">{error.meta_title}</small>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="meta-keyword">Meta Keywords</label>
                            <textarea id="meta_keywords" name="meta_keywords" onChange={handleInput} value={categoryInput.meta_keywords} className="form-control" />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="meta-description">Meta Description</label>
                            <textarea id="meta_description" name="meta_description" onChange={handleInput} value={categoryInput.meta_description} className="form-control" />
                        </div>
                    </div>
                </div>
                <button 
                    className="btn btn-primary mt-3 px-4 float-end" 
                    type='submit' 
                    name='submitCat' 
                    disabled={updateLoading}  // Disable button when update is loading
                >
                    {updateLoading ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                        'Submit'
                    )}
                </button>
            </form>
        </div>
    );
};

export default Category;
