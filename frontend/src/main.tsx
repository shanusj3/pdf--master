import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Dashboard from "./pages/Dashboard.tsx";
import PdfLoader from "./pages/PdfLoader.tsx";
import Home from "./pages/Home.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import Signup from "./pages/Signup.tsx";
import { AuthProvider } from "./context/AuthContect.tsx";
import { HelmetProvider } from "react-helmet-async";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<Home />} />
      <Route path="/upload/:fileId" element={<PdfLoader />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/signin" element={<LoginPage />} />
      <Route path="/signup" element={<Signup />} />
    </Route>
  )
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </HelmetProvider>
    </AuthProvider>
  </React.StrictMode>
);
