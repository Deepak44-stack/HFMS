import React from "react";
import ReactDOM from "react-dom/client";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import AdminLogin from "@/pages/AdminLogin";
import AdminPortal from "@/pages/AdminPortal";
import "./index.css";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/admin/login" replace /> },
  { path: "/admin/login", element: <AdminLogin /> },
  { path: "/admin/*", element: <AdminPortal /> },
  { path: "*", element: <Navigate to="/admin/login" replace /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>
);
