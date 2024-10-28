import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [registerInput, setRegister] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        error_list: {},
    });
    const [error, setError] = useState({});

    const handleInput = (e) => {
        setRegister({
            ...registerInput,
            [e.target.name]: e.target.value,
        });
    };

    const registerSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
            password_confirmation: registerInput.password_confirmation,
        };

        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios
                .post(`/api/register`, data)
                .then((res) => {
                    if (res.data.status === 200) {
                        localStorage.setItem("auth_token", res.data.access_token);
                        localStorage.setItem("auth_name", res.data.username);
                        localStorage.setItem("auth_email", res.data.email);
                        setError({});  // Clear any previous errors
                        swal("Success", res.data.message, "success");
                        navigate("/");
                    } else {
                        setError(res.data.validation_errors || {}); // Ensure it's accessing the right field
                    }
                })
                .catch((err) => {
                    if (err.response && err.response.status === 422) {
                        setError(err.response.data.validation_errors || {}); // Correctly handle errors
                        swal('Error', 'Please check the input fields.', 'error');
                    } else {
                        swal('Error', 'Something went wrong. Please try again later.', 'error');
                        console.error('Error details:', err.response || err);
                    }
                });
        });
    };

    return (
        <div className="flex flex-col items-center p-5 md:flex-row md:justify-center">
            <div className="mt-28 flex flex-col justify-center bg-white border border-gray-200 rounded-lg p-8 shadow-lg w-full max-w-md">
                <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">Register</h1>

                {/* Form */}
                <form onSubmit={registerSubmit} className="flex flex-col space-y-4">
                    {/* Full Name */}
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        aria-label="Full Name"
                        onChange={handleInput}
                        value={registerInput.name}
                        className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <small className="text-red-500">{error?.name?.[0]}</small>

                    {/* Email */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        aria-label="Email"
                        onChange={handleInput}
                        value={registerInput.email}
                        className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <small className="text-red-500">{error?.email?.[0]}</small>

                    {/* Password */}
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        aria-label="Password"
                        onChange={handleInput}
                        value={registerInput.password}
                        className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <small className="text-red-500">{error?.password?.[0]}</small>

                    {/* Confirm Password */}
                    <input
                        type="password"
                        name="password_confirmation"
                        placeholder="Confirm Password"
                        aria-label="Confirm Password"
                        onChange={handleInput}
                        value={registerInput.password_confirmation}
                        className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <small className="text-red-500">{error?.password_confirmation?.[0]}</small>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white rounded-md p-3 hover:bg-blue-600 transition-colors"
                    >
                        Register
                    </button>
                </form>

                {/* Social Login */}
                <div className="flex flex-col space-y-2 mt-4">
                    <button className="bg-red-500 text-white rounded-md p-3 hover:bg-red-600 transition-colors">
                        Sign up with Google
                    </button>
                    <button className="bg-blue-700 text-white rounded-md p-3 hover:bg-blue-800 transition-colors">
                        Sign up with Facebook
                    </button>
                </div>

                {/* Already have an account */}
                <p className="text-center mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
