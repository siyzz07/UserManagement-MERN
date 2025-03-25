import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const UserPublicRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default UserPublicRoute;
