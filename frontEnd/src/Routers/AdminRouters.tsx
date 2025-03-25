import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLoginPage from "../Pages/AdminPage/AdminLoginPage";
import DashboradPage from "../Pages/AdminPage/DashboradPage";
import AdminProtectedRoute from "../store/protectedRoute/AdminProtectedRoute";
import AdminPublicRoute from "../store/publicRoute/AdminPublicRoute";

const AdminRouters = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={
            <AdminPublicRoute>
              <AdminLoginPage />
            </AdminPublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AdminProtectedRoute>
              <DashboradPage />
            </AdminProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default AdminRouters;
