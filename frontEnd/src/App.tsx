import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserRouters from "./Routers/UserRouters";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminRouters from "./Routers/AdminRouters";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/*" element={<UserRouters />} />
          <Route path="/admin/*" element={<AdminRouters />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
