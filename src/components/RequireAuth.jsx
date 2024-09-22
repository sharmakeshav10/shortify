import { UserState } from "@/context";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DotLoader } from "react-spinners";

const RequireAuth = ({ children }) => {
  const { isAuthenticated, loading } = UserState();

  const navigate = useNavigate();

  useEffect(() => {
    // cant access dashboard if not logged in
    if (!isAuthenticated && loading === false) {
      navigate("/auth");
    }
  }, [isAuthenticated, loading]);

  if (loading) {
    return <DotLoader />;
  }

  if (isAuthenticated) {
    return children;
  }
};

export default RequireAuth;
