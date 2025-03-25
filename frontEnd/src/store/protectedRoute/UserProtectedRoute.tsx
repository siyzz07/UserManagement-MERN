import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const UserProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );

  // console.log("isAuthenticated", isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default UserProtectedRoute;
