import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Load from "../Components/Load";

const Register = () => {
  document.title = "Register - First Digit";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [registerInput, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility

  // Handle input changes
  const handleInput = (e) => {
    setRegister({
      ...registerInput,
      [e.target.name]: e.target.value,
    });
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Submit Registration Form
  const registerSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const data = {
      name: registerInput.name,
      email: registerInput.email,
      password: registerInput.password,
      password_confirmation: registerInput.password_confirmation,
    };

    // Ensure CSRF token is set before making the registration request
    axios
      .get("/sanctum/csrf-cookie")
      .then(() => {
        axios
          .post(`/api/register`, data, {
            headers: {
              Accept: "application/json", // Explicitly set the Accept header
            },
          })
          .then((res) => {
            if (res.data.status === 200) {
              // Save authentication data
              localStorage.setItem("auth_token", res.data.token);
              localStorage.setItem("auth_name", res.data.username);
              localStorage.setItem("auth_email", res.data.email);
              localStorage.setItem("role", res.data.role);

              setError({});
              swal("Success", res.data.message, "success");
              navigate("/email/resend");
            } else {
              setError(res.data.validation_errors || {});
            }
          })
          .catch((err) => {
            if (err.response && err.response.status === 422) {
              // Validation errors
              setError(err.response.data.validation_errors || {});
              swal("Error", "Please check the input fields.", "error");
            } else if (err.response && err.response.status === 401) {
              // Unauthorized
              swal("Error", "Unauthenticated. Please log in.", "error");
            } else {
              // General errors
              swal("Error", "Something went wrong. Please try again later.", "error");
              console.error("Error details:", err.response || err);
            }
          })
          .finally(() => {
            setLoading(false); // Stop loading
          });
      })
      .catch((csrfError) => {
        setLoading(false); // Stop loading if CSRF fails
        swal("Error", "Failed to set CSRF token. Please try again later.", "error");
        console.error("CSRF Error:", csrfError);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-5 py-14 sm:px-6 md:px-8">
      <div className="w-full mt-10 max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">Register</h1>

        <form onSubmit={registerSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            aria-label="Full Name"
            onChange={handleInput}
            value={registerInput.name}
            className="border border-gray-300 dark:border-gray-600 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
          <small className="text-red-500">{error?.name?.[0]}</small>

          <input
            type="email"
            name="email"
            placeholder="Email"
            aria-label="Email"
            onChange={handleInput}
            value={registerInput.email}
            className="border border-gray-300 dark:border-gray-600 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
          <small className="text-red-500">{error?.email?.[0]}</small>

          {/* Password Field with Toggle Icon */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              aria-label="Password"
              onChange={handleInput}
              value={registerInput.password}
              className="border border-gray-300 dark:border-gray-600 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
            {showPassword ? (
              <EyeOff
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-3 cursor-pointer text-gray-500 dark:text-gray-400"
              />
            ) : (
              <Eye
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-3 cursor-pointer text-gray-500 dark:text-gray-400"
              />
            )}
          </div>
          <small className="text-red-500">{error?.password?.[0]}</small>

          {/* Confirm Password Field */}
          <input
            type="password"
            name="password_confirmation"
            placeholder="Confirm Password"
            aria-label="Confirm Password"
            onChange={handleInput}
            value={registerInput.password_confirmation}
            className="border border-gray-300 dark:border-gray-600 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
          <small className="text-red-500">{error?.password_confirmation?.[0]}</small>

          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md p-3 hover:bg-blue-600 transition-colors dark:bg-blue-600 dark:hover:bg-blue-500"
            disabled={loading}
          >
            {loading ? <Load /> : "Register"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-700 dark:text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline dark:text-blue-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
