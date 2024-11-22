import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import swal from "sweetalert";

const VerifyEmail = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Parse query parameters from the URL
        const queryParams = new URLSearchParams(location.search);
        const status = queryParams.get("status");
        const message = queryParams.get("message");

        // Display the SweetAlert based on status
        if (status === "200") {
            swal("Success", decodeURIComponent(message), "success").then(() => {
                navigate("/"); // Redirect to home or login after success
            });
        } else {
            swal("Error", decodeURIComponent(message), "error").then(() => {
                navigate("/register"); // Redirect to registration on error
            });
        }
    }, [location, navigate]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-semibold">Processing your verification...</h2>
                <p className="text-gray-600">Please wait while we confirm your email address.</p>
            </div>
        </div>
    );
};

export default VerifyEmail;
