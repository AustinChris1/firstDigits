import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';

const AddTeam = () => {
    const [teamsInput, setTeamsInput] = useState({
        name: '',
        role: '',
        image: '',
        status: false
    });
    const [picture, setPicture] = useState(null);
    const [error, setError] = useState({});
    const [addLoading, setAddLoading] = useState(false);


    const handleInput = (e) => {
        const { name, type, value, checked } = e.target;
        setTeamsInput({ ...teamsInput, [name]: type === 'checkbox' ? checked : value });
    };

    const handleImage = (e) => {
        const { name, files } = e.target;
        if (name === 'image') {
            setPicture(files[0]);  // Save the first file
        }
    };

    const teamsForm = (e) => {
        e.preventDefault();
        setAddLoading(true);

        const formData = new FormData();
        formData.append('image', picture);  // Append the image file

        formData.append('name', teamsInput.name || '');
        formData.append('role', teamsInput.role || '');
        formData.append('status', teamsInput.status ? 1 : 0);
  

        axios.post('/api/team/store', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                if (res.data.status === 200) {
                    setError({});
                    swal('Success', res.data.message, 'success');
                    setTeamsInput({...teamsInput,
                        name: '',
                        role: '',
                        image: '',
                        status: false
                    });
                    document.getElementById('teamsForm').reset();
                } else if (res.data.status === 400) {
                    setError(res.data.errors);
                }
                setAddLoading(false);
            })
            .catch(err => {
                if (err.response && err.response.status === 422) {
                    setError(err.response.data.errors);
                    swal('Error', 'Please check the input fields.', 'error');
                } else {
                    swal('Error', 'Something went wrong. Please try again later.', 'error');
                }
                setAddLoading(false);
            });
    };

    return (
        <div className='container px-4'>
            <h4 className="mt-4">Add team
                <Link to="/admin/dashboard" className="btn btn-primary btn-sm float-end">View teams</Link>
            </h4>
            <form onSubmit={teamsForm} encType='multipart/form-data' id='teamsForm' className='mt-3'>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">
                            Home
                        </button>
                    </li>
                </ul>

                <div className="tab-content" id="myTabContent">
                    {/* Home Tab */}
                    <div className="tab-pane card-body border p-6 fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <div className="form-group mb-3">
                            <label htmlFor="name">Name</label>
                            <input onChange={handleInput} value={teamsInput.name || ''} type="text" id="name" name="name" className="form-control" />
                            <small className="text-danger">{error.name ? error.name[0] : ''}</small>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="role">Role</label>
                            <input onChange={handleInput} value={teamsInput.role || ''} type="text" id="role" name="role" className="form-control" />
                            <small className="text-danger">{error.role ? error.role[0] : ''}</small>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="image">Image</label>
                            <input onChange={handleImage} type="file" id="image" name="image" className="form-control" />
                            <small className="text-danger">{error.image ? error.image[0] : ''}</small>
                        </div>
                        <div className="form-check form-switch mb-3">
                            <input
                                onChange={handleInput}
                                checked={teamsInput.status}
                                type='checkbox'
                                id="status"
                                name="status"
                                className="form-check-input"
                            />
                            <label className="form-check-label" htmlFor="status">Status</label>
                        </div>
                    </div>

                </div>
                <button className="btn btn-primary mt-3 px-4 float-end" type='submit' disabled={addLoading}>
                    {addLoading ? (<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>) : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default AddTeam;
