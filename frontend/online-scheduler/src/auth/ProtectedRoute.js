import React, { useEffect } from "react";
import {useLocation, Navigate, useNavigate} from "react-router-dom";

const ProtectedRouteWrapper = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token && location.pathname !== "/login") {
      // Redirect to login page if no token available
      navigate("/login");
    }
  }, [location]);

  return <>{children}</>;
};

export default ProtectedRouteWrapper;