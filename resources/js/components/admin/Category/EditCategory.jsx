import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import LoadingSpinner from '../LoadingSpinner';

const EditCategory = () => {
    const { id } = useParams(); // Correctly using useParams at the top level
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [editLoading, setEditLoading] = useState(false);
    const [categoryInput, setCategoryInput] = useState({
        name: '',
        link: '',
        description: '',
        status: false,
        meta_title: '',
        meta_keywords: '',
        meta_description: ''
    });
    const [error, setError] = useState({});

    useEffect(() => {
        axios.get(`/api/category/edit/${id}`).then(res => {
            if (res.status === 200) {
                setCategoryInput(res.data.category);
            } else if (res.status === 404) {
                toast.error(res.data.message);
                navigate('/admin/category/view');
            }
            setLoading(false);
        }).catch(err => {
            toast.error('Failed to fetch category.');
            setLoading(false);
        });
    }, [id, navigate]);

    const handleInput = (e) => {
        const { name, type, value, checked } = e.target;
        setCategoryInput({
            ...categoryInput,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const editCategory = (e) => {
        e.preventDefault();
        setEditLoading(true);
        const data = categoryInput;
        
        axios.post(`/api/category/update/${id}`, data)
            .then(res => {
                if (res.data.status === 200) {
                    toast.success(res.data.message);
                    setError({});
                    navigate('/admin/category/view');
                } else if (res.data.status === 422) {
                    setError(res.data.errors);
                } else if (res.data.status === 404) {
                    toast.error(res.data.message);
                    navigate('/admin/category/view');
                }
            })
            .catch(err => {
                if (err.response && err.response.status === 422) {
                    setError(err.response.data.errors);
                    toast.error('Please check the input fields.');
                } else {
                    toast.error('Failed to update category, try again.');
                }
            }).finally(() => {
                setEditLoading(false);
            });
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className='container px-4'>
            <h4 className="mt-4">Edit Category
                <Link to="/admin/category/view" className="btn btn-primary btn-sm float-end">Back</Link>
            </h4>
            <form onSubmit={editCategory} id='categoryForm' className='mt-3'>
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
                            <input onChange={handleInput} value={categoryInput.name || ''} type="text" id="name" name="name" className="form-control" />
                            <small className="text-danger">{error.name ? error.name[0] : ''}</small>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="link">Link</label>
                            <input onChange={handleInput} value={categoryInput.link || ''} type="text" id="link" name="link" className="form-control" />
                            <small className="text-danger">{error.link ? error.link[0] : ''}</small>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="description">Description</label>
                            <textarea id="description" name="description" onChange={handleInput} value={categoryInput.description || ''} className="form-control" />
                        </div>
                        <div className="form-check form-switch mb-3">
                        <label className="form-check-label" htmlFor="status">Status</label>
                            <input onChange={handleInput} checked={categoryInput.status} type='checkbox' id="status" name="status" className="form-check-input" />
                        </div>
                    </div>

                    {/* SEO Tags Tab */}
                    <div className="tab-pane card-body border p-6 fade" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab">
                        <div className="form-group mb-3">
                            <label htmlFor="meta_title">Meta Title</label>
                            <input onChange={handleInput} value={categoryInput.meta_title || ''} type="text" id="meta_title" name="meta_title" className="form-control" />
                            <small className="text-danger">{error.meta_title ? error.meta_title[0] : ''}</small>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="meta_keyword">Meta Keywords</label>
                            <textarea id="meta_keywords" name="meta_keywords" onChange={handleInput} value={categoryInput.meta_keywords || ''} className="form-control" />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="meta_description">Meta Description</label>
                            <textarea id="meta_description" name="meta_description" onChange={handleInput} value={categoryInput.meta_description || ''} className="form-control" />
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary mt-3 px-4 float-end" type='submit' disabled={editLoading} >{editLoading ? (<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                        'Edit'
                    )}</button>
            </form>
        </div>
    );
};

export default EditCategory;
