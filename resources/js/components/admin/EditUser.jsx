import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import LoadingSpinner from './LoadingSpinner';

const EditUser = () => {
    const { id } = useParams(); // Correctly using useParams at the top level
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [editLoading, setEditLoading] = useState(false);
    const [userInput, setUserInput] = useState({
        name: '',
        email: '',
        role_as: false,
    });
    const [error, setError] = useState({});

    useEffect(() => {
        axios.get(`/api/users/edit/${id}`).then(res => {
            if (res.status === 200) {
                setUserInput(res.data.user);
            } else if (res.status === 404) {
                swal('Error', res.data.message, 'error');
                navigate('/admin/dashboard');
            }
            setLoading(false);
        }).catch(err => {
            // console.error('Error fetching user:', err);
            swal('Error', 'Failed to fetch user.', 'error');
            setLoading(false);
        });
    }, [id, navigate]);

    const handleInput = (e) => {
        const { name, type, value, checked } = e.target;
        setUserInput({
            ...userInput,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const edituser = (e) => {
        e.preventDefault();
        setEditLoading(true);
        const data = userInput;

        axios.post(`/api/users/update/${id}`, data)
            .then(res => {
                if (res.data.status === 200) {
                    // console.log(data);
                    swal('Success', res.data.message, 'success');
                    setError({});
                    navigate('/admin/dashboard');
                } else if (res.data.status === 422) {
                    setError(res.data.errors);
                } else if (res.data.status === 404) {
                    swal('Error', res.data.message, 'error');
                    navigate('/admin/dashboard');
                }
            })
            .catch(err => {
                if (err.response && err.response.status === 422) {
                    setError(err.response.data.errors);
                    swal('Error', 'Please check the input fields.', 'error');
                } else {
                    swal('Error', 'Something went wrong. Please try again later.', 'error');
                }
                // console.error('Error updating user:', err.response);
            }).finally(() => {
                setEditLoading(false);
            });
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className='container px-4'>
            <h4 className="mt-4">Edit user
                <Link to="/admin/dashboard" className="btn btn-primary btn-sm float-end">Back</Link>
            </h4>
            <form onSubmit={edituser} id='userForm' className='mt-3'>
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
                </ul>

                <div className="tab-content" id="myTabContent">
                    {/* Home Tab */}
                    <div className="tab-pane card-body border p-6 fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <div className="form-group mb-3">
                            <label htmlFor="name">Name</label>
                            <input onChange={handleInput} value={userInput.name || ''} type="text" id="name" name="name" className="form-control" />
                            <small className="text-danger">{error.name ? error.name[0] : ''}</small>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="email">Email</label>
                            <input onChange={handleInput} value={userInput.email || ''} type="email" id="email" name="email" className="form-control" />
                            <small className="text-danger">{error.email ? error.email[0] : ''}</small>
                        </div>
                        <div className="form-check form-switch mb-3">
                            <input
                                onChange={handleInput}
                                checked={userInput.role_as}
                                type='checkbox'
                                id="role_as"
                                name="role_as"
                                className="form-check-input"
                            />
                            <label className="form-check-label" htmlFor="role_as">Role</label>
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

export default EditUser;
