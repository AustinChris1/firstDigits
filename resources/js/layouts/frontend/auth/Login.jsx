import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const [loginInput, setLogin] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState({}); // Error state for validation errors
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    const handleInput = (e) => {
        setLogin({
            ...loginInput,
            [e.target.name]: e.target.value,
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const loginSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: loginInput.email,
            password: loginInput.password,
        };

        // Get CSRF token and perform login request
        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios
                .post(`/api/login`, data)
                .then((res) => {
                    if (res.data.status === 200) {
                        localStorage.setItem("auth_token", res.data.token);
                        localStorage.setItem("auth_name", res.data.username);
                        localStorage.setItem("auth_email", res.data.email);
                        localStorage.setItem("role", res.data.role);
                        swal("Success", res.data.message, "success");

                        if (res.data.role === "admin") {
                            navigate("/admin/dashboard"); // Redirect to admin dashboard after successful login
                        } else {
                            navigate("/"); // Redirect to home after successful login
                        }
                    } else if (res.data.status === 401) {
                        swal("Error", res.data.message, "error"); // Display error for invalid credentials
                    } else {
                        // If validation errors exist, set them in the error state
                        setError(res.data.validation_errors || {});
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
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-5">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">Login</h1>
                <form onSubmit={loginSubmit} className="flex flex-col space-y-4">
                    {/* Email Input */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        aria-label="Email"
                        onChange={handleInput}
                        value={loginInput.email}
                        className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        required
                    />
                    <small className="text-red-500">{error?.email?.[0]}</small>
                    {/* Password Input with Toggle Icon */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            aria-label="Password"
                            onChange={handleInput}
                            value={loginInput.password}
                            className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        {showPassword ? (
                            <EyeOff onClick={togglePasswordVisibility} className="absolute right-3 top-3 cursor-pointer text-gray-500" />
                        ) : (
                            <Eye onClick={togglePasswordVisibility} className="absolute right-3 top-3 cursor-pointer text-gray-500" />
                        )}
                    </div>
                    <small className="text-red-500">{error?.password?.[0]}</small>
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white rounded-md p-3 hover:bg-blue-600 transition-colors w-full"
                    >
                        Login
                    </button>
                </form>

                {/* Register Link */}
                <p className="text-center mt-4">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-500 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
