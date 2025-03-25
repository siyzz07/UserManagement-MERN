import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import RegisterPage from "../Pages/UserPage/RegisterPage";
import LoginPage from "../Pages/UserPage/LoginPage";
import HomePage from "../Pages/UserPage/HomePage";
import UserProtectedRoute from "../store/protectedRoute/UserProtectedRoute";
import UserPublicRoute from "../store/publicRoute/UserPublicRoute";
const UserRouters = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/register"
          element={
            <UserPublicRoute>
              <RegisterPage />
            </UserPublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <UserPublicRoute>
              <LoginPage />
            </UserPublicRoute>
          }
        />
        <Route
          path="/home"
          element={
            <UserProtectedRoute>
              <HomePage />
            </UserProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default UserRouters;
