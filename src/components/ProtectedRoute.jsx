import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

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
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  if (!token) {
    // Show nothing or a loader while waiting for useEffect to navigate
    return null;
  }

  return children;
};

export default ProtectedRoute;






// import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem("token");
//   const [showAlert, setShowAlert] = useState(false);

//   useEffect(() => {
//     if (!token) {
//       alert(
//         "You must be logged in to access this page.\n" +
//         "Please log in to continue.\n" +
//         "Thank you!"
//       );
//       setShowAlert(true);
//     }
//   }, [token]);

//   if (!token && showAlert) {
//     return <Navigate to="/login" replace />;
//   }

//   // If token exists, render children (protected page)
//   return children;
// };

// export default ProtectedRoute;
