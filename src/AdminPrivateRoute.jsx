import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import swal from 'sweetalert';
import LoadingSpinner from './components/admin/LoadingSpinner';

const AdminPrivateRoute = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);  // Add loading state

    useEffect(() => {
        axios.get(`/api/check-auth`)
            .then(res => {
                if (res.status === 200) {
                    setAuthenticated(true);
                } else {
                    setAuthenticated(false);
                }
                setLoading(false);  // Stop loading once the request is complete
            })
            .catch(err => {
                console.log(err);
                setAuthenticated(false);
                setLoading(false);  // Ensure loading stops even in case of an error
            });
    }, []);  // Empty dependency array to run the effect only once
    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
        if (err.response.status === 401) {
            swal('Unauthorized', err.response.data.message, 'warning');
            return <Navigate to="/login" />;
        }
        return Promise.reject(err);
    }
    );

    
    axios.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        if (error.response.status === 403) {
            swal('Unauthorized', error.response.data.message, 'warning');
            return <Navigate to="/403" />;
        }else if(error.response.status === 404){
            swal('Not Found', "Page not found", 'warning');
            return <Navigate to="/404" />;
        }
        return Promise.reject(error);
    }
    );

        // Show loading while checking authentication
        if (loading) {
            return <LoadingSpinner />;
        }

        return authenticated ? children : <Navigate to="/login" />;
    };

    export default AdminPrivateRoute;
