import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      alert(
        "You must be logged in to access this page.\n" +
        "Please log in to continue.\n" +
        "Thank you!"
      );
      navigate("/auth/sign-in", { replace: true });
    }
  }, [token, navigate]);

  if (!token) {
    // Show nothing or a loader while waiting for useEffect to navigate
    return null;
  }

  return children;
};

export default ProtectedRoute;
