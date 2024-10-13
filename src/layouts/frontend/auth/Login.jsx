import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Login = () => {
    const navigate = useNavigate();
    const [loginInput, setLogin] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState({}); // Error state for validation errors

    const handleInput = (e) => {
        setLogin({
            ...loginInput,
            [e.target.name]: e.target.value,
        });
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
                    swal("Error", "Something went wrong. Please try again later.", "error");
                    console.error("Error details:", err.response);
                });
        });
    };

    return (
        <div className="mt-28 flex flex-col items-center p-5 md:flex-row md:justify-center">
            <div className="flex flex-col justify-center bg-white border border-gray-200 rounded-lg p-8 shadow-lg w-full max-w-md">
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
                        className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    {/* Conditionally render email error if it exists */}
                    {error?.email && (
                        <p className="text-red-500 text-xs">{error.email[0]}</p>
                    )}

                    {/* Password Input */}
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        aria-label="Password"
                        onChange={handleInput}
                        value={loginInput.password}
                        className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    {/* Conditionally render password error if it exists */}
                    {error?.password && (
                        <p className="text-red-500 text-xs">{error.password[0]}</p>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white rounded-md p-3 hover:bg-blue-600 transition-colors"
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
