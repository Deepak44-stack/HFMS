import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import { Layout } from "@/components/layout/Layout";
import Home from "@/pages/Home";
import Auth from "@/pages/Auth";
import Favorites from "@/pages/Favorites";
import ComingSoon from "@/pages/ComingSoon";
import SearchResults from "@/pages/SearchResults";
import HostelDetails from "@/pages/HostelDetails";
import Compare from "@/pages/Compare";
import Dashboard from "@/pages/Dashboard";
import "./index.css";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Auth /> },
      { path: "/register", element: <Auth /> },
      { path: "/favorites", element: <Favorites /> },
      // Built in later phases — placeholders so every nav link lands somewhere sensible.
      { path: "/search", element: <SearchResults /> },
      { path: "/compare", element: <Compare /> },
      { path: "/hostel/:id", element: <HostelDetails /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/about", element: <ComingSoon /> },
      { path: "/faq", element: <ComingSoon /> },
      { path: "/contact", element: <ComingSoon /> },
      { path: "*", element: <ComingSoon /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>
);
