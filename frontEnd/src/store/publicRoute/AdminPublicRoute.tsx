import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}


const AdminPublicRoute = ({children}:ProtectedRouteProps) => {
    const isAdminAuthenticated=useSelector((state:any)=>state.auth.isAdminAuthenticated)

    if(isAdminAuthenticated){
         return <Navigate to="/admin/dashboard" replace />;
    }
    return <>{children}</>
}

export default AdminPublicRoute
