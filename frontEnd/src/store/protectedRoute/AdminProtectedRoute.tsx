import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const AdminProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAdminAuthenticated = useSelector(
    (state: any) => state.auth.isAdminAuthenticated
  );

  console.log('isAdminAuthenticated', isAdminAuthenticated)
  if(!isAdminAuthenticated){
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>
};

export default AdminProtectedRoute;
