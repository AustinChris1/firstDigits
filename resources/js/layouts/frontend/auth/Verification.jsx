import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';

const ResendEmail = () => {
  document.title = "Resend Email - First Digit";
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect to home after 1.5 minutes
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 1.5 * 60 * 1000); // 1.5 minutes in milliseconds

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [navigate]);

  const handleResendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    axios.get("/sanctum/csrf-cookie").then(() => {
      axios
        .post("/api/email/resend", null, { withCredentials: true })
        .then((response) => {
          if (response.data.status === 200) {
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          const errorMessage =
            error.response?.data?.message || "An error occurred.";
          toast.error(errorMessage);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 p-6">
      <div className="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
          Verify Your Email
        </h1>
        <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
          Didn't receive the email? Click the button below to resend the
          verification link.
        </p>
        <form onSubmit={handleResendEmail} className="mt-6">
          <button
            type="submit"
            className={`w-full py-3 rounded-md text-white font-medium ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
            } transition-all duration-200`}
            disabled={loading}
          >
            {loading ? "Sending..." : "Resend Verification Email"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResendEmail;
