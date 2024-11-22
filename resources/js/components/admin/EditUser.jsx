import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import LoadingSpinner from './LoadingSpinner';

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [editLoading, setEditLoading] = useState(false);
    const [userInput, setUserInput] = useState({
        name: '',
        email: '',
        password: '', // Added for password updates
        role_as: 0,
    });
    const [error, setError] = useState({});

    useEffect(() => {
        axios.get(`/api/users/edit/${id}`)
            .then(res => {
                if (res.status === 200) {
                    setUserInput({
                        ...res.data.user,
                        password: '', // Initialize password as empty
                    });
                } else if (res.status === 404) {
                    swal('Error', res.data.message, 'error');
                    navigate('/admin/dashboard');
                }
            })
            .catch(() => {
                swal('Error', 'Failed to fetch user.', 'error');
            })
            .finally(() => setLoading(false));
    }, [id, navigate]);

    const handleInput = (e) => {
        const { name, type, value, checked } = e.target;
        setUserInput(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (checked ? 1 : 0) : value,
        }));
    };

    const editUser = (e) => {
        e.preventDefault();
        setEditLoading(true);

        axios.post(`/api/users/update/${id}`, userInput)
            .then(res => {
                if (res.data.status === 200) {
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
                } else {
                    swal('Error', 'Something went wrong. Please try again later.', 'error');
                }
            })
            .finally(() => setEditLoading(false));
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="container px-4">
            <h4 className="mt-4">
                Edit User
                <Link to="/admin/dashboard" className="btn btn-primary btn-sm float-end">
                    Back
                </Link>
            </h4>
            <form onSubmit={editUser} className="mt-3">
                <div className="form-group mb-3">
                    <label htmlFor="name">Name</label>
                    <input
                        onChange={handleInput}
                        value={userInput.name || ''}
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                    />
                    <small className="text-danger">{error.name ? error.name[0] : ''}</small>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                        onChange={handleInput}
                        value={userInput.email || ''}
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                    />
                    <small className="text-danger">{error.email ? error.email[0] : ''}</small>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                        onChange={handleInput}
                        value={userInput.password || ''}
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                    />
                    <small className="text-danger">{error.password ? error.password[0] : ''}</small>
                </div>
                <div className="form-check form-switch mb-3">
                    <input
                        onChange={handleInput}
                        checked={userInput.role_as === 1}
                        type="checkbox"
                        id="role_as"
                        name="role_as"
                        className="form-check-input"
                    />
                    <label className="form-check-label" htmlFor="role_as">Admin Role</label>
                </div>
                <button
                    className="btn btn-primary mt-3 px-4 float-end"
                    type="submit"
                    disabled={editLoading}
                >
                    {editLoading ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                        'Update User'
                    )}
                </button>
            </form>
        </div>
    );
};

export default EditUser;
