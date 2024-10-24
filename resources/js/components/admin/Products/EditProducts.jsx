import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import LoadingSpinner from '../LoadingSpinner';

const EditProducts = () => {
    const { id } = useParams(); // Correctly using useParams at the top level
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [editLoading, setEditLoading] = useState(false);
    const [category, setCategory] = useState([]);
    const [picture, setPicture] = useState(null);
    const [picture2, setPicture2] = useState(null);

    const [productsInput, setProductsInput] = useState({
      category_id: '',
      name: '',
      link: '',
      description: '',
      meta_title: '',
      meta_keywords: '',
      meta_description: '',
      selling_price: '',
      original_price: '',
      qty: '',
      brand: '',
      image: '',
      image2: '',
      featured: false,
      popular: false,
      status: false
  });
    const [error, setError] = useState({});

    const handleImage = (e) => {
        const { name, files } = e.target;
        if (name === 'image') {
            setPicture(files[0]);  // Save the first file
        } else if (name === 'image2') {
            setPicture2(files[0]);  // Save the second file
        }
    };


    const handleInput = (e) => {
        const { name, type, value, checked } = e.target;
        setProductsInput({
            ...productsInput,
            [name]: type === 'checkbox' ? checked : value
        });
    };


    useEffect(() => {
        axios.get('/api/allCategory')
            .then(res => {
                if (res.status === 200) {
                    setCategory(res.data.category);
                }
            })
            .catch(err => {
                swal('Error', 'Error fetching category', 'error');
            });

        axios.get(`/api/products/edit/${id}`).then(res => {
            if (res.status === 200) {
                setProductsInput(res.data.Product);
            } else if (res.status === 404) {
                swal('Error', res.data.message, 'error');
                navigate('/admin/products/view');
            }
            setLoading(false);
        }).catch(err => {
            swal('Error', 'Failed to fetch Products.', 'error');
            setLoading(false);
        });
    }, [id, navigate]);

    const editProducts = (e) => {
      e.preventDefault();
      setEditLoading(true);
  
      const formData = new FormData();
      
          formData.append('image', picture);
          formData.append('image2', picture2);
  
      // Ensure numerical fields are numbers
      formData.append('category_id', parseInt(productsInput.category_id) || 0);
      formData.append('name', productsInput.name || '');
      formData.append('link', productsInput.link || '');
      formData.append('description', productsInput.description || '');
      formData.append('meta_title', productsInput.meta_title || '');
      formData.append('meta_keywords', productsInput.meta_keywords || '');
      formData.append('meta_description', productsInput.meta_description || '');  // Ensure a value is provided
  
      // Ensure prices and quantity are numbers
      formData.append('selling_price', parseFloat(productsInput.selling_price) || 0);
      formData.append('original_price', parseFloat(productsInput.original_price) || 0);
      formData.append('qty', parseInt(productsInput.qty) || 0);
      formData.append('brand', productsInput.brand || '');
      
      // Convert checkboxes and booleans to 1 or 0
      formData.append('featured', productsInput.featured ? 1 : 0);
      formData.append('popular', productsInput.popular ? 1 : 0);
      formData.append('status', productsInput.status ? 1 : 0);
  
      axios.post(`/api/products/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
              if (res.data.status === 200) {
                  swal('Success', res.data.message, 'success');
                  setError({});
                  navigate('/admin/products/view');
              } else if (res.data.status === 422) {
                  setError(res.data.errors);  // This shows which fields are triggering validation errors
              } else if (res.data.status === 404) {
                  swal('Error', res.data.message, 'error');
                  navigate('/admin/products/view');
              }
          })
          .catch(err => {
              if (err.response && err.response.status === 422) {
                  setError(err.response.data.errors);
                  swal('Error', 'Please check the input fields.', 'error');
              } else {
                  swal('Error', 'Something went wrong. Please try again later.', 'error');
              }
          })
          .finally(() => {
              setEditLoading(false);
          });
  };
      
    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className='container px-4'>
            <h4 className="mt-4">Edit Products
                <Link to="/admin/Products/view" className="btn btn-primary btn-sm float-end">Back</Link>
            </h4>
            <form onSubmit={editProducts} encType='multipart/form-data' id='ProductsForm' className='mt-3'>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">
                            Home
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#seo-tags" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">
                            SEO Tags
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="otherdetails-tab" data-bs-toggle="tab" data-bs-target="#otherdetails" type="button" role="tab" aria-controls="otherdetails" aria-selected="false">
                            Other Details
                        </button>
                    </li>
                </ul>

                <div className="tab-content" id="myTabContent">
                    {/* Home Tab */}
                    <div className="tab-pane card-body border p-6 fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <div className="form-group mb-3">
                            <label htmlFor="category_id">Category</label>
                            <select onChange={handleInput} value={productsInput.category_id || ''} id="category_id" name="category_id" className="form-control">
                                <option value="">Select Category</option>
                                {category.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                            <small className="text-danger">{error.category_id ? error.category_id[0] : ''}</small>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="name">Name</label>
                            <input onChange={handleInput} value={productsInput.name || ''} type="text" id="name" name="name" className="form-control" />
                            <small className="text-danger">{error.name ? error.name[0] : ''}</small>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="link">Link</label>
                            <input onChange={handleInput} value={productsInput.link || ''} type="text" id="link" name="link" className="form-control" />
                            <small className="text-danger">{error.link ? error.link[0] : ''}</small>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="description">Description</label>
                            <textarea id="description" name="description" onChange={handleInput} value={productsInput.description || ''} className="form-control" />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="status">Status</label>
                            <input onChange={handleInput} checked={productsInput.status} type='checkbox' id="status" name="status" className="form-check-input" />
                        </div>
                    </div>

                    {/* SEO Tags Tab */}
                    <div className="tab-pane card-body border p-6 fade" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab">
                        <div className="form-group mb-3">
                            <label htmlFor="meta_title">Meta Title</label>
                            <input onChange={handleInput} value={productsInput.meta_title || ''} type="text" id="meta_title" name="meta_title" className="form-control" />
                            <small className="text-danger">{error.meta_title ? error.meta_title[0] : ''}</small>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="meta_keyword">Meta Keywords</label>
                            <textarea id="meta_keywords" name="meta_keywords" onChange={handleInput} value={productsInput.meta_keywords || ''} className="form-control" />
                            <small className="text-danger">{error.meta_keywords ? error.meta_keywords[0] : ''}</small>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="meta_description">Meta Description</label>
                            <textarea id="meta_description" name="meta_description" onChange={handleInput} value={productsInput.meta_description || ''} className="form-control" />
                            <small className="text-danger">{error.meta_description ? error.meta_description[0] : ''}</small>

                        </div>
                    </div>

                    {/* Other details tab */}
                    <div className="tab-pane card-body border p-6 fade" id="otherdetails" role="tabpanel" aria-labelledby="otherdetails-tab">
                        <div className="form-group mb-3">
                            <label htmlFor="selling_price">Selling Price</label>
                            <input onChange={handleInput} value={productsInput.selling_price || ''} type="text" id="selling_price" name="selling_price" className="form-control" />
                            <small className="text-danger">{error.selling_price ? error.selling_price[0] : ''}</small>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="original_price">Original Price</label>
                            <input onChange={handleInput} value={productsInput.original_price || ''} type="text" id="original_price" name="original_price" className="form-control" />
                            <small className="text-danger">{error.original_price ? error.original_price[0] : ''}</small>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="qty">Quantity</label>
                            <input onChange={handleInput} value={productsInput.qty || ''} type="text" id="qty" name="qty" className="form-control" />
                            <small className="text-danger">{error.qty ? error.qty[0] : ''}</small>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="brand">Brand</label>
                            <input onChange={handleInput} value={productsInput.brand || ''} type="text" id="brand" name="brand" className="form-control" />
                            <small className="text-danger">{error.brand ? error.brand[0] : ''}</small>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="image">Image</label>
                            <input onChange={handleImage} type="file" id="image" name="image" className="form-control" />
                            <img src={`/${productsInput.image}`} width="50px"></img>
                            <small className="text-danger">{error.image ? error.image[0] : ''}</small>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="image2">Image 2</label>
                            <input onChange={handleImage} type="file" id="image2" name="image2" className="form-control" />
                            <img src={`/${productsInput.image2}`} width="50px"></img>
                            <small className="text-danger">{error.image2 ? error.image2[0] : ''}</small>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="featured">Featured</label>
                            <input onChange={handleInput} checked={productsInput.featured} value={productsInput.featured || ''} type="checkbox" id="featured" name="featured" className="w-50 h-50" />
                            <small className="text-danger">{error.featured ? error.featured[0] : ''}</small>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="popular">Popular</label>
                            <input onChange={handleInput} checked={productsInput.popular} value={productsInput.popular || ''} type="checkbox" id="popular" name="popular" className="w-50 h-50" />
                            <small className="text-danger">{error.popular ? error.popular[0] : ''}</small>
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

export default EditProducts;
