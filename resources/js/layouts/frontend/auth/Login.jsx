import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from 'lucide-react';
import Load from "../Components/Load";
import { toast } from 'react-toastify';

const Login = () => {
    document.title = "Login - First Digit";
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
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
                        toast.success(res.data.message);

                        if (res.data.role === "admin") {
                            navigate("/admin/dashboard"); // Redirect to admin dashboard after successful login
                        } else {
                            navigate("/"); // Redirect to home after successful login

                        }
                    } else if (res.data.status === 401) {
                        toast.error(res.data.message);
                    } else {
                        // If validation errors exist, set them in the error state
                        setError(res.data.validation_errors || {});
                        toast.error(res.data.validation_errors || {});
                    }
                })
                .catch((err) => {
                    if (err.response && err.response.status === 422) {
                        setError(err.response.data.validation_errors || {}); // Correctly handle errors
                        toast.error("Please check the input fields.");

                    } else {
                        toast.error("Something went wrong. Please try again later.");
                        console.error('Error details:', err.response || err);
                    }
                })
                .finally(() => {
                    setLoading(false); // Stop loading
                });
        })
            .catch((csrfError) => {
                setLoading(false); // Stop loading if CSRF fails
                toast.error("Failed to set CSRF token. Please try again later.");
                console.error("CSRF Error:", csrfError);
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-5">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-4xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">Login</h1>
                <form onSubmit={loginSubmit} className="flex flex-col space-y-4">
                    {/* Email Input */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        aria-label="Email"
                        onChange={handleInput}
                        value={loginInput.email}
                        className="border border-gray-300 dark:border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 w-full"
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
                            className="border border-gray-300 dark:border-gray-700 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
                            required
                        />
                        {showPassword ? (
                            <EyeOff onClick={togglePasswordVisibility} className="absolute right-3 top-3 cursor-pointer text-gray-500 dark:text-gray-400" />
                        ) : (
                            <Eye onClick={togglePasswordVisibility} className="absolute right-3 top-3 cursor-pointer text-gray-500 dark:text-gray-400" />
                        )}
                    </div>
                    <small className="text-red-500">{error?.password?.[0]}</small>
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white rounded-md p-3 hover:bg-blue-600 transition-colors w-full dark:bg-blue-600 dark:hover:bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? <Load /> : "Login"}
                    </button>
                </form>

                {/* Register Link */}
                <p className="text-center mt-4 text-gray-700 dark:text-gray-400">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-500 hover:underline dark:text-blue-400">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
