import React from "react";
import { Routes, Route } from "react-router-dom";

const Login = React.lazy(() => import("pages/Login"));
const Customer = React.lazy(() => import("pages/Customer"));
const Admin = React.lazy(() => import("pages/Admin"));

const MainRoutes = () => {
  return (
    <React.Suspense fallback={<span>Loading</span>}>
      <Routes>
        <Route path="*" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </React.Suspense>
  );
};

export default MainRoutes;
