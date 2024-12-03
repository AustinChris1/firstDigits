import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import LoadingSpinner from '../LoadingSpinner';

const EditTeam = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [editLoading, setEditLoading] = useState(false);
    const [picture, setPicture] = useState(null);
    const [teamInput, setTeamInput] = useState({
        name: '',
        role: '',
        image: '',
        status: false
    });
    const [error, setError] = useState({});

    const handleImage = (e) => {
        setPicture(e.target.files[0]);
    };

    const handleInput = (e) => {
        const { name, type, value, checked } = e.target;
        setTeamInput({
            ...teamInput,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    useEffect(() => {
        axios.get(`/api/team/edit/${id}`).then(res => {
            if (res.status === 200) {
                setTeamInput(res.data.team);
            } else if (res.status === 404) {
                toast.error(res.data.message);
                navigate('/admin/dashboard');
            }
            setLoading(false);
        }).catch(err => {
            toast.error('Failed to fetch team.');
            setLoading(false);
        });
    }, [id, navigate]);

    const editTeam = (e) => {
        e.preventDefault();
        setEditLoading(true);

        const formData = new FormData();
        formData.append('image', picture);
        formData.append('name', teamInput.name || '');
        formData.append('role', teamInput.role || '');
        formData.append('status', teamInput.status ? 1 : 0);

        axios.post(`/api/team/update/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => {
            if (res.data.status === 200) {
                toast.success(res.data.message);
                setError({});
                navigate('/admin/dashboard');
            } else if (res.data.status === 422) {
                setError(res.data.errors);
            } else if (res.data.status === 404) {
                toast.error(res.data.message);
                navigate('/admin/dashboard');
            }
        }).catch(err => {
            if (err.response && err.response.status === 422) {
                setError(err.response.data.errors);
                toast.error('Please check the input fields.');
            } else {
                toast.error('Failed to update team.');
            }
        }).finally(() => setEditLoading(false));
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className='container px-4'>
            <h4 className="mt-4">Edit Team
                <Link to="/admin/dashboard" className="btn btn-primary btn-sm float-end">Back</Link>
            </h4>
            <form onSubmit={editTeam} encType='multipart/form-data' className='mt-3'>
                <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" data-bs-toggle="tab" type="button" role="tab">
                            Details
                        </button>
                    </li>
                </ul>
                <div className="tab-content card-body border p-4 mt-3">
                    <div className="tab-pane fade show active" role="tabpanel">
                    <div className="form-group mb-3">
                            <label htmlFor="name">Name</label>
                            <input
                                onChange={handleInput}
                                value={teamInput.name || ''}
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                            />
                            <small className="text-danger">{error.name ? error.name[0] : ''}</small>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="role">Role</label>
                            <input
                                onChange={handleInput}
                                value={teamInput.role || ''}
                                type="text"
                                id="role"
                                name="role"
                                className="form-control"
                            />
                            <small className="text-danger">{error.role ? error.role[0] : ''}</small>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="image">Image</label>
                            <input onChange={handleImage} type="file" id="image" name="image" className="form-control" />
                            {teamInput.image && (
                                <div className="mt-2">
                                    <img src={`/${teamInput.image}`} width="100px" alt="Current Team" />
                                </div>
                            )}
                            <small className="text-danger">{error.image ? error.image[0] : ''}</small>
                        </div>
                        <div className="form-check form-switch mb-3">
                            <input
                                onChange={handleInput}
                                checked={teamInput.status}
                                type='checkbox'
                                id="status"
                                name="status"
                                className="form-check-input"
                            />
                            <label className="form-check-label" htmlFor="status">Status</label>
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary mt-3 px-4 float-end" type='submit' disabled={editLoading}>
                    {editLoading ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                        'Edit'
                    )}
                </button>
            </form>
        </div>
    );
};

export default EditTeam;
